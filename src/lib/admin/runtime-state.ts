type ProjectRuntimeStatus = "idle" | "running" | "success" | "error";

type ProjectRuntimeEntry = {
  project: string;
  status: ProjectRuntimeStatus;
  updatedAt: string;
  details?: any;
};

const runtimeStore: Record<string, ProjectRuntimeEntry> = {};

export function projectState(project: string = "global") {
  if (!runtimeStore[project]) {
    runtimeStore[project] = {
      project,
      status: "idle",
      updatedAt: new Date().toISOString(),
      details: null,
    };
  }

  return {
    get() {
      return runtimeStore[project];
    },

    set(status: ProjectRuntimeStatus, details: any = null) {
      runtimeStore[project] = {
        project,
        status,
        updatedAt: new Date().toISOString(),
        details,
      };
      return runtimeStore[project];
    },

    reset() {
      runtimeStore[project] = {
        project,
        status: "idle",
        updatedAt: new Date().toISOString(),
        details: null,
      };
      return runtimeStore[project];
    },
  };
}