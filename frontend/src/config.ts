import { ModeVariant, ThemeVariant } from "@/constants";
import { BackgroundShape, ContentType, MenuType } from "@/types/types";

export const DEFAULTS = {
  appRoot: "/home/sub",
  locale: "en",
  themeColor: "theme-blue" as ThemeVariant,
  themeMode: "system" as ModeVariant,
  contentType: ContentType.Boxed,
  backgroundShape: BackgroundShape.Waves,
  innerShadowOpacity: 0,
  foregroundOpacity: 40,
  bgOpacity: 100,
  leftMenuType: MenuType.Minimal,
  leftMenuWidth: {
    [MenuType.Minimal]: { primary: 40, secondary: 280 },
    [MenuType.Comfort]: { primary: 80, secondary: 280 },
    [MenuType.SingleLayer]: { primary: 280, secondary: 0 },
  },
  rightMenuType: MenuType.Minimal,
  rightMenuWidth: {
    [MenuType.Minimal]: { primary: 40, secondary: 280 },
    [MenuType.Comfort]: { primary: 80, secondary: 280 },
    [MenuType.SingleLayer]: { primary: 280, secondary: 0 },
  },
  rightMenuAlwaysHidden: true,
  transitionDuration: 150,
};
