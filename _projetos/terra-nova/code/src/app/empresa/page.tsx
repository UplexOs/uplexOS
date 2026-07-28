import { Header } from "@/components/layout/Header"
import { LocationAndFooter } from "@/components/sections/LocationAndFooter"
import { Button } from "@/components/ui/button"
import { Building2, CalendarCheck, Handshake, Briefcase, FileSpreadsheet, ArrowRight } from "lucide-react"

export default function Empresa() {
  return (
    <main className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <Header />

      {/* Hero Corporativo */}
      <section className="w-full bg-[#FAF5EE] pt-[80px] pb-[60px] md:pb-[100px] px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF0ED] text-[#A62B31] font-[var(--font-body)] font-bold text-[12px] tracking-[0.1em] uppercase mb-6">
              <Building2 className="w-3.5 h-3.5" />
              Terra Nova Empresas
            </div>
            <h1 className="font-[var(--font-display)] text-[40px] md:text-[52px] lg:text-[60px] font-[600] text-[#211B18] mb-6 leading-[1.1]">
              Sabor de casa no dia a dia da sua equipe
            </h1>
            <p className="text-[#625650] font-[var(--font-body)] text-[18px] md:text-[20px] leading-[1.6] mb-8 max-w-[600px] mx-auto lg:mx-0">
              Soluções gastronômicas corporativas pensadas para valorizar o bem-estar dos seus colaboradores, reuniões de diretoria e grandes eventos empresariais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button className="w-full sm:w-auto h-[54px] px-8 rounded-full bg-[#A62B31] hover:bg-[#8A2127] text-white font-bold text-[16px] transition-colors shadow-md border-0">
                Seja uma empresa parceira
              </Button>
              <a href="#solucoes" className="font-[var(--font-body)] font-bold text-[#A62B31] text-[15px] hover:text-[#8A2127] transition-colors underline underline-offset-4">
                Ver todas as soluções
              </a>
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] shadow-[0_12px_40px_rgba(0,0,0,0.08)] bg-neutral-200">
               {/* Usando uma foto que remeta a equipe / comida na mesa (da galeria ja importada antes) */}
               <img src="/insta/restaurante_terranova_Hoje_comemoramos_1_mês_de_abertura_do_Terra_Nova_🥳🥳_Agradece_2025-08-24_DNwTr-fQJIt_37065490782434.jpg" className="w-full h-full object-cover" alt="Equipe Terra Nova" />
            </div>

            {/* Card flutuante */}
            <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white p-6 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-[rgba(166,43,49,0.05)] max-w-[280px]">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#FAF0ED] rounded-full flex items-center justify-center text-[#A62B31] font-bold text-xl">
                  +50
                </div>
                <div className="font-[var(--font-display)] font-[600] text-[#211B18] text-[18px] leading-tight">
                  Empresas na<br/>região
                </div>
              </div>
              <p className="text-[#625650] font-[var(--font-body)] text-[13px] leading-[1.5]">
                Já confiam no Terra Nova para o almoço diário de seus colaboradores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Soluções Detalhadas */}
      <section id="solucoes" className="w-full bg-white py-20 md:py-[120px] px-6 md:px-12 relative">
        <div className="max-w-[1200px] mx-auto">

          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-[var(--font-display)] text-[32px] md:text-[44px] font-[600] text-[#211B18] mb-4">
              Como podemos atender sua empresa?
            </h2>
            <p className="text-[#625650] font-[var(--font-body)] text-[16px] md:text-[18px] max-w-[700px] mx-auto">
              Flexibilidade é o nosso forte. Criamos planos sob medida, seja para o almoço cotidiano da equipe ou para impressionar clientes em reuniões de alto nível.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">

            {/* Card 1: Parcerias */}
            <div className="group rounded-[24px] p-8 lg:p-10 border border-neutral-100 bg-[#FAF5EE] hover:bg-[#FAF0ED] transition-colors duration-300">
              <div className="w-16 h-16 bg-white shadow-sm rounded-[16px] flex items-center justify-center mb-8 text-[#A62B31] group-hover:scale-110 transition-transform duration-300">
                <Handshake strokeWidth={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-[var(--font-display)] text-[26px] font-[600] text-[#211B18] mb-4">
                Convênios & Parcerias
              </h3>
              <p className="text-[#625650] font-[var(--font-body)] text-[16px] leading-[1.6] mb-6">
                Cadastre sua empresa e garanta descontos exclusivos para seus funcionários almoçarem conosco todos os dias. Uma extensão do refeitório da sua empresa com a qualidade de um verdadeiro restaurante.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Descontos progressivos por volume de colaboradores
                </li>
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Aceitamos todos os vales-refeição (VR, Ticket, Alelo, Sodexo)
                </li>
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Opção de marmitas entregues diretamente no escritório
                </li>
              </ul>
              <a href="/contato" className="inline-flex items-center text-[#A62B31] font-[var(--font-body)] font-bold text-[15px] hover:text-[#8A2127] transition-colors">
                Quero ser parceiro <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Card 2: Reuniões e Coffee Breaks */}
            <div className="group rounded-[24px] p-8 lg:p-10 border border-neutral-100 bg-[#FAF5EE] hover:bg-[#FAF0ED] transition-colors duration-300">
              <div className="w-16 h-16 bg-white shadow-sm rounded-[16px] flex items-center justify-center mb-8 text-[#A62B31] group-hover:scale-110 transition-transform duration-300">
                <Briefcase strokeWidth={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-[var(--font-display)] text-[26px] font-[600] text-[#211B18] mb-4">
                Reuniões & Diretorias
              </h3>
              <p className="text-[#625650] font-[var(--font-body)] text-[16px] leading-[1.6] mb-6">
                Eleve o padrão das suas reuniões estratégicas. Preparamos coffee breaks completos, mesas de café da manhã ou enviamos pratos executivos à la carte impecáveis diretamente para a sala de reunião.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Embalagens premium adequadas para consumo em reuniões
                </li>
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Pontualidade britânica para não atrasar pautas
                </li>
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Menu adaptável para restrições alimentares
                </li>
              </ul>
              <a href="/contato" className="inline-flex items-center text-[#A62B31] font-[var(--font-body)] font-bold text-[15px] hover:text-[#8A2127] transition-colors">
                Solicitar orçamento <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Card 3: Eventos Corporativos */}
            <div className="group rounded-[24px] p-8 lg:p-10 border border-neutral-100 bg-[#FAF5EE] hover:bg-[#FAF0ED] transition-colors duration-300">
              <div className="w-16 h-16 bg-white shadow-sm rounded-[16px] flex items-center justify-center mb-8 text-[#A62B31] group-hover:scale-110 transition-transform duration-300">
                <CalendarCheck strokeWidth={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-[var(--font-display)] text-[26px] font-[600] text-[#211B18] mb-4">
                Confraternizações & Eventos
              </h3>
              <p className="text-[#625650] font-[var(--font-body)] text-[16px] leading-[1.6] mb-6">
                O sucesso do ano merece ser celebrado com comida boa de verdade. Nosso salão comporta confraternizações de fim de ano, aniversários da empresa e encontros de times com menus fechados.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Reserva parcial ou total do restaurante
                </li>
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Menus personalizados (buffet livre ou empratado)
                </li>
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Pacotes com ou sem bebidas alcoólicas inclusas
                </li>
              </ul>
              <a href="/contato" className="inline-flex items-center text-[#A62B31] font-[var(--font-body)] font-bold text-[15px] hover:text-[#8A2127] transition-colors">
                Reservar data <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Card 4: Faturamento */}
            <div className="group rounded-[24px] p-8 lg:p-10 border border-[#A62B31] bg-white relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 bg-[#A62B31] text-white text-[11px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-bl-[16px]">
                Diferencial
              </div>
              <div className="w-16 h-16 bg-[#FAF0ED] rounded-[16px] flex items-center justify-center mb-8 text-[#A62B31]">
                <FileSpreadsheet strokeWidth={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-[var(--font-display)] text-[26px] font-[600] text-[#211B18] mb-4">
                Faturamento Facilitado (NFe)
              </h3>
              <p className="text-[#625650] font-[var(--font-body)] text-[16px] leading-[1.6] mb-6">
                Descomplique o processo para o seu setor financeiro. Oferecemos faturamento quinzenal ou mensal unificado para empresas com alto volume de consumo.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Emissão de Nota Fiscal de Serviços unificada
                </li>
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Relatório gerencial de consumo por centro de custo/funcionário
                </li>
                <li className="flex items-start gap-3 font-[var(--font-body)] text-[15px] text-[#4D423C]">
                  <span className="text-[#A62B31] font-bold">✓</span> Pagamento centralizado via boleto bancário
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-[#A62B31] py-16 md:py-[100px] px-6 md:px-12 text-center relative overflow-hidden">
        {/* Padrão decorativo de fundo (opcional, bem sutil) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-[800px] mx-auto relative z-10">
          <h2 className="font-[var(--font-display)] text-[32px] md:text-[48px] font-[600] text-white mb-6 leading-tight">
            Vamos desenhar uma proposta para sua empresa?
          </h2>
          <p className="font-[var(--font-body)] text-white/80 text-[16px] md:text-[18px] mb-10 leading-[1.6]">
            Fale com nosso time de atendimento corporativo. Entendemos a rotina da sua empresa e propomos a melhor configuração de refeições e eventos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-full sm:w-auto h-[54px] px-8 rounded-full bg-white hover:bg-neutral-100 text-[#A62B31] font-bold text-[16px] transition-colors border-0">
              Falar pelo WhatsApp
            </Button>
            <Button className="w-full sm:w-auto h-[54px] px-8 rounded-full bg-transparent hover:bg-white/10 text-white font-bold text-[16px] transition-colors border border-white/30">
              Enviar e-mail corporativo
            </Button>
          </div>
        </div>
      </section>

      <LocationAndFooter />
    </main>
  );
}