import React from 'react'
import Card from '../components/Card'

export default function Projects(){
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Nova x Tritan" subtitle="Student Transformation Platform">
          <ul className="list-disc pl-5 text-zinc-300">
            <li>Pods, sprints, and outcome posts with peer review.</li>
            <li>Personal dashboard, streak freeze, and habit recipes.</li>
            <li>Portfolio-first: exportable proof for internships.</li>
          </ul>
        </Card>
        <Card title="GSTify" subtitle="MSME GST reconciliation">
          <ul className="list-disc pl-5 text-zinc-300">
            <li>Hard-gates ITC to 2B entries, explains mismatches.</li>
            <li>DPDP-aligned privacy; CA-ready exports (no e-filing).</li>
            <li>Prep-only; audit-focused analytics and reason codes.</li>
          </ul>
        </Card>
      </div>
    </section>
  )
}
