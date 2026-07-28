import { Header } from "@/components/layout/Header"
import { LocationAndFooter } from "@/components/sections/LocationAndFooter"

export default function Empresa() {
  return (
    <main className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <Header />
      
      <section className="w-full bg-[#FAF5EE] pt-[80px] pb-[120px] px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#A62B31] font-[var(--font-body)] font-bold text-[12px] tracking-[0.14em] uppercase mb-4">
              Para Negócios
            </div>
            <h1 className="font-[var(--font-display)] text-[40px] md:text-[56px] font-[600] text-[#211B18] mb-6 leading-[1.1]">
              Soluções Corporativas
            </h1>
            <p className="text-[#625650] font-[var(--font-body)] text-[18px] md:text-[20px] leading-[1.6] max-w-[800px] mx-auto">
              Parcerias para o dia a dia da sua equipe. Conheça nossas opções para refeições corporativas e eventos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[rgba(166,43,49,0.08)]">
              <div className="w-12 h-12 bg-[#FAF0ED] rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A62B31" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="font-[var(--font-display)] text-[22px] font-[600] text-[#211B18] mb-3">Refeições para Equipes</h3>
              <p className="text-[#625650] font-[var(--font-body)] text-[15px] leading-[1.6]">
                Planos especiais para alimentar sua equipe com qualidade, sabor e pontualidade, garantindo a produtividade e bem-estar do seu time.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[rgba(166,43,49,0.08)]">
              <div className="w-12 h-12 bg-[#FAF0ED] rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A62B31" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
              <h3 className="font-[var(--font-display)] text-[22px] font-[600] text-[#211B18] mb-3">Eventos Corporativos</h3>
              <p className="text-[#625650] font-[var(--font-body)] text-[15px] leading-[1.6]">
                Coffee breaks, almoços executivos e confraternizações. Cuidamos do cardápio para que você foque apenas no sucesso do evento.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[rgba(166,43,49,0.08)]">
              <div className="w-12 h-12 bg-[#FAF0ED] rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A62B31" strokeWidth="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="font-[var(--font-display)] text-[22px] font-[600] text-[#211B18] mb-3">Faturamento Facilitado</h3>
              <p className="text-[#625650] font-[var(--font-body)] text-[15px] leading-[1.6]">
                Processo ágil e simplificado de fechamento mensal para empresas parceiras. Emissão de NFe unificada e condições de pagamento exclusivas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LocationAndFooter />
    </main>
  );
}
