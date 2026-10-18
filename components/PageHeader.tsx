import type { ReactNode } from "react";

// Einheitlicher Seitenkopf der Unterseiten
const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) => (
  <section className="bg-alb-50">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="eyebrow text-brand-600">{eyebrow}</p>
      <h1 className="mt-3 hyphens-auto break-words text-4xl font-extrabold text-alb-900 sm:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mt-3 max-w-3xl text-xl font-semibold text-alb-600">{subtitle}</p>
      )}
      {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed">{children}</div>}
    </div>
  </section>
);

export default PageHeader;
