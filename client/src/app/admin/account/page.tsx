import { User as UserModel } from "@/lib/DB/models/user";
import styles from "./style.module.css";
import { Separator } from "@/components/ui/separator";
import { connectToDB } from "@/lib/DB/connectDB";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import AccountInfoChangePopupTrigger from "./components/changeUsername/changeAccountInfo";
import { UserDocType } from "@/types";
import { DEFAULT_PROFILE_PIC } from "@/constants/user";

interface UserInfo {
  name: string;
  username: string;
  publicUID: number;
  profilePic: {
    public_id: string;
    URL: string;
  };
  email: string;
  bio: string;
}

interface GetUserInfoResult {
  success: boolean;
  message?: string;
  user?: UserInfo;
}

const getUserInfo = async (): Promise<GetUserInfoResult> => {
  try {
    await connectToDB();
    const session = await auth();
    if (!(session && session.user))
      return { success: false, message: "Login first" };

    const userID = session.user.id;

    let user: UserDocType | null = await UserModel.findById(userID);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (!user.username) {
      user.username = "NoUsername";
    }

    if (!user.profilePic) {
      user.profilePic = {
        public_id: DEFAULT_PROFILE_PIC.public_id,
        URL: DEFAULT_PROFILE_PIC.URL,
      };
    }

    let responseUser: UserInfo = {
      name: user.name,
      username: user.username,
      publicUID: user.publicUID,
      profilePic: user.profilePic,
      email: user.email,
      bio: user.bio,
    };

    return { success: true, user: responseUser };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

interface ChangeAccountInfoData {
  name?: string;
  username?: string;
}

interface ChangeAccountInfoResult {
  success: boolean;
  message?: string;
  user?: { username: string; name: string };
}

async function changeAccountInfo(
  data: ChangeAccountInfoData
): Promise<ChangeAccountInfoResult> {
  "use server";
  try {
    let { name, username } = data;

    await connectToDB();
    const session = await auth();
    if (!(session && session.user))
      return { success: false, message: "Login first" };

    const userID = session.user.id;

    const user = await UserModel.findById(userID);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (name) user.name = name;
    if (username) user.username = username;

    await user.save();

    // Professional: throw if required fields are missing
    if (!user.username || !user.name) {
      throw new Error(
        "Corrupt user data: username or name missing after save."
      );
    }

    let responseUser = {
      username: user.username,
      name: user.name,
    };

    revalidatePath("/admin/account");
    return { success: true, user: responseUser };
  } catch (error: any) {
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
    <>
      <div className={styles.container}>
        <h1> My Account </h1>

        <div className={styles.accountInfoContainer}>
          <div className={styles.accountInfo}>
            <div className={styles.accountUsernameContainer}>
              <label className={styles.lable} htmlFor="username">
                Username
              </label>

              <input
                className={styles.input}
                type="text"
                name="username"
                id="username"
                defaultValue={user?.username}
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
              <label className={styles.lable} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                type="text"
                name="email"
                id="email"
                readOnly
                defaultValue={user?.email}
              />
              <Separator className={styles.separator} />
              <label
                className={` ${styles.lable} ${styles.info}`}
                htmlFor="email"
                style={{ lineHeight: "103%" }}
              >
                You cannot edit the email beacause you have signed by Oauth
              </label>
            </div>

            <AccountInfoChangePopupTrigger
              className={`${styles.submit}`}
              changeAccountInfo={changeAccountInfo}
              user={{ username: user?.username }}
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
