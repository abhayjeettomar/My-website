import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WEBGL_SHADER_SLIDES, ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

const VERTEX_SHADER_SRC = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vUv.y = 1.0 - vUv.y;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex0;
uniform sampler2D uTex1;
uniform float uMix;
uniform float uVelocity;

// Smooth procedural aerodynamic wave noise
float aeroWave(vec2 p, float phase) {
  return sin(p.y * 9.0 + phase * 4.0) * 0.5 + cos(p.x * 6.0 - phase * 3.0) * 0.5;
}

void main() {
  float m = clamp(uMix, 0.0, 1.0);
  // Bell curve peaking at mid-transition (m = 0.5)
  float bell = sin(m * 3.14159265);
  float velBoost = clamp(abs(uVelocity), 0.0, 1.0) * 0.04;

  float wave = aeroWave(vUv, m);
  vec2 disp = vec2(wave * (0.085 * bell + velBoost), wave * 0.025 * bell);

  // Directional wind-tunnel UV warp: outgoing image stretches along airflow, incoming image settles from opposite vector
  vec2 uv0 = clamp(vUv + disp * m, 0.001, 0.999);
  vec2 uv1 = clamp(vUv - disp * (1.0 - m), 0.001, 0.999);

  // Chromatic RGB split peaking mid-morph
  vec2 rgbShift = vec2((0.014 * bell) + velBoost * 0.35, 0.0);

  vec4 col0 = vec4(
    texture2D(uTex0, clamp(uv0 + rgbShift, 0.001, 0.999)).r,
    texture2D(uTex0, uv0).g,
    texture2D(uTex0, clamp(uv0 - rgbShift, 0.001, 0.999)).b,
    1.0
  );

  vec4 col1 = vec4(
    texture2D(uTex1, clamp(uv1 + rgbShift, 0.001, 0.999)).r,
    texture2D(uTex1, uv1).g,
    texture2D(uTex1, clamp(uv1 - rgbShift, 0.001, 0.999)).b,
    1.0
  );

  // Smooth S-curve blend with subtle specular highlight ridge along the morph wave
  float smoothM = smoothstep(0.0, 1.0, m);
  vec4 finalCol = mix(col0, col1, smoothM);
  finalCol.rgb += vec3(0.83, 0.68, 0.21) * (bell * 0.08 * abs(wave));

  gl_FragColor = finalCol;
}
`;

export const WebGLDisplacementStage: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const progressRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      antialias: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const quad = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'aPosition');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTex0Loc = gl.getUniformLocation(prog, 'uTex0');
    const uTex1Loc = gl.getUniformLocation(prog, 'uTex1');
    const uMixLoc = gl.getUniformLocation(prog, 'uMix');
    const uVelLoc = gl.getUniformLocation(prog, 'uVelocity');

    // Helper: create a crisp procedural fallback texture first, then upgrade when CORS image loads
    const createFallbackCanvas = (idx: number, title: string) => {
      const c = document.createElement('canvas');
      c.width = 1280;
      c.height = 720;
      const ctx2d = c.getContext('2d')!;
      const grad = ctx2d.createRadialGradient(640, 360, 40, 640, 360, 720);
      grad.addColorStop(0, idx % 2 === 0 ? '#1e1b2e' : '#1f1610');
      grad.addColorStop(1, '#050507');
      ctx2d.fillStyle = grad;
      ctx2d.fillRect(0, 0, 1280, 720);

      ctx2d.strokeStyle = 'rgba(212,175,55,0.35)';
      ctx2d.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        ctx2d.beginPath();
        ctx2d.arc(640, 420, 120 + i * 55, Math.PI, Math.PI * 2);
        ctx2d.stroke();
      }

      ctx2d.fillStyle = 'rgba(255,255,255,0.06)';
      ctx2d.font = '600 110px Inter, sans-serif';
      ctx2d.fillText(title, 90, 380);
      return c;
    };

    const textures: WebGLTexture[] = WEBGL_SHADER_SLIDES.map((slide, idx) => {
      const tex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        createFallbackCanvas(idx, slide.headline)
      );

      const loadIntoTex = (url: string, isRetry = false) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        };
        img.onerror = () => {
          if (!isRetry) loadIntoTex(ROADSTER_REAL_PHOTOS.studioFallback, true);
        };
        img.src = url;
      };

      loadIntoTex(slide.imageUrl);
      return tex;
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let rafId = 0;
    let smoothedProg = 0;
    const renderLoop = () => {
      smoothedProg += (progressRef.current - smoothedProg) * 0.14;
      velocityRef.current *= 0.9;

      const maxIdx = textures.length - 1;
      const clamped = Math.max(0, Math.min(maxIdx - 0.0001, smoothedProg));
      const idx0 = Math.floor(clamped);
      const idx1 = Math.min(maxIdx, idx0 + 1);
      const localMix = clamped - idx0;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[idx0]);
      gl.uniform1i(uTex0Loc, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[idx1]);
      gl.uniform1i(uTex1Loc, 1);

      gl.uniform1f(uMixLoc, localMix);
      gl.uniform1f(uVelLoc, velocityRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=320%',
        pin: true,
        anticipatePin: 1,
        scrub: 0.6,
        onUpdate: (self) => {
          const total = WEBGL_SHADER_SLIDES.length - 1;
          const nextProg = self.progress * total;
          velocityRef.current = Math.min(1.2, Math.abs(self.getVelocity() / 2400));
          progressRef.current = nextProg;
          setActiveSlideIdx(Math.round(nextProg));
        },
      });
    }, sectionRef);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      ctx.revert();
    };
  }, []);

  const currentSlide = WEBGL_SHADER_SLIDES[activeSlideIdx] || WEBGL_SHADER_SLIDES[0];

  return (
    <section
      id="webgl-morph"
      ref={sectionRef}
      data-cursor-label="LIQUID MORPH"
      className="relative h-screen w-full overflow-hidden bg-[#050507]"
    >
      {/* 120FPS WebGL GLSL Dual-Texture Displacement Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block gpu-layer" />

      {/* Subtle Vignette for Editorial Legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(5,5,7,0.92) 0%, rgba(5,5,7,0.12) 45%, rgba(5,5,7,0.68) 100%)',
        }}
      />

      {/* Perimeter Editorial HUD (Center 70% Remains Completely Unobstructed) */}
      <div className="relative z-10 h-full w-full max-w-[1600px] mx-auto p-6 sm:p-12 flex flex-col justify-between pointer-events-none">
        <div className="pt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
          <span>02 // GPU DISPLACEMENT &amp; AERODYNAMIC MORPH</span>
          <div className="flex items-center gap-2">
            {WEBGL_SHADER_SLIDES.map((s, idx) => (
              <span
                key={s.id}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === activeSlideIdx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
          <div key={currentSlide.id} className="gpu-layer">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] block mb-2">
              {currentSlide.chapter} — {currentSlide.code}
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-[-0.035em] text-white leading-[0.94]">
              {currentSlide.headline}{' '}
              <span className="serif-gold-italic">{currentSlide.accentWord}</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <p className="text-xs sm:text-sm text-white/70 max-w-xs font-light leading-relaxed">
              {currentSlide.caption}
            </p>
            <div className="border-l border-[#D4AF37]/60 pl-4 font-mono shrink-0">
              <div className="text-3xl sm:text-4xl font-light text-white">
                {currentSlide.metric}
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] mt-1">
                {currentSlide.metricLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

