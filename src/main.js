const button = document.getElementById("add");
let taskOptionsButton = document.querySelector(".task_window_button");
const editButton = document.getElementsByClassName("button_task_edit");
const start_block = document.getElementsByClassName("input_row");
const main = document.querySelector("main.main");
const createTask = document.querySelector(".input_column");
const createTaskFields = createTask.querySelectorAll("input");
const noTaskWindow = document.querySelector(".no_task_window");



document.addEventListener("DOMContentLoaded", function () {
  const storedTasks = localStorage.getItem("tasks");

  let tasks = [];
  if (storedTasks) {
    try {
      tasks = JSON.parse(storedTasks);
    } catch (e) {
      console.error("Ошибка парсинга задач из localStorage", e);
    }
  }

  tasks.forEach((task) => {
    const taskSection = createSection("task_window");
    let savedTitle = "Неизвестен";
    let savedDescription = "Без названия";
    let parent = start_block[0].parentNode;
    parent.insertBefore(taskSection, start_block[0].nextSibling);
    console.log(task.title);

    let addButton = createButton(buttonWindow);
    let addElement = document.createElement("h2");
    addElement.textContent = task.title;
    addButton.appendChild(addElement);
    addElement = document.createElement("p");
    console.log(task.description);
    addElement.textContent = task.description;
    addButton.appendChild(addElement);
    taskSection.appendChild(addButton);
    addButton = createButton(buttonDelete);
    addButton.id = taskIndex;
    taskSection.appendChild(addButton);
    const taskButtonsSection = createTaskButtons();
    parent = taskSection.parentNode;
    parent.insertBefore(taskButtonsSection, taskSection.nextSibling);
  });
});
let taskIndex = 0;
button.addEventListener("click", () => {
  const taskSection = createSection("task_window");
  let savedTitle = "Неизвестен";
  let savedDescription = "Без названия";
  let parent = start_block[0].parentNode;
  parent.insertBefore(taskSection, start_block[0].nextSibling);

  let addButton = createButton(buttonWindow);
  let addElement = document.createElement("h2");
  if (createTaskFields[0].value) {
    addElement.textContent = createTaskFields[0].value;
    savedTitle = createTaskFields[0].value;
  } else {
    addElement.textContent = "Неизвестен";
  }

  createTaskFields[0].value = null;
  createTaskFields[0].placeholder = "Название";
  addButton.appendChild(addElement);
  addElement = document.createElement("p");
  addElement.textContent = createTaskFields[1].value;
  if (createTaskFields[1].value) {
    addElement.textContent = createTaskFields[1].value;
    savedDescription = createTaskFields[1].value;
  } else {
    addElement.textContent = "Без названия";
  }
  createTaskFields[1].value = null;
  createTaskFields[1].placeholder = "Описание";
  addButton.appendChild(addElement);
  taskSection.appendChild(addButton);
  addButton = createButton(buttonDelete);
  addButton.id = taskIndex;
  taskSection.appendChild(addButton);
  const taskButtonsSection = createTaskButtons();
  parent = taskSection.parentNode;
  parent.insertBefore(taskButtonsSection, taskSection.nextSibling);
  const savedTask = {
    id: taskIndex - 1,
    title: savedTitle,
    description: savedDescription,
  };
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(savedTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

main.addEventListener("click", (event) => {
  if (event.target.closest(".task_window_button")) {
    const pressedButton = event.target.closest(".task_window_button");
    const parentTaskWindow = pressedButton.closest(".task_window");
    const parentButtonsPanel = document.querySelectorAll(".input_row_right");
    const targetButtonsPanel = Array.from(parentButtonsPanel).find(
      (element) => element.id == parentTaskWindow.id
    );
    if (targetButtonsPanel.style.display == "none") {
      targetButtonsPanel.style.display = "flex";
    } else {
      targetButtonsPanel.style.display = "none";
    }
  }
  if (event.target.closest(".button_task_delete")) {
    const pressedButton = event.target.closest(".button_task_delete");
    const parentTaskWindow = pressedButton.parentNode;
    const parentButtonsPanel = document.querySelectorAll(".input_row_right");
    const targetButtonsPanel = Array.from(parentButtonsPanel).find(
      (element) => element.id == parentTaskWindow.id
    );
    showModalWindow();
    modalWindowResult().then((result) => {
      if (result) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const exterminationId = Number(parentTaskWindow.id);
        tasks = tasks.filter((task) => task.id !== exterminationId);
        console.log(tasks[0]);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        parentTaskWindow.remove();
        console.log("Задача ушла искать своё счастье" + exterminationId);
        targetButtonsPanel.remove();
        console.log("Вместе с панелькой кнопок");
        hideModalWindow();
      } else {
        hideModalWindow();
      }
    });
  }
  if (event.target.closest(".button_task_edit")) {
    const pressedButton = event.target.closest(".button_task_edit");
    const parentTaskPanel = pressedButton.parentNode;
    const parentTaskWindow = document.querySelectorAll(".task_window");
    const targetWindow = Array.from(parentTaskWindow).find(
      (element) => element.id == parentTaskPanel.id
    );
    console.log(targetWindow.id, parentTaskPanel.id);
    const taskHeader = targetWindow.querySelector("h2");
    const taskDescription = targetWindow.querySelector("p");
    console.log(taskHeader.textContent, taskDescription.textContent);
    createEditWindow(taskHeader.textContent, taskDescription.textContent);
    editWindowResult().then((result) => {
      if (result) {
        taskUpdate(targetWindow.id);
        deleteEditWindow();
      } else {
        deleteEditWindow();
      }
    });
  }
  if (event.target.closest(".button_task_share")) {
    const pressedButton = event.target.closest(".button_task_share");
    const parentTaskPanel = pressedButton.parentNode;
    const parentTaskWindow = document.querySelectorAll(".task_window");
    const targetWindow = Array.from(parentTaskWindow).find(
      (element) => element.id == parentTaskPanel.id
    );
    console.log(targetWindow.id, parentTaskPanel.id);
    const taskHeader = targetWindow.querySelector("h2");
    const taskDescription = targetWindow.querySelector("p");
    console.log(taskHeader.textContent, taskDescription.textContent);
    showShareWindow();
    shareWindowResult().then((result) => {
      if (result == "cp") {
        navigator.clipboard.writeText(
          taskHeader.textContent + " " + taskDescription.textContent
        );
        const notification = document.createElement("div");
        const notificationText = document.createElement("p");
        notificationText.textContent = "Текст успешно скопирован!";
        notification.className = "dialog_window";
        notification.style.display = "flex";
        notification.appendChild(notificationText);
        main.appendChild(notification);

        setTimeout(() => {
          notification.remove();
        }, 2000);
        hideShareWindow();
      } else if (result == "vk") {
        shareOnSocial(
          result,
          taskHeader.textContent,
          taskDescription.textContent
        );
        hideShareWindow();
      } else if (result == "tg") {
        shareOnSocial(
          result,
          taskHeader.textContent,
          taskDescription.textContent
        );
        hideShareWindow();
      } else if (result == "wp") {
        shareOnSocial(
          result,
          taskHeader.textContent,
          taskDescription.textContent
        );
        hideShareWindow();
      } else if (result == "fc") {
        shareOnSocial(
          result,
          taskHeader.textContent,
          taskDescription.textContent
        );
        hideShareWindow();
      }
    });
  }
  if (event.target.closest(".button_task_info")) {
    const notification = document.createElement("div");
    const notificationText = document.createElement("p");
    notificationText.textContent = "В ТЗ не было - делать не буду!";
    notification.className = "dialog_window";
    notification.style.display = "flex";
    notification.appendChild(notificationText);
    main.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
});
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    console.log("Изменение:", mutation);
    let taskExist = document.querySelector(".task_window");
    if (taskExist) {
      noTaskWindow.style.display = "none";
    } else {
      noTaskWindow.style.display = "flex";
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });


