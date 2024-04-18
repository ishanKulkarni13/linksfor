import mongoose from "mongoose";

const treeSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    treevisibility: {
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
        required: true
    },
    treePicture: {
        publis_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    treeDescription: {
        type: String,
    },
    treeContent: {
        links: [
            {
                linkTitle: {
                    type: String,
                    require: true,
                },
                URL: {
                    type: String,
                    require: true,
                },
                thumbnail: {
                    publis_id: String,
                    url: String,
                },
                linkConfig: {
                    layout: {
                        type: String,
                        default: "classic",
                        enum: ['classic', 'featured'],
                    },
                    linkLockConfig: {
                        islocked: {
                            type: Boolean,
                            default: false,
                        },
                        lockType: {
                            type: String,
                            default: "password",
                            enum: ['password', 'subscribe'],
                        }
                    },
                },

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
            type: String,
            default: "tree-blue-modern",
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
}, { timestamps: true })

export default mongoose.model("Tree", treeSchema);