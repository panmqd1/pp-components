export const createWorker = (
  workerScript: Function,
  type: WorkerType = "classic"
) => {
  const blob = new Blob([`(${workerScript.toString()})()`], {
    type: "text/javascript",
  });
  const url = window.URL.createObjectURL(blob);

  return new Worker(url, { type });
};
