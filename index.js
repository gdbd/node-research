const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (message) => {
    console.log(message); // Prints 'Hello, world!'.
  });
  worker.postMessage("Hello, world!");
} else {
  // When a message from the parent thread is received, send it back:
  parentPort.on("message", (message) => {
    parentPort.postMessage(message);
  });
}

