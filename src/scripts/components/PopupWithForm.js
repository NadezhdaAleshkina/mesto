import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector(".popup__form");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    this._formElementSubmitButton =
      this._formElement.querySelector(".popup__btn-save");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  // слушатели
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  // Изменяем состояние кнопки во время загрузки
  loading(isLoading) {
    if (isLoading === true) {
      this._formElementSubmitButton.textContent = "Сохранение...";
    } else {
      this._formElementSubmitButton.textContent = "Сохранить";
    }
  }
}
