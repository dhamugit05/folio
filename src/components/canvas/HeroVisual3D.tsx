import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const HeroVisual3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const theme = usePortfolioStore((s) => s.theme);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 420;

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
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 7.5);

    const isDark = theme === 'dark';
    const mainColor = isDark ? 0x22d3ee : 0x6366f1;
    const accentColor = isDark ? 0x8b5cf6 : 0xec4899;

    // Group for procedural multi-part artifact
    const artifactGroup = new THREE.Group();

    // 1. Outer wireframe icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.22,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    artifactGroup.add(outerMesh);

    // 2. Inner solid octahedron with metallic sheen
    const innerGeo = new THREE.OctahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    artifactGroup.add(innerMesh);

    // 3. Floating orbital ring
    const ringGeo = new THREE.TorusGeometry(3.1, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      transparent: true,
      opacity: isDark ? 0.45 : 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    artifactGroup.add(ringMesh);

    scene.add(artifactGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(mainColor, isDark ? 2 : 1.5, 20);
    pointLight.position.set(4, 5, 4);
    scene.add(pointLight);

    let animationFrameId = 0;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      if (!isVisible || reducedMotion) {
        if (renderer) renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      artifactGroup.rotation.y += 0.005;
      artifactGroup.rotation.x += 0.0025;
      innerMesh.rotation.y -= 0.008;
      ringMesh.rotation.z += 0.004;

      if (renderer) {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 420;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [theme, reducedMotion]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10 w-full h-full flex items-center justify-center pointer-events-none opacity-70 dark:opacity-90"
      aria-hidden="true"
    />
  );
};
