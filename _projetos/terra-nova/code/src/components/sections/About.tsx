import React from 'react'

export function About() {
  return (
    <section className="w-full bg-[var(--color-brand-cream-050)] overflow-hidden">
      
      {/* Bloco Editorial (História) */}
      <div className="max-w-[1680px] mx-auto px-5 sm:px-10 lg:px-[clamp(64px,5vw,112px)] py-20 md:py-32 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Lado Esquerdo: Texto */}
        <div className="flex-1 max-w-[530px] w-full">
          <div className="text-[#A62B31] font-[var(--font-body)] font-bold text-[12px] tracking-[0.14em] uppercase mb-4">
            Nossa essência
          </div>
          
          <h2 className="font-[var(--font-display)] text-4xl md:text-[56px] font-medium text-[#211B18] mb-8 leading-[1.05]">
            Uma pausa com sabor de casa
          </h2>
          
          <div className="space-y-5 text-[#4D423C] text-[17px] md:text-[18px] leading-[1.65]">
            <p>
              Aqui, cada detalhe nasce do que acreditamos: receber bem, servir comida de verdade e fazer você se sentir em casa.
            </p>
            <p>
              Do tempero ao atendimento, tudo é feito com cuidado para transformar seu almoço em um momento especial.
            </p>
          </div>
          
          <a href="#" className="inline-flex items-center text-[#A62B31] font-semibold mt-10 text-[15px] group relative pb-1">
            <span>Conheça nossa história</span>
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            {/* Linha underline no hover */}
            <span className="absolute left-0 bottom-0 w-0 h-[1.5px] bg-[#A62B31] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        
        {/* Lado Direito: Colagem de Imagens - Oculto no Mobile, Visível apenas do tablet (md) em diante */}
        <div className="hidden md:flex flex-1 relative w-full h-[400px] md:h-[600px] justify-center lg:justify-end mt-8 lg:mt-0">

          {/* Forma Orgânica Rosada (Fundo sutil) */}
          <div className="absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 w-[250px] md:w-[480px] h-[250px] md:h-[480px] bg-[#F4E3DF] rounded-[120px_90px_140px_100px] opacity-40 blur-3xl -z-10"></div>

          {/* Imagem Principal Maior (Prato) */}
          <div className="absolute right-0 lg:right-10 top-0 w-[75%] md:w-[470px] h-[300px] md:h-[480px] rounded-[24px] overflow-hidden shadow-[0_12px_32px_rgba(166,43,49,0.06)] z-10">
             <img
               src="/insta/restaurante_terranova_✨_Clássico,_leve_e_irresistível!_Nossa_Berinjela_à_Parmegian_2025-08-06_DNBOiQsAqSk_36932970964521.jpg"
               alt="Prato do Terra Nova"
               className="w-full h-full object-cover"
             />
          </div>

          {/* Imagem Secundária 1 (Mesa/Ambiente) */}
          <div className="absolute left-0 lg:left-4 bottom-8 md:bottom-20 w-[140px] md:w-[220px] h-[180px] md:h-[260px] rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(33,27,24,0.08)] z-20 border-[4px] md:border-[6px] border-[var(--color-brand-cream-050)] group">
             <img
               src="/insta/restaurante_terranova_🍝_Clássico,_prático_e_saboroso!_Nosso_Espaguete_ao_Sugo_é_a_2025-08-20_DNlip4xgQ_w_370351868062210.jpg"
               alt="Massa Terra Nova"
               className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
             />
          </div>

          {/* Imagem Secundária 2 (Detalhe menor) */}
          <div className="absolute left-6 lg:left-24 top-6 md:top-12 w-[100px] md:w-[160px] h-[120px] md:h-[160px] rounded-[18px] overflow-hidden shadow-lg z-0 hidden sm:block">
             <img
               src="/insta/restaurante_terranova_🥓_Suculento,_crocante_e_cheio_de_sabor!_Nosso_Filé_de_Frango_2025-09-01_DOEJEjygF_B_37121318885848.jpg"
               alt="Detalhe Refeição"
               className="w-full h-full object-cover"
             />
          </div>

          {/* Selo Afetivo */}
          <div className="absolute -right-2 lg:-right-8 bottom-12 md:bottom-24 w-[80px] md:w-[100px] h-[80px] md:h-[100px] bg-[#5A150D] text-[var(--color-brand-cream-050)] rounded-full flex flex-col items-center justify-center p-2 md:p-3 shadow-xl z-30 transform rotate-12">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5 md:mb-1 opacity-90 w-4 h-4 md:w-5 md:h-5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            <span className="font-[var(--font-display)] text-[8px] md:text-[10px] text-center font-semibold leading-[1.1] tracking-wider">COMIDA<br/>QUE ACOLHE</span>
          </div>

        </div>
      </div>

    </section>
  )
}
