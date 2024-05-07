"use client";
import styles from "./regester.module.css";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleButton from "@/components/buttons/google/googleButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Toaster , toast} from "sonner";

const formSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    emailAddress: z.string().email(),
    password: z.string().min(3),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

export default function Home() {
  const {push} = useRouter();





  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      emailAddress: "",
      password: "",
      passwordConfirm: "",
    },
  });

  //   const accountType = form.watch("accountType");

  const handleSubmit = async (values) => {
    toast(`form submitted`);
    console.log("got values as", values);
    async function postFormData(name ,username, email, password) {
      try {

        toast('posing')
        let res = await fetch("http://localhost:4000/auth/local/regester", {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            name,
            username,
            password,
            email,
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        toast('posted')
        console.log(res);
        if (res.ok) {
          toast("res.ok is true");
          console.log("converting res-json to js");
          let responseData = await res.json();
          console.log("coverted res-json to js");
          return { success: true, error: false, response: responseData };
        } else {
          console.log("res.ok is false");
          console.log("converting res-json to js");
          let responseData = await res.json();
          console.log("coverted res-json to js");
          return { success: false, error: false, response: responseData };
        }
      } catch (error) {
        toast(error)
        console.log("error while posting data", error);
        return { success: false, error: true, response: error };
      }
    }
    let { success, response, error } = await postFormData(
      values.name,
      values.username,
      values.emailAddress,
      values.password
    );
    if (success) {
      console.log('regester sucessful');
      console.log("here is the user", response);
      push('/login');
    } else{
      if (error) {
        console.log("Some error occured", error);
      push('/regester');
      } else{
        console.log("User not regestered", response.message );
      }
    }
  };

  return (
    <main className={` ${styles.regesterContainer}`}>
    <Toaster expand={true} />
      <div className={`${styles.titleContainer}`}>
        <h1>Regester</h1>
      </div>
      <div className={`${styles.regesterFormContainer}`}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className=" w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
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
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Username"
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
              name="emailAddress"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        type="email"
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
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
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
              name="passwordConfirm"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password confirm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password confirm"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <button type="submit" className={styles.regesterButton}>
              Regester
            </button>
          </form>
        </Form>
      </div>
      <div className={`${styles.otherRegesterWaysContainer}`}>
        <span>OR</span>
        <div className={`${styles.otherRegesterWays}`}>
        <div className={`${styles.regesterWithGoogleContiner}`}>
            <GoogleButton/>
        </div>
        </div>
      </div>
    </main>
  );
}
