import { AccountAuthForms } from "@/components/account/AccountAuthForms";
import { PageHero } from "@/components/blog/PageHero";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="Login"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Login" },
          ]}
        />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <AccountAuthForms />
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}