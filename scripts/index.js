import { initialCards, validSettings } from './components.js';
import { Card } from './Card.js';
import { FormValidator, disableButton } from './FormValidator.js';
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
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
};

//функции попап добавления карточек
const handleSubmitAddElementForm = (event) => {
  event.preventDefault();
  renderElement({ name: inputPlaceName.value, link: inputPlaceLink.value });
  closePopup(popupElemeht);
  formAdd.reset();
  const buttonElement = formAdd.querySelector(".popup__btn-save");
  disableButton(buttonElement, validSettings.inactiveButtonClass);
};
  //функция создания новой карточки 
function createCard(elementData) {
  const card = new Card(elementData, ".element-template", handleCardClick);
  const cardElement = card.generateCard();
return cardElement;
}

// Рендер карточки
const renderElement = (elementData) => {
  elementContainer.prepend(createCard(elementData));
};
initialCards.forEach((elementData) => {
  renderElement(elementData);
});

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImageInfo.textContent = name;
  popupImage.alt = name;
  openPopup(popupImageElement);
  };
//  Валидация попапов
const validformElementEdit = new FormValidator(validSettings, formElementEdit);
validformElementEdit.enableValidation();

const validformAdd = new FormValidator(validSettings, formAdd);
validformAdd.enableValidation();

//слушатели
  // закрытие попапов кликом на оверлей
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains("popup")){
          closePopup(evt.target)
        }
        if (evt.target.classList.contains('popup__btn-close')) {
          closePopup(popup)
        }
    })
   });
  //  Открыть закрыть слушатель попапа для редактирования
  buttonEdit.addEventListener("click", () => openPropfilePopup());
    // сохранение изменений
  formElementEdit.addEventListener("submit", handleProfileFormSubmit);
  popupOpenAdd.addEventListener("click", () => openPopup(popupElemeht));
    //слушатель сохранить карточку
  formAdd.addEventListener("submit", handleSubmitAddElementForm);
    