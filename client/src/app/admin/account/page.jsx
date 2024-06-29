import { User } from "@/lib/DB/models/user";
import styles from "./style.module.css";
import { Separator } from "@/components/ui/separator";
import { connectToDB } from "@/lib/DB/connectDB";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import AccountInfoChangePopupTrigger from "./components/changeUsername/changeAccountInfo";
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

async function changeAccountInfo(data) {
  "use server";

  try {
    let { name, username } = data;

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

  // const onFormSubmit = (e)=> e.preventDefault()
  return (
    <>
      <div className={styles.container}>
        <h1> My Account </h1>

        <div className={styles.accountInfoContainer}>
          <div className={styles.accountInfo}>
            {/* <div className={styles.accountNameContainer}>
              <label htmlFor="name">Name</label>
              <AccountInfoChangePopupTrigger user={user} type={} />
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={user.name}
              />
              <Separator className={styles.separator} />
            </div> */}
            <div className={styles.accountUsernameContainer}>
              <label className={styles.lable} htmlFor="username">
                Username
              </label>

              <input
                className={styles.input}
                type="text"
                name="username"
                id="username"
                value={user.username}
                readOnly
              />
              <label
                className={` ${styles.lable} ${styles.info}`}
                htmlFor="username"
              >
                This username will be used as a username for you Profile Default
                Tree
              </label>
              <Separator className={styles.separator} />
            </div>
            <div className={styles.accountEmailContainer}>
              <label className={styles.lable} htmlFor="email">Email</label>
              <input
                className={styles.input}
                type="text"
                name="email"
                id="email"
                readOnly
                defaultValue={user.email}
              />
              <Separator className={styles.separator} />
              <label
                 className={` ${styles.lable} ${styles.info}`}
                htmlFor="email"
                style={{ lineHeight: "103%" }}
              >
                You cannot edit the email beacause you ave signed by Oauth
              </label>
            </div>

            <AccountInfoChangePopupTrigger
              className={`${styles.submit}`}
              changeAccountInfo={changeAccountInfo}
              user={{ username: user.username , }}
              type={"username"}
            >
              Edit
            </AccountInfoChangePopupTrigger>
          </div>
        </div>
      </div>
    </>
  );
}
