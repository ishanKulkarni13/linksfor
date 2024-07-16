"use client";
import React from "react";
import styles from "./adaptiveDrawer.module.css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";

export default function AdaptiveDrawer({
  heading,
  description,
  children,
  close,
}) {


  return (
    <Drawer
      shouldScaleBackground
      className={styles.drawer}
      open
      onOpenChange={(v) => !v && close && close()}
    >
      <DrawerContent className={`${styles.content} bg-white `}>
        <DrawerHeader className={styles.drawerHeader}>
          <DrawerTitle className={`font-medium tracking-tight text-xl`}>
            {heading}
          </DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        <div className={styles.drawerChildren}>{children}</div>
        {/* <DrawerFooter className={styles.drawerFooter}>
          <DrawerClose className={styles.drawerClose} asChild>
            <button className={styles.drawerCloseButton} variant="outline">
              Close
            </button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );

  return <Popup title={`Share tree`} close={close}></Popup>;
}
