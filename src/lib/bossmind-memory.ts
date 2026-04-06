type BossMindContext = {
  project: string;
};

type WriteMemoryInput = {
  key: string;
  value: any;
  project?: string;
};

const memoryStore: Record<string, any> = {};

export async function writeEventLog(data: any) {
  try {
    console.log("BossMind Memory Log:", data);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function writeMemory(input: WriteMemoryInput) {
  try {
    const project = input.project || "global";
    const fullKey = `${project}:${input.key}`;

    memoryStore[fullKey] = input.value;

    return {
      success: true,
      project,
      key: input.key,
      value: input.value,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getBossMindMemoryContext(
  context: BossMindContext = { project: "global" }
) {
  try {
    const projectEntries = Object.entries(memoryStore)
      .filter(([key]) => key.startsWith(`${context.project}:`))
      .map(([key, value]) => ({
        key: key.replace(`${context.project}:`, ""),
        value,
      }));

    return {
      project: context.project,
      memory: projectEntries,
      status: "active",
    };
  } catch (error: any) {
    return {
      project: context.project,
      memory: [],
      status: "error",
      error: error.message,
    };
  }
}

export async function getProjectMemory(project: string = "global") {
  try {
    const projectEntries = Object.entries(memoryStore)
      .filter(([key]) => key.startsWith(`${project}:`))
      .map(([key, value]) => ({
        key: key.replace(`${project}:`, ""),
        value,
      }));

    return {
      project,
      memory: projectEntries,
      status: "active",
    };
  } catch (error: any) {
    return {
      project,
      memory: [],
      status: "error",
      error: error.message,
    };
  }
}