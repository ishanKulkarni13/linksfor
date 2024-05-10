
"use client";

import { useEffect, useState } from "react";
import {backendBaseURL} from "@/constants/index"
export default function Me() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    async function getUserInfo() {
      try {
        let res = await fetch(`${backendBaseURL}/user/userInfo`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        });
        let data = await res.json();
        console.log(data.name);
        setUser(data);
        return data;
      } catch (error) {
        console.log('error getUserInfo', error);
      }
    }
    getUserInfo();
  }, []);
  return (
    <main>
      <h3>Your Info</h3>
      <ul>
        <li>
            Your Name: {user.name}
        </li>
        <li>
            Your Username: {user.username}
        </li>
        <li>
            Your Email: {user.email}
        </li>
      </ul>
    </main>
  );
}
