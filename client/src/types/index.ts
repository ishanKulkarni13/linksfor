// Central place for shared types and interfaces
// Use this file to define types used across multiple components or modules

import type mongoose from "mongoose";
// @ts-ignore
import { treeSchema } from "@/lib/DB/models/tree";
import { userSchema } from "@/lib/DB/models/user";

export type TreeDocType = mongoose.InferSchemaType<typeof treeSchema>;

// User document type for use with Mongoose queries
export type UserDocType =  mongoose.InferSchemaType<typeof userSchema>;

// Add more shared types/interfaces below as your project grows
