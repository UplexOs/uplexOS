'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full bg-brand-cream-050 border-b border-brand-cream-100 sticky top-0 z-50">
      <div className="mx-auto max-w-[1680px] w-full h-[80px] px-5 sm:px-10 lg:px-[clamp(64px,5vw,112px)] flex items-center justify-between bg-brand-cream-050">

        <div className="flex items-center gap-2 shrink-0">
          <a href="/" className="flex items-center h-full">
            <img
              src="/logo/logo.png"
              alt="Restaurante Terra Nova"
              className="h-[50px] w-auto object-contain"
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 xl:gap-10">
          <a href="/" className="text-neutral-950 hover:text-brand-terracotta-700 text-[15px] transition-colors font-semibold">Início</a>
          <a href="/sobre" className="text-neutral-950 hover:text-brand-terracotta-700 text-[15px] transition-colors">Sobre</a>
          <a href="/cardapio" className="text-neutral-950 hover:text-brand-terracotta-700 text-[15px] transition-colors">Cardápio</a>
          <a href="/empresa" className="text-neutral-950 hover:text-brand-terracotta-700 text-[15px] transition-colors">Para Empresas</a>
          <a href="/contato" className="text-neutral-950 hover:text-brand-terracotta-700 text-[15px] transition-colors">Contato</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-neutral-950 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-brand-cream-050 border-b border-brand-cream-100 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col py-4 px-5 gap-4">
            <a href="/" onClick={() => setMobileMenuOpen(false)} className="text-neutral-950 text-[16px] font-semibold">Início</a>
            <a href="/sobre" onClick={() => setMobileMenuOpen(false)} className="text-neutral-950 text-[16px]">Sobre</a>
            <a href="/cardapio" onClick={() => setMobileMenuOpen(false)} className="text-neutral-950 text-[16px]">Cardápio</a>
            <a href="/empresa" onClick={() => setMobileMenuOpen(false)} className="text-neutral-950 text-[16px]">Para Empresas</a>
            <a href="/contato" onClick={() => setMobileMenuOpen(false)} className="text-neutral-950 text-[16px]">Contato</a>
          </nav>
        </div>
      )}
    </header>
  )
}
