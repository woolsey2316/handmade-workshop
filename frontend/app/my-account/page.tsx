import { AccountDashboard } from "@/components/account/AccountDashboard";
import { PageHero } from "@/components/blog/PageHero";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function MyAccountPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="My Account"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "My Account" },
          ]}
        />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <AccountDashboard />
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
