import React from 'react'

export function InfoBar() {
  return (
    <div className="w-full bg-[var(--color-brand-terracotta-900)] text-[var(--color-white-warm)] py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border border-[var(--color-brand-terracotta-500)] rounded-full flex items-center justify-center opacity-80">
          <span className="text-[10px]">🕒</span>
        </div>
        <div className="text-sm">
          <p>Seg a Sex: 11h às 15h30</p>
          <p className="text-[var(--color-brand-terracotta-100)] opacity-80">Sáb: 11h30 às 15h30</p>
        </div>
      </div>
      
      <div className="hidden md:block w-px h-10 bg-[var(--color-brand-terracotta-700)] opacity-50"></div>
      
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border border-[var(--color-brand-terracotta-500)] rounded-full flex items-center justify-center opacity-80">
          <span className="text-[10px]">📍</span>
        </div>
        <div className="text-sm">
          <p>Rua Apinajés, 734</p>
          <p className="text-[var(--color-brand-terracotta-100)] opacity-80">Perdizes - São Paulo</p>
        </div>
      </div>
      
      <div className="hidden md:block w-px h-10 bg-[var(--color-brand-terracotta-700)] opacity-50"></div>
      
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border border-[var(--color-brand-terracotta-500)] rounded-full flex items-center justify-center opacity-80">
          <span className="text-[10px]">💲</span>
        </div>
        <div className="text-sm">
          <p>Preço médio</p>
          <p className="text-[var(--color-brand-terracotta-100)] opacity-80">R$ 35 - R$ 55</p>
        </div>
      </div>
      
      <div className="hidden md:block w-px h-10 bg-[var(--color-brand-terracotta-700)] opacity-50"></div>
      
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border border-[var(--color-brand-terracotta-500)] rounded-full flex items-center justify-center opacity-80">
          <span className="text-[10px]">📱</span>
        </div>
        <div className="text-sm">
          <p>(11) 94020-2293</p>
          <p className="text-[var(--color-brand-terracotta-100)] opacity-80">WhatsApp</p>
        </div>
      </div>
    </div>
  )
}
