import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popup.querySelector(".popup__form");
    this._inputList = this._formSelector.querySelectorAll(".popup__input");
    this._submitButtonSelector =
      this._formSelector.querySelector(".popup__btn-save");
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
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formSelector.reset();
  }

  // Изменяем состояние кнопки во время загрузки
  loading(isLoading) {
    if (isLoading === true) {
      this._submitButtonSelector.textContent = "Сохранение...";
    } else {
      this._submitButtonSelector.textContent = "Сохранить";
    }
  }
}
