"use client";
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

const AddLinkFormSchema = z.object({
  URL: z.string().min(1, { message: `Plesae entre a URL` }).url(),
  icon: z.string(),
});

export default function AddPopUp({ close, setSocials, treeUID }) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AddForm = useForm({
    resolver: zodResolver(AddLinkFormSchema),
    defaultValues: {
      URL: "",
      icon: "",
    },
  });

  // handel form submit
  const handleSubmit = async (values) => {
    try {
      toast.loading(`Adding...`, {
        id: "socials",
      });

      const res = await axios.post(
        `/api/admin/tree/edit/socials/add`,
        { URL: values.URL, icon: values.icon, treeUID: treeUID },
        { withCredentials: true }
      );

      const tempSocial = {
        URL:'https;//gg.com',
      icon:  'telegram',
      UID:'87734873487' ,
      }

      setSocials(res.data.socials);
      console.log(res.data.socials);
      toast.dismiss('socials')
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
          <div className={styles.popUpFormContainer}>
            <>
              <Form {...AddForm}>
                <form
                  onSubmit={AddForm.handleSubmit(handleSubmit)}
                  className={styles.form}
                >
                  <FormField
                    control={AddForm.control}
                    name="URL"
                    render={({ field }) => {
                      return (
                        <FormItem className={styles.inputContainer}>
                          <FormLabel className={styles.lable}>URL</FormLabel>
                          <FormControl>
                            <Input
                              className={styles.URLInput}
                              placeholder="URL"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={AddForm.control}
                    name="icon"
                    render={({ field }) => {
                      return (
                        <FormItem className={styles.inputContainer}>
                          <FormLabel className={styles.lable}>Icon</FormLabel>
                          <FormControl>
                            <Input
                              className={styles.titleInput}
                              placeholder="Icon"
                              type="text"
                              {...field}
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
                      <FontAwesomeIcon
                        className={styles.doneIcon}
                        icon={faCheck}
                      />
                    )}
                    <span className={styles.doneText}>
                      {!isLoading ? <>Done</> : <>Loading...</>}
                    </span>
                  </button>
                </form>
              </Form>
            </>
          </div>
        </div>
      </Popup>
    </>
  );
}
