"use client";

import { useEffect, useRef } from "react";

/**
 * ReagentField — a dependency-free WebGL metaball field rendered as slowly
 * drifting "reagent" blobs in chemical-indicator colors on lab paper, with
 * an ink isoline drawn at the field threshold. One blob follows the cursor.
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

const vec3 PAPER  = vec3(0.965, 0.949, 0.914);
const vec3 INK    = vec3(0.086, 0.075, 0.055);
const vec3 LITMUS = vec3(0.894, 0.341, 0.180);
const vec3 PETRI  = vec3(0.055, 0.486, 0.420);
const vec3 CUSOF  = vec3(0.169, 0.314, 0.667);
const vec3 PHENOL = vec3(0.910, 0.290, 0.451);
const vec3 FLAME  = vec3(0.949, 0.639, 0.235);

float ball(vec2 uv, vec2 c, float r) {
  vec2 d = uv - c;
  return (r * r) / (dot(d, d) + 1e-5);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  uv.x *= aspect;
  float t = u_time * 0.14;

  vec2 c1 = vec2(0.28 * aspect + 0.16 * sin(t * 0.9),        0.62 + 0.14 * cos(t * 0.7));
  vec2 c2 = vec2(0.72 * aspect + 0.20 * cos(t * 0.6 + 2.1),  0.40 + 0.18 * sin(t * 0.8 + 1.3));
  vec2 c3 = vec2(0.50 * aspect + 0.24 * sin(t * 0.5 + 4.2),  0.75 + 0.12 * cos(t * 1.1 + 0.4));
  vec2 c4 = vec2(0.16 * aspect + 0.12 * cos(t * 0.8 + 1.0),  0.24 + 0.15 * sin(t * 0.6 + 2.6));
  vec2 c5 = vec2(0.86 * aspect + 0.12 * sin(t * 0.7 + 3.3),  0.80 + 0.13 * cos(t * 0.9 + 5.0));
  vec2 cm = vec2(u_mouse.x * aspect, u_mouse.y);

  float f1 = ball(uv, c1, 0.052);
  float f2 = ball(uv, c2, 0.064);
  float f3 = ball(uv, c3, 0.046);
  float f4 = ball(uv, c4, 0.040);
  float f5 = ball(uv, c5, 0.044);
  float fm = ball(uv, cm, 0.036);

  float F = f1 + f2 + f3 + f4 + f5 + fm;

  vec3 tint = (f1 * LITMUS + f2 * PETRI + f3 * PHENOL + f4 * CUSOF + f5 * FLAME + fm * LITMUS)
            / max(F, 1e-4);

  /* interior wash — kept faint so type stays legible */
  float body = smoothstep(1.0, 1.9, F);
  vec3 col = mix(PAPER, mix(PAPER, tint, 0.16), body);

  /* ink isoline at the threshold — like a contour on a lab chart */
  float line = smoothstep(0.965, 1.0, F) * (1.0 - smoothstep(1.0, 1.04, F));
  col = mix(col, mix(INK, tint, 0.3), line * 0.45);

  /* faint second contour further out */
  float halo = smoothstep(0.62, 0.65, F) * (1.0 - smoothstep(0.65, 0.685, F));
  col = mix(col, INK, halo * 0.08);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function ReagentField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, depth: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let raf = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width * dpr));
      height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      mouse.ty = 1 - (e.clientY - rect.top) / Math.max(rect.height, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    const frame = () => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
