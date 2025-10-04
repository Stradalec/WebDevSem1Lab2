const button = document.getElementById("add");
let taskOptionsButton = document.querySelector(".task_window_button");
const editButton = document.getElementsByClassName("button_task_edit");
const start_block = document.getElementsByClassName("input_row");
const main = document.querySelector("main.main");
const createTask = document.querySelector(".input_column");
const createTaskFields = createTask.querySelectorAll("input");
const buttonClassNames = new Map()
buttonClassNames.set("task window", "task_window_button")
buttonClassNames.set("task", "button_task")
buttonClassNames.set("dialog", "button_dialog")
const picturePathsMap = new Map()
picturePathsMap.set("delete", "assets/vector/delete.svg")
picturePathsMap.set("share", "assets/vector/share.svg")
picturePathsMap.set("edit", "assets/vector/edit.svg")
picturePathsMap.set("info", "assets/vector/info.svg")

button.addEventListener('click', () => {
    const taskSection = createSection("task_window")
    const parent = start_block[0].parentNode;
    parent.insertBefore(taskSection, start_block[0].nextSibling);

    let addButton = createButton(buttonClassNames.get("task window"));
    let addElement = document.createElement('h2');
    addElement.textContent = createTaskFields[0].value;
    addButton.appendChild(addElement);
    addElement = document.createElement('p');
    addElement.textContent = createTaskFields[1].value;
    addButton.appendChild(addElement);
    taskSection.appendChild(addButton);

    addButton = createButton(buttonClassNames.get("task"));
    addElement = document.createElement("img");
    addElement.src = picturePathsMap.get("delete");
    addElement.alt = "Удалить заметку";
    addButton.appendChild(addElement);
    taskSection.appendChild(addButton);
});
editButton[0].addEventListener('click', () =>{
    const editSection = createSection("edit_window");
    main.appendChild(editSection)
    let addElement = document.createElement('input');
    addElement.placeholder = "Mini input";
    editSection.appendChild(addElement);
    addElement = document.createElement("textarea");
    addElement.placeholder = "Max Input";
    editSection.appendChild(addElement);
    let addSection = document.createElement("div")
    addSection.className = "input_row_close";
    addElement = createButton(buttonClassNames.get("dialog"));; 
    addElement.textContent = "Отменить";
    addSection.appendChild(addElement)
    addElement = createButton(buttonClassNames.get("dialog"));;
    addElement.textContent = "Сохранить";
    addSection.appendChild(addElement);
    editSection.appendChild(addSection);
});


const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    console.log('Изменение:', mutation);
    taskOptionsButton = document.querySelector(".task_window_button");
    if (taskOptionsButton) {
        taskOptionsButton.addEventListener ('click', () => {
        const taskSection = createSection("input_row_right");
        main.appendChild(taskSection);
        let addButton = createButton(buttonClassNames.get("task"));
        let addElement = document.createElement("img");
        addElement.src = "assets/vector/share.svg";
        addElement.alt = "Поделиться";
        addButton.appendChild(addElement);
        taskSection.appendChild(addButton)
        addButton = createButton(buttonClassNames.get("task"))
        addElement = document.createElement("img");
        addElement.src = "assets/vector/edit.svg";
        addElement.alt = "Редактировать";
        addButton.appendChild(addElement);
        taskSection.appendChild(addButton)
        addButton = createButton(buttonClassNames.get("task"))
        addElement = document.createElement("img");
        addElement.src = "assets/vector/info.svg";
        addElement.alt = "Информация";
        addButton.appendChild(addElement);
        taskSection.appendChild(addButton)
    }); 
}
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function createSection(inputClassName) {
  const createdSection = document.createElement("section");
  createdSection.className = inputClassName;
  return createdSection;
}
function createButton(inputClassName) {
  const createdButton = document.createElement("button");
  createButton.type = "button";
  createdButton.className = inputClassName;
  return createdButton;
}