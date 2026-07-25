"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section className="bg-[#090909] py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto flex flex-col gap-16 lg:flex-row lg:items-center max-w-[1440px] px-6 lg:px-12">

        {/* Lado Esquerdo - Imagem (55%) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full lg:w-[55%] h-[500px] lg:h-[700px] rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] group"
        >
          <motion.img
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/paipe/noblesmoke_Aqui_vc_encontra_a_maior_variedade_de_produtos,_sempre_da_me_2026-02-16_DU0us82DmnC_3833894581927045570.jpg"
            alt="Interior da Noble Smoke"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Overlay suave para integrar ao dark theme */}
          <div className="absolute inset-0 bg-[#090909]/20 mix-blend-multiply" />
        </motion.div>

        {/* Lado Direito - Conteúdo (45%) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex w-full flex-col lg:w-[45%] lg:pl-10"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-[#C9A86A] uppercase">
            Nossa História
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold leading-tight text-[#F5F5F5] sm:text-5xl lg:text-6xl">
            Muito mais do que uma tabacaria.
          </h2>

          <p className="mt-8 text-lg font-light leading-relaxed text-[#B9B9B9]">
            A Noble Smoke nasceu da paixão pelos detalhes. Mais do que comercializar produtos, somos curadores de experiências autênticas. Cada charuto e cada acessório que oferecemos carrega em si a tradição e o respeito aos apreciadores exigentes.
          </p>

          <ul className="mt-10 space-y-4">
            {[
              "Atendimento personalizado",
              "Produtos selecionados",
              "Ambiente Premium",
              "Grande variedade"
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                className="flex items-center text-sm font-light tracking-wide text-[#F5F5F5]"
              >
                <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#181818] text-[#C9A86A]">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="mt-12">
            <Link
              href="/sobre"
              className="inline-flex h-14 items-center justify-center rounded-sm bg-[#C9A86A] px-10 text-xs font-semibold tracking-widest text-[#090909] transition-all hover:bg-[#8B6A3E]"
            >
              CONHECER LOJA
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
