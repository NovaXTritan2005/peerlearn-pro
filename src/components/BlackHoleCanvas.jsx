import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BlackHoleCanvas() {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const animationRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 40, 200)

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 1.2, 8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambient = new THREE.AmbientLight(0x555577, 0.6)
    const point = new THREE.PointLight(0x7788ff, 2.0, 50)
    point.position.set(6, 3, 6)
    scene.add(ambient, point)

    // Stars field
    const starGeom = new THREE.BufferGeometry()
    const starCount = 1200
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 80 * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i*3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i*3+2] = r * Math.cos(phi)
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015 })
    const stars = new THREE.Points(starGeom, starMat)
    scene.add(stars)

    // Black hole core (rendered as a very dark sphere)
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1.0, metalness: 0.0 })
    )
    scene.add(core)

    // Accretion disk (emissive torus)
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(2.3, 0.5, 48, 256),
      new THREE.MeshStandardMaterial({
        color: 0x2233ff,
        emissive: 0x6677ff,
        emissiveIntensity: 2.0,
        roughness: 0.4,
        metalness: 0.6
      })
    )
    torus.rotation.x = Math.PI / 2.4
    scene.add(torus)

    // Subtle dust ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.12, 16, 256),
      new THREE.MeshBasicMaterial({ color: 0x99aaff, transparent: true, opacity: 0.2 })
    )
    ring.rotation.x = Math.PI / 2.4
    scene.add(ring)

    // Animate
    const tick = () => {
      torus.rotation.z += 0.0045
      ring.rotation.z -= 0.002
      stars.rotation.y += 0.0008
      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      const { clientWidth, clientHeight } = container
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', onResize)
      if (renderer) {
        renderer.dispose()
        container.removeChild(renderer.domElement)
      }
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose?.()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose?.())
          else obj.material.dispose?.()
        }
        if (obj.texture) obj.texture.dispose?.()
      })
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" />
}
