import { PageHero } from "@/components/blog/PageHero";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { ShopSidebar } from "@/components/shop/ShopSidebar";

export default function ShopPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="Shop"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Shop" },
          ]}
        />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-14">
            <ShopSidebar />
            <ShopCatalog />
          </div>
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
