"use client";
import styles from "./addLink.module.css";
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
import { Toaster, toast } from "sonner";
import { useState } from "react";

const formSchema = z
  .object({
    URL: z.string().min(1),
    title: z.string().min(1),
  })
  .refine(
    (data) => {
      return data.URL != data.title;
    },
    {
      message: "The URL cant be same as the title, lol",
      path: ["URL"],
    }
  );

export default function AddLinkPopUp({ close,setLinks, treeUID }) {
  const { push } = useRouter();
  const [isLoading, setIsLoading]= useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      URL: "",
      title: "",
    },
  });

  // handel form submit
  const handleSubmit = async (values) => {
    const handelAddLink = async(URL,title)=>{
      try {
        setIsLoading(true)
        console.log('posing')
        let res = await fetch(`/api/tree/edit/add/link/${treeUID}`, {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            URL,title
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        setIsLoading(false)
        if (res.ok) {
        let responseData = await res.json();
          return { success: true, error: false, response: responseData };
        } else {
          let responseData = await res.json();
          return { success: false, error: false, response: responseData };
        }


      } catch (error) {

        setIsLoading(false)
        toast.error(error.message)
        return { success: false, error: error, response: error };
      }
    }
    //calling function and gettting data
    let { success, response, error } = await handelAddLink(
      values.URL,
      values.title
    );
    if (success) {
      console.log('Added link');
      setLinks(response.links)
      close()
    } else{
      if (error) {
        // if catched error in fetch
        console.log("Some error occured", error);
      } else{
        //no error in fetch and success is false(from server)
        toast.error(`Link not added: ${response.message}`)
        console.log("Link not added", response.message );
      }
    }
    
  };

  return (
    <>
    <div className={`${styles.blur}` } ></div>
      <div className={`${styles.container}` }>
        <div className={styles.popUpContainer}>
          <div className={styles.top}>
            <div className={styles.popUpTitle}>
              <p>Add Link</p>
            </div>
            <button className={styles.closeButton} onClick={close}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className={styles.popUpFormContainer}>
            {/* <div className={` ${styles.formContainer}`}> */}
            {/* <div className={`${styles.regesterFormContainer}`}> */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={styles.form}
              >
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem className={styles.inputContainer}>
                        <FormLabel className={styles.lable}>Title</FormLabel>
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
                <button type="submit" className={styles.doneButton}>
                  {!isLoading && <FontAwesomeIcon className={styles.doneIcon} icon={faCheck} />}
                  <span className={styles.doneText}>{ !isLoading?(<>Done</>):(<>Loading...</>) }</span>
                </button>
              </form>
            </Form>
            {/* </div> */}

            {/* </div> */}
          </div>
        </div>
      </div>
      <Toaster richColors />
    </>
  );
}
