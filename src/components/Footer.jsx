import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-zinc-400 flex flex-col md:flex-row items-center gap-2 md:gap-6">
        <span>© {new Date().getFullYear()} PeerLearn Pro</span>
        <span className="opacity-60">Cosmos edition • Built with React, Tailwind & three.js</span>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="ml-auto hover:text-white">GitHub</a>
      </div>
    </footer>
  )
}
