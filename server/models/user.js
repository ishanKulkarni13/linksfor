import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [2, "Namw must be of at least 2 characters"],
    },
    username: {
        type: String,
        default: function () {
            return `${this.name}_${Math.floor(Math.random() * 1000)}`;
        },
        unique: [true, "username already exist"],
        minLength: [3, "username must be of at least 3 characters"],
    },
    publicUID: {
        type: Number,
        default: function () {
            return Math.floor(Math.random() * 10000000000);
        },
        unique: [true, "UID already exist"],
    },
    profilePic: {
        publis_id: String,
        url: String,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "Email already exist"],
    },
    bio: {
        type: String,
        default: "Hey there!",
    },
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    authMethod: {
        type: String,
        enum: ['email', 'google'],
        required: true
    },

    googleOAuthID: {
        type: String,
        unique: [true, "google id already exist"],
    },
    password: {
        type: String,
        required: [function () { return this.authMethod === 'email' }, "Password is required when loggin with email"],
        minLength: [6, "Password must be of at least 6 characters"],
        select: false
    },
    verified: {
        status: {
            type: Boolean,
            default: false,
        },
        bage: {
            type: String,
            default: "blue",
            enum: ['blue', 'gold', "red"],
        },
        description: {
            type: String,
            default: "A verified Account"
        },
        verifiedAt: {
            type: Date,
            default: Date.now
        }
    },
    trees: {
        ownedtrees: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tree',
            }
        ],
        ProfileDefaultTree: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tree',
        },
    },
    treeTheme: {
        // selectedTheme: {
        //     type: String,
        //     default: "tree-blue-modern",
        // },
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
            colorTheme: {
                type: String,
                default: "tree-blue"
            }
        },
        favourateThemes: [
            {
                themeName: {
                    type: String,
                }
            }
        ],
        lastThemeEdited: {
            type: Date,
        }
    },
}, { timestamps: true });

const userModel = mongoose.model("User", schema);

export default userModel;