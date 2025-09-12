import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pods from './pages/Pods'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cosmic-900">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pods" element={<Pods />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
