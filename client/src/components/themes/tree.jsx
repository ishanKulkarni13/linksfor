import TreeThemeAirBlack from "./preDefined/airBlack/airBlack";
import TreeThemeAirWhite from "./preDefined/airWhite/theme";
import TreeThemeGreenFog from "./preDefined/greenFog/greenFog";
import TreeThemeMinerialBlue from "./preDefined/minerialBlue/minerialBlue";
import TreeThemeSkyMint from "./preDefined/skymint/skymint";
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
  } else {
    return (
      <>
        No tree found to have theme id: {tree.theme.selectedTheme.themeID},
        contact the dev to know more
      </>
    );
  }
}
