'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Header } from "@/components/layout/Header"
import { LocationAndFooter } from "@/components/sections/LocationAndFooter"
import { ArrowUp, Heart, MessageCircle, Share2, MapPin, ChevronLeft, Bookmark, Music2, X, ChevronRight, ArrowDown } from 'lucide-react'

// ---------- DADOS INICIAIS ----------
const categories = [
  {
    name: "Peixes & Opções Leves",
    emoji: "🐟",
    items: [
      {
        id: 1,
        images: [
          "/insta/restaurante_terranova_✨_Sabor_leve,_fresco_e_surpreendente!_Hoje_o_destaque_é_a_no_2025-08-02_DM2pVRWgiox_36903187263239.jpg"
        ],
        title: "Tilápia Grelhada ao Molho de Ervas",
        description: "Sabor leve, fresco e surpreendente. Acompanha arroz branco, purê de batatas cremoso e salada fresca da casa.",
        price: "R$ 42,90",
        tags: ["Peixe Fresco", "Molho de Ervas", "Opção Leve"],
        likes: 128,
        date: "02 Ago"
      },
      {
        id: 2,
        images: [
          "/insta/restaurante_terranova_🥓_Suculento,_crocante_e_cheio_de_sabor!_Nosso_Filé_de_Frango_2025-09-01_DOEJEjygF_B_37121318885848.jpg"
        ],
        title: "Salada Completa Terra Nova",
        description: "Mix de folhas verdes frescas, tomate cereja, crótons artesanais e molho mostarda e mel da casa.",
        price: "R$ 28,90",
        tags: ["Fitness", "Vegetariano"],
        likes: 98,
        date: "22 Nov"
      }
    ]
  },
  {
    name: "Carnes & Aves",
    emoji: "🥩",
    items: [
      {
        id: 3,
        images: [
          "/insta/restaurante_terranova_🥓_Suculento,_crocante_e_cheio_de_sabor!_Nosso_Filé_de_Frango_2025-09-01_DOEJEjygF_B_37121318885848.jpg",
          "/insta/restaurante_terranova_🥩Suculento,_macio_e_cheio_de_sabor!_Nosso_Contra_Filé_Acebol_2025-10-11_DPrVuXjAFze_37411794608172.jpg"
        ],
        title: "Filé de Frango Crocante com Bacon",
        description: "Suculento por dentro, extremamente crocante por fora! Servido com feijão tropeiro especial, arroz soltinho e couve refogada.",
        price: "R$ 38,90",
        tags: ["Frango Empanado", "Bacon Crocante"],
        likes: 245,
        date: "01 Set"
      },
      {
        id: 4,
        images: [
          "/insta/restaurante_terranova_🥩Suculento,_macio_e_cheio_de_sabor!_Nosso_Contra_Filé_Acebol_2025-10-11_DPrVuXjAFze_37411794608172.jpg"
        ],
        title: "Contra Filé Acebolado",
        description: "Nosso carro chefe! Suculento, macio e cheio de sabor. Grelhado no ponto perfeito com cebolas caramelizadas na chapa.",
        price: "R$ 45,90",
        tags: ["Carne Macia", "Mais Pedido"],
        likes: 312,
        date: "11 Out"
      },
      {
        id: 5,
        images: [
          "/insta/restaurante_terranova_✨_Sabor_leve,_fresco_e_surpreendente!_Hoje_o_destaque_é_a_no_2025-08-02_DM2pVRWgiox_36903187263239.jpg"
        ],
        title: "Filé Mignon ao Molho Madeira",
        description: "Corte nobre servido com molho artesanal de champignon. Acompanha arroz à grega e fritas rústicas.",
        price: "R$ 52,90",
        tags: ["Carne Nobre", "Especial"],
        likes: 156,
        date: "15 Nov"
      }
    ]
  },
  {
    name: "Massas Clássicas",
    emoji: "🍝",
    items: [
      {
        id: 6,
        images: [
          "/insta/restaurante_terranova_🍝_Clássico,_prático_e_saboroso!_Nosso_Espaguete_ao_Sugo_é_a_2025-08-20_DNlip4xgQ_w_370351868062210.jpg"
        ],
        title: "Espaguete ao Sugo",
        description: "Clássico, prático e saboroso! Massa fresca envolta em molho de tomates artesanal cozido por 4 horas.",
        price: "R$ 34,90",
        tags: ["Molho Artesanal", "Vegetariano"],
        likes: 189,
        date: "20 Ago"
      }
    ]
  }
]

// Lista de emojis aleatórios para perfil
const profileEmojis = ["🦊", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐙", "🍉", "🍓", "🍒", "🍎", "🥝", "🥑", "🥕", "🌽"]

// Monta o feed FLAT com separadores de categoria entre grupos
type FeedItem =
  | { type: 'category'; name: string; emoji: string }
  | { type: 'dish'; categoryName: string; id: number; images: string[]; title: string; description: string; price: string; tags: string[]; likes: number; date: string }

const ALL_ITEMS = categories.flatMap(c => c.items)

function buildFeed(): FeedItem[] {
  const feed: FeedItem[] = []
  for (const cat of categories) {
    feed.push({ type: 'category', name: cat.name, emoji: cat.emoji })
    for (const item of cat.items) {
      feed.push({ type: 'dish', categoryName: cat.name, ...item })
    }
  }
  return feed
}

const FEED = buildFeed()

function getGridItems() {
  return categories.map(cat => ({
    categoryName: cat.name,
    emoji: cat.emoji,
    items: cat.items
  }))
}

// Interfaces para os Comentários
interface Comment {
  id: string
  dishId: number
  username: string
  avatarEmoji: string
  text: string
  date: string
}

export default function CardapioProfile() {
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [overlayStartIndex, setOverlayStartIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0)

  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [saved, setSaved] = useState<Record<number, boolean>>({})

  // Estado para controlar a imagem atual de cada prato no carrossel
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({})

  // Estado dos Comentários ("Mini banco JSON em memória")
  const [commentsData, setCommentsData] = useState<Comment[]>([
    { id: '1', dishId: 1, username: 'Maria Silva', avatarEmoji: "🦊", text: 'Nossa, parece delicioso! Vou pedir amanhã.', date: '1d' },
    { id: '2', dishId: 3, username: 'João Pedro', avatarEmoji: "🐼", text: 'Melhor frango da vida, recomendo demais.', date: '2d' }
  ])
  const [commentsOverlayOpen, setCommentsOverlayOpen] = useState(false)
  const [activeDishId, setActiveDishId] = useState<number | null>(null)

  // Controle do form de comentário e popup de nome
  const [newCommentText, setNewCommentText] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [showNamePopup, setShowNamePopup] = useState(false)

  // Efeito principal do scroll do TikTok
  useEffect(() => {
    if (overlayOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        containerRef.current?.scrollTo({ top: overlayStartIndex * window.innerHeight, behavior: 'auto' })
      }, 30)
    } else {
      document.body.style.overflow = 'auto'
      setCommentsOverlayOpen(false) // fecha comentários se fechar o overlay principal
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [overlayOpen, overlayStartIndex])

  useEffect(() => {
    if (!overlayOpen || commentsOverlayOpen || showNamePopup) return // não escuta scroll se modais abertos
    const handleScroll = () => {
      if (!containerRef.current) return
      const { scrollTop, clientHeight } = containerRef.current
      const newIndex = Math.round(scrollTop / clientHeight)
      if (newIndex !== scrollActiveIndex && newIndex >= 0 && newIndex < FEED.length) {
        setScrollActiveIndex(newIndex)
      }
    }
    const container = containerRef.current
    container?.addEventListener('scroll', handleScroll, { passive: true })
    return () => container?.removeEventListener('scroll', handleScroll)
  }, [scrollActiveIndex, overlayOpen, commentsOverlayOpen, showNamePopup])

  // Efeito de autoplay para o carrossel de imagens dentro do prato ativo
  useEffect(() => {
    if (!overlayOpen || commentsOverlayOpen || showNamePopup) return

    const activeItem = FEED[scrollActiveIndex]
    if (activeItem?.type !== 'dish' || activeItem.images.length <= 1) return

    const intervalId = setInterval(() => {
      setCurrentImageIndex(prev => {
        const currentIndex = prev[activeItem.id] || 0
        const nextIndex = (currentIndex + 1) % activeItem.images.length

        // Fazer scroll suave do container para refletir o novo index
        const containers = document.querySelectorAll('.overflow-x-auto')
        const activeContainer = containers[scrollActiveIndex] as HTMLDivElement
        if (activeContainer) {
          activeContainer.scrollTo({
            left: nextIndex * activeContainer.clientWidth,
            behavior: 'smooth'
          })
        }

        return { ...prev, [activeItem.id]: nextIndex }
      })
    }, 4000) // Muda a imagem a cada 4 segundos

    return () => clearInterval(intervalId)
  }, [scrollActiveIndex, overlayOpen, commentsOverlayOpen, showNamePopup])

  // Ações
  const toggleLike = (id: number) => setLiked(prev => ({ ...prev, [id]: !prev[id] }))
  const toggleSave = (id: number) => setSaved(prev => ({ ...prev, [id]: !prev[id] }))

  const handleShare = async (title: string, description: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Restaurante Terra Nova - ${title}`,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Compartilhamento cancelado ou falhou", err);
      }
    } else {
      // Fallback: copiar para área de transferência
      navigator.clipboard.writeText(`${title} - Terra Nova\n${window.location.href}`)
      alert("Link copiado para a área de transferência!")
    }
  }

  const handlePrevImage = (e: React.MouseEvent, dishId: number, imagesLength: number) => {
    e.stopPropagation()
    setCurrentImageIndex(prev => {
      const currentIndex = prev[dishId] || 0
      const prevIndex = (currentIndex - 1 + imagesLength) % imagesLength
      return { ...prev, [dishId]: prevIndex }
    })
  }

  const handleNextImage = (e: React.MouseEvent, dishId: number, imagesLength: number) => {
    e.stopPropagation()
    setCurrentImageIndex(prev => {
      const currentIndex = prev[dishId] || 0
      const nextIndex = (currentIndex + 1) % imagesLength
      return { ...prev, [dishId]: nextIndex }
    })
  }

  // --- Funções de Comentários ---
  const openComments = (dishId: number) => {
    setActiveDishId(dishId)
    setCommentsOverlayOpen(true)
  }

  const closeComments = () => {
    setCommentsOverlayOpen(false)
    setNewCommentText('')
    setShowNamePopup(false)
  }

  const handleInitialCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCommentText.trim()) return
    // Abre o popup pedindo o nome
    setShowNamePopup(true)
  }

  const handleFinalPostComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCommentText.trim() || !activeDishId) return
    if (!usernameInput.trim()) {
      alert("Por favor, digite seu nome.")
      return
    }

    const randomEmoji = profileEmojis[Math.floor(Math.random() * profileEmojis.length)]

    const newComment: Comment = {
      id: Date.now().toString(),
      dishId: activeDishId,
      username: usernameInput.trim(),
      avatarEmoji: randomEmoji,
      text: newCommentText.trim(),
      date: 'Agora'
    }

    try {
      // Tenta salvar via API route
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
      }).catch(err => console.log('Mocked API error', err));
    } catch (error) {
      console.error("Erro ao salvar comentário na API", error);
    }

    setCommentsData(prev => [...prev, newComment])
    setNewCommentText('')
    setUsernameInput('')
    setShowNamePopup(false)
  }

  // Buscar os comentários na inicialização
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments').catch(() => null);
        if (response && response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setCommentsData(data);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar comentários:", error);
      }
    }
    fetchComments();
  }, []);

  const gridGroups = getGridItems()
  const currentDishComments = commentsData.filter(c => c.dishId === activeDishId)

  return (
    <div className="bg-[#FAF5EE] min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <Header />

      {/* IG Profile */}
      <main className="flex-1 w-full max-w-[935px] mx-auto pt-8 md:pt-16 pb-20 px-4 sm:px-6">

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16 mb-12 border-b border-neutral-200/60 pb-12">
          <div className="shrink-0">
            <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full p-1 border-[3px] border-[#A62B31]">
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img src="/logo/logo.png" alt="Terra Nova" className="w-[70%] object-contain" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 w-full">
              <h1 className="font-[var(--font-display)] text-[24px] md:text-[28px] text-[#211B18]">restaurante_terranova</h1>
            </div>
            <div className="hidden md:flex gap-10 mb-6 font-[var(--font-body)] text-[16px] text-[#211B18]">
              <div><span className="font-bold">{ALL_ITEMS.length}</span> publicações</div>
              <div><span className="font-bold">12.4k</span> seguidores</div>
              <div><span className="font-bold">145</span> seguindo</div>
            </div>
            <div className="font-[var(--font-body)] text-[15px] text-[#211B18] max-w-[400px]">
              <div className="font-bold mb-1">Restaurante Terra Nova</div>
              <div className="text-neutral-600 mb-2">Restaurante · Perdizes</div>
              <div className="mb-3 text-neutral-700">Resgatando o sabor da comida caseira com um toque contemporâneo. 🥘🌿<br/>Seg–Sex: 11h–15h30 | Sáb: 11h30–15h30</div>
              <div className="text-[#A62B31] font-bold flex items-center justify-center md:justify-start gap-1">
                <MapPin className="w-4 h-4" /> Rua Apinajés, 734 – Perdizes
              </div>
            </div>
          </div>

          <div className="flex md:hidden justify-center gap-8 w-full border-t border-neutral-200 pt-4 mt-2 text-[14px] text-[#211B18]">
            <div className="text-center"><div className="font-bold text-[16px]">{ALL_ITEMS.length}</div><div className="text-neutral-500 text-[12px]">posts</div></div>
            <div className="text-center"><div className="font-bold text-[16px]">12.4k</div><div className="text-neutral-500 text-[12px]">seguidores</div></div>
            <div className="text-center"><div className="font-bold text-[16px]">145</div><div className="text-neutral-500 text-[12px]">seguindo</div></div>
          </div>
        </div>

        {/* Categorias + Grid */}
        <div className="flex flex-col gap-14 pt-2">
          {gridGroups.map((group) => {
            return (
              <div key={group.categoryName}>
                {/* Título da categoria */}
                <div className="flex items-center gap-3 mb-5 border-b border-neutral-200 pb-3">
                  <span className="text-2xl">{group.emoji}</span>
                  <h3 className="font-[var(--font-display)] text-[22px] md:text-[24px] font-bold text-[#211B18]">{group.categoryName}</h3>
                </div>

                {/* Grade 3 colunas */}
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  {group.items.map((item) => {
                    // Encontra o índice no FEED global para abrir no lugar certo
                    const feedIndex = FEED.findIndex(f => f.type === 'dish' && f.id === item.id)
                    const commentsCount = commentsData.filter(c => c.dishId === item.id).length

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setOverlayStartIndex(feedIndex)
                          setScrollActiveIndex(feedIndex)
                          setOverlayOpen(true)
                        }}
                        className="relative aspect-square bg-neutral-200 cursor-pointer group overflow-hidden md:rounded-[12px]"
                      >
                        <img
                          src={item.images[0]} // Mostra a primeira imagem na grade
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Se tiver mais de uma imagem, mostrar ícone de carrossel no canto superior direito */}
                        {item.images.length > 1 && (
                          <div className="absolute top-2 right-2 p-1 rounded-sm shadow-sm bg-black/30">
                            <svg aria-label="Carrossel" className="fill-white" height="22" role="img" viewBox="0 0 48 48" width="22">
                              <path d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1.6 1.5 3.7 2.4 6 2.4h13.4c5.5 0 10-4.5 10-10V18.1c0-2.3-.9-4.4-2.4-6-.4-.4-1.1-.1-1.1.5z"></path>
                            </svg>
                          </div>
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white">
                          <Heart className="w-6 h-6 fill-white" />
                          <span className="font-bold text-sm">{item.likes + (liked[item.id] ? 1 : 0)}</span>
                          <span className="flex items-center gap-1 mt-1 text-sm"><MessageCircle className="w-4 h-4 fill-white"/> {commentsCount}</span>
                        </div>
                        {/* Badge de preço */}
                        <div className="absolute bottom-2 left-2 bg-[#A62B31] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow">
                          {item.price}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      <LocationAndFooter />

      {/* ──────────────── TIKTOK OVERLAY ──────────────── */}
      {overlayOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">

          {/* Header Overlay */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-4 pb-8 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
            <button
              onClick={() => setOverlayOpen(false)}
              className="pointer-events-auto flex items-center gap-2 text-white"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </button>
            <div className="font-[var(--font-display)] text-white/90 font-bold text-base uppercase tracking-wider pointer-events-none">
              {/* Vazio ou logotipo opcional */}
            </div>
          </div>

          {/* Scroll Container */}
          <div
            ref={containerRef}
            className={`w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar ${commentsOverlayOpen ? 'pointer-events-none' : ''}`}
          >
            {FEED.map((slide, index) => {

              // ── TELA DE CATEGORIA (separador) ──
              if (slide.type === 'category') {
                return (
                  <div
                    key={`cat-${slide.name}`}
                    className="w-full h-[100dvh] snap-center relative flex flex-col items-center justify-center bg-[#A62B31] overflow-hidden"
                  >
                    {/* Padrão decorativo */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:32px_32px]" />
                    <div
                      className={`flex flex-col items-center gap-6 transition-all duration-700 transform ${
                        index === scrollActiveIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                    >
                      <span className="text-[80px] md:text-[100px] leading-none">{slide.emoji}</span>
                      <div className="h-[2px] w-[80px] bg-white/50 rounded-full" />
                      <h2 className="font-[var(--font-display)] text-[40px] md:text-[64px] font-bold text-white text-center px-8 leading-tight">
                        {slide.name}
                      </h2>
                      <p className="text-white/70 font-[var(--font-body)] text-[14px] uppercase tracking-[0.2em] font-bold animate-bounce mt-4">
                        Deslize para ver os pratos
                      </p>
                    </div>
                  </div>
                )
              }

              // ── TELA DE PRATO ──
              const dish = slide
              const isActive = index === scrollActiveIndex
              const isLiked = liked[dish.id] ?? false
              const isSaved = saved[dish.id] ?? false
              const commentsCount = commentsData.filter(c => c.dishId === dish.id).length
              const imageIndex = currentImageIndex[dish.id] || 0

              return (
                <div
                  key={`dish-${dish.id}`}
                  className="w-full h-[100dvh] snap-center relative flex items-end justify-center overflow-hidden bg-black group"
                >
                  {/* Foto de fundo (fullscreen) com arrastar */}
                  <div
                    className="absolute inset-0 w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                    onScroll={(e) => {
                      // Opcional: Atualizar o ponto caso o user faça scroll manual do carrossel
                      const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
                      const clientWidth = (e.target as HTMLDivElement).clientWidth;
                      const newIdx = Math.round(scrollLeft / clientWidth);
                      if (newIdx !== imageIndex) {
                        setCurrentImageIndex(prev => ({ ...prev, [dish.id]: newIdx }))
                      }
                    }}
                  >
                    {dish.images.map((imgSrc, imgIdx) => (
                      <div
                        key={imgIdx}
                        className="w-full h-full flex-shrink-0 snap-center flex justify-center items-center"
                      >
                        <img
                          src={imgSrc}
                          alt={`${dish.title} - ${imgIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navegação Manual (setas) nas laterais apenas quando hover (se >1 imagem) */}
                  {dish.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                           e.stopPropagation();
                           const container = e.currentTarget.parentElement?.querySelector('.overflow-x-auto');
                           if (container) {
                             container.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
                           }
                        }}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 md:group-hover:opacity-100' : 'opacity-0'}`}
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                           e.stopPropagation();
                           const container = e.currentTarget.parentElement?.querySelector('.overflow-x-auto');
                           if (container) {
                             container.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
                           }
                        }}
                        className={`absolute right-16 md:right-24 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 md:group-hover:opacity-100' : 'opacity-0'}`}
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}

                  {/* Gradiente de baixo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* ── SIDEBAR DIREITA (estilo TikTok) ── */}
                  <div className="absolute right-3 bottom-28 md:right-6 md:bottom-32 flex flex-col items-center gap-6 z-20">
                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-full border-[2px] border-white overflow-hidden bg-white">
                        <img src="/logo/logo.png" alt="logo" className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="w-5 h-5 rounded-full bg-[#A62B31] flex items-center justify-center -mt-3 border border-black">
                        <span className="text-white text-[10px] font-bold">+</span>
                      </div>
                    </div>

                    {/* Like */}
                    <button onClick={() => toggleLike(dish.id)} className="flex flex-col items-center gap-1">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${isLiked ? 'scale-125' : ''}`}>
                        <Heart className={`w-8 h-8 transition-colors ${isLiked ? 'fill-[#A62B31] stroke-[#A62B31]' : 'fill-white/80 stroke-white'}`} />
                      </div>
                      <span className="text-white text-[12px] font-bold">{dish.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    {/* Comentar */}
                    <button onClick={() => openComments(dish.id)} className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 fill-white/80 stroke-white" />
                      </div>
                      <span className="text-white text-[12px] font-bold">{commentsCount}</span>
                    </button>

                    {/* Salvar */}
                    <button onClick={() => toggleSave(dish.id)} className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center">
                        <Bookmark className={`w-7 h-7 transition-colors ${isSaved ? 'fill-[#A62B31] stroke-[#A62B31]' : 'stroke-white fill-white/80'}`} />
                      </div>
                    </button>

                    {/* Compartilhar */}
                    <button onClick={() => handleShare(dish.title, dish.description)} className="flex flex-col items-center gap-1">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center">
                        <Share2 className="w-7 h-7 stroke-white" />
                      </div>
                      <span className="text-white text-[12px] font-bold">Enviar</span>
                    </button>

                    {/* Disco musical (decorativo) */}
                    <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-neutral-800 flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                      <Music2 className="w-4 h-4 text-white/60" />
                    </div>
                  </div>

                  {/* ── INFORMAÇÕES EMBAIXO (estilo TikTok) ── */}
                  <div
                    className={`relative z-10 w-full max-w-[calc(100%-80px)] md:max-w-[calc(100%-100px)] pb-10 md:pb-14 px-4 md:px-8 transition-all duration-700 transform ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    {/* Indicadores de página estilo Story/Instagram se houver múltiplas imagens */}
                    {dish.images.length > 1 && (
                      <div className="flex items-center gap-1.5 mb-4">
                        {dish.images.map((_, dotIdx) => (
                          <div
                            key={dotIdx}
                            className={`h-[3px] rounded-full transition-all duration-300 ${dotIdx === imageIndex ? 'w-5 bg-white' : 'w-2 bg-white/40'}`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Categoria */}
                    <div className="inline-flex items-center gap-1.5 bg-[#A62B31] text-white text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-3">
                      {dish.categoryName}
                    </div>

                    {/* Nome do usuário */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-bold text-[15px]">@restaurante_terranova</span>
                      <span className="text-white/50 text-[13px]">· {dish.date}</span>
                    </div>

                    {/* Título */}
                    <h2 className="font-[var(--font-display)] text-[28px] md:text-[36px] font-bold text-white leading-[1.1] mb-2">
                      {dish.title}
                    </h2>

                    {/* Descrição */}
                    <p className="text-white/80 font-[var(--font-body)] text-[13px] md:text-[15px] leading-[1.5] mb-4 line-clamp-2">
                      {dish.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dish.tags.map(tag => (
                        <span key={tag} className="text-white/70 text-[13px] font-bold">#{tag.toLowerCase().replace(/ /g,'')}</span>
                      ))}
                    </div>

                    {/* Preço */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="font-[var(--font-display)] font-bold text-[28px] text-white">{dish.price}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* OVERLAY DE COMENTÁRIOS (Slide UP) */}
          <div
            className={`fixed inset-x-0 bottom-0 z-50 bg-[#FAF5EE] text-[#211B18] rounded-t-3xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col h-[70vh] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] ${
              commentsOverlayOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {/* Header Comentários */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 shrink-0">
              <div className="font-[var(--font-display)] font-bold text-[18px]">
                {currentDishComments.length} Comentários
              </div>
              <button onClick={closeComments} className="p-2 hover:bg-neutral-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de Comentários */}
            <div className="flex-1 overflow-y-auto px-6 py-4 font-[var(--font-body)]">
              {currentDishComments.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400">
                  <MessageCircle className="w-12 h-12 mb-2 opacity-50" />
                  <p>Seja o primeiro a comentar!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {currentDishComments.map(comment => (
                    <div key={comment.id} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-neutral-200 shrink-0 flex items-center justify-center text-2xl shadow-sm">
                        {comment.avatarEmoji || "👤"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-[14px] text-[#211B18]">{comment.username}</span>
                          <span className="text-[12px] text-neutral-500">{comment.date}</span>
                        </div>
                        <p className="text-[14px] leading-relaxed text-[#4D423C]">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Formulário de Novo Comentário */}
            <form onSubmit={handleInitialCommentSubmit} className="p-4 border-t border-neutral-200 bg-white shrink-0 pb-safe">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Adicione um comentário..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 bg-neutral-100 border-none rounded-full px-4 py-3 text-[14px] font-[var(--font-body)] focus:ring-2 focus:ring-[#A62B31] outline-none"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="bg-[#A62B31] text-white w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#8A2127] transition-colors"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* POPUP: Pedir nome do usuário após digitar o comentário */}
          {showNamePopup && (
            <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-[24px] p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#FAF0ED] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-[#A62B31] fill-[#A62B31]" />
                  </div>
                  <h3 className="font-[var(--font-display)] text-[24px] font-bold text-[#211B18] mb-2">Obrigado por deixar sua avaliação!</h3>
                  <p className="text-neutral-500 text-[14px] font-[var(--font-body)]">Pode me dizer o seu primeiro nome?</p>
                </div>

                <form onSubmit={handleFinalPostComment} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    autoFocus
                    className="w-full bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-3.5 text-[15px] font-[var(--font-body)] focus:bg-white focus:border-[#A62B31] focus:ring-1 focus:ring-[#A62B31] outline-none transition-all"
                    required
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowNamePopup(false)}
                      className="flex-1 py-3.5 px-4 rounded-xl font-bold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={!usernameInput.trim()}
                      className="flex-1 py-3.5 px-4 rounded-xl font-bold text-white bg-[#A62B31] hover:bg-[#8A2127] disabled:opacity-50 transition-colors"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}} />
    </div>
  )
}
