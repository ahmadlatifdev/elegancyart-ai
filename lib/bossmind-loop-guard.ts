type GuardInput = {
  currentTask: string;
  requestedStep: string;
  lastCompletedStep: string;
  allowedPaths: string[];
};

type GuardResult = {
  allowed: boolean;
  reason: string;
  nextExactStep: string;
};

function normalize(value: string) {
  return (value || "").trim().toLowerCase();
}

export function guardAgainstLoop(input: GuardInput): GuardResult {
  const currentTask = normalize(input.currentTask);
  const requestedStep = normalize(input.requestedStep);
  const lastCompletedStep = normalize(input.lastCompletedStep);
  const allowedPaths = (input.allowedPaths || []).map(normalize);

  if (!currentTask) {
    return {
      allowed: false,
      reason: "Missing current task",
      nextExactStep: "Define current task first",
    };
  }

  if (!requestedStep) {
    return {
      allowed: false,
      reason: "Missing requested step",
      nextExactStep: lastCompletedStep || "Provide exact next step",
    };
  }

  if (requestedStep === lastCompletedStep) {
    return {
      allowed: false,
      reason: "Loop detected: repeated completed step",
      nextExactStep: "Move to the next unfinished step only",
    };
  }

  if (
    allowedPaths.length > 0 &&
    !allowedPaths.some(
      (path) => requestedStep.includes(path) || path.includes(requestedStep)
    )
  ) {
    return {
      allowed: false,
      reason: "Random unrelated step blocked",
      nextExactStep: "Stay inside the current approved path only",
    };
  }

  return {
    allowed: true,
    reason: "Step approved",
    nextExactStep: requestedStep,
  };
}