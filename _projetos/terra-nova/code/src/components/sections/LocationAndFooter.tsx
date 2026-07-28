import React from 'react'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Phone, Car } from 'lucide-react'

export function LocationAndFooter() {
  return (
    <>
      <section className="w-full bg-[var(--color-brand-cream-100)] px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 relative items-start lg:items-stretch">

          <div className="flex-1 w-full max-w-lg z-10 flex flex-col justify-center">
            <div className="text-[#A62B31] font-[var(--font-body)] font-bold text-[12px] tracking-[0.14em] uppercase mb-4">
              Localização
            </div>

            <h2 className="font-[var(--font-display)] text-4xl md:text-[44px] font-[600] text-[#211B18] mb-8 leading-[1.1]">
              Seu próximo almoço está em Perdizes
            </h2>

            <div className="space-y-6 mb-10 bg-white/70 backdrop-blur-sm p-8 rounded-[20px] border border-[rgba(166,43,49,0.08)] shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#FAF0ED] flex items-center justify-center shrink-0">
                  <MapPin className="text-[#A62B31] w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="text-[15px] text-[#625650] pt-1">
                  <p className="font-bold text-[17px] text-[#211B18]">Rua Apinajés, 734</p>
                  <p className="mt-1">Perdizes - São Paulo, SP</p>
                </div>
              </div>

              <div className="w-full h-px bg-neutral-200/60 my-4"></div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#FAF0ED] flex items-center justify-center shrink-0">
                  <Clock className="text-[#A62B31] w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="text-[15px] text-[#625650] pt-1">
                  <p className="font-bold text-[17px] text-[#211B18]">Seg a Sex: 11h às 15h30</p>
                  <p className="mt-1">Sáb: 11h30 às 15h30</p>
                </div>
              </div>

              <div className="w-full h-px bg-neutral-200/60 my-4"></div>

              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full bg-[#FAF0ED] flex items-center justify-center shrink-0">
                  <Phone className="text-[#A62B31] w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="text-[15px] text-[#625650] pt-2">
                  <p className="font-bold text-[17px] text-[#211B18]">(11) 94020-2293</p>
                </div>
              </div>
            </div>

            <Button className="w-full sm:w-auto h-[48px] px-8 rounded-full bg-[#A62B31] hover:bg-[#8A2127] text-white font-bold text-[15px] transition-colors shadow-md border-0">
              Traçar rota no mapa
            </Button>
          </div>

          <div className="flex-1 w-full relative min-h-[400px] lg:min-h-auto rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] bg-[var(--color-neutral-200)] flex flex-col">
             <div className="absolute inset-0 bg-neutral-100/10 pointer-events-none z-10 mix-blend-multiply"></div>

             <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1m3!1d3657.854659424888!2d-46.680655623912946!3d-23.537722760721245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57e3f8990bb5%3A0x633b432e1cd3f211!2sR.%20Apinaj%C3%A9s%2C%20734%20-%20Perdizes%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005017-000!5e0!3m2!1spt-BR!2sbr!4v1714061234567!5m2!1spt-BR!2sbr"
                className="w-full h-full border-0 flex-1 min-h-[400px] lg:absolute lg:inset-0"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>

             <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-white/95 backdrop-blur-sm p-5 rounded-[16px] shadow-[0_12px_24px_rgba(0,0,0,0.12)] max-w-[240px] border border-white z-20 hidden sm:block">
                <div className="w-10 h-10 bg-[#FAF0ED] rounded-full flex items-center justify-center mb-3">
                  <Car className="text-[#A62B31] w-5 h-5" strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[#211B18] text-[15px] mb-2 leading-[1.2]">Fácil de chegar,<br/>melhor ainda de ficar</h4>
                <p className="text-[13px] text-[#625650] leading-[1.5]">Estamos a poucos minutos da Pompéia e Av. Sumaré. Estacionamento próximo.</p>
             </div>
          </div>

        </div>
      </section>

      {/* Faixa Instagram Centralizada */}
      <section className="w-full bg-[var(--color-brand-cream-050)] py-16 md:py-[88px] border-b border-[rgba(166,43,49,0.06)] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 mb-12 text-center relative z-10">
          <div className="text-[#A62B31] font-[var(--font-body)] font-bold text-[12px] tracking-[0.14em] uppercase mb-4">
            No Instagram
          </div>
          <h3 className="font-[var(--font-display)] text-[32px] md:text-[40px] font-[600] text-[#211B18] mb-3 leading-[1.1]">
            Acompanhe nosso dia a dia
          </h3>
          <a href="#" className="text-[15px] font-bold text-[#A62B31] hover:text-[#8A2127] transition-colors inline-flex items-center group">
            @restaurante_terranova
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>

        <div className="max-w-[1600px] mx-auto w-full relative z-10">
          <div className="flex overflow-x-auto gap-4 md:gap-[20px] px-6 pb-6 snap-x hide-scrollbar justify-start md:justify-center items-center w-full">
             {[
              "/insta/restaurante_terranova_✨_Sabor_leve,_fresco_e_surpreendente!_Hoje_o_destaque_é_a_no_2025-08-02_DM2pVRWgiox_36903187263239.jpg",
              "/insta/restaurante_terranova_🥓_Suculento,_crocante_e_cheio_de_sabor!_Nosso_Filé_de_Frango_2025-09-01_DOEJEjygF_B_37121318885848.jpg",
              "/insta/restaurante_terranova_🥩Suculento,_macio_e_cheio_de_sabor!_Nosso_Contra_Filé_Acebol_2025-10-11_DPrVuXjAFze_37411794608172.jpg",
              "/insta/restaurante_terranova_🍝_Clássico,_prático_e_saboroso!_Nosso_Espaguete_ao_Sugo_é_a_2025-08-20_DNlip4xgQ_w_370351868062210.jpg",
              "/insta/restaurante_terranova_Hoje_comemoramos_1_mês_de_abertura_do_Terra_Nova_🥳🥳_Agradece_2025-08-24_DNwTr-fQJIt_37065490782434.jpg",
              "/insta/restaurante_terranova_🌽Crocante,_cremoso_e_cheio_de_sabor!_Nosso_Filé_de_Frango_à_2025-10-18_DP9Pq34gAb0_374621938196152.jpg"
             ].map((src, i) => (
               <a href="#" key={i} className="w-[200px] sm:w-[240px] md:w-[260px] flex-shrink-0 aspect-square bg-[var(--color-neutral-200)] rounded-[16px] snap-center overflow-hidden group relative shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
                 <img src={src} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.06]" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full border border-white/60 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                   </div>
                 </div>
               </a>
             ))}
          </div>
        </div>
      </section>

      {/* Footer Final */}
      <footer className="w-full bg-[#2F2520] text-white pt-[100px] pb-10 px-6 md:px-12 relative overflow-hidden">

        {/* Adorno (Prato / Ilustração no fundo do footer) */}
        <div className="absolute left-1/2 -top-[200px] -translate-x-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] md:left-auto md:right-[-150px] md:-top-[250px] md:translate-x-0 opacity-[0.06] pointer-events-none mix-blend-luminosity">
          <img src="/insta/restaurante_terranova_🥩Suculento,_macio_e_cheio_de_sabor!_Nosso_Contra_Filé_Acebol_2025-10-11_DPrVuXjAFze_37411794608172.jpg" className="w-full h-full object-cover rounded-full" />
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-16 relative z-10">

          <div className="max-w-[400px]">
            {/* Logo Customizada Terra Nova */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#A62B31] rounded-full flex items-center justify-center text-white font-[var(--font-display)] font-bold text-xl italic leading-none pt-1">
                T
              </div>
              <span className="font-[var(--font-display)] font-bold text-[22px] tracking-wide">
                TERRA NOVA
              </span>
            </div>

            <h2 className="font-[var(--font-display)] text-[32px] md:text-[36px] font-[600] mb-6 leading-[1.15] text-[#FFFDF8]">
              A mesa está pronta.<br/>Só falta você.
            </h2>

            <p className="text-white/70 font-[var(--font-body)] text-[15px] leading-[1.6] mb-8">
              Um espaço dedicado a resgatar o sabor da comida caseira com um toque contemporâneo. Venha nos visitar.
            </p>

            <Button className="h-[48px] px-8 rounded-full bg-[#A62B31] hover:bg-[#8A2127] text-white font-bold text-[15px] transition-colors border-0">
              Ver cardápio do dia
            </Button>
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-12 md:gap-[100px] pt-4">
            <div>
              <h4 className="font-[var(--font-body)] font-bold text-[13px] mb-6 tracking-[0.1em] text-white/50 uppercase">Navegação</h4>
              <ul className="space-y-4 font-[var(--font-body)] text-[15px] text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cardápio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Galeria</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Localização</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-[var(--font-body)] font-bold text-[13px] mb-6 tracking-[0.1em] text-white/50 uppercase">Informações</h4>
              <ul className="space-y-5 font-[var(--font-body)] text-[15px] text-white/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-[#A62B31]" strokeWidth={1.5} />
                  <div>
                    <span className="text-white block mb-1">Rua Apinajés, 734</span>
                    <span className="text-white/60 text-[14px]">Perdizes - São Paulo, SP</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 text-[#A62B31]" strokeWidth={1.5} />
                  <div>
                    <span className="text-white block mb-1">Seg a Sex: 11h às 15h30</span>
                    <span className="text-white/60 text-[14px]">Sáb: 11h30 às 15h30</span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#A62B31]" strokeWidth={1.5} />
                  <span className="text-white">(11) 94020-2293</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div className="max-w-[1200px] mx-auto mt-[80px] pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-[var(--font-body)] text-[13px] text-white/50 relative z-10">
          <p>© {new Date().getFullYear()} Restaurante Terra Nova. Todos os direitos reservados.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Termos de uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>
    </>
  )
}
