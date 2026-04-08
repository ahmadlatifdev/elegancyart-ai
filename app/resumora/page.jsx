import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "ATS Resume",
    description:
      "Professionally optimized resume structure prepared for modern applicant tracking systems.",
    href: "/resumora/services#ats-resume",
  },
  {
    title: "Cover Letter",
    description:
      "Premium targeted cover letters aligned to role, industry, and employer profile.",
    href: "/resumora/services#cover-letter",
  },
  {
    title: "LinkedIn Optimization",
    description:
      "Profile positioning, summary refinement, and recruiter-facing improvements.",
    href: "/resumora/services#linkedin-optimization",
  },
  {
    title: "Executive Resume",
    description:
      "Luxury executive presentation for leadership, director, and senior-level applications.",
    href: "/resumora/services#executive-resume",
  },
  {
    title: "Interview Preparation",
    description:
      "Role-focused interview preparation with structured coaching, question rehearsal, and answer refinement.",
    href: "/resumora/services#interview-preparation",
  },
  {
    title: "Priority Delivery",
    description:
      "Accelerated delivery service for urgent professional applications with prioritized turnaround handling.",
    href: "/resumora/services#priority-delivery",
  },
];

const actions = [
  { title: "Create Resume", href: "/resumora/register" },
  { title: "Explore Services", href: "/resumora/services" },
  { title: "Contact Support", href: "/contact" },
  { title: "Privacy", href: "/privacy" },
];

export default function ResumoraPage() {
  return (
    <main className="min-h-screen bg-[#020b1c] text-white">
      <section className="border-b border-[#13213c] bg-[linear-gradient(180deg,#03112b_0%,#020b1c_100%)]">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/resumora"
              className="flex items-center gap-3 rounded-xl border border-[#20345c] bg-[#07152c] px-4 py-3 transition hover:border-[#bfa14a]"
              aria-label="Resumora Home"
            >
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#bfa14a] bg-[#0b1730]">
                <Image
                  src="/resumora-logo.png"
                  alt="Resumora Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-medium text-[#d6b45a]">Resumora</div>
                <div className="text-xs text-[#9fb0d1]">Premium Career Platform</div>
              </div>
            </Link>

            <div className="rounded-full border border-[#29406d] bg-[#07152c] px-4 py-2 text-sm font-semibold text-[#f4c84d]">
              EN / FR
            </div>
          </div>

          <div className="mt-10 max-w-5xl">
            <div className="mb-5 inline-flex rounded-full border border-[#6a5a1a] bg-[#0b1730] px-5 py-2 text-sm font-semibold text-[#f4c84d]">
              Resumora Premium
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Luxury Resume Client Interface
            </h1>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-[#d1d8e8]">
              Premium resume and career platform with advanced client-ready structure,
              clean onboarding, premium services, and modern 2026 visual language.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-[#162746] bg-[#041128] p-6">
            <div className="text-sm text-[#9fb0d1]">Client Experience</div>
            <div className="mt-2 text-3xl font-bold text-[#ffd34f]">Premium</div>
          </div>

          <div className="rounded-3xl border border-[#162746] bg-[#041128] p-6">
            <div className="text-sm text-[#9fb0d1]">Language Mode</div>
            <div className="mt-2 text-3xl font-bold text-[#ffd34f]">EN / FR</div>
          </div>

          <div className="rounded-3xl border border-[#162746] bg-[#041128] p-6">
            <div className="text-sm text-[#9fb0d1]">Response Flow</div>
            <div className="mt-2 text-3xl font-bold text-[#ffd34f]">Active</div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-14 lg:grid-cols-[1.95fr_1fr]">
        <div className="rounded-[32px] border border-[#162746] bg-[#020f24] p-6">
          <h2 className="mb-6 text-3xl font-black">Premium Services</h2>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="rounded-[24px] border border-[#182c4d] bg-[#06152e] p-6 transition hover:border-[#d1ab3c] hover:shadow-[0_0_0_1px_rgba(209,171,60,0.25)]"
              >
                <h3 className="text-2xl font-extrabold text-white">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#d1d8e8]">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-[#162746] bg-[#020f24] p-6">
          <h2 className="mb-6 text-3xl font-black">Client Actions</h2>

          <div className="grid gap-4">
            {actions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="rounded-[24px] border border-[#182c4d] bg-[#06152e] px-5 py-8 text-2xl font-extrabold transition hover:border-[#d1ab3c] hover:text-[#ffd34f]"
              >
                {action.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}