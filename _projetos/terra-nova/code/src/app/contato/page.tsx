import { Header } from "@/components/layout/Header"
import { LocationAndFooter } from "@/components/sections/LocationAndFooter"
import { Button } from "@/components/ui/button"

export default function Contato() {
  return (
    <main className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <Header />
      
      <section className="w-full bg-[#FAF5EE] pt-[80px] pb-[120px] px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#A62B31] font-[var(--font-body)] font-bold text-[12px] tracking-[0.14em] uppercase mb-4">
              Fale Conosco
            </div>
            <h1 className="font-[var(--font-display)] text-[40px] md:text-[56px] font-[600] text-[#211B18] mb-6 leading-[1.1]">
              Como podemos ajudar?
            </h1>
            <p className="text-[#625650] font-[var(--font-body)] text-[18px] md:text-[20px] leading-[1.6] max-w-[600px] mx-auto">
              Dúvidas, sugestões ou parcerias? Entre em contato conosco. Adoraríamos ouvir você.
            </p>
          </div>
          
          <div className="max-w-[600px] mx-auto bg-white p-8 md:p-10 rounded-[24px] shadow-sm border border-[rgba(166,43,49,0.08)]">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nome" className="font-[var(--font-body)] text-[14px] font-bold text-[#211B18]">Nome completo</label>
                  <input type="text" id="nome" className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A62B31]/20 focus:border-[#A62B31] transition-all font-[var(--font-body)] text-[15px]" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="telefone" className="font-[var(--font-body)] text-[14px] font-bold text-[#211B18]">Telefone / WhatsApp</label>
                  <input type="tel" id="telefone" className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A62B31]/20 focus:border-[#A62B31] transition-all font-[var(--font-body)] text-[15px]" placeholder="(11) 90000-0000" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="font-[var(--font-body)] text-[14px] font-bold text-[#211B18]">E-mail</label>
                <input type="email" id="email" className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A62B31]/20 focus:border-[#A62B31] transition-all font-[var(--font-body)] text-[15px]" placeholder="seu@email.com" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="assunto" className="font-[var(--font-body)] text-[14px] font-bold text-[#211B18]">Assunto</label>
                <select id="assunto" className="w-full h-12 px-4 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A62B31]/20 focus:border-[#A62B31] transition-all font-[var(--font-body)] text-[15px] appearance-none cursor-pointer">
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida / Informação</option>
                  <option value="corporativo">Pacote Corporativo</option>
                  <option value="evento">Orçamento para Evento</option>
                  <option value="elogio">Elogio / Sugestão</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="mensagem" className="font-[var(--font-body)] text-[14px] font-bold text-[#211B18]">Sua mensagem</label>
                <textarea id="mensagem" rows={4} className="w-full py-3 px-4 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A62B31]/20 focus:border-[#A62B31] transition-all font-[var(--font-body)] text-[15px] resize-none" placeholder="Como podemos te ajudar?"></textarea>
              </div>

              <Button type="button" className="w-full h-12 rounded-xl bg-[#A62B31] hover:bg-[#8A2127] text-white font-bold text-[15px] transition-colors border-0">
                Enviar mensagem
              </Button>
            </form>
          </div>
        </div>
      </section>

      <LocationAndFooter />
    </main>
  );
}
