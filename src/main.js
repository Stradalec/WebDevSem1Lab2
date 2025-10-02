const button = document.getElementById("add");
let taskOptionsButton = document.querySelector(".task_window");
const editButton = document.getElementsByClassName("button_task_edit");
const start_block = document.getElementsByClassName("input_row");
const main = document.querySelector("main.main")

button.addEventListener('click', () => {
    const taskSection = document.createElement("section");
    taskSection.className = "task_window";
    const parent = start_block[0].parentNode;
    parent.insertBefore(taskSection, start_block[0].nextSibling);
    let addButton = document.createElement('button');
    addButton.type = "button";
    addButton.className = "task_window_button";
    let addElement = document.createElement('h2');
    addElement.textContent = "Task Title";
    addButton.appendChild(addElement);
    addElement = document.createElement('p');
    addElement.textContent = "Task description";
    addButton.appendChild(addElement);
    taskSection.appendChild(addButton);
    addButton = document.createElement('button');
    addButton.className = "button_task";
    addElement = document.createElement("img");
    addElement.src = "assets/vector/delete.svg";
    addElement.alt = "Удалить заметку";
    addButton.appendChild(addElement);
    taskSection.appendChild(addButton);
    taskOptionsButton = document.querySelector(".task_window");
});
editButton[0].addEventListener('click', () =>{
    const editSection = document.createElement("section");
    editSection.className = "edit_window";
    main.appendChild(editSection)
    let addElement = document.createElement('input');
    addElement.placeholder = "Mini input";
    editSection.appendChild(addElement);
    addElement = document.createElement("textarea");
    addElement.placeholder = "Max Input";
    editSection.appendChild(addElement);
    let addSection = document.createElement("div")
    addSection.className = "input_row_close";
    addElement = document.createElement("button");
    addElement.className = "button_dialog";
    addElement.textContent = "Отменить";
    addSection.appendChild(addElement)
    addElement = document.createElement("button");
    addElement.className = "button_dialog";
    addElement.textContent = "Сохранить";
    addSection.appendChild(addElement);
    editSection.appendChild(addSection);
});
taskOptionsButton.addEventListener ('click', () => {
    const taskSection = document.createElement("section");
    taskSection.className = "input_row_right";
    main.appendChild(taskSection);
    let addButton = document.createElement('button');
    addButton.className = "button_task";
    let addElement = document.createElement("img");
    addElement.src = "assets/vector/share.svg";
    addElement.alt = "Поделиться";
    addButton.appendChild(addElement);
    taskSection.appendChild(addButton)
    addButton = document.createElement('button');
    addButton.className = "button_task";
    addElement = document.createElement("img");
    addElement.src = "assets/vector/edit.svg";
    addElement.alt = "Редактировать";
    addButton.appendChild(addElement);
    taskSection.appendChild(addButton)
    addButton = document.createElement('button');
    addButton.className = "button_task";
    addElement = document.createElement("img");
    addElement.src = "assets/vector/info.svg";
    addElement.alt = "Информация";
    addButton.appendChild(addElement);
    taskSection.appendChild(addButton)
}); 