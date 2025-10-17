"use server";

import { redirect } from "next/navigation";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function registerAction(prevState, formData) {
  const registerData = {
    name: formData.get("name"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("cPassword"),
  };

  if (
    isInvalidText(registerData.name) ||
    isInvalidText(registerData.username) ||
    isInvalidText(registerData.password) ||
    isInvalidText(registerData.confirm_password)
  ) {
    return {
      message: "Your input can't be empy or invalid!",
    };
  }

  if (registerData.password.length < 8 || registerData.confirm_password < 8) {
    return {
      message: "Your password must be at least 8 characters!",
    };
  }

  if (registerData.password !== registerData.confirm_password) {
    return { message: "Your password is not same!" };
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (!res.ok) {
      return {
        message: "Failed to registering user!",
      };
    }
  } catch (error) {
    return {
      message: "There is an error in server while registering user!",
    };
  }

  return redirect("/login");
}
