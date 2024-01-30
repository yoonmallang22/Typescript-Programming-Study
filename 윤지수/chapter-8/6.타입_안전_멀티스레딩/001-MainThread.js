var input8 = document.querySelector("input");
var worker = new Worker("WorkerScript1.js");
input8.addEventListener("input", function (e) {
  var target = e.target;
  worker.postMessage(target.value);
});
