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

export default function AddPopUp({ close, setSocials, treeUID }) {
  const [social, setSocial] = useState({URL:'', icon:''});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  // handel form submit
  const handleSubmit = async () => {
    setError({})
    if(  social.URL.length < 1  ) {
      setError({...error, URL:"Please enter URL" })
      return toast.error('Please provide required fields properly', {
        id: 'socials'
      })
    } else if (  social.icon.length < 1) {
      setError({...error, icon:"Please enter icon" })
      return toast.error('Please provide required fields properly', {
        id: 'socials'
      })
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
      <Popup close={close} title={"Add Social"}>
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
            <label className={styles.lable} htmlFor="icon">
              icon
            </label>
            <input
              name="icon"
              className={styles.iconInput}
              placeholder="icon"
              id="icon"
              value={social.icon}
              onChange={(e) =>
                setSocial({ ...social, icon: e.currentTarget.value })
              }
            ></input>
          </div>

          <button
            disabled={isLoading && false}
            onClick={handleSubmit}
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
      </Popup>
    </>
  );
}
