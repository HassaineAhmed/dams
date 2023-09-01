"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false)

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
    <div className="flex-col flex ">
      <button className="lg:hidden" onClick={() => setOpen(prev => !prev)}>
        <MenuIcon />
      </button>
      <div className={`lg:hidden absolute top-[50px] left-[-10px] flex gap-y-5 flex-col bg-black py-8 px-12 rounded-xl text-white ${open ? "" : "hidden"}`}>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            onClick={() => setOpen(false)}
            className={`lg:text-sm text-meduim font-medium transition-colors hover:text-primary,
            ${route.active
                ? "text-white dark:text-white"
                : "text-white"
              }
          `}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </div>


    <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
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
      ))}
    </div>



  </nav>
  );
}

