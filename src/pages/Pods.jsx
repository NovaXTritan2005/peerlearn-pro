import React from 'react'
import Card from '../components/Card'

const PODS = [
  {name: 'Consulting', desc: 'Case drills, MECE habits, market sizing dojo.'},
  {name: 'Investment Banking', desc: 'Diligence sprints, models, CIM critiques.'},
  {name: 'Data Science', desc: 'Kaggle→Real: CRISP‑DM, MLOps basics, dashboards.'},
  {name: 'Product', desc: 'PRDs, user interviews, metrics & A/Bs.'},
  {name: 'Design', desc: 'Design systems, mockups, usability tests.'},
  {name: 'Research', desc: 'Lit reviews, experiments, paper writing pods.'},
  {name: 'Startup', desc: 'Problem discovery, MVPs, distribution.'},
  {name: 'Marketing', desc: 'Growth loops, content calendars, funnels.'},
  {name: 'Analytics', desc: 'SQL, dashboards, causal inference basics.'},
  {name: 'Cybersecurity', desc: 'Labs, threat modeling, blue-team drills.'},
  {name: 'AI/Agents', desc: 'RAG, evals, prompt gyms, latency/$$ tradeoffs.'},
  {name: 'Public Policy', desc: 'Briefs, audits, implementation roadmaps.'},
  {name: 'Theatre & Oratory', desc: 'Presence, body-language, improv.'},
]

export default function Pods(){
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Pods</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PODS.map(p => (
          <Card key={p.name} title={p.name} subtitle="Micro-community">
            <p>{p.desc}</p>
            <div className="mt-4 text-sm text-zinc-400">Cadence: 2x/week · 60 mins · Outcomes posted</div>
          </Card>
        ))}
      </div>
    </section>
  )
}
