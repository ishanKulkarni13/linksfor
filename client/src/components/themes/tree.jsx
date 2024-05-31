import TreeThemeAirBlack from "./airBlack/airBlack";
import TreeThemeGreenFog from "./greenFog/greenFog";
import TreeThemeSkymint from "./skymint/skymint";
import TreeThemeSpray from "./spray/spray";

export default function Tree({ tree }) {
  return (
    <>
      {tree.theme.selectedTheme.themeID === 10000 && (
        <main>
          <TreeThemeAirBlack tree={tree} />
        </main>
      )}

      {tree.theme.selectedTheme.themeID === 911111 && (
        <main>
          <TreeThemeSpray tree={tree} />
        </main>
      )}

      {tree.theme.selectedTheme.themeID === 921111 && (
        <main>
          <TreeThemeSkymint tree={tree} />
        </main>
      )}

{tree.theme.selectedTheme.themeID === 931111 && (
        <main>
          <TreeThemeGreenFog tree={tree} />
        </main>
      )}
    </>

  );
}
