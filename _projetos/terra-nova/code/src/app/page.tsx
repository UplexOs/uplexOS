import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Features } from "@/components/sections/Features"
import { MenuPreview } from "@/components/sections/MenuPreview"
import { LocationAndFooter } from "@/components/sections/LocationAndFooter"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Features />
      <MenuPreview />
      <LocationAndFooter />
    </main>
  );
}
