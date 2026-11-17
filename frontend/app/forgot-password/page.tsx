import { ForgotPasswordForm } from "@/components/account/ForgotPasswordForm";
import { PageHero } from "@/components/blog/PageHero";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function ForgotPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="Forgot Password"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Forgot Password" },
          ]}
        />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <ForgotPasswordForm />
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
