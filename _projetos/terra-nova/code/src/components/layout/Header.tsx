import React from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="w-full bg-[var(--color-brand-cream-050)] border-b border-[var(--color-brand-cream-100)] sticky top-0 z-50">
      <div className="mx-auto max-w-[1680px] w-full h-[80px] px-5 sm:px-10 lg:px-[clamp(64px,5vw,112px)] flex items-center justify-between">
        
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-[var(--color-brand-terracotta-700)] font-[var(--font-display)] font-semibold text-[22px] tracking-tight">
            <span className="italic mr-0.5">R</span>
            TERRA NOVA
          </div>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 xl:gap-10">
          <a href="/" className="text-[var(--color-neutral-950)] hover:text-[var(--color-brand-terracotta-700)] text-[15px] transition-colors font-semibold">Início</a>
          <a href="/sobre" className="text-[var(--color-neutral-950)] hover:text-[var(--color-brand-terracotta-700)] text-[15px] transition-colors">Sobre</a>
          <a href="/#cardapio" className="text-[var(--color-neutral-950)] hover:text-[var(--color-brand-terracotta-700)] text-[15px] transition-colors">Cardápio</a>
          <a href="/empresa" className="text-[var(--color-neutral-950)] hover:text-[var(--color-brand-terracotta-700)] text-[15px] transition-colors">Para Empresas</a>
        </nav>

        <div className="hidden md:flex shrink-0">
          <Button className="h-[46px] px-7 rounded-md font-bold">Ver cardápio</Button>
        </div>

      </div>
    </header>
  )
}
