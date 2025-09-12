import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import BlackHoleCanvas from '../components/BlackHoleCanvas'
import Card from '../components/Card'

export default function Home(){
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* 3D Background */}
      <BlackHoleCanvas />

      {/* Gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:py-28">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
        >
          Build skills together. <span className="text-indigo-300">Launch your future.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-2xl text-lg text-zinc-300"
        >
          PeerLearn Pro is a cosmos-themed peer learning platform. Join focused Pods, track deep work, run micro-challenges, and showcase real projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a href="#/pods" className="btn-neon bg-indigo-600 hover:bg-indigo-500 inline-flex items-center gap-2">
            <Sparkles size={18}/> Explore Pods
          </a>
          <a href="#/dashboard" className="btn-neon bg-white/10 hover:bg-white/20 inline-flex items-center gap-2">
            <Play size={18}/> View Dashboard
          </a>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <Card title="Nova x Tritan" subtitle="Flagship project">
            <p>End-to-end platform addressing students’ root problems: structure, accountability, and high-quality feedback. From curated playbooks to mentorship loops.</p>
          </Card>
          <Card title="Daily Sprints" subtitle="2×25 Focus">
            <p>Pomodoro-style deep work with streak freeze. Intent + outcome logging keeps you honest and reflective.</p>
          </Card>
          <Card title="Show, don’t tell" subtitle="Portfolio-first">
            <p>Ship projects. Publish dashboards. Apply to internships with proof, not promises.</p>
          </Card>
        </div>

        <div className="mt-10">
          <a href="https://github.com/NovaXTritan/peerlearn-pro" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white">
            <ArrowRight size={18}/> View source on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
