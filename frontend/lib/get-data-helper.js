"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getListTask() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token");

    const response = await fetch("http://localhost:3000/api/tasks/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (response.status == 401) {
      (await cookiesStore).delete("token");
      return redirect("/login");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    const responseJson = await response.json();

    return responseJson.data;
  } catch (error) {}
}
