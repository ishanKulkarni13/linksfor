"use client";
import React from "react";
import styles from "./add.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import Popup from "@/components/popup/popup";
import axios from "axios";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { socialIcons } from "@/constants/tree";
import { SocialIcon } from "@/components/icons/social/socialIcon";

export default function AddPopUpContent({ close, setSocials, treeUID }) {
  const [social, setSocial] = useState({ URL: "", icon: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  // handel form submit
  const handleDone = async () => {
    setError({});
    if (social.URL.length < 1) {
      setError({ ...error, URL: "Please enter URL" });
      return toast.error("Please provide required fields properly", {
        id: "socials",
      });
    } else if (social.icon.length < 1) {
      setError({ ...error, icon: "Please enter icon" });
      return toast.error("Please provide required fields properly", {
        id: "socials",
      });
    }

    const values = { URL: social.URL, icon: social.icon };
    try {
      toast.loading(`Adding...`, {
        id: "socials",
      });

      const res = await axios.post(
        `/api/admin/tree/edit/socials/add`,
        { URL: values.URL, icon: values.icon, treeUID: treeUID },
        { withCredentials: true }
      );

      setSocials(res.data.socials);
      toast.dismiss("socials");
      return close();
    } catch (error) {
      console.log(error);
      if (error.response) {
        // if server responded

        toast.error(error.response.data.message, {
          id: "socials",
        });
      } else if (error.request) {
        //req was made but go no response
        toast.error(`error occured`, {
          id: "socials",
        });
      } else {
        toast.error(`some error occured: ${error.message}`, {
          id: "socials",
        });
      }
    }
  };

  return (
    <>
      {/* <Popup close={close} title={"Add Social"}> */}
        <div className={styles.popUpContainer}>
          <div className={styles.URLContainer}>
            <label className={styles.lable} htmlFor="URLInput">
              URL:
            </label>
            <input
              name="URL"
              className={styles.URLInput}
              placeholder="Enter full URL"
              id="URLInput"
              value={social.URL}
              onChange={(e) =>
                setSocial({ ...social, URL: e.currentTarget.value })
              }
            ></input>
          </div>

          <div className={styles.iconSelectContainer}>
            {setSocial}
            <Command className={styles.command}>
              <CommandInput placeholder="Search Icons..." />
              <CommandEmpty>No icon found.</CommandEmpty>
              <CommandList>
                <CommandGroup className={styles.commandGroup}>
                  {Object.keys(socialIcons).map((ObjKey) => {

                    return (
                      <CommandItem
                        className={styles.socialContainer}
                        key={socialIcons[ObjKey].key}
                        value={socialIcons[ObjKey].key}
                        onSelect={(currentValue) => {
                          setSocial((prev) => ({
                            ...prev,
                            icon: currentValue,
                          }));
                        }}
                      >
                        <SocialIcon
                          className={styles.icon}
                          iconName={socialIcons[ObjKey].key}
                        />

                        <span className={styles.socialIconName}>
                          {socialIcons[ObjKey].name}
                        </span>

                        { social.icon == socialIcons[ObjKey].key &&
                          <FaCheck
                          className={`${styles.icon} ${styles.tick}`}
                        />
                        }
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          <button
            disabled={isLoading && false}
            onClick={handleDone}
            className={styles.doneButton}
          >
            {!isLoading && (
              <FontAwesomeIcon className={styles.doneIcon} icon={faCheck} />
            )}
            <span className={styles.doneText}>
              {!isLoading ? <>Done</> : <>Loading...</>}
            </span>
          </button>
        </div>
      {/* </Popup> */}
    </>
  );
}
