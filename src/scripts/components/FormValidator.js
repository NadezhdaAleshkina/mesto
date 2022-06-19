export default class FormValidator {
    constructor(validSettings, formElement) {
      this._validSettings = validSettings;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._validSettings.inputSelector));
      this._buttonElement = formElement.querySelector(this._validSettings.submitButtonSelector);
      this._inputErrorClass = formElement.querySelector(this._validSettings.inputErrorClass);
      this._inactiveButtonClass = validSettings.inactiveButtonClass;
    }

    // функция добавляет класс с ошибкой
 _showError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._validSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validSettings.errorInput);
  };
  // функция удаляет класс с ошибкой
 _hideError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validSettings.inputErrorClass);
    errorElement.classList.remove(this._validSettings.errorInput);
    errorElement.textContent = "";
  };
  // функция возвращает или убирает текст ошибки в зависимости от валидности поля ввода
 _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
        this._showError(inputElement, inputElement.validationMessage);
    } else {
        this._hideError(inputElement);
    }
  };
  // функция проверяет валидность поля ввода
 _hasInvalidInput = () => {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция включает кнопку
 _enableSubmitButton = () => {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.removeAttribute("disabled");
};
// функция отключает кнопку
 disableSubmitButton = () => {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.setAttribute("disabled", "disabled");
};
  // функция отключает и включает кнопку
 _toggleButtonState = () => {
  if (this._hasInvalidInput()) {
    this.disableSubmitButton();
  } else {
    this._enableSubmitButton();
  }
};
  // слушатель
 _setEventListeners = () => {
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", ()=> {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
    });
  }); 
};
  // функция находит и обрабатывает все формы на странице
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });  
    this._setEventListeners();
    }
};

