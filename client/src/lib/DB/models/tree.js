import mongoose from "mongoose";
import User from './user.js'
import { Columns } from "lucide-react";
import { values } from "lodash";
import { socialIcons } from "@/constants/tree.js";
const treeSchema = mongoose.Schema({
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
        public_id: {
            type: String,
        },
        URL: {
            type: String,
        }
    },
    treeProfileLayout: {
        type: String,
        required: true,
        enum: { values: ["column", 'classic', 'hero', "row"], message: `treeProfileLayout can be following only: column, classic, hero, row` },
        default: 'classic' // column
    },
    treeBio: {
        type: String,
        // minLength: [2, "Cannot save treeBio, bio sould be at least 2 caracters long"], // no nedd of this requirement 
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
                icon:  {
                    type: String,
                    required: true,
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
                type: {
                    type: String,
                    enum: {
                        values: ['color', 'gradient', 'image', 'video'],
                        message: 'Background type must be one of: "color", "gradient", "image", "video".'
                    }
                },
                color: {
                    type: String,
                    match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for background color.']
                },
                gradient: {
                    direction: {
                        type: String,
                        enum: {
                            values: ['to right', 'to left', 'to top', 'to bottom'],
                            message: 'Gradient direction must be one of: "to right", "to left", "to top", "to bottom".'
                        }
                    },
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for gradient color.']
                    }
                },
                image: String,
                video: String
            },
            backgroundOverlay: {
                type: {
                    type: String,
                    enum: {
                        values: ['solid', 'dotted', 'dashed'],
                        message: 'Overlay type must be one of: "solid", "dotted", "dashed".'
                    }
                },
                color: {
                    type: String,
                    match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for background overlay color.']
                }
            },
            profileContainer: {
                style: {
                    type: String,
                    enum: {
                        values: ['header', 'row', 'column'],
                        message: 'Profile container style must be one of: "header", "row", "column".'
                    }
                },
                avatar: {
                    border: {
                        type: String,
                        color: {
                            type: String,
                            match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for avatar border color.']
                        }
                    },
                    borderRadius: {
                        type: String,
                        match: [/^\d+px$/, 'Border radius must be specified in pixels (e.g., "10px").']
                    },
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for avatar color.']
                    },
                    shadow: {
                        color: {
                            type: String,
                            enum: {
                                values: ['#000000', '#ffffff'],
                                message: 'Shadow color must be either black or white.'
                            }
                        },
                        type: {
                            type: String,
                            enum: {
                                values: ['soft', 'hard'],
                                message: 'Shadow type must be one of: "soft", "hard".'
                            }
                        }
                    }
                },
                name: {
                    textColor: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for name text color.']
                    },
                    border: {
                        type: {
                            type: String,
                            enum: {
                                values: ['none', 'solid', 'dotted', 'dashed'],
                                message: 'Name border type must be one of: "none", "solid", "dotted", "dashed".'
                            }
                        },
                        color: {
                            type: String,
                            match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for name border color.']
                        }
                    }
                },
                bio: {
                    textColor: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for bio text color.']
                    },
                    border: {
                        type: {
                            type: String,
                            enum: {
                                values: ['none', 'solid', 'dotted', 'dashed'],
                                message: 'Bio border type must be one of: "none", "solid", "dotted", "dashed".'
                            }
                        },
                        color: {
                            type: String,
                            match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for bio border color.']
                        }
                    }
                }
            },
            linkContainer: {
                background: {
                    type: {
                        type: String,
                        enum: {
                            values: ['solid', 'gradient'],
                            message: 'Background type must be one of: "solid", "gradient".'
                        }
                    },
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for link container background color.']
                    }
                },
                border: {
                    type: {
                        type: String,
                        enum: {
                            values: ['none', 'solid', 'dotted', 'dashed'],
                            message: 'Border type must be one of: "none", "solid", "dotted", "dashed".'
                        }
                    },
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for link container border color.']
                    }
                },
                borderRadius: {
                    type: String,
                    match: [/^\d+px$/, 'Border radius must be specified in pixels (e.g., "10px").']
                },
                shadow: {
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for link container shadow color.']
                    },
                    type: {
                        type: String,
                        enum: {
                            values: ['soft', 'hard'],
                            message: 'Shadow type must be one of: "soft", "hard".'
                        }
                    }
                },
                textColor: {
                    type: String,
                    match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for link container text color.']
                },
                icon: {
                    border: {
                        type: {
                            type: String,
                            enum: {
                                values: ['none', 'solid', 'dotted', 'dashed'],
                                message: 'Icon border type must be one of: "none", "solid", "dotted", "dashed".'
                            }
                        },
                        color: {
                            type: String,
                            match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for icon border color.']
                        }
                    },
                    borderRadius: {
                        type: String,
                        match: [/^\d+px$/, 'Border radius must be specified in pixels (e.g., "10px").']
                    },
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for icon color.']
                    }
                }
            },
            socialIconsContainer: {
                background: {
                    type: String,
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for social icons container background color.']
                    }
                },
                border: {
                    type: {
                        type: String,
                        enum: {
                            values: ['none', 'solid', 'dotted', 'dashed'],
                            message: 'Border type must be one of: "none", "solid", "dotted", "dashed".'
                        }
                    },
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for social icons container border color.']
                    }
                },
                borderRadius: {
                    type: String,
                    match: [/^\d+px$/, 'Border radius must be specified in pixels (e.g., "10px").']
                },
                shadow: {
                    color: String,
                    type: String
                },
                icon: {
                    border: {
                        type: {
                            type: String,
                            enum: {
                                values: ['none', 'solid', 'dotted', 'dashed'],
                                message: 'Icon border type must be one of: "none", "solid", "dotted", "dashed".'
                            }
                        },
                        color: {
                            type: String,
                            match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for icon border color.']
                        }
                    },
                    borderRadius: {
                        type: String,
                        match: [/^\d+px$/, 'Border radius must be specified in pixels (e.g., "10px").']
                    },
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for icon color.']
                    }
                }
            },
            headerContainer: {
                background: {
                    type: {
                        type: String,
                        enum: {
                            values: ['color', 'gradient', 'image', 'video'],
                            message: 'Background type must be one of: "color", "gradient", "image", "video".'
                        }
                    },
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for header container background color.']
                    },
                    gradient: {
                        direction: {
                            type: String,
                            enum: {
                                values: ['to right', 'to left', 'to top', 'to bottom'],
                                message: 'Gradient direction must be one of: "to right", "to left", "to top", "to bottom".'
                            }
                        },
                        color: {
                            type: String,
                            match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for header container gradient color.']
                        }
                    },
                    image: String,
                    video: String
                },
                border: {
                    type: {
                        type: String,
                        enum: {
                            values: ['none', 'solid', 'dotted', 'dashed'],
                            message: 'Border type must be one of: "none", "solid", "dotted", "dashed".'
                        }
                    },
                    color: {
                        type: String,
                        match: [/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Invalid HEX color format for header container border color.']
                    }
                },
                borderRadius: {
                    type: String,
                    match: [/^\d+px$/, 'Border radius must be specified in pixels (e.g., "10px").']
                },
                shadow: {
                    color: {
                        type: String,
                        enum: {
                            values: ['#000000', '#ffffff'],
                            message: 'Shadow color must be either black or white.'
                        }
                    },
                    type: {
                        type: String,
                        enum: {
                            values: ['soft', 'hard'],
                            message: 'Shadow type must be one of: "soft", "hard".'
                        }
                    }
                }
            },
            font: {
                type: String,
                default: "Arial"
            }
        },
        themePreference:{
            socialIcons:{
                socialIconsPlacement:{
                    type: String,
                    enum: {
                        values: ['top', 'bottom'],
                        message: 'Icons can be placed on either top or buttom'
                    },
                    default: 'top'
                },
            }
        }

    },
}, { timestamps: true });



treeSchema.pre("save", async function (next) {

})


// const treeModel = mongoose.model("Tree", treeSchema);

// export default treeModel;


export const Tree = mongoose.models?.Tree || mongoose.model("Tree", treeSchema);