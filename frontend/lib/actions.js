"use server";

import { revalidatePath } from "next/cache";
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

export async function createTaskAction(prevState, formData) {
  const createTaskData = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    deadline: formData.get("deadline"),
  };

  if (
    isInvalidText(createTaskData.title) ||
    isInvalidText(createTaskData.description) ||
    isInvalidText(createTaskData.status) ||
    isInvalidText(createTaskData.deadline)
  ) {
    return {
      message: "Your input can't be empty or invalid!",
    };
  }

  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token").value;

    const deadline = new Date(createTaskData.deadline);
    deadline.setHours(23, 59, 59);

    createTaskData.deadline = deadline.toISOString();

    const response = await fetch("http://localhost:3000/api/tasks/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTaskData),
    });

    if (!response.ok) {
      return {
        message: "Failed to create task!",
      };
    }
  } catch (error) {
    return {
      message: "There is an error while creating task!",
    };
  }

  revalidatePath("/task");
  return redirect("/task");
}

export async function updateTaskAction(id, prevState, formData) {
  const updateTaskData = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    deadline: formData.get("deadline"),
  };

  if (
    isInvalidText(updateTaskData.title) ||
    isInvalidText(updateTaskData.description) ||
    isInvalidText(updateTaskData.status) ||
    isInvalidText(updateTaskData.deadline)
  ) {
    return {
      message: "Your input can't be empty or invalid!",
    };
  }

  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token").value;

    const deadline = new Date(updateTaskData.deadline);
    deadline.setHours(23, 59, 59);

    updateTaskData.deadline = deadline.toISOString();

    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTaskData),
    });

    if (!response.ok) {
      return {
        message: "Failed to update task!",
      };
    }
  } catch (error) {
    return {
      message: "There is an error while creating task!",
    };
  }

  revalidatePath("/task");
  return redirect("/task");
}

export async function deleteTaskAction(id) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token").value;

    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return redirect("/task?error=failed");
    }
  } catch (error) {
    return redirect("/task?error=failed");
  }

  revalidatePath("/task");
  return redirect("/task");
}

// export async function logout() {
//   (await cookies()).delete("token");
//   return redirect("/login");
// }
