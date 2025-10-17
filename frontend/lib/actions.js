"use server";

import { cookies } from "next/headers";
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

export async function loginAction(prevState, formData) {
  const loginData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (isInvalidText(loginData.username) || isInvalidText(loginData.password)) {
    return {
      message: "Your input can't be empty or invalid!",
    };
  }

  if (loginData.password.length < 8) {
    return {
      message: "Your password must be at least 8 characters!",
    };
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      return {
        message: res.errors || "Failed to signing in user!",
      };
    }
    const responseJson = await res.json();
    const { token } = responseJson.data;

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });
  } catch (error) {
    return {
      message: "There is an error while signing in your account!",
    };
  }

  return redirect("/task");
}

// export async function logout() {
//   (await cookies()).delete("token");
//   return redirect("/login");
// }
