import mongoose from "mongoose";
import bcrypt from "bcrypt"
import ErrorHandelar from "../utils/error.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [2, "Namw must be of at least 2 characters"],
    },
    username: {
        type: String,
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
        required: false
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
            type: String
        },
        description: {
            type: String
        },
        verifiedAt: {
            type: Date
        }
    },
    trees: {
        ProfileDefaultTree: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tree',
        },
    },
    treeTheme: {
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


userSchema.pre("save", async function (next) {
    try {
        // Check if googleOAuthID is provided and validate uniqueness
        if (this.isModified("googleOAuthID") && this.googleOAuthID && this.isNew) {
            const isGoogleOAuthIDUserExist = await userModel.findOne({ googleOAuthID: this.googleOAuthID });
            if (isGoogleOAuthIDUserExist && isGoogleOAuthIDUserExist._id.toString() !== this._id.toString()) {
                next(new ErrorHandelar("This google id is already used to regester"))
            }
        }

        if (!this.username) {
            if (this.name) {
                console.log("generating a username if the username is not given to the DB");
                this.username = `${this.name.split(' ')[0].toLowerCase().replace(/\s+/g, '_')}_${Math.floor(Math.random() * 1000)}`;
            } else {
                const randomNum = Math.floor(Math.random() * 10000);
                this.username = `user_${randomNum}`;
            }
        }
        // Hash the password if it exists and is modified or if it's a new user
        if ((this.isModified("password") || this.isNew) && this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.isValidPassword = async function (password, user) {
    try {
        return await bcrypt.compare(password, user.password);
    } catch (error) {
        console.log(`error in isValidPassword${error}`);
        return false;
    }
};




const userModel = mongoose.model("User", userSchema);
export default userModel;