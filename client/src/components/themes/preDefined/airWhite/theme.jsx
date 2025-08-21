import styles from "./theme.module.css";
import Tree from "@/components/themes/themeComponents/tree/theme";

export default function TreeTheme({ tree }) {
    return <Tree tree={tree} styles={styles} />

}
