import React from 'react'

export function Highlights() {
  return (
    <section className="w-full bg-[var(--color-brand-cream-050)] px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold text-[var(--color-neutral-950)] mb-10 text-center md:text-left">
          Sabores que conquistam
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-square bg-[var(--color-neutral-200)] rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-neutral-500)]">[Prato Destaque 1]</div>
          </div>
          <div className="aspect-square bg-[var(--color-neutral-200)] rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-neutral-500)]">[Prato Destaque 2]</div>
          </div>
          <div className="aspect-square bg-[var(--color-neutral-200)] rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-neutral-500)]">[Prato Destaque 3]</div>
          </div>
        </div>
      </div>
    </section>
  )
}
