import { Footer } from "@/shared/components/Footer";
import { NavBar } from "@/shared/components/NavBar";

export default function MainLayot({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <Footer />
    </div>
  );
}
