"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Star, Shield, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <div className="min-h-screen bg-[#090909] overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/insta/noblesmoke_Vem_conferir_essas_cases_recheadas😉__tabacaria__cases__smoki_2026-02-17_DU3SN9pjsX2_3834613732115138038.jpg" // Using an existing high-quality image from public
            alt="Noble Smoke Premium Experience"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/40 via-[#090909]/80 to-[#090909]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
            className="flex justify-center mb-8"
          >
            <Image
              src="/logo/logo.png"
              alt="Noble Smoke Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide"
          >
            Nossa <span className="text-[#C9A86A] italic">Essência</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto"
          >
            Elevando o padrão da cultura e do estilo de vida com uma curadoria impecável e produtos de extrema qualidade.
          </motion.p>
        </div>
      </section>

      {/* História e Filosofia */}
      <section className="py-24 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] text-[#C9A86A] uppercase mb-4">
                QUEM SOMOS
              </h2>
              <h3 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-tight">
                Mais que uma loja, <br />
                <span className="text-white/40 italic">um estilo de vida.</span>
              </h3>
            </div>

            <div className="space-y-6 text-[15px] font-light text-white/60 leading-relaxed">
              <p>
                A Noble Smoke nasceu do desejo de transformar uma experiência comum em um verdadeiro ritual de apreciação. Nós acreditamos que a qualidade dos acessórios que você utiliza reflete diretamente no prazer do seu momento.
              </p>
              <p>
                Com uma curadoria rigorosa, selecionamos apenas as marcas mais respeitadas mundialmente e os produtos com os melhores acabamentos. Não somos apenas distribuidores; somos curadores de uma experiência premium.
              </p>
              <p>
                Localizada no coração de Perdizes, São Paulo, nossa missão é entregar sofisticação, autenticidade e o mais alto nível de atendimento para clientes que não se contentam com o básico.
              </p>
            </div>

            <div className="pt-4 flex gap-4">
              <div className="flex flex-col">
                <span className="font-heading text-4xl text-[#C9A86A]">100%</span>
                <span className="text-xs tracking-widest text-white/40 uppercase mt-1">Produtos Originais</span>
              </div>
              <div className="w-px h-12 bg-[#222] mx-4 self-center"></div>
              <div className="flex flex-col">
                <span className="font-heading text-4xl text-[#C9A86A]">24h</span>
                <span className="text-xs tracking-widest text-white/40 uppercase mt-1">Envio Rápido</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-[#111] border border-[#222]">
              <Image
                src="/insta/noblesmoke_Bandejas_RAW_lindíssimas,_garanta_já_a_sua😉__tabacaria__taba_2026-03-28_DWbrWEAjl4c_3862871737533095452.jpg"
                alt="Detalhes Noble Smoke"
                fill
                className="object-cover"
              />
            </div>
            {/* Elemento Decorativo */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-[#C9A86A]/30 rounded-sm -z-10 hidden md:block"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#C9A86A]/5 rounded-sm -z-10 hidden md:block blur-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Nossos Pilares */}
      <section className="py-24 bg-[#0B0B0B] border-t border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-[11px] font-bold tracking-[0.3em] text-[#C9A86A] uppercase mb-4">
              NOSSOS PILARES
            </h2>
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-white">
              O Padrão Noble
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="h-6 w-6 text-[#C9A86A]" strokeWidth={1.5} />,
                title: "Curadoria Premium",
                desc: "Apenas as melhores marcas mundiais. Cada produto no nosso catálogo passa por um controle rigoroso de excelência."
              },
              {
                icon: <Shield className="h-6 w-6 text-[#C9A86A]" strokeWidth={1.5} />,
                title: "Garantia de Autenticidade",
                desc: "Trabalhamos exclusivamente com fornecedores oficiais. Zero risco, 100% de satisfação e procedência garantida."
              },
              {
                icon: <Clock className="h-6 w-6 text-[#C9A86A]" strokeWidth={1.5} />,
                title: "Eficiência e Cuidado",
                desc: "Seu ritual não pode esperar. Despachamos todos os pedidos rapidamente com embalagens discretas e protegidas."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-[#111] border border-[#222] p-8 rounded-sm hover:border-[#C9A86A]/40 transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-[#C9A86A]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                <p className="text-sm font-light text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#C9A86A]/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <Image
              src="/logo/logo.png"
              alt="Icon"
              width={40}
              height={40}
              className="mx-auto mb-8 opacity-50"
            />
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
              Pronto para elevar o seu momento?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/loja">
                <Button className="h-14 w-full sm:w-auto rounded-none bg-[#C9A86A] px-10 text-xs font-bold tracking-[0.2em] text-[#0B0B0B] transition-colors hover:bg-[#8b6b33]">
                  EXPLORAR PRODUTOS
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}