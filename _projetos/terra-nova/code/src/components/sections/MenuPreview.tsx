import React from 'react'
import { Play } from 'lucide-react'

export function MenuPreview() {
  const filters = [
    "Todos", 
    "Do dia", 
    "Carnes", 
    "Aves", 
    "Peixes", 
    "Massas", 
    "Vegetarianos", 
    "Acompanhamentos"
  ]
  
  const dishes = [
    { 
      name: "Feijoada Completa", 
      desc: "Feita com calma, como manda a tradição.", 
      tag: "DO DIA", 
      cat: "Carnes",
      image: "/insta/restaurante_terranova_🥩Suculento,_macio_e_cheio_de_sabor!_Nosso_Contra_Filé_Acebol_2025-10-11_DPrVuXjAFze_37411794608172.jpg",
      position: "object-center" // Ajustar para o corte real da carne
    },
    { 
      name: "Frango Grelhado", 
      desc: "Com arroz, feijão, farofa e salada verde.", 
      tag: "DO DIA", 
      cat: "Aves",
      image: "/insta/restaurante_terranova_🥓_Suculento,_crocante_e_cheio_de_sabor!_Nosso_Filé_de_Frango_2025-09-01_DOEJEjygF_B_37121318885848.jpg",
      position: "object-center"
    },
    { 
      name: "Bife à Milanesa", 
      desc: "Crocante e sequinho, do jeito que é para ser.", 
      tag: "CARNES", 
      cat: "Carnes",
      image: "/insta/restaurante_terranova_🌽Crocante,_cremoso_e_cheio_de_sabor!_Nosso_Filé_de_Frango_à_2025-10-18_DP9Pq34gAb0_374621938196152.jpg",
      position: "object-bottom"
    },
    { 
      name: "Filé de Tilápia", 
      desc: "Grelhado com legumes e arroz de brócolis.", 
      tag: "PEIXES", 
      cat: "Peixes",
      image: "/insta/restaurante_terranova_✨_Sabor_leve,_fresco_e_surpreendente!_Hoje_o_destaque_é_a_no_2025-08-02_DM2pVRWgiox_36903187263239.jpg",
      position: "object-center"
    },
    { 
      name: "Bobó de Palmito", 
      desc: "Cremoso, leve e cheio de sabor.", 
      tag: "VEGETARIANOS", 
      cat: "Vegetarianos",
      image: "/insta/restaurante_terranova_✨_Clássico,_leve_e_irresistível!_Nossa_Berinjela_à_Parmegian_2025-08-06_DNBOiQsAqSk_36932970964521.jpg",
      position: "object-center"
    },
    { 
      name: "Espaguete ao Sugo", 
      desc: "Clássico, prático e saboroso!", 
      tag: "MASSAS", 
      cat: "Massas",
      image: "/insta/restaurante_terranova_🍝_Clássico,_prático_e_saboroso!_Nosso_Espaguete_ao_Sugo_é_a_2025-08-20_DNlip4xgQ_w_370351868062210.jpg",
      position: "object-center"
    },
  ]

  return (
    <section className="w-full bg-[var(--color-brand-cream-050)] pt-[112px] pb-[112px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-[28px] max-w-[680px] mx-auto">
          <div className="text-[#A62B31] font-[var(--font-body)] font-bold text-[12px] tracking-[0.14em] uppercase mb-4">
            Cardápio da casa
          </div>
          
          <h2 className="font-[var(--font-display)] text-[36px] md:text-[48px] font-[600] text-[#211B18] mb-4 leading-[1.1]">
            Tempero, variedade e carinho em cada prato
          </h2>
          
          <p className="text-[#625650] font-[var(--font-body)] text-[16px] leading-[1.6]">
            Explore pratos, fotos e vídeos da nossa cozinha e descubra o que combina com o seu almoço de hoje.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex overflow-x-auto snap-x hide-scrollbar mb-[40px] -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap items-center justify-start sm:justify-center gap-[10px]">
          {filters.map((f, i) => (
            <button 
              key={i} 
              className={`h-[38px] px-[18px] shrink-0 rounded-full font-[var(--font-body)] text-[14px] font-semibold transition-colors duration-200 ${
                i === 0 
                ? 'bg-[#A62B31] text-[var(--color-brand-cream-050)] border border-[#A62B31]' 
                : 'bg-transparent border border-[rgba(166,43,49,0.14)] text-[#4D423C] hover:bg-[#FAF0ED]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid de Pratos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {dishes.map((dish, i) => (
            <div key={i} className="relative group rounded-[18px] overflow-hidden aspect-[4/3] bg-[var(--color-neutral-200)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              
              <img 
                src={dish.image} 
                alt={dish.name}
                className={`absolute inset-0 w-full h-full object-cover ${dish.position} transition-transform duration-[360ms] group-hover:scale-[1.04]`}
              />
              
              {/* Overlay suave 45% a 100% */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent top-[45%]"></div>
              
              {/* Badge Categoria Superior */}
              <div className="absolute top-4 left-4 bg-[#A62B31] text-[var(--color-brand-cream-050)] text-[11px] font-bold px-2.5 py-1 rounded shadow-sm tracking-wide">
                {dish.tag}
              </div>
              
              {/* Ícone de Play */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]" aria-label="Reproduzir vídeo">
                <Play className="w-5 h-5 ml-0.5 fill-white" />
              </div>
              
              {/* Textos Inferiores */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col justify-end">
                <h3 className="font-[var(--font-display)] font-[650] text-[22px] text-[#FFFDF8] leading-[1.2] mb-1 drop-shadow-md line-clamp-2">
                  {dish.name}
                </h3>
                <p className="font-[var(--font-body)] text-[14px] text-white/88 leading-[1.45] line-clamp-2">
                  {dish.desc}
                </p>
                
                {/* Micro texto de Ação no Hover */}
                <span className="font-[var(--font-body)] text-[12px] font-bold text-white uppercase tracking-wider opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-2 flex items-center gap-1">
                  Ver prato <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* CTA Completo */}
        <div className="text-center mt-[44px]">
          <a href="#" className="inline-flex items-center justify-center h-[48px] px-8 rounded-full border border-[#A62B31] text-[#A62B31] font-[var(--font-body)] font-bold text-[15px] hover:bg-[#FAF0ED] transition-colors group">
            Ver cardápio completo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

      </div>
    </section>
  )
}
