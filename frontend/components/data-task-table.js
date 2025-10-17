"use client";

import Link from "next/link";
import { Button, Table } from "react-bootstrap";

export default function DataTaskTable({ tasks }) {
  const badgeColor = {
    "To Do": "text-bg-danger",
    "In Progress": "text-bg-warning",
    Done: "text-bg-success",
  };
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Deadline</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task, index) => {
          return (
            <tr key={task.task_id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <span className={`badge ${badgeColor[task.status]}`}>
                  {task.status}
                </span>
              </td>
              <td>{task.deadline}</td>
              <td>
                <div className="d-flex gap-4">
                  <Button>
                    <Link href={`/task/update/${task.task_id}`}>Update</Link>
                  </Button>
                  <Button className="btn-danger">Delete</Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
