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
import {  toast } from "sonner";
import { useState } from "react";

const AddLinkFormSchema = z
  .object({
    URL: z.string().min(1, { message: `Plesae entre a URL` }).url(), // tempppppp
    title: z
      .string()
      .min(1, { message: `Title should be if at least 1 character long` }).max(20, { message: `Title must be of at most 20 character long` }),
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

  const AddHeaderFormSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: `Header title should be if at least 1 character long` }),
  })

export default function AddPopUp({ close, setLinks, treeUID, type }) {
  const { push } = useRouter();
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
    const handelAdd = async (title, URL ) => {
      
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
      (type != 'header') && values.URL,
    );
    if (success) {
      console.log(`Added ${type}`);
      setLinks(response.links);
      close();
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
      <div className={`${styles.blur}`}></div>
      <div className={`${styles.container}`}>
        <div className={styles.popUpContainer}>
          <div className={styles.top}>
            <div className={styles.popUpTitle}>
              <p>Add {(type != `header`?('Link'):('Header'))}</p>
            </div>
            <button className={styles.closeButton} onClick={close}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className={styles.popUpFormContainer}>
            {type == `header` ? (
              <>
                <Form {...AddHeaderForm}>
                  <form
                    onSubmit={AddHeaderForm.handleSubmit(handleSubmit)}
                    className={styles.form}
                  >
                    {/* <FormField
                      control={AddHeaderForm.control}
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
                    /> */}

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
                    <button disabled={isLoading} type="submit" className={styles.doneButton}>
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
                    <button disabled={isLoading && false}  type="submit" className={styles.doneButton}>
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
        </div>
      </div>
    </>
  );
}
