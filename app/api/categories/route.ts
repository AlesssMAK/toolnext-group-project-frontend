import { NextResponse } from "next/server";
import  nextServer from "@/lib/api/api";

export async function GET() {
  const { data } = await nextServer.get("/categories");
  return NextResponse.json(data);
}
