import { projectName } from "./project";

export function showAdd(projectName) {
    const addTaskForm = document.getElementById('addTaskForm');
    addTaskForm.classList.remove('hidden');
}
export function hideAdd() {
    // Hide the add task form after adding the task
    const addTaskForm = document.getElementById('addTaskForm');
    addTaskForm.classList.add('hidden');
}
