const button = document.getElementById("add");
let taskOptionsButton = document.querySelector(".task_window_button");
const editButton = document.getElementsByClassName("button_task_edit");
const start_block = document.getElementsByClassName("input_row");
const main = document.querySelector("main.main");
const createTask = document.querySelector(".input_column");
const createTaskFields = createTask.querySelectorAll("input");

const picturePathsMap = new Map()
picturePathsMap.set("delete", "assets/vector/delete.svg")
picturePathsMap.set("share", "assets/vector/share.svg")
picturePathsMap.set("edit", "assets/vector/edit.svg")
picturePathsMap.set("info", "assets/vector/info.svg")

class ButtonInfo {
  className = "default";
  picture = null;
  buttonText = "default";
  pictureText = "default"

  constructor(className, additional, description) {
    this.className = className;
    const additionalToString = String(additional);
    if (additionalToString.includes("/")) {
      this.picture = additional;
      this.buttonText = null;
      this.pictureText = description;
    } else {
      this.picture = null;
      this.buttonText = additional;
      this.pictureText = null;
    }
  }
  
    get className(){
      return this._className;
    }
    get picture() {
      return this._picture;
    }

    get buttonText() {
      return this._buttonText;
    }
}

const buttonWindow = new ButtonInfo("task_window_button", null, null)
const buttonDelete = new ButtonInfo("button_task_delete", picturePathsMap.get("delete"), "Удалить заметку")
const buttonShare = new ButtonInfo("button_task_share", picturePathsMap.get("share"), "Поделиться")
const buttonInfo = new ButtonInfo("button_task_info", picturePathsMap.get("info"), "Дополнительно")
const buttonEdit = new ButtonInfo("button_task_edit", picturePathsMap.get("edit"), "Редактировать заметку")
const buttonDialogCancel = new ButtonInfo("button_dialog", "Отменить", null)
const buttonDialogSave = new ButtonInfo("button_dialog", "Сохранить", null)
const buttonDialogYes = new ButtonInfo("button_dialog", "Да", null)
const buttonDialogNo = new ButtonInfo("button_dialog", "Нет", null)


let taskIndex = 0;
button.addEventListener('click', () => {
    const taskSection = createSection("task_window")
    let parent = start_block[0].parentNode;
    parent.insertBefore(taskSection, start_block[0].nextSibling);

    let addButton = createButton(buttonWindow);
    let addElement = document.createElement('h2');
    addElement.textContent = createTaskFields[0].value;
    addButton.appendChild(addElement);
    addElement = document.createElement('p');
    addElement.textContent = createTaskFields[1].value;
    addButton.appendChild(addElement);
    taskSection.appendChild(addButton);
    addButton = createButton(buttonDelete);
    addButton.id = taskIndex;
    taskSection.appendChild(addButton);
    const taskButtonsSection = createTaskButtons()
    parent = taskSection.parentNode;
    parent.insertBefore(taskButtonsSection, taskSection.nextSibling);  
});
editButton[0].addEventListener('click', () =>{
    createEditWindow("терпим", "Терпим")
});

main.addEventListener('click', event => {
  if (event.target.closest('.task_window_button')) {
    const pressedButton = event.target.closest('.task_window_button');
    const parentTaskWindow = pressedButton.closest(".task_window")
    const parentButtonsPanel = document.querySelectorAll(".input_row_right")
    const targetButtonsPanel = Array.from(parentButtonsPanel).find(element => element.id == parentTaskWindow.id);
    if (targetButtonsPanel.style.display == "none") {
      targetButtonsPanel.style.display = "flex"
    }
    else  {
      targetButtonsPanel.style.display = "none"
    }
  }
   if (event.target.closest('.button_task_delete')) {
    const pressedButton = event.target.closest('.button_task_delete');
    const parentTaskWindow = pressedButton.parentNode
    const parentButtonsPanel = document.querySelectorAll(".input_row_right")
    const targetButtonsPanel = Array.from(parentButtonsPanel).find(element => element.id == parentTaskWindow.id);
    showModalWindow()
    modalWindowResult().then(result =>{
      if (result) {
      parentTaskWindow.remove()
      console.log("Задача ушла искать своё счастье")
      targetButtonsPanel.remove()
      console.log("Вместе с панелькой кнопок")
      hideModalWindow()
    } else {
      hideModalWindow()
    }
    })
  }
  if (event.target.closest('.button_task_edit')) {
    const pressedButton = event.target.closest('.button_task_edit');
    const parentTaskPanel = pressedButton.parentNode
    const parentTaskWindow = document.querySelectorAll(".task_window")
    const targetWindow = Array.from(parentTaskWindow).find(element => element.id == parentTaskPanel.id);
    console.log(targetWindow.id, parentTaskPanel.id)
    const taskHeader = targetWindow.querySelector("h2")
    const taskDescription = targetWindow.querySelector("p")
    console.log(taskHeader.textContent, taskDescription.textContent)
    createEditWindow(taskHeader.textContent, taskDescription.textContent)
    editWindowResult().then(result => {
      if (result) {
      taskUpdate(targetWindow.id)  
      deleteEditWindow()
    } else {
      deleteEditWindow()
    }
    })
  }
});
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    console.log('Изменение:', mutation);
    
  }
});

observer.observe(document.body, { childList: true, subtree: true });

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

function createTaskButtons(){
  const taskSection = createSection("input_row_right");
  taskSection.id = taskIndex;
  taskSection.style.display = "none";
  let addButton = createButton(buttonShare);
  taskSection.appendChild(addButton)
  addButton = createButton(buttonEdit);
  taskSection.appendChild(addButton)
  addButton = createButton(buttonInfo);
  taskSection.appendChild(addButton)
  ++taskIndex;
  return taskSection;
}

function showModalWindow(){
  const modalWindow = document.querySelector(".dialog_window");
  modalWindow.style.display = "flex"
}
function hideModalWindow(){
  const modalWindow = document.querySelector(".dialog_window");
  modalWindow.style.display = "none"
}

function modalWindowResult() {
  return new Promise((result) => {
    const modalWindow = document.querySelector(".dialog_window");
    const buttonConfirm = document.getElementById("delete_confirm")
    const buttonCancel = document.getElementById("delete_cancel")
   function cleanup() {
      buttonConfirm.removeEventListener('click', onConfirm);
      buttonCancel.removeEventListener('click', onCancel);
    }
    function onConfirm() {
      cleanup();
      result(true);
    }

    function onCancel() {
      cleanup();
      result(false);
    }
    buttonConfirm.addEventListener('click', onConfirm);
    buttonCancel.addEventListener('click', onCancel);
  })
}
function createEditWindow(headerText, descriptionText){
    const editSection = createSection("edit_window");
    main.appendChild(editSection)
    let addElement = document.createElement('input');
    addElement.placeholder = headerText;
    editSection.appendChild(addElement);
    addElement = document.createElement("textarea");
    addElement.placeholder = descriptionText;
    editSection.appendChild(addElement);
    let addSection = document.createElement("div")
    addSection.className = "input_row_close";
    addElement = createButton(buttonDialogCancel); 
    addElement.id = "cancel"
    addSection.appendChild(addElement)
    addElement = createButton(buttonDialogSave);
    addElement.id = "save"
    addSection.appendChild(addElement);
    editSection.appendChild(addSection);
}
function editWindowResult() {
  return new Promise((result) => {
    const editWindow = document.querySelector(".edit_window");
    const buttonSave = document.getElementById("save")
    const buttonCancel = document.getElementById("cancel")
   function cleanup() {
      buttonSave.removeEventListener('click', onConfirm);
      buttonCancel.removeEventListener('click', onCancel);
    }
    function onConfirm() {
      cleanup();
      result(true);
    }

    function onCancel() {
      cleanup();
      result(false);
    }
    buttonSave.addEventListener('click', onConfirm);
    buttonCancel.addEventListener('click', onCancel);
  })
}

function deleteEditWindow(){
  const editSection = document.querySelector(".edit_window")
  editSection.remove()
}
function taskUpdate(id) {
  const editWindow = document.querySelector(".edit_window");
  const header =  editWindow.querySelector("input")
  const description = editWindow.querySelector("textarea")
  const allTaskWindow = document.querySelectorAll(".task_window")
  const targetWindow = Array.from(allTaskWindow).find(element => element.id == id);
  targetWindow.querySelector("h2").textContent = header.value
  targetWindow.querySelector("p").textContent = description.value
}