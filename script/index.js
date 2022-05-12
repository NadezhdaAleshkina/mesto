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
const elementTemplate = document
  .querySelector(".element-template")
  .content.querySelector(".element");
const elementContainer = document.querySelector(".elements__list");

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
}

// обработчик клика по кнопке Escape
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
}
// закрытие попапов кликом на оверлей
popupEdit.addEventListener("mousedown", closeOverlay);
popupImageElement.addEventListener("mousedown", closeOverlay);
popupElemeht.addEventListener("mousedown", closeOverlay);

//  Открыть закрыть слушатель попапа для редактирования
buttonEdit.addEventListener("click", () => openPropfilePopup());
buttonClose.addEventListener("click", () => closePopup(popupEdit));

// сохранение изменений
formElementEdit.addEventListener("submit", formSubmitHandler);

// Изображение закрыть слушатель
popupImageClose.addEventListener("click", () => closePopup(popupImageElement));

//Слушатель открыть закрыть попап добавления карточек

popupOpenAdd.addEventListener("click", () => openPopup(popupElemeht));
popupCloseAdd.addEventListener("click", () => closePopup(popupElemeht));

//функции попап добавления карточек
const handleSubmitAddElementForm = (event) => {
  event.preventDefault();
  renderElement({ name: inputPlaceName.value, link: inputPlaceLink.value });
  closePopup(popupElemeht);
  inputPlaceName.value = "";
  inputPlaceLink.value = "";
  const buttonElement = formAdd.querySelector(".popup__btn-save");
  buttonElement.classList.add(validSettings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
};

const handleDeleteElementCard = (event) => {
  event.target.closest(".element").remove();
};

// Генерация карточки

const generateElement = (elementData) => {
  const newElement = elementTemplate.cloneNode(true);
  const titleElement = newElement.querySelector(".element__title");
  titleElement.textContent = elementData.name;
  const imgElement = newElement.querySelector(".element__image");
  imgElement.src = elementData.link;
  imgElement.alt = elementData.name;

  imgElement.addEventListener("click", (evt) => {
    popupImage.src = elementData.link;
    popupImageInfo.textContent = elementData.name;
    popupImage.alt = elementData.name;
    openPopup(popupImageElement);
  });

  const buttonLike = newElement.querySelector(".element__like-btn");
  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle("element__like-btn_active");
  });

  const buttonDelete = newElement.querySelector(".element__delete-btn");
  buttonDelete.addEventListener("click", handleDeleteElementCard);
  return newElement;
};

// Рендер карточки
const renderElement = (elementData) => {
  elementContainer.prepend(generateElement(elementData));
};
initialCards.forEach((elementData) => {
  renderElement(elementData);
});

formAdd.addEventListener("submit", handleSubmitAddElementForm);
