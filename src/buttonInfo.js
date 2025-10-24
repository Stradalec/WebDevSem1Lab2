const picturePathsMap = new Map();
picturePathsMap.set("delete", "assets/vector/delete.svg");
picturePathsMap.set("share", "assets/vector/share.svg");
picturePathsMap.set("edit", "assets/vector/edit.svg");
picturePathsMap.set("info", "assets/vector/info.svg");

class ButtonInfo {
  className = "default";
  picture = null;
  buttonText = "default";
  pictureText = "default";

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

  get className() {
    return this._className;
  }
  get picture() {
    return this._picture;
  }

  get buttonText() {
    return this._buttonText;
  }
}

const buttonWindow = new ButtonInfo("task_window_button", null, null);
const buttonDelete = new ButtonInfo(
  "button_task_delete",
  picturePathsMap.get("delete"),
  "Удалить заметку"
);
const buttonShare = new ButtonInfo(
  "button_task_share",
  picturePathsMap.get("share"),
  "Поделиться"
);
const buttonInfo = new ButtonInfo(
  "button_task_info",
  picturePathsMap.get("info"),
  "Дополнительно"
);
const buttonEdit = new ButtonInfo(
  "button_task_edit",
  picturePathsMap.get("edit"),
  "Редактировать заметку"
);
const buttonDialogCancel = new ButtonInfo("button_dialog", "Отменить", null);
const buttonDialogSave = new ButtonInfo("button_dialog", "Сохранить", null);
const buttonDialogYes = new ButtonInfo("button_dialog", "Да", null);
const buttonDialogNo = new ButtonInfo("button_dialog", "Нет", null);