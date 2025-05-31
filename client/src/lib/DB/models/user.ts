import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { log } from "console";

// { $regex: new RegExp(username, "i") }

// Reusable type for user document in hooks
export type IUserDoc = mongoose.Document & {
  name?: string;
  username?: string;
  password?: string;
  googleOAuthID?: string;
  _id?: any;
  isModified: (field: string) => boolean;
  isNew: boolean;
};

export type IUserModel = mongoose.Model<IUserDoc>;


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [2, "Name must be of at least 2 characters"],
        maxLength: [11, "name can be of at most 11 characters"],
    },
    username: {
        type: String,
        unique: [true, "username already exist"],
        minLength: [3, "username must be of at least 3 characters"],
        maxLength: [25, "username can be of at most 25 characters"],
        validate: {
            validator: function(this: { username: string }, v: string) {
                // Check for whitespace
                return !/\s/.test(v);
            },
            message: function(this: { username: string }, props: { value: string }) {
                return `${props.value} should not contain spaces`;
            }
        },
        // required: [true, "Username is required"] // if username is not provide it is sutomatically generated
    },
    publicUID: {
        type: Number,
        default: function () {
            return Math.floor(Math.random() * 10000000000);
        },
        unique: [true, "UID already exist"],
    },
    profilePic: {
        public_id: {
            type: String, 
            default: "uiccf1wbzyioazqgve5q"
        },
        URL: {
            type: String,
            default: 'http://res.cloudinary.com/kakashib2k/image/upload/v1713685024/uiccf1wbzyioazqgve5q.png'
        },
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
        required: [function (this: { authMethod: string }) { return this.authMethod === 'email'; }, "Password is required when loggin with email"],
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
        profileDefaultTree: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tree',
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




userSchema.pre("save", async function (this: IUserDoc, next) {
    console.log("pre save hook called");
    try {
        const UserModel = this.constructor as IUserModel;
        if (this.isModified && this.isModified("googleOAuthID") && this.googleOAuthID && this.isNew) {
            const isGoogleOAuthIDUserExist = await UserModel.findOne({ googleOAuthID: this.googleOAuthID });
            if (isGoogleOAuthIDUserExist && isGoogleOAuthIDUserExist._id && this._id && isGoogleOAuthIDUserExist._id.toString() !== this._id.toString()) {
               console.log("This google id is already used to regester")
            }
        }
        if (!this.username && this.name) {
            console.log("  username is not provided, generating username from name");
            
            let tempUserName = this.name.split(' ')[0].toLowerCase().replace(/\s+/g, '_');
            let isUsernameExists = await UserModel.exists({ username: { $regex: new RegExp(tempUserName, "i") } });
            let count = 0;
            while (isUsernameExists) {
                tempUserName = `${this.name.split(' ')[0].toLowerCase().replace(/\s+/g, '_')}_${Math.floor(Math.random() * 1000)}${count}`;
                isUsernameExists = await UserModel.exists({ username: { $regex: new RegExp(tempUserName, "i") } });
                count++;
                if(count>10){
                    console.log('erroe in db saving');
                }
            }
            this.username = tempUserName.toLowerCase();
            console.log(this.username, tempUserName);
        }
        if (this.isModified && (this.isModified("password") || this.isNew) && this.password && typeof this.password === 'string') {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        console.log(error);
        next(error instanceof Error ? error : undefined);
    }
})

userSchema.methods.isValidPassword = async function (password: string, user: any) {
    try {
        return await bcrypt.compare(password, user.password);
    } catch (error) {
        console.log(`error in isValidPassword${error}`);
        return false;
    }
};




export const User = mongoose.models?.User as IUserModel || mongoose.model<IUserDoc, IUserModel>("User", userSchema);
