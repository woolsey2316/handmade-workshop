import { PageHero } from "@/components/blog/PageHero";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="Checkout"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Checkout" },
          ]}
        />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <CheckoutForm />
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
