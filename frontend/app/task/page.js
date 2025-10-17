import DataTaskTable from "@/components/data-task-table";
import { getListTask } from "@/lib/get-data-helper";

export default async function TaskPage() {
  const tasks = await getListTask();

  return (
    <div className="container">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-center title mt-5">
          <h1>Your Task</h1>
        </div>
        <div className="mt-5">
          <DataTaskTable tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
