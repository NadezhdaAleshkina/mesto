const validSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-save",
  inactiveButtonClass: "popup__btn-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorInput: "popup__input-error_active",
};
// функция проверяет валидность поля ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// функция добавляет класс с ошибкой
const showError = (formElement, inputElement, errorMessage, inputErrorClass, errorInput) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorInput);
};

// функция удаляет класс с ошибкой
const hideError = (formElement, inputElement, inputErrorClass, errorInput) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorInput);
  errorElement.textContent = "";
};
// функция возвращает или убирает текст ошибки в зависимости от валидности поля ввода
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorInput) => {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorInput);
  } else {
    hideError(formElement, inputElement, inputErrorClass, errorInput);
  }
};
// функция включает кнопку
const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};
// функция отключает кнопку
const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
};

// функция отключает и включает кнопку
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};

// функция принимает элемент формы и добавляет ее полям нужные обработчики
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorInput) => {
  const inputList = Array.from(
    formElement.querySelectorAll(inputSelector)
  );
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorInput);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// функция находит и обрабатывает все формы на странице
function enableValidation(validSettings) {
  const formList = Array.from(document.querySelectorAll(validSettings.formSelector) );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validSettings.inputSelector, validSettings.submitButtonSelector, validSettings.inactiveButtonClass, validSettings.inputErrorClass, validSettings.errorInput);
  });
}

enableValidation(validSettings);
