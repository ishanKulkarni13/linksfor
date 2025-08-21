import TreeThemeAirBlack from "./preDefined/airBlack/theme";
import TreeThemeAirWhite from "./preDefined/airWhite/theme";
import MosaicMotion from "./preDefined/mosaicMotion/theme";
import Sand from "./preDefined/sand/theme";
import Classic from "./preDefined/classic/theme";
import TreeThemeGreenFog from "./preDefined/greenFog/theme";
import TreeThemeMinerialBlue from "./preDefined/minerialBlue/minerialBlue";
import TreeThemeSkyMint from "./preDefined/skymint/theme";
import TreeThemeSpray from "./preDefined/spray/spray";

export default function Tree({ tree }) {
  if (tree.theme.selectedTheme.themeID === 10000) {
    return <TreeThemeAirBlack tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 911111) {
    return <TreeThemeSkyMint tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 921111) {
    return <TreeThemeGreenFog tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 931111) {
    return <TreeThemeSpray tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 941111) {
    return <TreeThemeMinerialBlue tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 951111) {
    return <TreeThemeAirWhite tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 961111) {
    return <MosaicMotion tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 971111) {
    return <Sand tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 1) {
    return <Classic tree={tree} />;
  } else {
    return (
      // default
       <TreeThemeAirBlack tree={tree} />
    );
  }
}
