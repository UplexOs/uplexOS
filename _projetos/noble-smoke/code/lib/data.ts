export const CATEGORIES = [
  { name: "Sedas", count: 18, image: "/seda/noblesmoke_Seda_OCB_slim😉__tabacaria__tabacariadelivery__tabaco__smokes_2026-02-27_DVRqkQkjzcJ_3842039166771607305.jpg", link: "/loja?categoria=Sedas" },
  { name: "Isqueiros", count: 12, image: "/esqueiros/noblesmoke__bicmaxi_2026-01-17_DToLsNoj17K_3812348501376851658.jpg", link: "/loja?categoria=Isqueiros" },
  { name: "Bandejas", count: 15, image: "/bandeja/noblesmoke_Bandejas_RAW_lindíssimas,_garanta_já_a_sua😉__tabacaria__taba_2026-03-28_DWbrWEAjl4c_3862871737533095452.jpg", link: "/loja?categoria=Bandejas" },
  { name: "Dichavadores", count: 8, image: "/dichavador/noblesmoke_Dichavador_fibra_de_coco_personalizado!!_Os_melhores_acessór_2026-02-11_DUo0Cd3jyRQ_3830540351006778448.jpg", link: "/loja?categoria=Dichavadores" },
  { name: "Cases", count: 12, image: "/case/noblesmoke__pochete_2026-01-18_DTp-qNlDpDJ_3812854139227902153.jpg", link: "/loja?categoria=Cases" },
  { name: "Cinzeiros", count: 6, image: "/cinzeiro/noblesmoke_Cinzeiro_Squadafum_redondo_e_quadrado😉_Melhores_acessórios!!_2026-02-10_DUl3DAqD_w_3829709157570706495.jpg", link: "/loja?categoria=Cinzeiros" },
  { name: "Pipes & Bongs", count: 5, image: "/paipe/noblesmoke_Acabou_de_chegar🔥_Modelos_exclusivos,_alta_qualidade_e_acaba_2026-02-25_DVMfmT9jhpy_3840583554455968370.jpg", link: "/loja?categoria=Pipes%20%26%20Bongs" },
  { name: "Jogos", count: 4, image: "/jogos/noblesmoke__baralhocopag_2026-01-18_DTp89_7jpnc_3812846702869518812.jpg", link: "/loja?categoria=Jogos" },
  { name: "Fumo & Ervas", count: 3, image: "/fumo/noblesmoke_O_Kumbaya_Flowers_é_um_blend_de_ervas_e_flores_naturais,_ger_2026-03-18_DWCkOGfD2JV_3855803529693192789.jpg", link: "/loja?categoria=Fumo%20%26%20Ervas" },
  { name: "Kits", count: 5, image: "/kit/noblesmoke_Vem_conferir_essas_cases_recheadas😉__tabacaria__cases__smoki_2026-02-17_DU3SN9pjsX2_3834613732115138038.jpg", link: "/loja?categoria=Kits" },
  { name: "Acessórios", count: 4, image: "/acessorios/noblesmoke_Mocó_Mascotte,_lindo_e_sempre_a_melhor_qualidade_pra_vc😉__ta_2026-02-27_DVRBq5EDmjM_3841859302659614924.jpg", link: "/loja?categoria=Acessórios" },
];

import { Product } from "../store/use-cart-store";

export const PRODUCTS: Product[] = [
  // SEDAS
  {
    id: "1",
    name: "Seda OCB Slim Premium",
    category: "Sedas",
    price: 9.90,
    installments: "à vista",
    rating: 43,
    media: [
      { type: "image" as const, url: "/seda/noblesmoke_Seda_OCB_slim😉__tabacaria__tabacariadelivery__tabaco__smokes_2026-02-27_DVRqkQkjzcJ_3842039166771607305.jpg" }
    ],
    variations: [
      { id: "size", name: "Tamanho", options: ["King Size", "1 1/4"] }
    ],
    description: "Seda OCB Premium com marca d'água original. Combustão lenta e papel ultrafino. Inclui 32 sedas por livreto."
  },
  {
    id: "2",
    name: "Seda Sadhu Slim Longa",
    category: "Sedas",
    price: 8.50,
    installments: "à vista",
    rating: 27,
    media: [
      { type: "image" as const, url: "/seda/noblesmoke_A_seda_Sadhu_Slim_longa_é_um_papel_de_enrolar_premium_da_mar_2026-03-12_DVzTEusj723_3851505994233265591.jpg" }
    ],
    description: "A seda Sadhu Slim longa é um papel de enrolar premium, proporcionando uma experiência superior para suas sessões."
  },
  {
    id: "3",
    name: "Seda RAW Classic & Black",
    category: "Sedas",
    price: 12.90,
    installments: "à vista",
    rating: 120,
    media: [
      { type: "image" as const, url: "/seda/noblesmoke_Mais_novidades_chegando😉_Seda_Raw_Classic_e_Black__tabacaria_2026-02-23_DVGxOZfjlLe_3838972226104611550.jpg" },
      { type: "image" as const, url: "/seda/noblesmoke_Mais_novidades_chegando😉_Seda_Raw_Classic_e_Black__tabacaria_2026-02-23_DVGxOZfjlLe_3838972226104611550_2.jpg" }
    ],
    variations: [
      { id: "linha", name: "Linha", options: ["Classic", "Black Organic"] }
    ],
    description: "Seda Raw original não refinada, livre de cloro. Combustão impecável com marca d'água patenteada cruzada."
  },
  {
    id: "4",
    name: "Seda Bem Bolado Original",
    category: "Sedas",
    price: 6.90,
    installments: "à vista",
    rating: 85,
    media: [
      { type: "image" as const, url: "/seda/noblesmoke__bembolado_2026-01-18_DTp9_b8jv9k_3812851199717080932.jpg" },
      { type: "image" as const, url: "/seda/noblesmoke__bembolado_2026-01-18_DTp_89ljhje_3812859825772959966.jpg" }
    ],
    description: "A marca brasileira que conquistou o mercado. Papel de alta qualidade, goma natural e queima uniforme."
  },
  {
    id: "5",
    name: "Seda Smoking Deluxe",
    category: "Sedas",
    price: 10.90,
    installments: "à vista",
    rating: 112,
    media: [
      { type: "image" as const, url: "/seda/noblesmoke__smokingdeluxe_2026-01-17_DToU46kj8Wf_3812388956680471967.jpg" },
      { type: "image" as const, url: "/seda/noblesmoke__Smokingdeluxe_2026-01-18_DTp_UMADvbh_3812857023751452385.jpg" }
    ],
    description: "Smoking Deluxe é sinônimo de papel ultrafino e queima lenta. Um clássico mundial para os mais exigentes."
  },

  // ISQUEIROS
  {
    id: "6",
    name: "Isqueiro Clipper Colecionável",
    category: "Isqueiros",
    price: 14.90,
    installments: "à vista",
    rating: 64,
    media: [
      { type: "image" as const, url: "/esqueiros/noblesmoke_Isqueiros_Clipper,_Firestar_Fruits_e_Bic😉_sempre_com_os_melh_2026-02-20_DU_Ayh2jsdt_3836788879865595757.jpg" },
      { type: "image" as const, url: "/esqueiros/noblesmoke_Isqueiros_Clipper,_Firestar_Fruits_e_Bic😉_sempre_com_os_melh_2026-02-20_DU_Ayh2jsdt_3836788879865595757_2.jpg" }
    ],
    variations: [
      { id: "estampa", name: "Estampa", options: ["Cores Sólidas", "Trippy", "Classic"] }
    ],
    description: "Clipper recarregável com pilão embutido, ideal para suas sessões. Modelos super colecionáveis e duráveis."
  },
  {
    id: "7",
    name: "Maçarico Zengaz Ajustável",
    category: "Isqueiros",
    price: 89.90,
    installments: "ou 2x de R$ 44,95",
    rating: 33,
    media: [
      { type: "video" as const, url: "/insta/noblesmoke__tabacaria__zippo__tabacariadelivery__perdizespompeia__charu_2026-07-03_DaWNlX9PY39_3933391067503496701.mp4" },
      { type: "image" as const, url: "/esqueiros/noblesmoke__maçaricozengaz_2026-01-17_DToMBxKD56u_3812349982628880046.jpg" }
    ],
    description: "Maçarico premium Zengaz. Chama ajustável e tanque de gás de longa duração. Design ergonômico."
  },
  {
    id: "8",
    name: "Isqueiro Bic Maxi Classic",
    category: "Isqueiros",
    price: 9.00,
    installments: "à vista",
    rating: 215,
    media: [
      { type: "image" as const, url: "/esqueiros/noblesmoke__bicmaxi_2026-01-17_DToLsNoj17K_3812348501376851658.jpg" }
    ],
    description: "O clássico que nunca falha. Até 3000 chamas, seguro e durável."
  },

  // BANDEJAS
  {
    id: "9",
    name: "Bandeja RAW Metálica",
    category: "Bandejas",
    price: 45.90,
    installments: "à vista",
    rating: 56,
    media: [
      { type: "image" as const, url: "/bandeja/noblesmoke_Bandejas_RAW_lindíssimas,_garanta_já_a_sua😉__tabacaria__taba_2026-03-28_DWbrWEAjl4c_3862871737533095452.jpg" },
      { type: "image" as const, url: "/bandeja/noblesmoke_Bandejas_RAW_lindíssimas,_garanta_já_a_sua😉__tabacaria__taba_2026-03-28_DWbrWEAjl4c_3862871737533095452_2.jpg" }
    ],
    variations: [
      { id: "tamanho", name: "Tamanho", options: ["Pequena", "Média", "Grande"] }
    ],
    description: "Bandeja clássica da Raw, produzida em metal super resistente com bordas elevadas."
  },
  {
    id: "10",
    name: "Bandeja Smoking Collection",
    category: "Bandejas",
    price: 42.00,
    installments: "à vista",
    rating: 41,
    media: [
      { type: "image" as const, url: "/bandeja/noblesmoke_Bandejas_Smoking_e_Sadhu,_melhor_qualidade_em_acessórios!!___2026-02-04_DUW39Dnjpjm_3825491021828888806.jpg" },
      { type: "image" as const, url: "/bandeja/noblesmoke_Novidade_por_aqui_bandejas_smoking_lindíssimas👌🏻_Vem_garanti_2026-05-07_DYDARMJFRs3_3891955684246625079.jpg" }
    ],
    description: "Estampas lindíssimas exclusivas da Smoking. Superfície lisa para não grudar nada."
  },

  // CASES & KITS
  {
    id: "11",
    name: "Case Premium Zengaz / Sadhu",
    category: "Cases",
    price: 89.90,
    installments: "ou 2x de R$ 44,95",
    rating: 74,
    media: [
      { type: "image" as const, url: "/case/noblesmoke__guruspirit__sadhu_2026-01-18_DTqCpEIDqhJ_3812871652544260169.jpg" },
      { type: "image" as const, url: "/case/noblesmoke__pochete_2026-01-18_DTp-qNlDpDJ_3812854139227902153.jpg" }
    ],
    variations: [
      { id: "cor", name: "Cor", options: ["Preto", "Camuflado", "Bege"] }
    ],
    description: "Proteja seu kit completo com essa case anti-impacto e anti-odor. Compartimentos internos sob medida."
  },
  {
    id: "12",
    name: "Kit Completo Tabacaria",
    category: "Kits",
    price: 159.90,
    installments: "ou 3x de R$ 53,30",
    rating: 125,
    media: [
      { type: "image" as const, url: "/kit/noblesmoke_Vem_conferir_essas_cases_recheadas😉__tabacaria__cases__smoki_2026-02-17_DU3SN9pjsX2_3834613732115138038.jpg" },
      { type: "image" as const, url: "/kit/noblesmoke_Vem_conferir_essas_cases_recheadas😉__tabacaria__cases__smoki_2026-02-17_DU3SN9pjsX2_3834613732115138038_2.jpg" }
    ],
    description: "O kit definitivo: Case recheada com dichavador, sedas premium, piteiras e isqueiro. Tudo combinando."
  },

  // DICHAVADORES E ACESSÓRIOS
  {
    id: "13",
    name: "Dichavador Fibra de Coco",
    category: "Dichavadores",
    price: 35.00,
    installments: "à vista",
    rating: 66,
    media: [
      { type: "image" as const, url: "/dichavador/noblesmoke_Dichavador_fibra_de_coco_personalizado!!_Os_melhores_acessór_2026-02-11_DUo0Cd3jyRQ_3830540351006778448.jpg" },
      { type: "image" as const, url: "/dichavador/noblesmoke_Design_exclusivo,_acabamento_impecável_e_aquele_toque_que_fa_2026-02-25_DVL2XnHjhmx_3840402224325728689.jpg" }
    ],
    description: "Ecológico, leve e eficiente. Possui 3 partes com reservatório."
  },
  {
    id: "14",
    name: "Mocó Mascotte Porta-Beck",
    category: "Acessórios",
    price: 12.50,
    installments: "à vista",
    rating: 98,
    media: [
      { type: "image" as const, url: "/acessorios/noblesmoke_Mocó_Mascotte,_lindo_e_sempre_a_melhor_qualidade_pra_vc😉__ta_2026-02-27_DVRBq5EDmjM_3841859302659614924.jpg" }
    ],
    description: "Leve seu ritual pronto para qualquer lugar sem amassar e disfarçando odores. Vedação perfeita."
  },
  {
    id: "15",
    name: "Cinzeiro Squadafum Resina",
    category: "Cinzeiros",
    price: 49.90,
    installments: "à vista",
    rating: 45,
    media: [
      { type: "image" as const, url: "/cinzeiro/noblesmoke_Cinzeiro_Squadafum_redondo_e_quadrado😉_Melhores_acessórios!!_2026-02-10_DUl3DAqD_w_3829709157570706495.jpg" }
    ],
    variations: [
      { id: "formato", name: "Formato", options: ["Redondo", "Quadrado"] }
    ],
    description: "Cinzeiros inquebráveis de silicone premium da Squadafum. Fáceis de lavar e não marcam com a brasa."
  },

  // PIPES & BONGS
  {
    id: "16",
    name: "Pipe Vidro Exclusivo",
    category: "Pipes & Bongs",
    price: 65.00,
    installments: "ou 2x de R$ 32,50",
    rating: 32,
    media: [
      { type: "image" as const, url: "/paipe/noblesmoke_Acabou_de_chegar🔥_Modelos_exclusivos,_alta_qualidade_e_acaba_2026-02-25_DVMfmT9jhpy_3840583554455968370.jpg" },
      { type: "image" as const, url: "/paipe/noblesmoke_Aqui_vc_encontra_a_maior_variedade_de_produtos,_sempre_da_me_2026-02-16_DU0us82DmnC_3833894581927045570.jpg" }
    ],
    description: "Pipes de vidro espesso (borossilicato) com design ergonômico. Resfria a fumaça proporcionando um hit mais suave."
  },

  // JOGOS E ENTRETENIMENTO
  {
    id: "17",
    name: "Baralho Copag 139",
    category: "Jogos",
    price: 22.00,
    installments: "à vista",
    rating: 88,
    media: [
      { type: "image" as const, url: "/jogos/noblesmoke__baralhocopag_2026-01-18_DTp89_7jpnc_3812846702869518812.jpg" }
    ],
    description: "Para acompanhar sua sessão com os amigos. Baralho Copag clássico, naipe grande."
  },
  {
    id: "18",
    name: "Dominó Profissional Osso",
    category: "Jogos",
    price: 45.00,
    installments: "à vista",
    rating: 41,
    media: [
      { type: "image" as const, url: "/jogos/noblesmoke__Dominó_2026-01-18_DTp-fzGDpsk_3812853423595756324.jpg" },
      { type: "image" as const, url: "/jogos/noblesmoke__domino_2026-01-18_DTp7txxDm9A_3812841190102822720.jpg" }
    ],
    description: "Jogo de dominó com peças maciças e estojo. Diversão garantida."
  },

  // FUMO
  {
    id: "19",
    name: "Blend Kumbaya Flowers",
    category: "Fumo & Ervas",
    price: 28.90,
    installments: "à vista",
    rating: 110,
    media: [
      { type: "image" as const, url: "/fumo/noblesmoke_O_Kumbaya_Flowers_é_um_blend_de_ervas_e_flores_naturais,_ger_2026-03-18_DWCkOGfD2JV_3855803529693192789.jpg" }
    ],
    description: "Blend aromático de ervas e flores naturais sem tabaco e sem nicotina. Sabor leve e perfumado."
  }
];