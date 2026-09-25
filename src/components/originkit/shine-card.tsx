'use client';

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';

function clamp(n: any, min: number, max: number, fallback: number) {
  const v = typeof n === 'number' ? n : parseFloat(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
}

function parseColor01(input: any, fallback: [number, number, number]) {
  if (!input) return fallback;
  const s = String(input).trim();
  const hex = s.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (hex) {
    const h = hex[1];
    const f =
      h.length === 3
        ? h
            .split('')
            .map((c) => c + c)
            .join('')
        : h;
    return [
      parseInt(f.slice(0, 2), 16) / 255,
      parseInt(f.slice(2, 4), 16) / 255,
      parseInt(f.slice(4, 6), 16) / 255,
    ] as [number, number, number];
  }
  const rgb = s.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1].split(',').map((p) => p.trim());
    if (parts.length >= 3) {
      const to01 = (v: string) =>
        v.endsWith('%')
          ? Math.min(1, Math.max(0, parseFloat(v) / 100))
          : Math.min(1, Math.max(0, parseFloat(v) / 255));
      const out = [to01(parts[0]), to01(parts[1]), to01(parts[2])];
      if (out.every(Number.isFinite)) return out as [number, number, number];
    }
  }
  return fallback;
}

interface TiltOptions {
  glow: string;
  amount: number;
  hoverScale: number;
}

export interface ShineCardProps {
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  cardWidth?: number | string;
  cardHeight?: number | string;
  cardColor?: string;
  radius?: string;
  density?: number;
  waveSpeed?: number;
  sparkle?: number;
  unlit?: string;
  highlight?: string;
  tilt?: boolean;
  tiltOptions?: Partial<TiltOptions>;
}

const DEFAULTS = {
  cardWidth: 600,
  cardHeight: 400,
  cardColor: '#121211',
  radius: '8px',
  density: 45,
  waveSpeed: 30,
  sparkle: 75,
  unlit: '#0A0A09',
  highlight: '#C6A56A',
  tilt: true,
  tiltOptions: {
    amount: 10,
    hoverScale: 102,
    glow: 'rgba(198, 165, 106, 0.2)',
  } as TiltOptions,
};

function settings(p: ShineCardProps) {
  const ti = { ...DEFAULTS.tiltOptions, ...(p?.tiltOptions || {}) };
  return {
    cardWidth: p?.cardWidth ?? '100%',
    cardHeight: p?.cardHeight ?? '100%',
    cardColor: p?.cardColor ?? DEFAULTS.cardColor,
    radius: p?.radius ?? DEFAULTS.radius,
    waveSpeed: (clamp(p?.waveSpeed, 0, 100, DEFAULTS.waveSpeed) / 100) * 1.5,
    sparkle: (clamp(p?.sparkle, 0, 100, DEFAULTS.sparkle) / 100) * 8,
    density: clamp(p?.density, 6, 80, DEFAULTS.density),
    unlit: p?.unlit ?? DEFAULTS.unlit,
    highlight: p?.highlight ?? DEFAULTS.highlight,
    tilt: p?.tilt ?? DEFAULTS.tilt,
    tiltAmount: clamp(ti.amount, 0, 30, DEFAULTS.tiltOptions.amount),
    hoverScale:
      clamp(ti.hoverScale, 100, 120, DEFAULTS.tiltOptions.hoverScale) / 100,
    glow: ti.glow ?? DEFAULTS.tiltOptions.glow,
  };
}

export function ShineCard(props: ShineCardProps) {
  const { style, className = '', children } = props;
  const S = settings(props);

  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowTopRef = useRef<HTMLDivElement>(null);
  const glowBottomRef = useRef<HTMLDivElement>(null);

  const tiltRef = useRef({ tx: 0, ty: 0, x: 0, y: 0, scale: 1, target: 1 });
  const liveRef = useRef(S);
  liveRef.current = S;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let raf = 0;
    let settled = false;
    function frame() {
      const t = tiltRef.current;
      t.x += (t.tx - t.x) * 0.12;
      t.y += (t.ty - t.y) * 0.12;
      t.scale += (t.target - t.scale) * 0.12;

      card!.style.transform = `rotateX(${t.x}deg) rotateY(${t.y}deg) scale(${t.scale})`;

      const top = Math.min(1, Math.max(0, -t.x / 15));
      const bottom = Math.min(1, Math.max(0, t.x / 15));
      if (glowTopRef.current) glowTopRef.current.style.opacity = `${top * 0.4}`;
      if (glowBottomRef.current) glowBottomRef.current.style.opacity = `${bottom * 0.4}`;

      const still =
        Math.abs(t.tx - t.x) < 0.01 &&
        Math.abs(t.ty - t.y) < 0.01 &&
        Math.abs(t.target - t.scale) < 0.001;
      if (still && settled) {
        raf = 0;
        return;
      }
      settled = still;
      raf = requestAnimationFrame(frame);
    }
    function wake() {
      settled = false;
      if (!raf) raf = requestAnimationFrame(frame);
    }

    const root = rootRef.current!;
    function onMove(e: PointerEvent) {
      const L = liveRef.current;
      if (!L.tilt) return;
      const rect = root.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = Math.min(1, Math.max(-1, (e.clientX - cx) / (rect.width / 2)));
      const ny = Math.min(1, Math.max(-1, (e.clientY - cy) / (rect.height / 2)));
      const t = tiltRef.current;
      t.tx = -ny * L.tiltAmount * 0.5;
      t.ty = nx * L.tiltAmount * 0.8;
      t.target = L.hoverScale;
      wake();
    }
    function onLeave() {
      const t = tiltRef.current;
      t.tx = 0;
      t.ty = 0;
      t.target = 1;
      wake();
    }
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    wake();

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const glow = (
    ref: RefObject<HTMLDivElement>,
    color: string,
    from: 'top' | 'bottom'
  ) => (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        borderRadius: S.radius,
        background: `radial-gradient(ellipse at ${from === 'top' ? '50% 0%' : '50% 100%'}, ${color} 0%, transparent 70%)`,
        opacity: 0,
        transition: 'opacity 0.2s ease',
      }}
    />
  );

  return (
    <div
      ref={rootRef}
      className={`relative w-full perspective-[1200px] ${className}`}
      style={style}
    >
      <div
        ref={cardRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: S.cardColor,
            borderRadius: S.radius,
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Background Dot Field from Origin Kit */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              opacity: 0.25,
            }}
          >
            <WaveyDots settings={S} />
          </div>

          {/* Children Content Layer */}
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        </div>

        {S.tilt && (
          <>
            {glow(glowTopRef, S.glow, 'top')}
            {glow(glowBottomRef, S.glow, 'bottom')}
          </>
        )}
      </div>
    </div>
  );
}

function WaveyDots({ settings: S }: { settings: ReturnType<typeof settings> }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const liveRef = useRef(S);
  liveRef.current = S;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS))
        console.warn('ShineCard shader:', gl!.getShaderInfoLog(s));
      return s;
    }
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('ShineCard link:', gl.getProgramInfoLog(program));
      return;
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(program, n);
    const uni = {
      time: u('u_time'),
      res: u('u_res'),
      waveSpeed: u('u_waveSpeed'),
      sparkle: u('u_sparkle'),
      mouse: u('u_mouse'),
      density: u('u_density'),
      theme: u('u_theme'),
      dark: u('u_dark'),
    };

    const mouse = { x: -1, y: -1 };
    let needsResize = true;
    function resizeIfNeeded() {
      if (!needsResize) return;
      needsResize = false;
      const dpr = Math.min((window.devicePixelRatio || 1) * 1.5, 2);
      const w = Math.max(1, Math.round(canvas!.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas!.clientHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
        gl!.uniform2f(uni.res, w, h);
      }
    }

    let inView = true;
    let hidden = document.hidden;
    const reducedQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let reduced = !!reducedQuery?.matches;

    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(container);
    const ro = new ResizeObserver(() => (needsResize = true));
    ro.observe(container);

    const onVisibility = () => (hidden = document.hidden);
    const onReduced = () => (reduced = !!reducedQuery?.matches);
    const onResize = () => (needsResize = true);
    document.addEventListener('visibilitychange', onVisibility);
    reducedQuery?.addEventListener?.('change', onReduced);
    window.addEventListener('resize', onResize);

    function onMove(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    }
    const onOut = () => {
      mouse.x = -1;
      mouse.y = -1;
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onOut);

    function draw(nowMs: number) {
      const L = liveRef.current;
      resizeIfNeeded();
      gl!.uniform1f(uni.time, reduced ? 0 : nowMs * 0.001);
      gl!.uniform1f(uni.waveSpeed, L.waveSpeed);
      gl!.uniform1f(uni.sparkle, L.sparkle);
      gl!.uniform1f(uni.density, L.density);
      const theme = parseColor01(L.highlight, [0.78, 0.65, 0.42]);
      gl!.uniform3f(uni.theme, theme[0], theme[1], theme[2]);
      const dark = parseColor01(L.unlit, [0.06, 0.06, 0.05]);
      gl!.uniform3f(uni.dark, dark[0], dark[1], dark[2]);
      if (mouse.x >= 0)
        gl!.uniform2f(
          uni.mouse,
          mouse.x * canvas!.width,
          mouse.y * canvas!.height
        );
      else gl!.uniform2f(uni.mouse, -1, -1);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    let raf = 0;
    function tick(now: number) {
      if (inView && !hidden) draw(now);
      raf = requestAnimationFrame(tick);
    }
    draw(0);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      reducedQuery?.removeEventListener?.('change', onReduced);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onOut);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform float u_waveSpeed;
uniform float u_sparkle;
uniform vec2 u_mouse;
uniform float u_density;
uniform vec3 u_theme;
uniform vec3 u_dark;

#define PI 3.14159265359
#define TAU 6.28318530718
#define SQRT3 1.7320508

float hash21(vec2 p) {
    p = fract(p * vec2(233.34, 851.73));
    p += dot(p, p + 23.45);
    return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
    float n = hash21(p);
    return vec2(n, hash21(p + n * 47.0));
}

vec4 hexTile(vec2 p, float scale) {
    p *= scale;
    vec2 s = vec2(1.0, SQRT3);
    vec2 halfS = s * 0.5;
    vec2 aBase = floor(p / s);
    vec2 aLocal = mod(p, s) - halfS;
    vec2 pOff = p - halfS;
    vec2 bBase = floor(pOff / s);
    vec2 bLocal = mod(pOff, s) - halfS;
    float dA = dot(aLocal, aLocal);
    float dB = dot(bLocal, bLocal);
    float pick = step(dA, dB);
    vec2 localCoord = mix(bLocal, aLocal, pick);
    vec2 cellId = mix(bBase + vec2(0.5), aBase, pick);
    return vec4(localCoord, cellId);
}

float waveField(vec2 cellPos, float t) {
    float w = 0.0;
    w += sin(dot(cellPos, vec2(0.7, 0.5)) * 3.5 - t * 2.8) * 0.35;
    w += sin(cellPos.x * 4.2 + t * 1.9) * 0.25;
    return w;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
    float t = u_time * u_waveSpeed;

    float dotScale = max(6.0, u_density);
    vec4 hex = hexTile(uv, dotScale);
    vec2 localPos = hex.xy;
    vec2 cellId = hex.zw;

    vec2 rnd = hash22(cellId);
    float sizeVar = 0.85 + rnd.x * 0.3;

    float discRadius = 0.35 * sizeVar;
    float dist = length(localPos);
    float disc = smoothstep(discRadius, discRadius - 0.08, dist);

    vec2 worldPos = cellId / dotScale;
    float wave = waveField(worldPos, t);

    float mouseSpec = 0.0;
    if (u_mouse.x >= 0.0) {
        vec2 mUV = (u_mouse - u_res * 0.5) / min(u_res.x, u_res.y);
        float mDist = length(uv - mUV);
        mouseSpec = exp(-mDist * mDist * 14.0) * 1.2;
    }

    vec3 darkDot = u_dark;
    vec3 hotGold = u_theme;

    float glowFactor = clamp(wave * 0.5 + 0.5, 0.0, 1.0);
    vec3 col = mix(darkDot, hotGold, glowFactor * 0.4 + mouseSpec);

    gl_FragColor = vec4(col * disc, disc * 0.7);
}
`;
