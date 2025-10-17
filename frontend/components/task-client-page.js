"use client";

import DataTaskTable from "@/components/data-task-table";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";

export default function TaskClientPage({ tasks }) {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!filter) {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === filter));
    }
  }, [filter, tasks]);

  return (
    <div className="container">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-center title mt-5">
          <h1>Your Task</h1>
        </div>
        <div>
          <div className="d-flex justify-content-between">
            <Dropdown>
              <DropdownToggle variant="primary">
                {filter ? filter : "Filter Status"}
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem
                  onClick={() => {
                    setFilter("");
                  }}
                >
                  Filter Status
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilter("To Do");
                  }}
                >
                  To Do
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilter("In Progress");
                  }}
                >
                  In Progress
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilter("Done");
                  }}
                >
                  Done
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button className="btn-success">
              <Link href="/task/create">Create Task</Link>
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <DataTaskTable tasks={filteredTasks} />
        </div>
      </div>
    </div>
  );
}
