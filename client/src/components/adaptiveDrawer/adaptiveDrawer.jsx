"use client";
import React, { useState } from "react";
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
import useWindowResize from "@/hooks/useWindowSize";
import Popup from "@/components/popup/popup.jsx";

export default function AdaptiveDrawer({
  heading,
  description,
  children,
  close,
  drawerSnapPoints,
}) {
  const { width } = useWindowResize();

  if (!width) return <></>;

  if (width < 640) {
    return (
      <Drawer
        snapPoints={drawerSnapPoints}
        // shouldScaleBackground
        className={styles.drawer}
        open
        onOpenChange={(v) => !v && close && close()}
      >
        <DrawerContent className={`${styles.content} bg-white `}>
          <DrawerHeader className={styles.drawerHeader}>
            <DrawerTitle className={`font-medium tracking-tight text-xl`}>
              {heading}
            </DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
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
  } else {
    return (
      <Popup title={heading} description={description} close={close}>
        {children}
      </Popup>
    );
  }
}
