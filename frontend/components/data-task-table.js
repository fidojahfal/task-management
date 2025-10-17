"use client";

import { deleteTaskAction } from "@/lib/actions";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button, Table } from "react-bootstrap";
import ModalGeneric from "./modal";

export default function DataTaskTable({ tasks }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const handleShowModal = (id) => {
    setTaskId(id);
    setShowDeleteModal(true);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const badgeColor = {
    "To Do": "text-bg-danger",
    "In Progress": "text-bg-warning",
    Done: "text-bg-success",
  };

  const toReadableDate = (iso) => {
    const date = new Date(iso);

    return date.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  const sortedTasks = useMemo(() => {
    if (!sortConfig.key) return tasks;

    const sorted = [...tasks].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue);
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return aValue - bValue;
      }

      return aValue > bValue ? 1 : -1;
    });

    return sortConfig.direction === "asc" ? sorted : sorted.reverse();
  }, [tasks, sortConfig]);
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th
              onClick={() => handleSort("deadline")}
              style={{ cursor: "pointer" }}
            >
              Deadline{" "}
              {sortConfig.key === "deadline" &&
                (sortConfig.direction === "asc" ? "▲" : "▼")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks?.map((task, index) => {
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
                <td>{toReadableDate(task.deadline)}</td>
                <td>
                  <div className="d-flex gap-4">
                    <Button>
                      <Link href={`/task/update/${task.task_id}`}>Update</Link>
                    </Button>
                    <Button
                      className="btn-danger"
                      onClick={() => handleShowModal(task.task_id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ModalGeneric
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        action={deleteTaskAction}
        title={"Are you sure want delete this task?"}
        id={taskId}
      />
    </>
  );
}
