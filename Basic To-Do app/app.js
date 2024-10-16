let input = document.querySelector("input");
let inputbtn = document.querySelector(".inputbtn");
let ul = document.querySelector("ul");

inputbtn.addEventListener("click", function () {
  if (input.value != "") {
    let newTask = document.createElement("li");
    newTask.innerText = input.value;
    ul.appendChild(newTask);

    let compbtn = document.createElement("button");
    compbtn.innerText = "Completed";
    compbtn.classList.add("compbtn");
    newTask.appendChild(compbtn);

    let delbtn = document.createElement("button");
    delbtn.innerText = "Remove";
    delbtn.classList.add("delbtn");
    newTask.appendChild(delbtn);

    input.value = "";
  }
});

ul.addEventListener("click", function (event) {
  if (event.target.className == "delbtn") {
    let delTask = event.target.parentElement;
    delTask.remove();
  }
});

ul.addEventListener("click", function (event) {
  if (event.target.className == "compbtn") {
    let compTask = event.target.parentElement;
    let compbtn = event.target;
    compTask.classList.toggle("comptask");
    if (compTask.classList.contains("comptask")) {
      compbtn.innerText = "Undo";
    } else {
      compbtn.innerText = "Completed";
    }
  }
});

input.addEventListener("keydown", function (event) {
  if (event.key == "Enter" && input.value != "") {
    let newTask = document.createElement("li");
    newTask.innerText = input.value;
    ul.appendChild(newTask);

    let compbtn = document.createElement("button");
    compbtn.innerText = "Completed";
    compbtn.classList.add("compbtn");
    newTask.appendChild(compbtn);

    let delbtn = document.createElement("button");
    delbtn.innerText = "Remove";
    delbtn.classList.add("delbtn");
    newTask.appendChild(delbtn);

    input.value = "";
  }
});
