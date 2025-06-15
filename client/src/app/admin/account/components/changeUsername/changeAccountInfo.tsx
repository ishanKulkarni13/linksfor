"use client";
import Popup from "@/components/popup/popup";
import styles from "./style.module.css";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { changeAdminAccountInfo } from "@/action/admin";

// Types for props
interface AccountInfoChangePopupTriggerProps {
  user: { username: string };
  type: string;
  children: ReactNode;
  changeAccountInfo?: (data: { username: string }) => Promise<any>;
  className?: string;
}

export default function AccountInfoChangePopupTrigger({
  user,
  type,
  children,
  changeAccountInfo,
  className,
}: AccountInfoChangePopupTriggerProps) {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <>
      <button
        className={`${className ?? ""}`}
        onClick={() => setActivePopup(type)}
      >
        {children}
      </button>

      {activePopup === "username" && (
        <ChangeUsernamePopup
          changeAccountInfo={changeAccountInfo}
          user={user}
          close={closePopup}
        />
      )}
    </>
  );
}

// Types for ChangeUsernamePopup
interface ChangeUsernamePopupProps {
  user: { username: string };
  close: () => void;
  changeAccountInfo?: (data: { username: string }) => Promise<any>;
}

const usernameFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: `Username must be of at least 4 characters long` })
    .max(20, { message: `Username must be of at most 20 characters long` }),
});

type UsernameFormValues = z.infer<typeof usernameFormSchema>;

function ChangeUsernamePopup({ user, close, changeAccountInfo }: ChangeUsernamePopupProps) {
  const [isLoading, setIsLoading] = useState(false);

  const usernameForm = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: user.username,
    },
  });

  const handleSubmit: SubmitHandler<UsernameFormValues> = async (values) => {
    setIsLoading(true);

    try {
      toast.loading(`Changing username...`, {
        id: "username",
      });
      // Prefer passed-in changeAccountInfo, fallback to default action
      const changeFn = changeAccountInfo ?? changeAdminAccountInfo;
      const { success, message, user: updatedUser } = await changeFn({ username: values.username });

      if (!success) {
        toast.error(`Username not changed, error occured: ${message}`, {
          id: "username",
        });
      } else {
        toast.success(`Changed username to ${updatedUser.username}`, {
          id: "username",
        });
        return close();
      }
    } catch (error: any) {
      toast.error(`username not changed, some error occured`, {
        description: error.message,
        id: "username",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Popup close={close} title={`Change username`}>
        <Form {...usernameForm}>
          <form
            onSubmit={usernameForm.handleSubmit(handleSubmit)}
            className={styles.form}
          >
            <FormField
              control={usernameForm.control}
              name="username"
              render={({ field }) => (
                <FormItem className={styles.inputContainer}>
                  <FormLabel className={styles.lable}>Username</FormLabel>
                  <FormControl>
                    <input
                      placeholder="username"
                      type="text"
                      {...field}
                      className={styles.input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              disabled={isLoading}
              type="submit"
              className={styles.doneButton}
            >
              {!isLoading && (
                <FontAwesomeIcon className={styles.doneIcon} icon={faCheck} />
              )}
              <span className={styles.doneText}>
                {!isLoading ? <>Change username</> : <>Loading...</>}
              </span>
            </button>
          </form>
        </Form>
      </Popup>
    </div>
  );
}
