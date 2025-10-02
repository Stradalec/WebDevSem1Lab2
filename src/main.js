const button = document.getElementById("add");
const editButton = document.getElementsByClassName("button_task_edit");
const main = document.querySelector("main.main")

button.addEventListener('click', () => {
    const taskSection = document.createElement("section");
    taskSection.className = "task_window";
    main.appendChild(taskSection);
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
});

editButton.addEventListener('click', () =>{
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