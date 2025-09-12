import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Rocket, Star, Gauge, Boxes, Phone } from 'lucide-react'

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
          <Rocket size={22} /><span>PeerLearn Pro</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1">
          <NavItem to="/"><span className="inline-flex items-center gap-2"><Star size={18}/>Home</span></NavItem>
          <NavItem to="/pods"><span className="inline-flex items-center gap-2"><Boxes size={18}/>Pods</span></NavItem>
          <NavItem to="/dashboard"><span className="inline-flex items-center gap-2"><Gauge size={18}/>Dashboard</span></NavItem>
          <NavItem to="/projects">Projects</NavItem>
          <NavItem to="/contact"><span className="inline-flex items-center gap-2"><Phone size={18}/>Contact</span></NavItem>
        </nav>
      </div>
    </header>
  )
}
