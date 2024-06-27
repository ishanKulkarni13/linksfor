import { User } from "@/lib/DB/models/user";
import styles from "./style.module.css";
import { Separator } from "@/components/ui/separator";
import { connectToDB } from "@/lib/DB/connectDB";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

const getUserInfo = async () => {
  try {
    await connectToDB();
    const session = await auth();
    if (!(session && session.user))
      return { success: false, message: "Login first" };

    const userID = session.user.id;

    let user = await User.findById(userID);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    let responseUser = {
      name: user.name,
      username: user.username,
      publicUID: user.publicUID,
      profilePic: user.profilePic,
      email: user.email,
      bio: user.bio,
    };

    return { success: true, user: responseUser };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

async function changeAccountInfo(formData) {
  "use server";

  try {
    let name = formData.get("name");
    let username = formData.get("username");

    await connectToDB();
    const session = await auth();
    if (!(session && session.user))
      return { success: false, message: "Login first" };

    const userID = session.user.id;

    const user = await User.findById(userID);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (name) user.name = name;
    if (username) user.username = username;

    await user.save();

    toast("hiiii");

    let responseUser = { username: user.username, name: user.name };

    revalidatePath("/admin/account");
    return { success: true, user: responseUser };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

export default async function Page() {
  let { success, message, user } = await getUserInfo();

  if (!success) {
    return (
      <div className={styles.container}>
        <p>Error occured {message}</p>{" "}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1> My Account </h1>

      <div className={styles.accountInfoContainer}>
        <form action={changeAccountInfo}>
          <div className={styles.accountNameContainer}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" defaultValue={user.name} />
            <Separator className={styles.separator} />
          </div>
          <div className={styles.accountUsernameContainer}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={user.username}
            />
             <label className={styles.info} htmlFor="email" style={{ lineHeight: "103%" }}>
              This username will be used as a username for you Profile Default Tree
            </label>
            <Separator className={styles.separator} />
          </div>
          <div className={styles.accountEmailContainer}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              readOnly
              defaultValue={user.email}
            />
            <Separator className={styles.separator} />
            <label className={styles.info} htmlFor="email" style={{ lineHeight: "103%" }}>
              You cannot edit the email beacause you ave signed by Oauth
            </label>
          </div>

          <button className={styles.submit} type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
