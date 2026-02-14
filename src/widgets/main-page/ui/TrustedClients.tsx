import { companiesLogo } from "../model";
import Marquee from "react-fast-marquee";

export function TrustedClients() {
  return (
    <section className="py-6">
      <div className="text-center">
        <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by teams tracking fast markets
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Crypto desks, quant teams, and research analysts.
        </p>
      </div>

      <div className="relative mt-8 overflow-hidden">
        {/* fade left */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 lg:w-20 bg-gradient-to-r from-[hsl(var(--background))] to-transparent" />
        {/* fade right */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 lg:w-20 bg-gradient-to-l from-[hsl(var(--background))] to-transparent" />

        <Marquee speed={25} gradient={false} pauseOnHover autoFill>
          <div className="flex items-center">
            {companiesLogo.map((company) => (
              <div
                key={company.name}
                className="mx-10 opacity-70 transition hover:opacity-100"
                title={company.name}
                aria-label={company.name}
              >
                {company.logo}
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}


