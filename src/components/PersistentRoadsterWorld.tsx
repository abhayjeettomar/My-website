import React, { useEffect, useRef, useState } from 'react';
import {
  MOTIONSITES_ATMOSPHERE_VIDEOS,
  WORLD_CHAPTERS,
} from '../data/roadsterWorldData';
import { resolveChapterSegment } from '../utils/scrollConductor';

interface PersistentRoadsterWorldProps {
  smoothChapterPos: number;
  scrollVelocity: number;
  worldOpacity: number;
}

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_texA;
uniform sampler2D u_texB;
uniform float u_blend;
uniform float u_zoomA;
uniform float u_zoomB;
uniform vec2 u_panA;
uniform vec2 u_panB;
uniform float u_velocity;
uniform float u_airflow;
uniform float u_time;
uniform float u_mode;
uniform vec2 u_resolution;
uniform vec2 u_texAspectA;
uniform vec2 u_texAspectB;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

vec2 coverUV(vec2 uv, vec2 canvasRes, vec2 imgRes, float zoom, vec2 pan) {
  float canvasAspect = canvasRes.x / max(canvasRes.y, 1.0);
  float imgAspect = imgRes.x / max(imgRes.y, 1.0);
  vec2 scale = vec2(1.0);
  if (canvasAspect > imgAspect) {
    scale.y = imgAspect / canvasAspect;
  } else {
    scale.x = canvasAspect / imgAspect;
  }
  vec2 centered = (uv - 0.5) * scale / max(zoom, 0.001);
  return clamp(centered + 0.5 + pan, 0.001, 0.999);
}

void main() {
  vec2 center = v_uv - 0.5;
  float dist = length(center * vec2(u_resolution.x / max(u_resolution.y, 1.0), 1.0));

  // Aerodynamic streamline field
  float flowWave = noise(vec2(v_uv.x * 7.5 - u_time * 1.8, v_uv.y * 18.0));
  float secondWave = noise(vec2(v_uv.x * 14.0 - u_time * 2.9, v_uv.y * 32.0));
  float streamline = smoothstep(0.76, 0.96, flowWave * 0.65 + secondWave * 0.35);

  // Mode-aware spatial warp between Chapter A and Chapter B (Zero hard cuts)
  float localBlend = u_blend;
  vec2 warpVector = vec2(0.0);

  if (u_mode < 0.5) {
    // Iris Aperture Portal: expands outward from focal center like a camera lens opening
    float radius = u_blend * 1.45;
    float irisMask = 1.0 - smoothstep(radius - 0.28, radius + 0.08, dist);
    localBlend = mix(u_blend, irisMask, 0.55);
    warpVector = center * sin(u_blend * 3.14159) * 0.08;
  } else if (u_mode < 1.5) {
    // Laminar Wind-Tunnel Sweep: flows right-to-left along aerodynamic streamlines
    float sweep = smoothstep(0.0, 1.0, u_blend * 1.35 - (1.0 - v_uv.x) * 0.35 + (flowWave - 0.5) * 0.18);
    localBlend = sweep;
    warpVector = vec2((flowWave - 0.5) * 0.09 * sin(u_blend * 3.14159), (secondWave - 0.5) * 0.03);
  } else {
    // Cold-Gas Supersonic Shockwave Plume
    float shock = abs(dist - u_blend * 0.95);
    float ring = exp(-shock * 14.0) * sin(u_blend * 3.14159);
    warpVector = normalize(center + vec2(0.0001)) * ring * 0.065;
    localBlend = smoothstep(0.0, 1.0, u_blend + (flowWave - 0.5) * 0.14);
  }

  // Subtle velocity-driven optical dispersion
  float chromaShift = clamp(abs(u_velocity) * 0.0035 + sin(u_blend * 3.14159) * 0.004, 0.0, 0.012);

  vec2 uvA = coverUV(v_uv + warpVector * localBlend, u_resolution, u_texAspectA, u_zoomA, u_panA);
  vec2 uvB = coverUV(v_uv - warpVector * (1.0 - localBlend), u_resolution, u_texAspectB, u_zoomB, u_panB);

  vec3 colA = vec3(
    texture2D(u_texA, uvA + vec2(chromaShift, 0.0)).r,
    texture2D(u_texA, uvA).g,
    texture2D(u_texA, uvA - vec2(chromaShift, 0.0)).b
  );

  vec3 colB = vec3(
    texture2D(u_texB, uvB + vec2(chromaShift, 0.0)).r,
    texture2D(u_texB, uvB).g,
    texture2D(u_texB, uvB - vec2(chromaShift, 0.0)).b
  );

  vec3 color = mix(colA, colB, localBlend);

  // Subtle Gold Glazed / Cold-Gas laminar airflow traces over the bodywork edges
  float edgeMask = smoothstep(0.15, 0.48, dist) * (1.0 - smoothstep(0.65, 0.98, v_uv.y));
  vec3 aeroTint = vec3(0.83, 0.68, 0.22) * streamline * u_airflow * edgeMask * (0.09 + clamp(abs(u_velocity) * 0.04, 0.0, 0.12));
  color += aeroTint;

  // Gentle optical vignette preserving 100% subject clarity in center
  float vignette = smoothstep(1.18, 0.32, dist);
  color *= mix(0.76, 1.0, vignette);

  gl_FragColor = vec4(color, 1.0);
}
`;

export const PersistentRoadsterWorld: React.FC<PersistentRoadsterWorldProps> = ({
  smoothChapterPos,
  scrollVelocity,
  worldOpacity,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blobVideoUrl, setBlobVideoUrl] = useState<string | null>(null);

  // oso95/scroll-world Step 6 rule: Fetch background video as an in-memory Blob URL so seeks/loops never stall
  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    fetch(MOTIONSITES_ATMOSPHERE_VIDEOS.goldDustTelemetry)
      .then((res) => res.blob())
      .then((blob) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(blob);
        setBlobVideoUrl(objectUrl);
      })
      .catch(() => {
        if (active) {
          setBlobVideoUrl(MOTIONSITES_ATMOSPHERE_VIDEOS.goldDustTelemetry);
        }
      });

    return () => {
      active = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  const stateRef = useRef({
    smoothChapterPos,
    scrollVelocity,
  });

  useEffect(() => {
    stateRef.current.smoothChapterPos = smoothChapterPos;
    stateRef.current.scrollVelocity = scrollVelocity;
  }, [smoothChapterPos, scrollVelocity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Load all 6 chapter primary textures into GPU memory once
    const textures: WebGLTexture[] = [];
    const dimensions: { w: number; h: number }[] = WORLD_CHAPTERS.map(() => ({
      w: 1920,
      h: 1080,
    }));

    WORLD_CHAPTERS.forEach((chapter, idx) => {
      const tex = gl.createTexture();
      if (!tex) return;
      textures[idx] = tex;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([12, 12, 16, 255])
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        dimensions[idx] = {
          w: img.naturalWidth || 1920,
          h: img.naturalHeight || 1080,
        };
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          img
        );
      };
      img.src = chapter.photoUrl;
    });

    const uTexA = gl.getUniformLocation(program, 'u_texA');
    const uTexB = gl.getUniformLocation(program, 'u_texB');
    const uBlend = gl.getUniformLocation(program, 'u_blend');
    const uZoomA = gl.getUniformLocation(program, 'u_zoomA');
    const uZoomB = gl.getUniformLocation(program, 'u_zoomB');
    const uPanA = gl.getUniformLocation(program, 'u_panA');
    const uPanB = gl.getUniformLocation(program, 'u_panB');
    const uVelocity = gl.getUniformLocation(program, 'u_velocity');
    const uAirflow = gl.getUniformLocation(program, 'u_airflow');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMode = gl.getUniformLocation(program, 'u_mode');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uAspectA = gl.getUniformLocation(program, 'u_texAspectA');
    const uAspectB = gl.getUniformLocation(program, 'u_texAspectB');

    const handleResize = () => {
      // Meng To performance budget: cap DPR at 1.75 desktop, 1.35 mobile
      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 1.75);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const lingerValues = WORLD_CHAPTERS.map((c) => c.linger);
    let rafId = 0;
    const startTime = performance.now();

    const renderFrame = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      const { smoothChapterPos: pos, scrollVelocity: vel } = stateRef.current;
      const seg = resolveChapterSegment(pos, WORLD_CHAPTERS.length, lingerValues);

      const chapA = WORLD_CHAPTERS[seg.chapterIndex];
      const chapB = WORLD_CHAPTERS[seg.nextChapterIndex];

      const zoomA =
        chapA.camera.startZoom +
        (chapA.camera.endZoom - chapA.camera.startZoom) * seg.lingeredProgress;
      const zoomB =
        chapB.camera.startZoom +
        (chapB.camera.endZoom - chapB.camera.startZoom) * (seg.seamBlend * 0.35);

      const panAX = chapA.camera.panX * seg.lingeredProgress;
      const panAY = chapA.camera.panY * seg.lingeredProgress;
      const panBX = chapB.camera.panX * (1 - seg.seamBlend) * 0.5;
      const panBY = chapB.camera.panY * (1 - seg.seamBlend) * 0.5;

      const airflow =
        chapA.camera.airflowStrength * (1 - seg.seamBlend) +
        chapB.camera.airflowStrength * seg.seamBlend;

      const modeIndex =
        chapA.camera.transitionMode === 'iris-aperture'
          ? 0.0
          : chapA.camera.transitionMode === 'wind-stream'
          ? 1.0
          : 2.0;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[seg.chapterIndex] || textures[0]);
      gl.uniform1i(uTexA, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[seg.nextChapterIndex] || textures[0]);
      gl.uniform1i(uTexB, 1);

      gl.uniform1f(uBlend, seg.seamBlend);
      gl.uniform1f(uZoomA, zoomA);
      gl.uniform1f(uZoomB, zoomB);
      gl.uniform2f(uPanA, panAX, panAY);
      gl.uniform2f(uPanB, panBX, panBY);

      gl.uniform1f(uVelocity, vel);
      gl.uniform1f(uAirflow, airflow);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uMode, modeIndex);
      gl.uniform2f(uRes, canvas.width, canvas.height);

      const dimA = dimensions[seg.chapterIndex] || { w: 1920, h: 1080 };
      const dimB = dimensions[seg.nextChapterIndex] || { w: 1920, h: 1080 };
      gl.uniform2f(uAspectA, dimA.w, dimA.h);
      gl.uniform2f(uAspectB, dimB.w, dimB.h);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{ opacity: worldOpacity }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-500 gpu-layer"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {blobVideoUrl && (
        <video
          src={blobVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-[0.16] pointer-events-none"
        />
      )}
      <div className="hero-bottom-scrim absolute inset-0 pointer-events-none" />
    </div>
  );
};

