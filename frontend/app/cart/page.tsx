import { PageHero } from "@/components/blog/PageHero";
import { CartContents } from "@/components/cart/CartContents";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="Cart"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Cart" },
          ]}
        />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <CartContents />
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
