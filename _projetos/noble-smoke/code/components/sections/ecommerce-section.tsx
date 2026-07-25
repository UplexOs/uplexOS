"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, ShieldCheck, Truck, CreditCard, Store } from "lucide-react";
import { GiCrown } from "react-icons/gi";
import Autoplay from "embla-carousel-autoplay";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/ecommerce/product-card";

const INFO_ITEMS = [
  { icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />, title: "Compra Segura", desc: "Seus dados protegidos" },
  { icon: <Truck className="h-6 w-6" strokeWidth={1.5} />, title: "Entrega Rápida", desc: "Para todo o Brasil" },
  { icon: <CreditCard className="h-6 w-6" strokeWidth={1.5} />, title: "Parcele em até 12x", desc: "No cartão de crédito" },
  { icon: <Store className="h-6 w-6" strokeWidth={1.5} />, title: "Retire na Loja", desc: "Compre online e retire" },
];

export function EcommerceSection() {
  return (
    <section className="bg-[#0B0B0B] pt-[96px] pb-[120px] overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8 ">

          {/* HEADER DA SEÇÃO */}
          <div className="flex flex-col items-center text-center mb-[56px]">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[#C9A86A] text-[13px] tracking-[8px] uppercase font-medium"
            >
              Nossa Loja
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 font-heading text-[48px] md:text-[72px] font-semibold text-white leading-tight"
            >
              Explore nossa seleção premium
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-[620px] text-[18px] text-white/72 font-light leading-[170%]"
            >
              Uma coleção cuidadosamente curada para apreciadores exigentes,
              onde a tradição e a qualidade excepcional se encontram.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 h-px w-[60px] bg-[#C9A86A]/40"
            />
          </div>

          {/* CATEGORIAS (Vitrines Horizontais) */}
          <div className="relative ">
            <Carousel
              opts={{ align: "start", dragFree: true, loop: true }}
              plugins={[Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })]}
              className="w-full mt-4"
            >
              <CarouselContent className="-ml-6">
                {CATEGORIES.map((category, index) => (
                  <CarouselItem key={category.name} className="pl-6 basis-[85%] sm:basis-[284px]">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                    >
                      <Link href={category.link} className="block">
                        <div className="group relative h-[284px] w-full overflow-hidden rounded-[22px] bg-[#101010] transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A86A] border border-transparent">

                          <img
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 transition-opacity duration-500 group-hover:to-black" />

                          <div className="absolute bottom-0 left-0 flex w-full flex-col p-[24px] transition-transform duration-500 group-hover:-translate-y-2">
                            <GiCrown className="mb-2 h-5 w-5 text-[#C9A86A]" />
                            <h3 className="font-heading text-[24px] font-medium text-white transition-transform duration-500 group-hover:-translate-y-1">
                              {category.name}
                            </h3>
                            <p className="mt-1 text-[13px] font-light text-white/60 opacity-80 transition-all duration-500 group-hover:opacity-100">
                              {category.count} produtos
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="hidden md:block">
                <CarouselPrevious className="absolute z-10 -left-6 top-[142px] h-12 w-12 -translate-y-1/2 border-[#C9A86A]/30 bg-black/40 text-white backdrop-blur-md transition-all hover:border-[#C9A86A] hover:bg-black/60 hover:text-[#C9A86A]" />
                <CarouselNext className="absolute z-10 -right-6 top-[142px] h-12 w-12 -translate-y-1/2 border-[#C9A86A]/30 bg-black/40 text-white backdrop-blur-md transition-all hover:border-[#C9A86A] hover:bg-black/60 hover:text-[#C9A86A]" />
              </div>
            </Carousel>
          </div>

          {/* GAP DE 72px ENTRE SEÇÕES */}
          <div className="h-[24px]" />

          {/* PRODUTOS EM DESTAQUE */}
          <div className="mt-[8px]">
            {/* Header dos Produtos */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-heading text-[24px] md:text-[28px] font-bold text-white"
                >
                  Destaques da semana
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-1 text-[14px] font-light text-white/50"
                >
                  Selecionamos os melhores produtos
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/loja"
                  className="group flex h-[48px] items-center justify-center rounded-sm border border-[#333333] bg-transparent px-8 text-[12px] font-medium tracking-widest text-white transition-all hover:border-[#C9A86A] hover:text-[#C9A86A]"
                >
                  VER TODOS
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              </motion.div>
            </div>

            {/* Grid/Carousel de Produtos */}
            <Carousel opts={{ align: "start", dragFree: true, loop: true }} className="w-full mt-6">
              <CarouselContent className="-ml-6">
                {PRODUCTS.map((product, index) => (
                  <CarouselItem key={product.id} className="pl-6 basis-[85%] sm:basis-[314px]">
                    <ProductCard product={product} delay={index * 0.1} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="hidden md:block">
                <CarouselPrevious className="absolute z-10 -left-6 top-[140px] h-12 w-12 border-[#C9A86A]/30 bg-black/40 text-white backdrop-blur-md transition-all hover:border-[#C9A86A] hover:bg-black/60 hover:text-[#C9A86A]" />
                <CarouselNext className="absolute z-10 -right-6 top-[140px] h-12 w-12 border-[#C9A86A]/30 bg-black/40 text-white backdrop-blur-md transition-all hover:border-[#C9A86A] hover:bg-black/60 hover:text-[#C9A86A]" />
              </div>
            </Carousel>
          </div>

          {/* BARRA INFERIOR PREMIUM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-[80px] grid min-h-[110px] w-full grid-cols-1 gap-8 rounded-[18px] bg-[#101010] p-8 md:grid-cols-2 lg:grid-cols-4 lg:p-0"
          >
            {INFO_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-5 lg:justify-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-[#C9A86A]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-white">{item.title}</h4>
                  <p className="mt-1 text-[13px] text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
