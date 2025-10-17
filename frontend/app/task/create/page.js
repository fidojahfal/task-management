"use client";

import { createTaskAction } from "@/lib/actions";
import { useActionState } from "react";
import { Button, Card, Form } from "react-bootstrap";

export default function CreatePage() {
  const [state, formAction, pending] = useActionState(createTaskAction, {
    message: null,
  });
  return (
    <div className="d-flex flex-column min-vh-100 min-vw-100">
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <Card style={{ minWidth: "30rem" }}>
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <h2>Create A Task</h2>
            </div>
            <div className="mt-4">
              <Form action={formAction}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="status">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    placeholder="Stat"
                  >
                    <option selected>Status Task</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="deadline">
                    Deadline
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    id="deadline"
                    name="deadline"
                  />
                </div>
                <p>{state.message && state.message}</p>
                <div className="d-grid gap-2 mt-4">
                  <Button type="submit">
                    {pending ? "Creating..." : "Create"}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
