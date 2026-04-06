type TaskState = {
  project: string;
  step: number;
  status: "pending" | "done";
};

let currentState: TaskState = {
  project: "BossMind",
  step: 0,
  status: "pending",
};

export function getState() {
  return currentState;
}

export function updateState(step: number, status: "pending" | "done") {
  currentState.step = step;
  currentState.status = status;
}