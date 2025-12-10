"use server";
import { cookies } from "next/headers";
import nextServer from "./api";
import { User } from "@/types/user";

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}
  
  export async function getServerMe() {
    const cookieStore = await cookies();
    const { data } = await nextServer.get<User>("/users/me", {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  }