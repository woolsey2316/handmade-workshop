import { PageHero } from "@/components/blog/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactIntro } from "@/components/contact/ContactIntro";
import { ContactMap } from "@/components/contact/ContactMap";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="Contact"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact" },
          ]}
        />
        <ContactMap />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <ContactIntro />
            <ContactForm />
          </div>
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
