const button = document.getElementById("add");
const main = document.querySelector("main.main")

button.addEventListener('click', () =>{
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