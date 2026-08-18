import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { getPlacements } from "@/lib/api";
import { Briefcase, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Placements",
  description:
    "See where Edge Tech Solution students get placed — companies, roles, and packages, backed by real placement support throughout every course.",
  alternates: { canonical: "/placements" },
};

export default async function PlacementsPage() {
  const { placements, stats } = await getPlacements();

  return (
    <>
      <PageHero
        eyebrow="Placements"
        title="Where Our Students Land Their First Tech Role"
        description="Real students, real companies, real offers — backed by dedicated placement support from day one."
        breadcrumb="Placements"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            <div className="rounded-xl border-2 border-border-soft bg-white p-6 flex items-center gap-4">
              <Users className="size-9 text-primary shrink-0" />
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.total}+</p>
                <p className="text-sm text-foreground/55">Students Placed</p>
              </div>
            </div>
            <div className="rounded-xl border-2 border-border-soft bg-white p-6 flex items-center gap-4">
              <TrendingUp className="size-9 text-primary shrink-0" />
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.avgPackage || "-"} LPA</p>
                <p className="text-sm text-foreground/55">Average Package</p>
              </div>
            </div>
            <div className="rounded-xl border-2 border-border-soft bg-white p-6 flex items-center gap-4">
              <Briefcase className="size-9 text-primary shrink-0" />
              <div>
                <p className="text-2xl font-bold text-secondary">{stats.topPackage || "-"} LPA</p>
                <p className="text-sm text-foreground/55">Highest Package</p>
              </div>
            </div>
          </div>

          {placements.length === 0 ? (
            <p className="text-center text-foreground/50 py-16">
              Placement records will appear here as they are added from the CRM.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {placements.map((p) => (
                <div key={p.id} className="rounded-xl border-2 border-border-soft bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {p.student_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-secondary text-sm">{p.student_name}</p>
                      <p className="text-xs text-foreground/50">{p.role} at {p.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-xs text-foreground/60">
                    <span>{p.course}</span>
                    {p.package_lpa ? <span className="font-semibold text-primary">{p.package_lpa} LPA</span> : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
