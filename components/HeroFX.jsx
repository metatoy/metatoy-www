"use client";
import { useEffect, useRef, useState } from "react";

// Hero background effects — ported from the woords-lab (Metal → WebGL/GLSL).
// Flag pattern (mirrors sorbcloud): query params select direction + debugger.
//   ?fx=photoelastic|moire|halftone|bloom   ·   ?fxdebug=1  (or ?debug=fx)
const VERT = `attribute vec2 p; void main(){ gl_Position=vec4(p,0.0,1.0); }`;
const HEAD = `precision highp float;
uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse;
uniform vec3 u_paper,u_ink,u_accent,u_green;
vec2 aspect(vec2 fc){ return (fc-0.5*u_res)/u_res.y; }`;

const FX = {
  // Lattice · PhotoelasticLoad — stress fringes from load points; one follows the mouse.
  photoelastic: `
  float stress(vec2 q, vec2 a, vec2 b, vec2 c){ float e=0.13;
    return 1.0/(length(q-a)+e)+1.0/(length(q-b)+e)+1.0/(length(q-c)+e); }
  void main(){
    vec2 st=aspect(gl_FragCoord.xy); float t=u_time;
    vec2 a=0.52*vec2(cos(t*0.27),sin(t*0.21+0.6));
    vec2 b=0.52*vec2(cos(t*0.17+2.2),sin(t*0.29+1.1));
    vec2 c=aspect(u_mouse*u_res);
    float s=stress(st,a,b,c);
    float fr=pow(cos(s*3.0)*0.5+0.5,1.5);
    vec3 col=mix(u_paper,u_ink,fr*0.9);
    col=mix(col,u_green,smoothstep(2.4,6.5,s)*fr*0.6);
    col=mix(col,u_accent,smoothstep(5.0,9.0,s)*0.35);
    gl_FragColor=vec4(col,1.0);
  }`,
  // Lattice · MoireLock — two rotating grids interfering; mouse shifts freq/angle.
  moire: `
  float grid(vec2 q,float f,float ang){ mat2 R=mat2(cos(ang),-sin(ang),sin(ang),cos(ang)); return sin((R*q).x*f); }
  void main(){
    vec2 st=aspect(gl_FragCoord.xy); vec2 mo=aspect(u_mouse*u_res);
    float g1=grid(st,54.0,0.0);
    float g2=grid(st,54.0+7.0*sin(u_time*0.2)+mo.x*26.0,0.12+0.18*sin(u_time*0.13)+mo.y*0.4);
    float m=smoothstep(0.42,0.58,g1*g2*0.5+0.5);
    vec3 col=mix(u_paper,u_ink,m*0.85);
    float band=smoothstep(0.02,0.0,abs(fract((st.y-mo.y)*3.0+u_time*0.1)-0.5)-0.46);
    col=mix(col,u_accent,band*0.5);
    gl_FragColor=vec4(col,1.0);
  }`,
  // Film · HalftoneDot — halftone whose dot radius is a ripple field from the mouse.
  halftone: `
  void main(){
    vec2 st=aspect(gl_FragCoord.xy);
    vec2 mc=clamp(u_mouse, vec2(0.18), vec2(0.82)); // bound focal point: mouse can't push the field off-canvas
    vec2 mo=aspect(mc*u_res);
    float d=length(st-mo);
    float field=(0.5+0.5*sin(u_time*0.9-d*16.0))*smoothstep(1.7,0.1,d);
    float cs=u_res.y/40.0; vec2 gv=fract(gl_FragCoord.xy/cs)-0.5;
    float r=field*0.62; float ink=smoothstep(r,r-0.08,length(gv));
    vec3 dotc=mix(u_ink,u_accent,smoothstep(0.4,0.9,field));
    gl_FragColor=vec4(mix(u_paper,dotc,ink),1.0);
  }`,
  // Cells · Chromatograph — radial colour blooms bleeding from seeds + mouse.
  bloom: `
  float bl(vec2 q,vec2 s,float k){ return exp(-length(q-s)*k); }
  void main(){
    vec2 st=aspect(gl_FragCoord.xy); float t=u_time;
    vec2 s0=aspect(u_mouse*u_res);
    vec2 s1=0.55*vec2(cos(t*0.31),sin(t*0.24+1.0));
    vec2 s2=0.55*vec2(cos(t*0.2+2.4),sin(t*0.35+0.3));
    float g=bl(st,s0,2.0)+0.9*bl(st,s1,2.2);
    float o=0.9*bl(st,s2,2.2)+0.55*bl(st,s0,3.6);
    float f=g+o; float ring=0.62+0.38*sin(f*7.0-t*1.2);
    vec3 col=u_paper;
    col=mix(col,u_green,clamp(g,0.0,1.0)*ring);
    col=mix(col,u_accent,clamp(o,0.0,1.0)*ring);
    col=mix(col,u_ink,smoothstep(1.0,1.9,f)*0.22);
    gl_FragColor=vec4(col,1.0);
  }`,
};
const ORDER = ["photoelastic", "moire", "halftone", "bloom"];

function cssRGB(name, fallback) {
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    let m = v.match(/^#?([0-9a-f]{6})$/i);
    if (m) { const n = parseInt(m[1], 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }
    m = v.match(/rgba?\(([^)]+)\)/);
    if (m) { const a = m[1].split(",").map(Number); return [a[0] / 255, a[1] / 255, a[2] / 255]; }
  } catch (e) {}
  const n = parseInt(fallback, 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}

export default function HeroFX() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const mouse = useRef([0.7, 0.42]);   // target (cursor)
  const smooth = useRef([0.7, 0.42]);  // eased position that lags toward the target
  const [dir, setDir] = useState("photoelastic");
  const [debug, setDebug] = useState(false);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const f = q.get("fx");
    if (f && FX[f]) setDir(f);
    else setDir(ORDER[Math.floor(Math.random() * ORDER.length)]); // random direction when no ?fx=
    if (q.get("fxdebug") != null || q.get("debug") === "fx") setDebug(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const gl = canvas.getContext("webgl", { antialias: true, premultipliedAlpha: false });
    if (!gl) { wrap.classList.add("fx-nogl"); return; }

    const mk = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn("[HeroFX]", gl.getShaderInfoLog(s)); return null; } return s; };
    const vs = mk(gl.VERTEX_SHADER, VERT), fs = mk(gl.FRAGMENT_SHADER, HEAD + FX[dir]);
    if (!vs || !fs) { wrap.classList.add("fx-nogl"); return; }
    const pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr); gl.useProgram(pr);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(pr, n);
    const uT = U("u_time"), uR = U("u_res"), uM = U("u_mouse");
    gl.uniform3fv(U("u_paper"), cssRGB("--color-paper", "f4ede0"));
    gl.uniform3fv(U("u_ink"), cssRGB("--color-ink", "2b2b2b"));
    gl.uniform3fv(U("u_accent"), cssRGB("--color-blaze-orange", "f26722"));
    gl.uniform3fv(U("u_green"), cssRGB("--s-green", "35ff6a"));

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => { const r = wrap.getBoundingClientRect();
      canvas.width = Math.max(2, r.width * dpr); canvas.height = Math.max(2, r.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(uR, canvas.width, canvas.height); };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(wrap);

    const onMove = (e) => { const r = wrap.getBoundingClientRect();
      mouse.current = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height]; };
    window.addEventListener("pointermove", onMove);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf, start = performance.now(), last = start, frames = 0, lastFps = start;
    const draw = (now) => {
      const t = (now - start) / 1000;
      gl.uniform1f(uT, reduce ? 2.0 : t);
      // slow follow: ease the eased point toward the cursor rather than snapping to it
      const ez = reduce ? 1 : 0.04;
      smooth.current[0] += (mouse.current[0] - smooth.current[0]) * ez;
      smooth.current[1] += (mouse.current[1] - smooth.current[1]) * ez;
      gl.uniform2f(uM, smooth.current[0], smooth.current[1]); // normalized 0..1 (shader scales by u_res)
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frames++; if (now - lastFps > 500) { setFps(Math.round((frames * 1000) / (now - lastFps))); frames = 0; lastFps = now; }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    if (reduce) draw(start); else raf = requestAnimationFrame(draw);

    // NOTE: do not loseContext() here — cleanup runs on every direction switch, and killing the
    // context would blank all subsequent directions. Reuse the one context; just stop the old loop.
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("pointermove", onMove); };
  }, [dir]);

  return (
    <div className="hero-fx" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
      {debug && (
        <div className="fx-debug">
          <div className="fx-dbg-h">HeroFX · debug</div>
          <div className="fx-dirs">
            {ORDER.map((d) => (
              <button key={d} className={d === dir ? "on" : ""} onClick={() => setDir(d)}>{d}</button>
            ))}
          </div>
          <div className="fx-stat">{fps} fps · {dir}</div>
          <div className="fx-stat">?fx={dir}</div>
        </div>
      )}
    </div>
  );
}
