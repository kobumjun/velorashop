"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ProductCategory } from "@/lib/types";

const TABS: { key: "all" | ProductCategory; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "시계", label: "시계" },
  { key: "선글라스", label: "선글라스" },
  { key: "모자", label: "모자" },
];

export function CategoryTabs() {
  const sp = useSearchParams();
  const raw = sp.get("category") ?? "all";
  const active =
    raw === "시계" || raw === "선글라스" || raw === "모자" ? raw : "all";

  return (
    <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
      {TABS.map((t) => {
        const href = t.key === "all" ? "/products" : `/products?category=${encodeURIComponent(t.key)}`;
        const isOn = active === t.key;
        return (
          <Link
            key={t.key}
            href={href}
            className={`px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
              isOn
                ? "border-b-2 border-[var(--accent)] text-[var(--fg)]"
                : "text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
            scroll={false}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
