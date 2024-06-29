"use client";
import Popup from "@/components/popup/popup";
import styles from "./style.module.css";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { changeAdminAccountInfo } from "@/action/admin";

export default function AccountInfoChangePopupTrigger({
  user,
  type,
  children,
  changeAccountInfo,
  className,
}) {
  const [activePopup, setActivePopup] = useState(null);

  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <>
      <button
        className={`${className}`}
        onClick={() => setActivePopup(type)}
      >
        {children}
      </button>

      {activePopup == "username" && (
        <ChangeUsernamePopup
          changeAccountInfo={changeAccountInfo}
          user={user}
          close={closePopup}
        />
      )}
    </>
  );
}

function ChangeUsernamePopup({ user, close }) {
  const [isLoading, setIsLoading] = useState(false);

  const usernameFormSchema = z.object({
    username: z
      .string()
      .min(4, { message: `Username must be of at least 4 caracter long` })
      .max(20, { message: `Username must be of at most 20 character long` }), // tempppppp
  });
  // .refine(
  //   (data) => {
  //     return data.username == "data";
  //   },
  //   {
  //     message: "devevev URL",
  //     path: ["username"],
  //   }
  // );

  const usernameForm = useForm({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: {
      username: user.username,
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      toast.loading(`Changing username...`, {
        id: "username",
      });
      const { success, message, user } = await changeAdminAccountInfo({username: values.username});

      if (!success) {
        toast.error(`Username not changed, error occured: ${message}`, {
          id: "username",
        });
      } else {
        toast.success(`Changed username to ${user.username}`, {
          id: "username",
        });
        return close();
      }
    } catch (error) {
      toast.error(`username not changed, some error occured`, {
        description: error.message,
        id: "username",
      });
    } finally {
      setIsLoading(false);
    }
  
  };

  return (
    <>
      <div>
        <Popup close={close} title={`Change username`}>
          <Form {...usernameForm}>
            {/* <h1 className={styles.title} ></h1> */}
            <form
              onSubmit={usernameForm.handleSubmit(handleSubmit)}
              className={styles.form}
            >
              <FormField
                control={usernameForm.control}
                name="username"
                render={({ field }) => {
                  return (
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
                  );
                }}
              />

              <button
                disabled={isLoading && false}
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
    </>
  );
}
