import mongoose, { Document, Schema, Types } from "mongoose";

// --- Types ---
export type ThemeOrigin = "community" | "preDefined" | "own";

export interface IThemeComponentConfig {
  type: string;
  props: Record<string, any>;
}

export interface IThemeConfig {
  layoutWrapper?: IThemeComponentConfig;
  background?: IThemeComponentConfig;
  profileHeader?: IThemeComponentConfig;
  avatar?: IThemeComponentConfig;
  username?: IThemeComponentConfig;
  bio?: IThemeComponentConfig;
  linksContainer?: IThemeComponentConfig;
  linkCard?: IThemeComponentConfig;
  // Add more themeable components here as you create them
  linkThumbnail?: IThemeComponentConfig;
  linkTitle?: IThemeComponentConfig;
  moreMenu?: IThemeComponentConfig;
  headerCard?: IThemeComponentConfig;
  socialIconsContainer?: IThemeComponentConfig;
  socialIcon?: IThemeComponentConfig;
  notificationButton?: IThemeComponentConfig;
  // Add more as your system grows
}

export interface ITreeTheme extends Document {
  UID: string;
  name: string;
  description?: string;
  owner: Types.ObjectId;
  themeConfig: IThemeConfig;
  isPublic: boolean;
  copyedFrom: ThemeOrigin;
  createdAt: Date;
  updatedAt: Date;
}

// --- Schema ---
const treeThemeSchema = new Schema<ITreeTheme>(
  {
    UID: {
      type: String,
      required: true,
      unique: true,
      default: () => `${Math.floor(1000000000 + Math.random() * 9000000000)}`, // 10-digit
    },
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    themeConfig: { type: Schema.Types.Mixed, required: true },
    isPublic: { type: Boolean, default: false },
    copyedFrom: {
      type: String,
      enum: ["community", "preDefined", "own"],
      default: "own",
    },
  },
  { timestamps: true }
);

// --- Model ---
export const TreeTheme =
  (mongoose.models?.TreeTheme as mongoose.Model<ITreeTheme>) ||
  mongoose.model<ITreeTheme>("TreeTheme", treeThemeSchema);
