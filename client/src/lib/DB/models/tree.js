import mongoose from "mongoose";
import User from './user.js'
import { Columns } from "lucide-react";
import { values } from "lodash";
const treeSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    UID:{
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
        public_id: {
            type: String,
        },
        URL: {
            type: String,
        }
    },
    treeProfileLayout:{
        type: String,
        required: true,
        enum: {values:["column", 'classic', 'hero', "row"], message:`treeProfileLayout can be following only: column, classic, hero, row`},
        default: 'classic' // column
    },
    treeBio: {
        type: String,
        minLength: [2, "Cannot save treeBio, bio sould be at least 2 caracters long"],
        maxLength: [25, "Cannot save treeBio, bio sould be at most 25 caracters long"],
    },
    treeDescription: { // for AI chat bot 
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
                // linkConfig: {
                layout: {
                    type: String,
                    // default: "classic",
                    enum: ['classic', 'featured'],
                },
                linkLockConfig: {
                    islocked: {
                        type: Boolean,
                        // default: false,
                    },
                    lockType: {
                        type: String,
                        // default: "password",
                        enum: ['password', 'subscribe'],
                    }
                },
                // },

            }
        ],
        socials: [
            {
                title: {
                    type: String,
                    require: true,
                },
                URL: {
                    type: String,
                    require: true,
                },
                icon: {
                    publis_id: String,
                    url: String,
                },
            }
        ],

    },
    theme: {
        selectedTheme: {
            themeID: {
                type: Number,
                default: 10000
            },
            theamName: {
                type: String,
                default: "modern-blue"
            }

        },
        customThemeConfig: {
            background: {
                type: String,
                default: "black-color"
            },
            profileContainer: {
                type: String,
                default: "tree-default"
            },
            linkContainer: {
                type: String,
                default: "White-pill"
            },
            font: {
                type: String,
                default: "sans-serif"
            },
            colorPallet: {
                type: String,
                default: "tree-blue"
            }
        }
    },
}, { timestamps: true });



treeSchema.pre("save", async function (next) {

})


// const treeModel = mongoose.model("Tree", treeSchema);

// export default treeModel;


export const Tree =  mongoose.models?.Tree ||  mongoose.model("Tree", treeSchema);