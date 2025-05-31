import mongoose from "mongoose";
import { IThemeConfig } from "./treeTheme";

const treeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  UID: {
    type: String,
    default: function () {
      return `${Math.floor(Math.random() * 10000000000)}`;
    },
    unique: [true, "UID already exist"],
  },
  treeVisibility: {
    type: String,
    default: "public",
    enum: ['public', 'private', "password-protected"],
  },
  treeLockConfig: {
    password: {
      type: String,
      minLength: [3, "Password must be of at least 3 characters"],
    }
  },
  treeName: {
    type: String,
    required: true,
    minLength: [2, "Cannot save name, name sould be at least 2 caracters long"],
    maxLength: [25, "Cannot save name, name can be at most 25 caracters long"],
  },
  treePicture: {
    public_id: { type: String },
    URL: { type: String }
  },
  treeProfileLayout: {
    type: String,
    required: true,
    enum: { values: ["column", 'classic', 'hero', "row"], message: `treeProfileLayout can be following only: column, classic, hero, row` },
    default: 'classic'
  },
  treeBio: {
    type: String,
    maxLength: [100, "Cannot save treeBio, bio sould be at most 100 caracters long"],
  },
  treeDescription: { // for AI chat bot, not the main bio
    type: String,
  },
  treeContent: {
    links: [
      {
        type: {
          type: String,
          default: "link",
          enum: ['link', 'header'],
        },
        title: {
          type: String,
          require: true,
        },
        URL: {
          type: String,
          require: true,
        },
        UID: {
          type: String,
          default: function () {
            return `${Math.floor(Math.random() * 100000)}`;
          }
        },
        thumbnail: {
          publis_id: String,
          URL: String,
        },
        layout: {
          type: String,
          enum: ['classic', 'featured'],
        },
        linkLockConfig: {
          islocked: { type: Boolean },
          lockType: {
            type: String,
            enum: ['password', 'subscribe'],
          }
        },
      }
    ],
    socials: [
      {
        UID: {
          type: String,
          default: function () {
            return `${Math.floor(Math.random() * 100000)}`;
          }
        },
        URL: {
          type: String,
          require: true,
        },
        icon: {
          type: String,
          required: true,
        },
      }
    ],
  },
  theme: {
    name: { type: String, required: true },
    description: { type: String },
    config: { type: mongoose.Schema.Types.Mixed, required: true }, // IThemeConfig
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
}, { timestamps: true });

export const Tree = mongoose.models?.Tree || mongoose.model("Tree", treeSchema);
export { treeSchema };