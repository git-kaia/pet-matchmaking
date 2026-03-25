import { MenuItem } from "@/types/types";

export const leftMenuItems: MenuItem[] = [

  // Routes for dashboards — required for routing to work
  {
    id: "adoptant/dashboard",
    icon: "NiUser",
    label: "Adoptant Dashboard",
    href: "/adoptant/dashboard",
  },
{
  id: "adoptant-matches",
  icon: "NiUser",
  href: "/adoptant/matches",
  label: "Adoptant Matches",
  hidden: true
},
{
  id: "adoptant-profile",
  icon: "NiUser",
  href: "/adoptant/profile",
  label: "Adoptant Profile",
  hidden: true
},
{
  id: "adoptant/quiz",
  icon: "NiUser",
  href: "/adoptant/quiz",
  label: "Adoptant Quiz",
  hidden: true,
},
  {
    id: "org/dashboard",
    icon: "NiBriefcase",
    label: "Org Dashboard",
    href: "/org/dashboard",
    hidden: true,
  },
  {
    id: "org/animals",
    icon: "NiBriefcase",
    href: "/org/animals",
    label: "Org Animals",
    hidden: true,
  },
  {
    id: "org-matches",
    icon: "NiBriefcase",
    href: "/org/matches",
    label: "Org Matches",
    hidden: true,
  },
  {
    id: "org-info",
    icon: "NiBriefcase",
    href: "/org/info",
    label: "Org Info",
    hidden: true,
  },
];

export const leftMenuBottomItems: MenuItem[] = [
  { id: "settings", label: "menu-settings", href: "/settings", icon: "NiSettings" },
];
