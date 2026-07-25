"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const BRANDS = [
  "Raw", "Ocb", "Smoking", "Sadhu", "Squadafum", "Zengaz", "Bic", "Papelito", "Bem Bolado"
];

export function PremiumBanner() {
  return (
    <section className="w-full bg-[#090909] pt-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[400px] overflow-hidden rounded-[24px] bg-[#111111] border border-[#222222]">

          {/* Lado Esquerdo - Texto */}
          <div className="relative z-10 flex flex-col justify-center p-10 lg:p-16 lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-heading text-3xl font-bold leading-tight text-[#F5F5F5] sm:text-4xl">
                Nossa seleção reúne marcas reconhecidas nacionalmente e internacionalmente.
              </h2>
              <div className="mt-8">
                <Link
                  href="/loja"
                  className="inline-flex h-12 items-center justify-center rounded-sm bg-[#C9A86A] px-8 text-xs font-semibold tracking-widest text-[#090909] transition-all hover:bg-[#8B6A3E]"
                >
                  CONHEÇA O CATÁLOGO
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Lado Direito - Imagem */}
          <div className="relative h-[300px] lg:h-full lg:w-1/2">
            <img
              src="/paipe/noblesmoke_Aqui_vc_encontra_a_maior_variedade_de_produtos,_sempre_da_me_2026-02-16_DU0us82DmnC_3833894581927045570_2.jpg"
              alt="Marcas Premium"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111111] via-transparent to-transparent" />
          </div>
        </div>

        {/* Carrossel de Marcas */}
        <div className="mt-12 mb-20 px-4">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent className="items-center">
              {BRANDS.map((brand, idx) => (
                <CarouselItem key={idx} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 flex justify-center">
                  <span className="text-xl md:text-2xl font-heading font-bold text-white/40 tracking-wider uppercase transition-colors hover:text-[#C9A86A]">
                    {brand}
                  </span>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
