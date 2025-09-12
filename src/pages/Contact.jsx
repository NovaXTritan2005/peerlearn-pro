import React from 'react'
import Card from '../components/Card'

export default function Contact(){
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Contact</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Say hi" subtitle="Open for collaborations">
          <p>For research, internships, or partnerships, drop a note. This form is local-only for demo; wire to your backend when ready.</p>
          <form className="mt-4 grid gap-3">
            <input className="glass px-4 py-3" placeholder="Your name" />
            <input type="email" className="glass px-4 py-3" placeholder="Email" />
            <textarea className="glass px-4 py-3 min-h-[120px]" placeholder="Message"></textarea>
            <button type="button" className="btn-neon bg-indigo-600 hover:bg-indigo-500 w-max">Send</button>
          </form>
        </Card>
        <Card title="Find me">
          <ul className="space-y-2">
            <li><a className="hover:underline text-indigo-300" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a className="hover:underline text-indigo-300" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a className="hover:underline text-indigo-300" href="mailto:example@example.com">Email</a></li>
          </ul>
        </Card>
      </div>
    </section>
  )
}
