"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/dashboard`,
      label: "Overview",
      active: pathname === `/`,
    },
    {
      href: `/dashboard/categories`,
      label: "Categories",
      active: pathname === `/categories`,
    },
    {
      href: `/dashboard/products`,
      label: "Products",
      active: pathname === `/products`,
    },
    {
      href: `/dashboard/orders`,
      label: "Orders",
      active: pathname === `/orders`,
    },
    {
      href: `/dashboard/faqs`,
      label: "FAQs",
      active: pathname === `/faqs`,
    },
    {
      href: `/dashboard/feedbacks`,
      label: "FeedBacks",
      active: pathname === `/feedbacks`,
    },
  ];

  return (<nav className={"flex items-center space-x-4 lg:space-x-6"} {...props}>
    {routes.map((route) => (
      <Link
        key={route.href}
        href={route.href}
        className={`text-sm font-medium transition-colors hover:text-primary,
            ${route.active
            ? "text-black dark:text-white"
            : "text-muted-foreground"
          }
          `}
      >
        {route.label}
      </Link>
    ))} </nav>
  );
}

