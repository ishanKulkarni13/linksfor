"use client";
import styles from "./login.module.css";
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
import { Toaster, toast } from "sonner";

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
        username = username.toLowerCase();
        toast.info(username)
        let res = await fetch(`${backendBaseURL}/auth/local/login`, {
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
        });
        console.log(res);
        if (res.ok) {
          let responseData = await res.json();
          return { success: true, error: false, response: responseData };
        } else {
          let responseData = await res.json();
          return { success: false, error: false, response: responseData };
        }
      } catch (error) {
        toast.error(`some error occured`)
        console.log("error while posting data", error);
        return { success: false, error: error, response: error };
      }
    }
    let { success, response, error } = await postFormData(
      values.username,
      values.password
    );
    if (success) {
      toast.success('login sucessful');
      push('/admin/me');
    } else{
      if (error) {
        toast.error(`Some error occured ${response.message}`);
      push('/login');
      } else{
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
      <Toaster/>
    </main>
  );
}
