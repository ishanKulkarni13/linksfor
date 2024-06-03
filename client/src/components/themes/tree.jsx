import TreeThemeAirBlack from "./airBlack/airBlack";
import TreeThemeGreenFog from "./greenFog/greenFog";
import TreeThemeSkymint from "./skymint/skymint";
import TreeThemeSpray from "./spray/spray";

export default function Tree({ tree }) {
  return (
    <>
      {tree.theme.selectedTheme.themeID === 10000 && (
        <TreeThemeAirBlack tree={tree} />
      )}

      {tree.theme.selectedTheme.themeID === 911111 && (
        <TreeThemeSkymint tree={tree} />
      )}

      {tree.theme.selectedTheme.themeID === 921111 && (
        <TreeThemeGreenFog tree={tree} />
      )}

      {tree.theme.selectedTheme.themeID === 931111 && (
        <TreeThemeSpray tree={tree} />
      )}
    </>
  );
}
