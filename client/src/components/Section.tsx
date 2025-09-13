// src/components/Section.tsx
import React, { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Section Component
 * -----------------
 * A reusable wrapper to keep all sections of the site
 * aligned and consistent in width and padding.
 *
 * Props:
 * - children: JSX content inside the section
 * - className: optional extra Tailwind classes (ex: py-16, bg-gray-50, etc.)
 */
const Section: React.FC<SectionProps> = ({ children, className = "" }) => {
  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
