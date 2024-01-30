const input8 = document.querySelector("input");
const worker = new Worker("WorkerScript1.js");
input8!.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  // postMessage API
  // 다른 스레드에 데이터 전달
  worker.postMessage(target.value);
});
