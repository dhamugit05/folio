import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const SceneBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = usePortfolioStore((s) => s.theme);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect software WebGL to cap performance
    const isSoftwareGl = (() => {
      try {
        const testGl = document.createElement('canvas').getContext('webgl2');
        if (!testGl) return true;
        const ext = testGl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : testGl.RENDERER;
        const gpu = String(testGl.getParameter(param));
        testGl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 25;

    // Create background particle field
    const count = isSoftwareGl ? 200 : 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      scales[i] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const isDark = theme === 'dark';
    const primaryColor = isDark ? 0x22d3ee : 0x6366f1;

    const material = new THREE.PointsMaterial({
      color: primaryColor,
      size: isDark ? 0.35 : 0.25,
      transparent: true,
      opacity: isDark ? 0.55 : 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationFrameId = 0;
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!isTabVisible || reducedMotion) {
        if (renderer) renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      particles.rotation.y += 0.0006;
      particles.rotation.x += 0.0003;

      if (renderer) {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      geometry.dispose();
      material.dispose();
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [theme, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
