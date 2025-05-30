// Central place for shared types and interfaces
// Use this file to define types used across multiple components or modules

import type React from "react";
// @ts-ignore
import { treeSchema } from "@/lib/DB/models/tree";
import type mongoose from "mongoose";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

// Example: Tree profile type
export interface TreeProfile {
  UID: string;
  treeName: string;
  treeBio: string;
  treePicture?: {
    URL: string;
  };
  // Add more fields as needed
}

export type TreeType = mongoose.InferSchemaType<typeof treeSchema>;

// Add more shared types/interfaces below as your project grows
