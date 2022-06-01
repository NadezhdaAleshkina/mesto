import { initialCards, validSettings } from './components.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
//переменные
const popupList = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_edit");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const buttonEdit = document.querySelector(".profile__btn-edit");
const formElementEdit = popupEdit.querySelector(".popup__form");
const buttonClose = popupEdit.querySelector(".popup__btn-close");
const cardNameInput = document.querySelector(".popup__input_type_title");
const cardLinkInput = document.querySelector(".popup__input_type_link");
const popupImageElement = document.querySelector(".popup-image");
const popupImageClose = popupImageElement.querySelector(".popup__btn-close");
const popupImage = popupImageElement.querySelector(".popup__image");
const popupImageInfo = popupImageElement.querySelector(".popup__caption");
const popupElemeht = document.querySelector(".popup_add");
const formAdd = popupElemeht.querySelector(".popup__form");
const popupCloseAdd = popupElemeht.querySelector(".popup__btn-close");
const popupOpenAdd = document.querySelector(".profile__btn-add");
const inputPlaceName = document.querySelector("#title");
const inputPlaceLink = document.querySelector("#link");
const elementContainer = document.querySelector(".elements__list");
const elementTemplate = document
  .querySelector(".element-template")
  .content.querySelector(".element");

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleEscUp);
}
//функция закрытия попапа
function closePopup(popup) {
  document.removeEventListener("keyup", handleEscUp);
  popup.classList.remove("popup_opened");
}
// клик по кнопке Escape
const handleEscUp = (event) => {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};

// функция закрытия попапа кликом на оверлей
function closeOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
};

//функция для открытия попапа редактирования
function openPropfilePopup() {
  editProfileFormInputs();
  openPopup(popupEdit);
}
//функции редактирования профиля
function editProfileFormInputs() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

//функции попап добавления карточек
const handleSubmitAddElementForm = (event) => {
  event.preventDefault();
  const card = new Card(
    { name: inputPlaceName.value, link: inputPlaceLink.value },
    ".element-template"
  );
  const cardElement = card.generateCard();
  elementContainer.prepend(cardElement);
  closePopup(popupElemeht);
  inputPlaceName.value = "";
  inputPlaceLink.value = "";
  const buttonElement = formAdd.querySelector(".popup__btn-save");
 buttonElement.classList.add("popup__btn-save_inactive");
  buttonElement.setAttribute("disabled", "disabled");
};
//слушатели
  // закрытие попапов кликом на оверлей
  popupEdit.addEventListener("mousedown", closeOverlay);
  popupImageElement.addEventListener("mousedown", closeOverlay);
  popupElemeht.addEventListener("mousedown", closeOverlay);
    //  Открыть закрыть слушатель попапа для редактирования
  buttonEdit.addEventListener("click", () => openPropfilePopup());
  buttonClose.addEventListener("click", () => closePopup(popupEdit));
    // сохранение изменений
  formElementEdit.addEventListener("submit", formSubmitHandler);
    //Слушатель открыть закрыть попап добавления карточек
  popupOpenAdd.addEventListener("click", () => openPopup(popupElemeht));
  popupCloseAdd.addEventListener("click", () => closePopup(popupElemeht));
    //слушатель сохранить карточку
  formAdd.addEventListener("submit", handleSubmitAddElementForm);
    // Изображение закрыть слушатель
  popupImageClose.addEventListener("click", () => closePopup(popupImageElement));

 // Создадим экземпляр карточки
initialCards.forEach((elementData) => {
  const card = new Card(elementData, ".element-template");
  const cardElement = card.generateCard();
  elementContainer.prepend(cardElement);
 const imgElement = cardElement.querySelector(".element__image");
  imgElement.src = elementData.link;
  imgElement.alt = elementData.name;
  imgElement.addEventListener("click", (evt) => {
    popupImage.src = elementData.link;
    popupImageInfo.textContent = elementData.name;
    popupImage.alt = elementData.name;
    openPopup(popupImageElement);
  });
});


//  Валидация попапов
const validformElementEdit = new FormValidator(validSettings, formElementEdit);
validformElementEdit.enableValidation();

const validformAdd = new FormValidator(validSettings, formAdd);
validformAdd.enableValidation();
