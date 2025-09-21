import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Telescope, Home, Database, Gauge, BookOpen, Mail } from 'lucide-react'
import { nav } from '../content'

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({isActive}) => `px-3 py-2 rounded-lg transition ${isActive ? 'bg-white/10 text-white' : 'text-zinc-300 hover:text-white hover:bg-white/5'}`}
  >
    {children}
  </NavLink>
)

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-black/30 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <Telescope size={22} className="text-indigo-400" />
          <span>Cosmic Research Lab</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1">
          <NavItem to="/">
            <span className="inline-flex items-center gap-2">
              <Home size={18}/>{nav.home}
            </span>
          </NavItem>
          <NavItem to="/index">
            <span className="inline-flex items-center gap-2">
              <Database size={18}/>{nav.researchIndex}
            </span>
          </NavItem>
          <NavItem to="/dashboard">
            <span className="inline-flex items-center gap-2">
              <Gauge size={18}/>{nav.dashboard}
            </span>
          </NavItem>
          <NavItem to="/methodology">
            <span className="inline-flex items-center gap-2">
              <BookOpen size={18}/>{nav.methodology}
            </span>
          </NavItem>
          <NavItem to="/about">
            <span className="inline-flex items-center gap-2">
              <Mail size={18}/>{nav.about}
            </span>
          </NavItem>
        </nav>
      </div>
    </header>
  )
}
