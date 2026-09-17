import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Scroll reveal — translate + fade, disabled under reduced motion */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Swiss section header: red square + mono label + hairline rules */
export function SectionHeader({
  label,
  title,
  index,
  className,
}: {
  label: string;
  title: string;
  index?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-3">
        <span className="sq" aria-hidden="true" />
        <span className="label-mono text-muted-foreground">{label}</span>
        <span
          className="h-px flex-1 bg-border"
          aria-hidden="true"
        />
        {index && (
          <span className="label-mono text-muted-foreground">{index}</span>
        )}
      </div>
      <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
        {title}
      </h2>
    </Reveal>
  );
}

/* Hairline horizontal rule */
export function Rule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border", className)} aria-hidden="true" />;
}
