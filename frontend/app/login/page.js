"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button, Card, Form } from "react-bootstrap";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState();
  return (
    <div className="d-flex flex-column min-vh-100 min-vw-100">
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <Card>
          <div className="card-body">
            <div className="">
              <h6>Login to your account</h6>
              <p className="text-body-secondary">
                Enter your username below to login your account
              </p>
            </div>
            <div className="mt-4">
              <Form action={formAction}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="d-grid gap-2 mt-4">
                  <Button disabled={pending}>
                    {pending ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </Form>
              <p
                style={{ textAlign: "center", marginTop: 10, color: "#08142c" }}
              >
                {`Don't have an account?`}{" "}
                <Link href="/register" style={{ color: "#1677ff" }}>
                  <u>Signup</u>
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
