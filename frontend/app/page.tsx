import { BlogSection } from "@/components/home/BlogSection";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { Hero } from "@/components/home/Hero";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Partners } from "@/components/home/Partners";
import { PromoRow } from "@/components/home/PromoRow";
import { PromoStrips } from "@/components/home/PromoStrips";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PromoRow />
        <NewArrivals />
        <FeaturedCollection />
        <CategoryTiles />
        <BlogSection />
        <PromoStrips />
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
