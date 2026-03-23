import { MenuItem } from "@/types/types";

export const leftMenuItems: MenuItem[] = [

  // Routes for dashboards — required for routing to work
  {
    id: "adoptant-dashboard",
    icon: null,
    label: "Adoptant Dashboard",
    href: "/adoptant-dashboard",
    hidden: true, // hides it from sidebar
  },
  {
    id: "org-dashboard",
    icon: null,
    label: "Organization Dashboard",
    href: "/org-dashboard",
    hidden: true, // hides it from sidebar
  },

  {
    id: "home",
    icon: "NiHome",
    label: "menu-home",
    description: "menu-home-description",
    color: "text-primary",
    href: "/home",
    children: [
      {
        id: "home-sub",
        icon: "NiChartPie",
        label: "menu-home-sub",
        href: "/home/sub",
        description: "menu-home-sub-description",
      },
    ],
  },
  {
    id: "single-menu",
    icon: "NiDocumentFull",
    label: "menu-single-menu",
    color: "text-primary",
    href: "/single-menu",
  },
  {
    id: "external-link",
    icon: "NiArrowUpRightSquare",
    label: "menu-external-link",
    color: "text-primary",
    href: "https://themeforest.net/item/acorn-vite/22604108",
    isExternalLink: true,
  },
];

export const leftMenuBottomItems: MenuItem[] = [
  { id: "settings", label: "menu-settings", href: "/settings", icon: "NiSettings" },
];
