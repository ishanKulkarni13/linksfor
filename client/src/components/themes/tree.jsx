import TreeThemeAirBlack from "./preDefined/airBlack/airBlack";
import TreeThemeGreenFog from "./preDefined/greenFog/greenFog";
import TreeThemeSkymint from "./preDefined/skymint/skymint";
import TreeThemeSpray from "./preDefined/spray/spray";

export default function Tree({ tree }) {
  if (tree.theme.selectedTheme.themeID === 10000) {
    return <TreeThemeAirBlack tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 911111) {
    return <TreeThemeSkymint tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 921111) {
    return <TreeThemeGreenFog tree={tree} />;
  } else if (tree.theme.selectedTheme.themeID === 931111) {
    return <TreeThemeSpray tree={tree} />;
  } else {
    return (
      <>
        No tree found to have theme id: {tree.theme.selectedTheme.themeID},
        contact the dev to know more
      </>
    );
  }
}
