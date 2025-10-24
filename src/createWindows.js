function createSection(inputClassName) {
  const createdSection = document.createElement("section");
  createdSection.className = inputClassName;
  if (createdSection.className == "task_window") {
    createdSection.id = taskIndex;
  }
  return createdSection;
}

function createButton(inputButtonType) {
  const createdButton = document.createElement("button");
  createdButton.type = "button";
  createdButton.className = inputButtonType.className;

  if (inputButtonType.picture) {
    let addElement = document.createElement("img");
    addElement.src = inputButtonType.picture;
    addElement.alt = inputButtonType.description;
    createdButton.appendChild(addElement);
  } else {
    createdButton.textContent = inputButtonType.buttonText;
  }
  return createdButton;
}

function createTaskButtons() {
  const taskSection = createSection("input_row_right");
  taskSection.id = taskIndex;
  taskSection.style.display = "none";
  let addButton = createButton(buttonShare);
  taskSection.appendChild(addButton);
  addButton = createButton(buttonEdit);
  taskSection.appendChild(addButton);
  addButton = createButton(buttonInfo);
  taskSection.appendChild(addButton);
  ++taskIndex;
  return taskSection;
}

function showModalWindow() {
  const modalWindow = document.querySelector(".dialog_window");
  modalWindow.style.display = "flex";
}
function hideModalWindow() {
  const modalWindow = document.querySelector(".dialog_window");
  modalWindow.style.display = "none";
}

function modalWindowResult() {
  return new Promise((result) => {
    const modalWindow = document.querySelector(".dialog_window");
    const buttonConfirm = document.getElementById("delete_confirm");
    const buttonCancel = document.getElementById("delete_cancel");
    function cleanup() {
      buttonConfirm.removeEventListener("click", onConfirm);
      buttonCancel.removeEventListener("click", onCancel);
    }
    function onConfirm() {
      cleanup();
      result(true);
    }

    function onCancel() {
      cleanup();
      result(false);
    }
    buttonConfirm.addEventListener("click", onConfirm);
    buttonCancel.addEventListener("click", onCancel);
  });
}
function createEditWindow(headerText, descriptionText) {
  const editSection = createSection("edit_window");
  main.appendChild(editSection);
  let addElement = document.createElement("input");
  addElement.value = headerText;
  editSection.appendChild(addElement);
  addElement = document.createElement("textarea");
  addElement.value = descriptionText;
  editSection.appendChild(addElement);
  let addSection = document.createElement("div");
  addSection.className = "input_row_close";
  addElement = createButton(buttonDialogCancel);
  addElement.id = "cancel";
  addSection.appendChild(addElement);
  addElement = createButton(buttonDialogSave);
  addElement.id = "save";
  addSection.appendChild(addElement);
  editSection.appendChild(addSection);
}
function editWindowResult() {
  return new Promise((result) => {
    const editWindow = document.querySelector(".edit_window");
    const buttonSave = document.getElementById("save");
    const buttonCancel = document.getElementById("cancel");
    function cleanup() {
      buttonSave.removeEventListener("click", onConfirm);
      buttonCancel.removeEventListener("click", onCancel);
    }
    function onConfirm() {
      cleanup();
      result(true);
    }

    function onCancel() {
      cleanup();
      result(false);
    }
    buttonSave.addEventListener("click", onConfirm);
    buttonCancel.addEventListener("click", onCancel);
  });
}
function deleteEditWindow() {
  const editSection = document.querySelector(".edit_window");
  editSection.remove();
}
function taskUpdate(id) {
  const editWindow = document.querySelector(".edit_window");
  const header = editWindow.querySelector("input");
  const description = editWindow.querySelector("textarea");
  const allTaskWindow = document.querySelectorAll(".task_window");
  const targetWindow = Array.from(allTaskWindow).find(
    (element) => element.id == id
  );
  targetWindow.querySelector("h2").textContent = header.value;
  targetWindow.querySelector("p").textContent = description.value;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const targetTaskIndex = tasks.findIndex((task) => task.id == id);
  tasks[targetTaskIndex].title = header.value;
  tasks[targetTaskIndex].description = description.value;
  console.log(targetTaskIndex);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function shareWindowResult() {
  return new Promise((result) => {
    const buttonCopy = document.querySelectorAll(".button_share");
    function cleanup() {
      buttonCopy[0].removeEventListener("click", Copy);
    }
    function Copy() {
      cleanup();
      result("cp");
    }

    function toVK() {
      cleanup();
      result("vk");
    }
    function toTelegram() {
      cleanup();
      result("tg");
    }
    function toWhatsapp() {
      cleanup();
      result("wp");
    }
    function toFacebook() {
      cleanup();
      result("fc");
    }
    buttonCopy[0].addEventListener("click", Copy);
    buttonCopy[1].addEventListener("click", toVK);
    buttonCopy[2].addEventListener("click", toTelegram);
    buttonCopy[3].addEventListener("click", toWhatsapp);
    buttonCopy[4].addEventListener("click", toFacebook);
  });
}
function showShareWindow() {
  const shareWindow = document.querySelector(".share_window");
  shareWindow.style.display = "flex";
}

function hideShareWindow() {
  const shareWindow = document.querySelector(".share_window");
  shareWindow.style.display = "none";
}