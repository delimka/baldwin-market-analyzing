import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { NavBar } from "./NavBar";

export function MainPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
