"use client";
import styles from "./login.module.css";
import { backendBaseURL } from "@/constants/index";
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
import { Toaster, toast } from "sonner";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3),
  })

export default function Login() {
  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const handleSubmit = async (values) => {

    async function postFormData(email, password) {
      try {
        email = email.toLowerCase();
        let res = await fetch(`${backendBaseURL}/auth/local/login`, {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            email,
            password,
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
        return { success: false, error: error, response: error };
      }
    }
    let { success, response, error } = await postFormData(
      values.email,
      values.password
    );
    if (success) {
      toast.success("login sucessful");
      push("/admin/me");
    } else {
      if (error) {
        toast.error(`Some error occured ${response.message}`);
        push("/login");
      } else {
        toast.error(`${response.message}`);
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
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="text" {...field} />
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

            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </Form>
      </div>
      <div className={`${styles.otherLoginWaysContainer}`}>
        <span className={`${styles.orText}`} >OR</span>
        <div className={`${styles.otherLoginWays}`}>
          <div className={`${styles.loginWithGoogleContiner}`}>
            <GoogleButton />
          </div>
        </div>
      </div>
      <Toaster richColors={true}/>
    </main>
  );
}
