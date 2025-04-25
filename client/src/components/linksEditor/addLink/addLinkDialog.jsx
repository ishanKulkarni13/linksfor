"use client";
import styles from "./addLinkDialog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
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
import CustomeDialog from "@/components/Dialog/dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";

const AddLinkFormSchema = z
  .object({
    URL: z.string().min(1, { message: `Plesae entre a URL` }).url(), // tempppppp
    title: z
      .string()
      .min(1, { message: `Title should be if at least 1 character long` })
      .max(20, { message: `Title must be of at most 20 character long` }),
  })
  .refine(
    (data) => {
      return data.URL != data.title;
    },
    {
      message: "Invalid URL",
      path: ["URL"],
    }
  );

const AddHeaderFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: `Header title should be if at least 1 character long` }),
});

export default function AddLinkDialog({ setLinks, treeUID, type, disabled }) {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const AddLinkForm = useForm({
    resolver: zodResolver(AddLinkFormSchema),
    defaultValues: {
      URL: "",
      title: "",
    },
  });

  const AddHeaderForm = useForm({
    resolver: zodResolver(AddHeaderFormSchema),
    defaultValues: {
      // URL: "",
      title: "",
    },
  });

  // handel form submit
  const handleSubmit = async (values) => {
    const handelAdd = async (title, URL) => {
      try {
        setIsLoading(true);
        let res = await fetch(`/api/tree/edit/add/${type}/${treeUID}`, {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            URL,
            title,
            type,
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        setIsLoading(false);
        if (res.ok) {
          let responseData = await res.json();
          return { success: true, error: false, response: responseData };
        } else {
          let responseData = await res.json();
          return { success: false, error: false, response: responseData };
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
        return { success: false, error: error, response: error };
      }
    };

    //calling function and gettting data
    let { success, response, error } = await handelAdd(
      values.title,
      type != "header" && values.URL
    );
    if (success) {
      console.log(`Added ${type}`);
      setLinks(response.links);
      // close();
      setOpen(false);
      setIsLoading(false);
      // Reset the form inputs after successful submission
      if (type === "header") {
        AddHeaderForm.reset();
      } else {
        AddLinkForm.reset();
      }
    } else {
      if (error) {
        // if catched error in fetch
        console.log("Some error occured", error);
      } else {
        //no error in fetch and success is false(from server)
        toast.error(`${type} not added: ${response.message}`);
        console.log(`${type} not added`, response.message);
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} className={styles.dialog}>
        <DialogTrigger asChild>
          <button className={styles.addLinkButton}>
            <div className={styles.addIconContainer}>
              <FaPlus />{" "}
            </div>
            {type == `header` ? <p>Header</p> : <p>Link</p>}
          </button>
        </DialogTrigger>

        {/* <DialogContent> */}
        <DialogContent className={styles.popUpContainer}>
          <DialogHeader className={styles.DialogHeader}>
            <DialogTitle className={styles.dialogTitle}>
              Edit profile
            </DialogTitle>
            {/* <DialogDescription className={styles.DialogDescription}>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>

          <div className={styles.popUpFormContainer}>
            {type == `header` ? (
              <>
                <Form {...AddHeaderForm}>
                  <form
                    onSubmit={AddHeaderForm.handleSubmit(handleSubmit)}
                    className={styles.form}
                  >
                    <FormField
                      control={AddHeaderForm.control}
                      name="title"
                      render={({ field }) => {
                        return (
                          <FormItem className={styles.inputContainer}>
                            <FormLabel className={styles.lable}>
                              Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={styles.titleInput}
                                placeholder="Title"
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
                      disabled={isLoading}
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
            ) : (
              <>
                <Form {...AddLinkForm}>
                  <form
                    onSubmit={AddLinkForm.handleSubmit(handleSubmit)}
                    className={styles.form}
                  >
                    <FormField
                      control={AddLinkForm.control}
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
                      control={AddLinkForm.control}
                      name="title"
                      render={({ field }) => {
                        return (
                          <FormItem className={styles.inputContainer}>
                            <FormLabel className={styles.lable}>
                              Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                className={styles.titleInput}
                                placeholder="Title"
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
            )}
          </div>
        </DialogContent>
        {/* </DialogContent> */}
      </Dialog>
    </>
  );
}
