import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import EinsteinIntro from './components/EinsteinIntro'
import Home from './pages/Home'
import ResearchIndex from './pages/ResearchIndex'
import Dashboard from './pages/Dashboard'
import Methodology from './pages/Methodology'
import About from './pages/About'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cosmic-900">
      <EinsteinIntro />
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<ResearchIndex />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
