import React from 'react'
import { motion } from 'framer-motion'
import { Database, BarChart3, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CosmicBackground from '../components/CosmicBackground'
import Card from '../components/Card'
import { home } from '../content'

export default function Home(){
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* 3D Background */}
      <CosmicBackground intensity={1.0} speed={1.0} />

      {/* Gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            <span className="text-white">{home.hero.title}</span><br/>
            <span className="text-indigo-300">{home.hero.subtitle}</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-xl text-zinc-300 leading-relaxed">
            {home.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/index" 
              className="btn-neon bg-indigo-600 hover:bg-indigo-500 inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <Database size={22}/>
              {home.hero.ctaPrimary}
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/dashboard" 
              className="btn-neon bg-white/10 hover:bg-white/20 inline-flex items-center gap-2 px-8 py-4 text-lg"
            >
              <BarChart3 size={22}/>
              {home.hero.ctaSecondary}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-center mb-10 text-white">
            {home.preview.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card 
              title={home.preview.researchCard.title} 
              subtitle={home.preview.researchCard.subtitle}
            >
              <p className="text-gray-300 mb-4">
                {home.preview.researchCard.description}
              </p>
              <Link 
                to="/index" 
                className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-medium"
              >
                Explore Research Index <ArrowRight size={16} />
              </Link>
            </Card>
            
            <Card 
              title={home.preview.dashboardCard.title} 
              subtitle={home.preview.dashboardCard.subtitle}
            >
              <p className="text-gray-300 mb-4">
                {home.preview.dashboardCard.description}
              </p>
              <Link 
                to="/dashboard" 
                className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-medium"
              >
                Open Dashboard <ArrowRight size={16} />
              </Link>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500">
            Built with React, Vite, Three.js, and Plotly.js • Powered by advanced data visualization
          </p>
        </motion.div>
      </div>
    </section>
  )
}