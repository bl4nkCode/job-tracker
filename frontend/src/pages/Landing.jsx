import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChartNoAxesColumn,
  ClipboardList,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Organize applications",
    description:
      "Keep your applications, job descriptions, and important notes in one convenient workspace.",
  },
  {
    icon: ChartNoAxesColumn,
    number: "02",
    title: "Track every stage",
    description:
      "Follow your progress from your first application to interviews, offers, and completed opportunities.",
  },
  {
    icon: Building2,
    number: "03",
    title: "Keep company details",
    description:
      "Save company information and notes so important details are always easy to find.",
  },
  {
    icon: Search,
    number: "04",
    title: "Find what matters",
    description:
      "Search, filter, and sort your applications to quickly find the opportunities you need.",
  },
];

const columns = [
  {
    title: "Applied",
    count: 12,
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600",
    cards: [
      {
        company: "Acme Inc.",
        position: "Frontend Developer",
        date: "Applied recently",
      },
      {
        company: "Northstar Labs",
        position: "Junior Web Developer",
        date: "Applied this week",
      },
    ],
  },
  {
    title: "Interview",
    count: 4,
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700",
    cards: [
      {
        company: "Vertex Solutions",
        position: "Software Developer",
        date: "Interview upcoming",
      },
      {
        company: "BrightPath Tech",
        position: "Web Developer",
        date: "In progress",
      },
    ],
  },
  {
    title: "Offer",
    count: 2,
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
    cards: [
      {
        company: "Horizon Digital",
        position: "Junior Developer",
        date: "Offer received",
      },
    ],
  },
  {
    title: "Rejected",
    count: 3,
    dot: "bg-rose-400",
    badge: "bg-rose-50 text-rose-700",
    cards: [
      {
        company: "Summit Group",
        position: "Associate Engineer",
        date: "Application closed",
      },
    ],
  },
];

function Landing() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fa] text-gray-900">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="flex w-full items-center justify-between px-5 py-4 sm:px-8 lg:px-12 xl:px-16">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            aria-label="Job Tracker home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
              <BriefcaseBusiness size={20} strokeWidth={1.8} />
            </span>
            <span className="text-lg font-semibold tracking-tight text-gray-950">
              Job Tracker
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 sm:px-4"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 sm:px-4"
            >
              Get Started <ArrowRight size={15} />
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-72 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div className="mx-auto max-w-xl lg:mx-0">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-2 text-xs font-semibold tracking-wide text-blue-700 shadow-sm">
              <Sparkles size={14} />
              YOUR CAREER, ORGANIZED
            </div>

            <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight text-gray-950 sm:text-5xl lg:text-[3.8rem]">
              Your job search,
              <span className="mt-1 block text-blue-600">
                all in one place.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Keep your applications organized, stay on top of interviews, and
              follow every opportunity from application to offer.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-md shadow-blue-600/15 transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
              >
                Start tracking for free <ArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                I already have an account
              </Link>
            </div>

            <div className="mt-6 flex items-start gap-2 text-sm leading-6 text-gray-500">
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
              <span>
                A simpler way to stay organized throughout your job search.
              </span>
            </div>
          </div>

          {/* Sample dashboard preview */}
          <div className="min-w-0 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xl shadow-gray-900/[0.06] sm:rounded-3xl sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-5">
              <div>
                <p className="text-base font-semibold tracking-tight text-gray-950">
                  Application overview
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  A snapshot of your career opportunities
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Sample workspace
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-4">
              {columns.map((column) => (
                <div
                  key={column.title}
                  className="rounded-xl border border-gray-100 bg-gray-50/80 p-3 sm:p-3.5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${column.dot}`}
                    />
                    <span className="text-xs font-medium text-gray-600">
                      {column.title}
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
                    {column.count}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {columns.map((column) => (
                <div key={column.title} className="min-w-0">
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${column.dot}`}
                      />
                      <span className="truncate text-xs font-semibold text-gray-700">
                        {column.title}
                      </span>
                    </div>
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-medium ${column.badge}`}
                    >
                      {column.count}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {column.cards.map((card) => (
                      <div
                        key={`${card.company}-${card.position}`}
                        className="rounded-xl border border-gray-200/80 bg-white p-3 transition hover:border-blue-200 hover:shadow-sm"
                      >
                        <p className="break-words text-xs font-semibold leading-5 text-gray-800">
                          {card.position}
                        </p>
                        <p className="mt-1 break-words text-xs text-gray-500">
                          {card.company}
                        </p>
                        <div className="mt-3 border-t border-gray-100 pt-2.5">
                          <p className="text-[10px] leading-4 text-gray-400">
                            {card.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-400">
              <CheckCircle2 size={14} />
              Illustrative dashboard · Sample data
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-gray-200/80 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
              Built for your job search
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-4xl">
              Spend less time organizing.
              <span className="block text-gray-500">
                Focus on your next opportunity.
              </span>
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              Everything you need to keep your job search clear, organized, and
              moving forward.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-gray-200/80 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-gray-900/[0.04] sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className="text-xs font-medium tracking-wider text-gray-300">
                      {feature.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-base font-semibold text-gray-950">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#172554] px-6 py-12 text-center shadow-xl shadow-blue-950/10 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-12 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-blue-200">
              <TrendingUp size={23} />
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
              Your next chapter starts here
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Ready to take control of your job search?
            </h2>
            <p className="mt-4 leading-7 text-blue-100/75">
              Create your account and bring your applications, company details,
              and career progress together in one place.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-900 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
            >
              Create your account <ArrowRight size={16} />
            </Link>
            <p className="mt-4 text-sm text-blue-100/70">
              Already registered?{" "}
              <Link
                to="/login"
                className="font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/80 bg-white px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5"
            aria-label="Job Tracker home"
          ></Link>
          <p className="text-sm leading-6 text-gray-500">
            © {new Date().getFullYear()} Job Tracker. All rights reserved.
          </p>

          <div className="flex items-center gap-5"></div>
        </div>
      </footer>
    </main>
  );
}

export default Landing;
