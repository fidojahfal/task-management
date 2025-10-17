"use client";

import { deleteTaskAction } from "@/lib/actions";
import Link from "next/link";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";

export default function DataTaskTable({ tasks }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const handleShowModal = (id) => {
    setTaskId(id);
    setShowDeleteModal(true);
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
  return (
    <>
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <div className="modal-header">
          <h5 className="modal-title">Are you sure want delete this task?</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowDeleteModal(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-footer">
          <Button
            variant="danger"
            onClick={() => {
              setShowDeleteModal(false);
              deleteTaskAction(taskId);
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
