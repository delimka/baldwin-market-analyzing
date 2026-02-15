import "@/app/globals.css";
import { Providers } from "@/app/providers/react-query";
import MainLayot from "@/app/layouts/MainLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainLayot>{children}</MainLayot>
        </Providers>
      </body>
    </html>
  );
}
