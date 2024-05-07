"use client";
import styles from "./login.module.css";
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

const formSchema = z
  .object({
    username: z.string(),
    password: z.string().min(3),
  })
  .refine(
    (data) => {
      return true; // temp
    },
    {
      message: "lol bro",
      path: ["password"],
    }
  );

export default function Login() {

  const {push} = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  //   const accountType = form.watch("accountType");

  const handleSubmit = async (values) => {
    console.log(`form submitted`);
    console.log("got values as", values);

    async function postFormData(username, password) {
      try {
        let res = await fetch("http://localhost:4000/auth/local/login", {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            username,
            password,
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          redirect: "follow",
        });
        console.log(res);
        if (res.ok) {
          console.log("res.ok is true");
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
        console.log("error while posting data", error);
        return { success: false, error: true, response: error };
      }
    }
    let { success, response, error } = await postFormData(
      values.username,
      values.password
    );
    if (success) {
      console.log('login sucessful');
      console.log("here is the user", response);
      push('/me');
    } else{
      if (error) {
        console.log("Some error occured", error);
      push('/login');
      } else{
        console.log("User not logged in", response.message );
      }
    }
  };

  return (
    <main className={` ${styles.container}`}>
      <div className={`${styles.titleContainer}`}>
        <h1>Login</h1>
      </div>
      <div className={`${styles.loginFormContainer}`}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className=" w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" type="text" {...field} />
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

            <Button type="submit" className="w-full">
              Regester
            </Button>
          </form>
        </Form>
      </div>
      <div className={`${styles.otherLoginWaysContainer}`}>
        <span>OR</span>
        <div className={`${styles.otherLoginWays}`}>
          <div className={`${styles.loginWithGoogleContiner}`}>
            <GoogleButton />
          </div>
        </div>
      </div>
    </main>
  );
}
