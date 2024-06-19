"use client";
import styles from "./regester.module.css";
import {backendBaseURL} from "@/constants/index"
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
import { toast} from "sonner";

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

  const handleSubmit = async (values) => {
    toast(`form submitted`);
    console.log("got values as", values);
    async function postFormData(name ,username, email, password) {
      try {
        email = email.toLowerCase();
        username = username.toLowerCase();
        let res = await fetch(`/api/auth/regester`, {
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
        if (res.ok) {
          let responseData = await res.json();
          return { success: true, error: false, response: responseData };
        } else {
          let responseData = await res.json();
          return { success: false, error: false, response: responseData };
        }
      } catch (error) {
        toast,error(error.message)
        return { success: false, error: error, response: error };
      }
    }
    let { success, response, error } = await postFormData(
      values.name,
      values.username,
      values.emailAddress,
      values.password
    );
    if (success) {
      toast.success("Regestered sucessful")
      push('/login');
    } else{
      if (error) {
        toast.error(`some error occured, ${response.message}`)
      push('/regester');
      } else{
        console.log("User not regestered", response.message );
      }
    }
  };

  return (
    <main className={` ${styles.regesterContainer}`}>
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
