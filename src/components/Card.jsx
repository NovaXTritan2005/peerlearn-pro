import React from 'react'

export default function Card({title, subtitle, children, cta}){
  return (
    <div className="glass p-6">
      <div className="mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-zinc-400">{subtitle}</p>}
      </div>
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
      {cta && <div className="mt-4 flex gap-3">{cta}</div>}
    </div>
  )
}
