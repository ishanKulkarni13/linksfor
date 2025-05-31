import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { connectToDB } from "./lib/DB/connectDB";
import { User } from "./lib/DB/models/user";
import { Tree } from "./lib/DB/models/tree";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET
        }),
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            authorize: async (credincials) => {

                // let userr = await User.create({ name:'temp', email:"temp@gmail.com" , authMethod:'email', password:'temp123' });
            
                // let treee = await Tree.create({ owner: userr._id, treeName: `@${userr.name}`, treePicture: { URL: userr.profilePic.URL } });
                        
                // console.log("custome user created");
                

                let { email, password } = credincials;

                console.log(email, password);
                if (!email) {
                    throw new CredentialsSignin("email is not provided")
                } else if (!password) {
                    throw new CredentialsSignin("Password is not provided")
                }
                try {
                    email = email.toLowerCase()
                    await connectToDB()
                    const user = await User.findOne({ email }).select('+password');
                    if (!user) {
                        throw new CredentialsSignin("email is invalid")
                    }

                    let isPasswordValid = await user.isValidPassword(password, user);
                    if (isPasswordValid) {
                        // console.log(user);
                        // console.log("user._id", user._id);
                        return { id: user._id }
                    } else {
                        throw new CredentialsSignin("Password is invalid")
                    }

                } catch (error) {
                    console.log('error in authorize', error.message);
                    throw new CredentialsSignin("Some error occured in authorize")
                }
                // return { name: "uuuuuu", _id: "eau142bdrein242edf" }
                // throw new CredentialsSignin({cause: "soja bro"})
            }
        })
    ],
    // pages: {
    //     signIn: "/login"
    // },
    callbacks: {
        jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        session({session, token}){
            // console.log(token);
            session.user.id = token.id
            return session
        },
        signIn: async (data) => {
            // { user, account, profile, email }
            if (data.account.provider === 'google') {
                try {
                    
                    const email = data.user.email
                    const name = data.profile.given_name
                    const googleProfilePhoto = data.user.image
                    const id = data.user.id
                    await connectToDB();

                    // let { provider, id, name, emails, photos } = user;
                    
                    let user = await User.findOne({ email });
                    if (!user) {
                        // let { public_id, url } = await uploadToCloudinary(googleProfilePhoto);
                        // let profilePic;
                        // if (public_id && url) {
                        //     profilePic = { public_id, URL: url }
                        // }
                        // user = await User.create({ name, email, googleOAuthID: id, authMethod: 'google' });
                        user = new User({ name, email, googleOAuthID: id, authMethod: 'google' });
                        await user.save(); // use this approach as it will run presav hook and create username( if not provided


                        let tree = await Tree.create({ owner: user._id, treeName: `@${user.name}`, treePicture: { URL: user.profilePic.URL } });
                        await User.findByIdAndUpdate(user._id, { $set: { 'trees.profileDefaultTree': tree._id } });
                    }

                    data.user.id = user._id
                    return true

                } catch (error) {
                    console.log(error);
                    throw new AuthError("Error while creating user");
                }

            } else if (data.account.provider === 'credentials'){
                return true
            } else {
                return false
            }

        }
    }
})