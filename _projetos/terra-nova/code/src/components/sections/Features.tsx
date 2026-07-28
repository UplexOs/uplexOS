import React from 'react'

export function Features() {
  const features = [
    {
      // Ícone SVG personalizado ao invés do componente
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A62B31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      ),
      title: "Ingredientes frescos",
      desc: "Selecionamos o melhor todos os dias."
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A62B31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h20"/>
          <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/>
          <path d="M4 12V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4"/>
          <path d="M12 4v4"/>
        </svg>
      ),
      title: "Receitas de família",
      desc: "O sabor que lembra a comida de casa."
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A62B31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
      ),
      title: "Feito com carinho",
      desc: "Cuidado em cada etapa, do preparo ao servir."
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#A62B31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "Ambiente acolhedor",
      desc: "Lugar leve, arejado e feito para boas conversas."
    }
  ]

  return (
    <section className="w-full bg-[#FAF0ED] px-6 md:px-12 py-16 md:py-[76px] relative">

      {/* Transição Suave (Borda Superior Fina com Folhinha) */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-center">
        <div className="w-full h-px bg-[rgba(166,43,49,0.14)]"></div>
        <div className="absolute bg-[#FAF0ED] px-4 text-[#A62B31] opacity-60">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
        </div>
      </div>

      <div className="max-w-[1680px] mx-auto px-0 sm:px-10 lg:px-[clamp(64px,5vw,112px)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(166,43,49,0.14)]">

        {features.map((feat, i) => (
          <div key={i} className="flex flex-col items-center text-center px-4 pt-8 sm:pt-0">
            <div className="mb-5">
              {/* O Ícone direto sem fundo rosado, ajustando o scale para o tamanho pedido (58px~68px visualmente) */}
              <div className="scale-[1.6]">
                {feat.icon}
              </div>
            </div>
            <h3 className="font-[var(--font-body)] text-[17px] font-[650] text-[#211B18] mb-2 tracking-tight">{feat.title}</h3>
            <p className="font-[var(--font-body)] text-[14px] text-[#6A5A52] leading-[1.55] max-w-[230px]">{feat.desc}</p>
          </div>
        ))}

      </div>
    </section>
  )
}
