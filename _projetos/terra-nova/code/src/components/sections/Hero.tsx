import React from 'react'
import { Button } from '@/components/ui/button'
import { GoogleIcon } from '@/components/ui/google-icon'

export function Hero() {
  return (
    <section className="relative w-full bg-[var(--color-brand-cream-050)] overflow-hidden flex flex-col md:flex-row h-auto md:h-[min(740px,85vh)] min-h-[600px] md:min-h-[680px]">
      
      {/* 
        Container do Vídeo (Direita ~ 58%) 
      */}
      <div className="absolute inset-0 md:left-[42%] right-0 h-[400px] md:h-full z-0 overflow-hidden bg-[var(--color-brand-cream-100)]">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover object-center"
          poster="/insta/restaurante_terranova_✨_Clássico,_leve_e_irresistível!_Nossa_Berinjela_à_Parmegian_2025-08-06_DNBOiQsAqSk_36932970964521.jpg"
        >
          {/* Mudando o vídeo para a Berinjela (gastronomia pura) ao invés do vídeo do ambiente genérico */}
          <source src="/insta/restaurante_terranova_Seu_lugar_favorito_para_curtir_o_fim_de_semana_é_aqui_no_Ter_2026-03-09_DVrpSplAHrd_38493519080199.mp4" type="video/mp4" />
        </video>
        
        {/* Máscara de transição ultra sutil / orgânica (menos reta que a anterior) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-cream-050)] via-[var(--color-brand-cream-050)]/70 to-transparent w-[120px] md:w-[280px] h-full"></div>
        {/* Degradê vertical mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-brand-cream-050)]/60 to-[var(--color-brand-cream-050)] h-full md:hidden"></div>
      </div>

      {/* Container de Texto Centralizado (~ 42%) */}
      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-5 sm:px-10 lg:px-[clamp(64px,5vw,112px)] flex items-center pt-80 pb-12 md:py-0">
        
        <div className="w-full max-w-[600px] flex flex-col justify-center">
          
          <h1 className="font-[var(--font-display)] text-5xl md:text-[66px] font-semibold text-[var(--color-neutral-950)] leading-[1.02] tracking-tight mb-8">
            Sabor de casa no coração de Perdizes.
          </h1>
          
          <p className="text-[var(--color-neutral-800)] text-[18px] mb-10 leading-[1.6] max-w-[520px]">
            Comida brasileira feita todos os dias com ingredientes frescos, receitas de família e muito carinho.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Button className="h-[50px] px-8 rounded-md font-bold text-[15px]">Ver cardápio de hoje</Button>
            <Button variant="secondary" className="h-[50px] px-8 rounded-md font-bold text-[15px] border-2 bg-transparent">Como chegar</Button>
          </div>
          
          <div className="flex items-center gap-3 w-max opacity-95">
            <div className="flex items-center justify-center w-[38px] h-[38px] bg-white rounded-full shadow-sm p-2">
              <GoogleIcon className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[18px] font-bold text-[var(--color-neutral-950)] leading-none mt-0.5">5,0</span>
                <div className="flex text-[#FBBC05] text-[13px] tracking-widest">
                  ★★★★★
                </div>
              </div>
              <p className="text-[13px] font-medium text-[var(--color-neutral-700)] mt-0.5">41 avaliações no Google</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}
