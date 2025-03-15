"use client";

import React, { useRef, useEffect, useState } from "react";
import { Shield, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth < 768);
    };

    updateCanvasSize();

    let particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      scatteredColor: string;
      life: number;
      isSecondWord: boolean;
    }[] = [];

    let textImageData: ImageData | null = null;

    function createTextImage() {
      if (!ctx || !canvas) return 0;

      ctx.fillStyle = "black";
      ctx.save();

      const fontSize = isMobile ? 40 : 80;
      ctx.font = `bold ${fontSize}px sans-serif`;

      const text1 = "FAKE";
      const text2 = "WORLD";
      const text1Metrics = ctx.measureText(text1);
      const text2Metrics = ctx.measureText(text2);

      const textSpacing = isMobile ? 20 : 40;
      const totalWidth = text1Metrics.width + text2Metrics.width + textSpacing;

      const startX = canvas.width / 2 - totalWidth / 2;
      const startY = canvas.height / 4 + fontSize / 3;

      ctx.fillText(text1, startX, startY);
      ctx.fillText(text2, startX + text1Metrics.width + textSpacing, startY);

      ctx.restore();

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      return fontSize / 20;
    }

    function createParticle() {
      if (!ctx || !canvas || !textImageData) return null;

      const data = textImageData.data;

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          const text1 = "FAKE";
          const text2 = "WORLD";
          const fontSize = isMobile ? 40 : 80;
          ctx.font = `bold ${fontSize}px sans-serif`;
          const text1Width = ctx.measureText(text1).width;
          const textSpacing = isMobile ? 20 : 40;
          const totalWidth =
            text1Width + ctx.measureText(text2).width + textSpacing;
          const centerX = canvas.width / 2;
          const isSecondWord =
            x >= centerX - totalWidth / 2 + text1Width + textSpacing;

          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "black",
            scatteredColor: isSecondWord ? "#333333" : "#666666",
            isSecondWord: isSecondWord,
            life: Math.random() * 100 + 50,
          };
        }
      }

      return null;
    }

    function createInitialParticles() {
      const baseParticleCount = 7000;
      const particleCount = Math.floor(
        baseParticleCount *
          Math.sqrt(
            ((canvas?.width || 0) * (canvas?.height || 0)) / (1920 * 1080)
          )
      );
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        if (particle) particles.push(particle);
      }
    }

    let animationFrameId: number;

    function animate(scale: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      const maxDistance = 240;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (
          distance < maxDistance &&
          (isTouchingRef.current || !("ontouchstart" in window))
        ) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * 60;
          const moveY = Math.sin(angle) * force * 60;
          p.x = p.baseX - moveX;
          p.y = p.baseY - moveY;

          ctx.fillStyle = p.scatteredColor;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
          ctx.fillStyle = "black";
        }

        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.life--;
        if (p.life <= 0) {
          const newParticle = createParticle();
          if (newParticle) {
            particles[i] = newParticle;
          } else {
            particles.splice(i, 1);
            i--;
          }
        }
      }

      const baseParticleCount = 7000;
      const targetParticleCount = Math.floor(
        baseParticleCount *
          Math.sqrt(
            ((canvas?.width || 0) * (canvas?.height || 0)) / (1920 * 1080)
          )
      );
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle();
        if (newParticle) particles.push(newParticle);
      }

      animationFrameId = requestAnimationFrame(() => animate(scale));
    }

    const scale = createTextImage();
    createInitialParticles();
    animate(scale);

    const handleResize = () => {
      updateCanvasSize();
      createTextImage();
      particles = [];
      createInitialParticles();
    };

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = () => {
      isTouchingRef.current = true;
    };

    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      mousePositionRef.current = { x: 0, y: 0 };
    };

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="relative w-full h-dvh bg-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-full z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          aria-label="Interactive particle effect with FAKE WORLD text"
        />
      </div>

      <div className="absolute top-6 left-0 right-0 flex justify-center z-20">
        <div className="inline-flex items-center rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white ring-1 ring-inset ring-black/30">
          <Shield className="mr-2 h-4 w-4" /> For testing purposes only
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pb-16">
        <div className="flex flex-col items-center space-y-8 max-w-md">
          <p className="font-mono text-neutral-700 text-base text-center">
            Welcome to the Fake World generator experience
          </p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/fake-id"
                className="inline-flex items-center text-sm justify-center px-6 py-1.5 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-black rounded-full hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Fake ID
              </Link>
              <Link
                href="/fake-passport"
                className="inline-flex items-center text-sm justify-center px-6 py-1.5 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-black rounded-full hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Fake Passport
              </Link>
            </div>
          </div>
          <div className="border-t border-neutral-500"></div>
          <div className="flex items-center text-sm text-neutral-700 font-medium bg-neutral-100 px-4 py-2 rounded-lg border border-neutral-200 max-w-md">
            <AlertTriangle className="mr-2 h-4 w-4 text-red-500 flex-shrink-0" />
            <span>
              For educational purposes only. Do not use for illegal activities.
            </span>
          </div>

          <div className="flex items-center text-sm py-2 text-center justify-center">
            This was Inspired by the work of
            <a
              href="https://chris927.github.io/generate-sa-idnumbers/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 ml-1 underline"
            >
              chris927
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
