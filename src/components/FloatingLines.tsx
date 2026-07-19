"use client";

import { useEffect, useRef } from "react";
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import type { IUniform } from "three";
import "./FloatingLines.css";

const DEFAULT_GRADIENT = ["#ffffff", "#e3b7f5", "#ad20d5", "#ffffff"];
const DEFAULT_COUNTS = [6, 10, 14];
const DEFAULT_DISTANCES = [8, 6, 4];

const vertexShader = `void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragmentShader = `
precision mediump float;
uniform float iTime; uniform vec3 iResolution; uniform float animationSpeed;
uniform vec2 iMouse; uniform bool interactive; uniform float bendRadius; uniform float bendStrength; uniform float bendInfluence;
uniform vec3 lineGradient[8]; uniform int lineGradientCount;
uniform int topLineCount; uniform int middleLineCount; uniform int bottomLineCount;
uniform float topLineDistance; uniform float middleLineDistance; uniform float bottomLineDistance;
uniform vec3 topWavePosition; uniform vec3 middleWavePosition; uniform vec3 bottomWavePosition;
mat2 rot(float r){return mat2(cos(r),sin(r),-sin(r),cos(r));}
vec3 colorAt(float t){if(lineGradientCount==0)return vec3(1.0);float s=clamp(t,0.,.9999)*float(lineGradientCount-1);int i=int(floor(s));return mix(lineGradient[i],lineGradient[min(i+1,lineGradientCount-1)],fract(s));}
float wave(vec2 uv,float off,vec2 screen,vec2 mouse,bool bend){float time=iTime*animationSpeed;float amp=sin(off+time*.2)*.3;float y=sin(uv.x+off+time*.1)*amp;if(bend){vec2 d=screen-mouse;float inf=exp(-dot(d,d)*bendRadius);y+=(mouse.y-screen.y)*inf*bendStrength*bendInfluence;}float m=uv.y-y;return .0175/max(abs(m)+.01,1e-3)+.01;}
void main(){vec2 uv=(2.*gl_FragCoord.xy-iResolution.xy)/iResolution.y;uv.y*=-1.;vec2 mouse=interactive?vec2((2.*iMouse.x-iResolution.x)/iResolution.y,(2.*iMouse.y-iResolution.y)/iResolution.y):vec2(0.);vec3 col=vec3(0.);for(int i=0;i<24;i++){float fi=float(i);if(i<topLineCount){float t=fi/max(float(topLineCount-1),1.);vec2 p=uv*rot(topWavePosition.z*log(length(uv)+1.));p.x*=-1.;col+=colorAt(t)*wave(p+vec2(topLineDistance*fi+topWavePosition.x,topWavePosition.y),1.+.2*fi,uv,mouse,interactive)*.12;}if(i<middleLineCount){float t=fi/max(float(middleLineCount-1),1.);vec2 p=uv*rot(middleWavePosition.z*log(length(uv)+1.));col+=colorAt(t)*wave(p+vec2(middleLineDistance*fi+middleWavePosition.x,middleWavePosition.y),2.+.15*fi,uv,mouse,interactive)*.48;}if(i<bottomLineCount){float t=fi/max(float(bottomLineCount-1),1.);vec2 p=uv*rot(bottomWavePosition.z*log(length(uv)+1.));col+=colorAt(t)*wave(p+vec2(bottomLineDistance*fi+bottomWavePosition.x,bottomWavePosition.y),1.5+.2*fi,uv,mouse,interactive)*.2;}}gl_FragColor=vec4(col,1.);}`;

type FloatingLinesProps = {
  linesGradient?: string[];
  lineCount?: number | number[];
  lineDistance?: number | number[];
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
};

function hexToVector(value: string) {
  const cleaned = value.replace("#", "");
  const expanded = cleaned.length === 3 ? cleaned.split("").map((char) => char + char).join("") : cleaned;
  const color = Number.parseInt(expanded, 16);
  return new Vector3(((color >> 16) & 255) / 255, ((color >> 8) & 255) / 255, (color & 255) / 255);
}

export default function FloatingLines({
  linesGradient = DEFAULT_GRADIENT,
  lineCount = DEFAULT_COUNTS,
  lineDistance = DEFAULT_DISTANCES,
  animationSpeed = 0.42,
  interactive = false,
  bendRadius = 5,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  mixBlendMode = "screen",
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCompact = window.innerWidth < 780 || (navigator.hardwareConcurrency ?? 8) <= 4;
    // This is a decorative full-viewport shader; keeping it at 30fps leaves
    // enough GPU headroom for Lenis, layout, and input while preserving the
    // perceived motion of the lines.
    const targetFps = 30;
    const frameInterval = 1000 / targetFps;
    const counts = Array.isArray(lineCount) ? lineCount : [lineCount, lineCount, lineCount];
    const distances = Array.isArray(lineDistance) ? lineDistance : [lineDistance, lineDistance, lineDistance];
    const effectiveCounts = isCompact ? counts.map((count) => Math.max(3, Math.round(count * 0.62))) : counts;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    container.appendChild(renderer.domElement);

    const gradient = Array.from({ length: 8 }, (_, index) =>
      hexToVector(linesGradient[index] || linesGradient.at(-1) || "#fff")
    );
    const uniforms: Record<string, IUniform> = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: animationSpeed },
      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: interactive && !isCompact && !reducedMotion },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },
      lineGradient: { value: gradient },
      lineGradientCount: { value: Math.min(linesGradient.length, 8) },
      topLineCount: { value: effectiveCounts[0] || 0 },
      middleLineCount: { value: effectiveCounts[1] || 0 },
      bottomLineCount: { value: effectiveCounts[2] || 0 },
      topLineDistance: { value: (distances[0] || 4) * 0.01 },
      middleLineDistance: { value: (distances[1] || 4) * 0.01 },
      bottomLineDistance: { value: (distances[2] || 4) * 0.01 },
      topWavePosition: { value: new Vector3(10, 0.5, -0.4) },
      middleWavePosition: { value: new Vector3(5, 0, 0.2) },
      bottomWavePosition: { value: new Vector3(2, -0.7, 0.4) },
    };

    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const geometry = new PlaneGeometry(2, 2);
    scene.add(new Mesh(geometry, material));

    const targetMouse = new Vector2(-1000, -1000);
    const currentMouse = new Vector2(-1000, -1000);
    let targetInfluence = 0;
    let currentInfluence = 0;
    let animationFrame = 0;
    let scrollResumeTimer: number | null = null;
    let lastFrame = 0;
    let elapsed = 0;
    let lastTick = performance.now();

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
      renderer.setSize(width, height, false);
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1);
    };

    const pointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const dpr = renderer.getPixelRatio();
      targetMouse.set((event.clientX - rect.left) * dpr, (rect.bottom - event.clientY) * dpr);
      targetInfluence = 1;
    };
    const pointerLeave = () => { targetInfluence = 0; };

    const render = (now: number) => {
      if (document.hidden) return;
      animationFrame = requestAnimationFrame(render);
      if (now - lastFrame < frameInterval) return;
      const delta = Math.min(50, now - lastTick);
      lastTick = now;
      lastFrame = now - ((now - lastFrame) % frameInterval);
      elapsed += delta / 1000;
      uniforms.iTime.value = elapsed;
      if (uniforms.interactive.value) {
        currentMouse.lerp(targetMouse, mouseDamping);
        uniforms.iMouse.value.copy(currentMouse);
        currentInfluence += (targetInfluence - currentInfluence) * mouseDamping;
        uniforms.bendInfluence.value = currentInfluence;
      }
      renderer.render(scene, camera);
    };

    const start = () => {
      cancelAnimationFrame(animationFrame);
      lastTick = performance.now();
      if (reducedMotion) renderer.render(scene, camera);
      else animationFrame = requestAnimationFrame(render);
    };
    const onScroll = () => {
      if (!isCompact || reducedMotion) return;
      cancelAnimationFrame(animationFrame);
      if (scrollResumeTimer) window.clearTimeout(scrollResumeTimer);
      scrollResumeTimer = window.setTimeout(() => {
        start();
      }, 120);
    };
    const visibilityChange = () => { if (!document.hidden) start(); };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    if (uniforms.interactive.value) {
      window.addEventListener("pointermove", pointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", pointerLeave);
    }
    document.addEventListener("visibilitychange", visibilityChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    start();

    return () => {
      cancelAnimationFrame(animationFrame);
      if (scrollResumeTimer) window.clearTimeout(scrollResumeTimer);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", pointerMove);
      document.documentElement.removeEventListener("pointerleave", pointerLeave);
      document.removeEventListener("visibilitychange", visibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [animationSpeed, bendRadius, bendStrength, interactive, lineCount, lineDistance, linesGradient, mouseDamping]);

  return <div ref={containerRef} className="floating-lines-container" style={{ mixBlendMode }} aria-hidden="true" />;
}
