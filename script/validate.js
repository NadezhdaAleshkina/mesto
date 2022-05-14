const validSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-save",
  inactiveButtonClass: "popup__btn-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "`.${inputElement.id}-error`",
  errorInput: "popup__input-error_active",
};
// функция проверяет валидность поля ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// функция добавляет класс с ошибкой
const showError = (
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validSettings.errorInput);
};

// функция удаляет класс с ошибкой
const hideError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(validSettings.errorInput);
  errorElement.textContent = "";
};
// функция возвращает или убирает текст ошибки в зависимости от валидности поля ввода
const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorInput
) => {
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorInput
    );
  } else {
    hideError(formElement, inputElement, inputErrorClass, errorInput);
  }
};
// функция включает кнопку
const enableSubmitButton = (buttonElement, validSettings) => {
  buttonElement.classList.remove(validSettings.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};
// функция отключает кнопку
const disableSubmitButton = (buttonElement, validSettings) => {
  buttonElement.classList.add(validSettings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
};

// функция отключает и включает кнопку
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validSettings);
  } else {
    enableSubmitButton(buttonElement, validSettings);
  }
};

// функция принимает элемент формы и добавляет ее полям нужные обработчики
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validSettings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// функция находит и обрабатывает все формы на странице
function enableValidation(validSettings) {
  const formList = Array.from(
    document.querySelectorAll(validSettings.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validSettings);
  });
}

enableValidation(validSettings);
