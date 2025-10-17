import TaskClientPage from "@/components/task-client-page";
import { getListTask } from "@/lib/get-data-helper";

export default async function TaskPage() {
  let tasks = await getListTask();

  return <TaskClientPage tasks={tasks} />;
}
