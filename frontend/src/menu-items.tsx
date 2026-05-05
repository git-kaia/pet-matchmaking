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
},
{
  id: "adoptant-profile",
  icon: "NiUser",
  href: "/adoptant/profile",
  label: "Adoptant Profile",
},
{
  id: "adoptant/quiz",
  icon: "NiUser",
  href: "/adoptant/quiz",
  label: "Adoptant Quiz",
},
  {
    id: "org/dashboard",
    icon: "NiBriefcase",
    label: "Org Dashboard",
    href: "/org/dashboard",
  },
  {
    id: "org/animals",
    icon: "NiBriefcase",
    href: "/org/animals",
    label: "Org Animals",
  },
  {
    id: "org-matches",
    icon: "NiBriefcase",
    href: "/org/matches",
    label: "Org Matches",
  },
  {
    id: "org-info",
    icon: "NiBriefcase",
    href: "/org/info",
    label: "Org Info",
  }, 
{
  id: "org-animal-profile",
  href: "/org/animals/:dyrenavn",
  label: "Org Animal Profile",
  hideInMenu: true,
},
{
  id: "adoptant-match-details",
  href: "/adoptant/matches/:matchid",
  label: "Match Detaljer",
  hideInMenu: true
},
{
  id: "org-match-details",
  href: "/org/matches/:param",
  label: "Match Detaljer",
  hideInMenu: true
},

];

export const leftMenuBottomItems: MenuItem[] = [
  { id: "settings", label: "menu-settings", href: "/settings", icon: "NiSettings" },
];
