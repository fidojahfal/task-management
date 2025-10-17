"use client";

import { createTaskAction, updateTaskAction } from "@/lib/actions";
import { getTask } from "@/lib/get-data-helper";
import { useParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

export default function UpdatePage() {
  const { id } = useParams();
  const editTaskById = updateTaskAction.bind(null, parseInt(id));
  const [state, formAction, pending] = useActionState(editTaskById, {
    message: null,
  });
  const [dataTask, setDataTask] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await getTask(id);

      setDataTask(res);
    }

    fetchData();
  }, [id, setDataTask]);

  if (Object.keys(dataTask).length === 0) {
    return (
      <div className="d-flex flex-column min-vh-100 min-vw-100">
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="d-flex flex-column min-vh-100 min-vw-100">
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <Card style={{ minWidth: "30rem" }}>
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <h2>Update A Task</h2>
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
                    defaultValue={dataTask.title}
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
                    defaultValue={dataTask.description}
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
                    placeholder="Status"
                    defaultValue={dataTask.status}
                  >
                    <option>Status Task</option>
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
                    defaultValue={
                      dataTask.deadline
                        ? new Date(dataTask.deadline)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                  />
                </div>
                <p>{state.message && state.message}</p>
                <div className="d-grid gap-2 mt-4">
                  <Button type="submit">
                    {pending ? "Updating..." : "Update"}
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
