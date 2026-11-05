import React, { useRef, useEffect } from 'react';
import { AeroDriveMode } from '../types/roadster';

interface RoadsterAeroCanvasProps {
  driveMode: AeroDriveMode;
  primaryColorHex?: string;
  glazeColorHex?: string;
  suctionRpmRatio?: number; // 0 to 1
  wingAngleDeg?: number; // 4 to 38
  isLaunching?: boolean;
  mouseNormX?: number; // -1 to 1
}

export const RoadsterAeroCanvas: React.FC<RoadsterAeroCanvasProps> = ({
  driveMode,
  primaryColorHex = '#E82127',
  glazeColorHex = '#D4AF37',
  suctionRpmRatio = 0.75,
  wingAngleDeg = 18,
  isLaunching = false,
  mouseNormX = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Streamline particles for wind tunnel
    const particles = Array.from({ length: 70 }, (_, i) => ({
      x: Math.random() * 1200,
      y: 80 + (i % 14) * 24 + Math.random() * 10,
      speed: 3.5 + Math.random() * 4.5,
      length: 45 + Math.random() * 70,
      alpha: 0.15 + Math.random() * 0.45,
    }));

    // Underbody suction particles
    const suctionDots = Array.from({ length: 36 }, () => ({
      x: 380 + Math.random() * 420,
      y: 350 + Math.random() * 55,
      vy: -1.2 - Math.random() * 2.5,
      alpha: Math.random(),
    }));

    const render = () => {
      time += 0.035;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth || 1000;
      const height = canvas.clientHeight || 480;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5 + mouseNormX * 18;
      const isHover = driveMode === 'air-hover';
      const isSuction = driveMode === 'track-suction' || driveMode === 'spacex-thruster';
      const isThruster = driveMode === 'spacex-thruster' || isLaunching || isHover;

      // Ride height adjustment: Track mode drops car, Air-Hover levitates car with sine wave
      const rideOffsetY = isHover
        ? -24 + Math.sin(time * 2.2) * 8
        : isSuction
        ? 9
        : 0;

      const cy = height * 0.62 + rideOffsetY;
      const scale = Math.min(width / 1050, height / 460) * 0.92;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // 1. Ground Plane & Underbody Suction / Hover Glow
      const groundY = 78 - rideOffsetY / scale;
      const gradGround = ctx.createRadialGradient(0, groundY, 10, 0, groundY, 460);

      if (isHover) {
        gradGround.addColorStop(0, 'rgba(56, 189, 248, 0.42)');
        gradGround.addColorStop(0.5, 'rgba(212, 175, 55, 0.12)');
        gradGround.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else if (isSuction) {
        gradGround.addColorStop(0, 'rgba(245, 158, 11, 0.36)');
        gradGround.addColorStop(0.5, 'rgba(232, 33, 39, 0.14)');
        gradGround.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradGround.addColorStop(0, 'rgba(232, 33, 39, 0.22)');
        gradGround.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = gradGround;
      ctx.fillRect(-500, groundY - 25, 1000, 60);

      // Ground horizon line
      ctx.strokeStyle = 'rgba(255,255,255,0.14)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-520, groundY);
      ctx.lineTo(520, groundY);
      ctx.stroke();

      // 2. Wind-Tunnel Aerodynamic Streamlines
      const speedMult = isLaunching ? 3.4 : isThruster ? 2.4 : isSuction ? 1.7 : 1.0;
      particles.forEach((p) => {
        p.x += p.speed * speedMult;
        if (p.x > 540) p.x = -540;

        // Deflect streamline over the Roadster roofline profile
        const normX = p.x / 360;
        let curveLift = 0;
        if (Math.abs(normX) < 1.15) {
          curveLift = -Math.cos(normX * 1.35) * 78;
        }

        const drawY = p.y - 260 + curveLift * 0.55;
        const streamGrad = ctx.createLinearGradient(p.x - p.length, drawY, p.x, drawY);
        streamGrad.addColorStop(0, 'rgba(255,255,255,0)');
        streamGrad.addColorStop(
          0.7,
          isThruster
            ? `rgba(56, 189, 248, ${p.alpha * 0.7})`
            : `rgba(212, 175, 55, ${p.alpha * 0.6})`
        );
        streamGrad.addColorStop(1, `rgba(255, 255, 255, ${p.alpha})`);

        ctx.strokeStyle = streamGrad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(p.x - p.length, drawY);
        ctx.lineTo(p.x, drawY);
        ctx.stroke();
      });

      // 3. Underbody Multi-Mode Suction Vortex Arrows (when Track Suction or SpaceX mode active)
      if (isSuction || suctionRpmRatio > 0.2) {
        suctionDots.forEach((d) => {
          d.y += d.vy * (0.6 + suctionRpmRatio * 1.5);
          if (d.y < 35) d.y = groundY + 12;
          const sx = d.x - 590;
          ctx.fillStyle = `rgba(245, 158, 11, ${0.35 + suctionRpmRatio * 0.55})`;
          ctx.beginPath();
          ctx.arc(sx, d.y - 315, 2.2, 0, Math.PI * 2);
          ctx.fill();
        });

        // Downward downforce pressure vectors
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
        ctx.lineWidth = 1.5;
        for (let vx = -140; vx <= 140; vx += 70) {
          ctx.beginPath();
          ctx.moveTo(vx, 32);
          ctx.lineTo(vx, groundY - 4);
          ctx.stroke();
        }
      }

      // 4. SpaceX Cold-Gas Supersonic Shock-Diamond Plumes (Rear & Perimeter)
      if (isThruster) {
        const plumeLen = isLaunching ? 260 : 175;
        const flicker = 0.88 + Math.sin(time * 24) * 0.12;
        const plumeGrad = ctx.createLinearGradient(315, 12, 315 + plumeLen * flicker, 12);
        plumeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
        plumeGrad.addColorStop(0.22, 'rgba(56, 189, 248, 0.88)');
        plumeGrad.addColorStop(0.6, 'rgba(232, 33, 39, 0.45)');
        plumeGrad.addColorStop(1, 'rgba(232, 33, 39, 0)');

        ctx.fillStyle = plumeGrad;
        ctx.beginPath();
        ctx.moveTo(312, 2);
        ctx.lineTo(312 + plumeLen * flicker, -18);
        ctx.lineTo(312 + plumeLen * flicker, 36);
        ctx.lineTo(312, 22);
        ctx.closePath();
        ctx.fill();

        // Shock diamonds inside plume
        for (let d = 1; d <= 4; d++) {
          const dx = 315 + d * 36 * flicker;
          ctx.fillStyle = `rgba(224, 242, 254, ${0.9 - d * 0.18})`;
          ctx.beginPath();
          ctx.moveTo(dx - 10, 10);
          ctx.lineTo(dx, 3);
          ctx.lineTo(dx + 10, 10);
          ctx.lineTo(dx, 17);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Vertical hover thrusters (Air-Ready mode)
      if (isHover) {
        [-195, 0, 195].forEach((hx) => {
          const vGrad = ctx.createLinearGradient(hx, 45, hx, groundY + 15);
          vGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          vGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.75)');
          vGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
          ctx.fillStyle = vGrad;
          ctx.beginPath();
          ctx.moveTo(hx - 12, 45);
          ctx.lineTo(hx + 12, 45);
          ctx.lineTo(hx + 28, groundY + 10);
          ctx.lineTo(hx - 28, groundY + 10);
          ctx.closePath();
          ctx.fill();
        });
      }

      // 5. Deployable Active Rear Aero Wing
      const wingRad =
        (((isSuction || isThruster ? Math.max(wingAngleDeg, 24) : wingAngleDeg) * Math.PI) / 180);
      ctx.save();
      ctx.translate(278, -26);
      ctx.rotate(-wingRad);
      ctx.fillStyle = '#E82127';
      ctx.fillRect(-26, -4, 42, 6);
      ctx.restore();

      // 6. Sculpted Tesla Roadster Silhouette Body
      const bodyGrad = ctx.createLinearGradient(-340, -95, 340, 55);
      bodyGrad.addColorStop(0, primaryColorHex);
      bodyGrad.addColorStop(0.55, primaryColorHex);
      bodyGrad.addColorStop(1, '#09090E');

      ctx.fillStyle = bodyGrad;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();

      // Front splitter & low nose
      ctx.moveTo(-335, 38);
      ctx.quadraticCurveTo(-345, 12, -295, -4);
      // Front fender arch crest
      ctx.quadraticCurveTo(-220, -28, -145, -34);
      // Fastback windshield & Gold-Glazed canopy arch
      ctx.bezierCurveTo(-75, -88, 65, -92, 175, -42);
      // Rear haunch & Kammback decklid
      ctx.quadraticCurveTo(265, -36, 318, -14);
      // Rear diffuser & thruster fascia
      ctx.lineTo(324, 28);
      ctx.lineTo(285, 44);
      // Underbody ground-sealing venturi tunnel
      ctx.lineTo(-315, 44);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // 7. Gold-Glazed Spacesuit Visor Canopy Glass
      const canopyGrad = ctx.createLinearGradient(-130, -82, 155, -28);
      canopyGrad.addColorStop(0, 'rgba(245, 158, 11, 0.78)');
      canopyGrad.addColorStop(0.5, glazeColorHex);
      canopyGrad.addColorStop(1, 'rgba(15, 23, 42, 0.85)');

      ctx.fillStyle = canopyGrad;
      ctx.beginPath();
      ctx.moveTo(-132, -33);
      ctx.bezierCurveTo(-68, -80, 55, -84, 158, -38);
      ctx.quadraticCurveTo(45, -26, -132, -33);
      ctx.closePath();
      ctx.fill();

      // 8. Hidden Headlight Laser Slit & Full-Length Rear Taillight Blade
      // Front laser DRL
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 14;
      ctx.fillRect(-312, 4, 38, 3.5);

      // Rear full-length crimson LED blade
      ctx.fillStyle = '#EF4444';
      ctx.shadowColor = '#E82127';
      ctx.shadowBlur = 18;
      ctx.fillRect(298, -10, 24, 5);
      ctx.shadowBlur = 0;

      // 9. Ultra-Light Forged Thin-Spoke Aero Wheels
      const wheelPositions = [-205, 205];
      wheelPositions.forEach((wx) => {
        ctx.save();
        ctx.translate(wx, 38);

        // Tire outer torus
        ctx.fillStyle = '#07070A';
        ctx.strokeStyle = 'rgba(255,255,255,0.22)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, 44, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Glowing Carbon-Ceramic Brake Caliper
        ctx.fillStyle = '#E82127';
        ctx.beginPath();
        ctx.arc(-14, -8, 10, 0, Math.PI * 2);
        ctx.fill();

        // Rotating Titanium Thin Spokes
        ctx.rotate(-time * speedMult * 2.6);
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.78)';
        ctx.lineWidth = 1.6;
        for (let s = 0; s < 10; s++) {
          const angle = (s * Math.PI * 2) / 10;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * 37, Math.sin(angle) * 37);
          ctx.stroke();
        }

        // Center-lock titanium hub
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      ctx.restore();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    driveMode,
    primaryColorHex,
    glazeColorHex,
    suctionRpmRatio,
    wingAngleDeg,
    isLaunching,
    mouseNormX,
  ]);

  return <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />;
};

