import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/account/ResetPasswordForm";
import { PageHero } from "@/components/blog/PageHero";
import { Partners } from "@/components/home/Partners";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function ResetPasswordPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          title="Reset Password"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Reset Password" },
          ]}
        />
        <section className="mx-auto max-w-300 px-5 py-12 md:py-16">
          <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
            <ResetPasswordForm />
          </Suspense>
        </section>
        <Partners />
      </main>
      <SiteFooter />
    </>
  );
}
