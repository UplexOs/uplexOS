import { Header } from "@/components/layout/Header"
import { LocationAndFooter } from "@/components/sections/LocationAndFooter"

export default function Sobre() {
  return (
    <main className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <Header />
      
      <section className="w-full bg-[#FAF0ED] pt-[80px] pb-[120px] px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="text-[#A62B31] font-[var(--font-body)] font-bold text-[12px] tracking-[0.14em] uppercase mb-4">
            Nossa História
          </div>
          <h1 className="font-[var(--font-display)] text-[40px] md:text-[56px] font-[600] text-[#211B18] mb-6 leading-[1.1]">
            Sobre o Restaurante Terra Nova
          </h1>
          <p className="text-[#625650] font-[var(--font-body)] text-[18px] md:text-[20px] leading-[1.6] max-w-[800px] mx-auto mb-16">
            O sabor da comida caseira com o conforto e o acolhimento que você merece. Descubra nossas origens e a paixão por trás de cada prato.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center text-left">
            <div className="rounded-[24px] overflow-hidden aspect-[4/3] bg-neutral-200">
               <img src="/insta/restaurante_terranova_✨_Sabor_leve,_fresco_e_surpreendente!_Hoje_o_destaque_é_a_no_2025-08-02_DM2pVRWgiox_36903187263239.jpg" className="w-full h-full object-cover" alt="História Terra Nova" />
            </div>
            <div>
              <h2 className="font-[var(--font-display)] text-[28px] md:text-[32px] font-[600] text-[#211B18] mb-4 leading-[1.2]">
                Tradição de família no coração de Perdizes
              </h2>
              <p className="text-[#625650] font-[var(--font-body)] text-[16px] leading-[1.7] mb-6">
                Fundado com o desejo de trazer para a cidade grande aquele tempero acolhedor das refeições de domingo em família, o Terra Nova nasceu da paixão pela culinária brasileira autêntica.
              </p>
              <p className="text-[#625650] font-[var(--font-body)] text-[16px] leading-[1.7]">
                Acreditamos que o alimento é muito mais do que nutrição; é afeto, é lembrança e é conexão. Por isso, selecionamos diariamente os ingredientes mais frescos para preparar refeições que aquecem a alma.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LocationAndFooter />
    </main>
  );
}
