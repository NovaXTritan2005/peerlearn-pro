import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

/**
 * CosmicBackground - Warp-speed star-streak shader with fallback
 * Features real-time "warp-speed space travel" background with hyper-realistic star-streak shader
 */
export default function CosmicBackground({ intensity = 1.0, speed = 1.0 }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const isPageVisible = useRef(true);

  // Warp-speed vertex shader
  const vertexShader = useMemo(() => `
    uniform float time;
    uniform float speed;
    attribute float size;
    attribute vec3 velocity;
    varying float vAlpha;
    
    void main() {
      vec3 pos = position;
      
      // Warp effect - stretch stars along Z axis based on velocity
      float warpFactor = speed * 0.1;
      pos += velocity * time * warpFactor;
      
      // Calculate distance for fading
      float dist = length(pos.xy);
      vAlpha = 1.0 - smoothstep(20.0, 50.0, dist);
      
      // Size based on distance and velocity
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + length(velocity) * 0.1);
      gl_Position = projectionMatrix * mvPosition;
    }
  `, []);

  // Warp-speed fragment shader
  const fragmentShader = useMemo(() => `
    uniform float time;
    uniform float intensity;
    varying float vAlpha;
    
    void main() {
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);
      
      if (dist > 0.5) discard;
      
      // Star glow effect
      float alpha = (1.0 - dist * 2.0) * vAlpha * intensity;
      vec3 color = vec3(0.8, 0.9, 1.0) + vec3(0.2, 0.1, 0.4) * sin(time * 2.0 + dist * 10.0);
      
      gl_FragColor = vec4(color, alpha);
    }
  `, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { clientWidth, clientHeight } = container;

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      // Fallback to CSS gradient
      container.style.background = `
        radial-gradient(ellipse at center, 
          rgba(30, 27, 75, 0.8) 0%, 
          rgba(15, 10, 40, 0.9) 40%, 
          rgba(5, 5, 15, 1) 100%
        ),
        linear-gradient(45deg, 
          rgba(75, 0, 130, 0.1) 0%, 
          rgba(25, 25, 112, 0.1) 50%, 
          rgba(0, 0, 0, 1) 100%
        )
      `;
      return;
    }

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, clientWidth / clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create star field geometry
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      // Distribute stars in a cylinder around the camera
      const i3 = i * 3;
      const radius = Math.random() * 50 + 10;
      const angle = Math.random() * Math.PI * 2;
      
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = Math.sin(angle) * radius;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;
      
      // Velocity for warp streaks
      velocities[i3] = Math.cos(angle) * 0.1;
      velocities[i3 + 1] = Math.sin(angle) * 0.1;
      velocities[i3 + 2] = -Math.random() * 2 - 1;
      
      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for warp effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        speed: { value: speed },
        intensity: { value: intensity }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      if (!isPageVisible.current) {
        // Throttle to 10 FPS when tab is hidden
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animate);
        }, 100);
        return;
      }

      const elapsedTime = clock.getElapsedTime();
      
      // Update shader uniforms
      material.uniforms.time.value = elapsedTime;
      material.uniforms.speed.value = speed;
      material.uniforms.intensity.value = intensity;
      
      // Rotate the entire star field slightly
      stars.rotation.z += 0.0002 * speed;
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    // Handle visibility change for performance
    const handleVisibilityChange = () => {
      isPageVisible.current = !document.hidden;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (renderer && container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [intensity, speed, vertexShader, fragmentShader]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(30, 27, 75, 0.3) 0%, rgba(15, 10, 40, 0.7) 40%, rgba(5, 5, 15, 1) 100%)'
      }}
    />
  );
}