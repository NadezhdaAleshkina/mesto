const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//переменные
const popup = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_edit");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const editButton = document.querySelector(".profile__btn-edit");
const formElement = popupEdit.querySelector(".popup__form");
const closeEditButton = popupEdit.querySelector(".popup__btn-close");

const popupImageElement = document.querySelector(".popup-image");
const popupImageClose = popupImageElement.querySelector(".popup__btn-close");

const popapOpenAdd = document.querySelector(".popup_add");
const formAdd = popapOpenAdd.querySelector(".popup__form");
const closeAddButton = popapOpenAdd.querySelector(".popup__btn-close");
const openAddButton = document.querySelector(".profile__btn-add");
const inputPlaceName = document.querySelector("#place-name");
const inputPlaceLink = document.querySelector("#place-link");
const elementTemplate = document
  .querySelector(".element-template")
  .content.querySelector(".element");
const elementContainer = document.querySelector(".elements__list");

//функции редактирования профиля
function profileElement() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function openPopupToggle(index) {
  popup[index].classList.toggle("popup_opened");
  profileElement();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupEdit.classList.toggle("popup_opened");
}
//  Открыть закрыть слушатель попапа для редактирования
editButton.addEventListener("click", () => openPopupToggle(0));
closeEditButton.addEventListener("click", () => openPopupToggle(0));
// сохранение изменений
formElement.addEventListener("submit", formSubmitHandler);

// Изображение закрыть слушатель
popupImageClose.addEventListener("click", () => openPopupToggle(2));

//Слушатель открыть закрыть попап добавления карточек

openAddButton.addEventListener("click", () => openPopupToggle(1));
closeAddButton.addEventListener("click", () => openPopupToggle(1));

//функции попап добавления карточек
const handleSubmitAddElementForm = (event) => {
  event.preventDefault();
  renderElement({ name: inputPlaceName.value, link: inputPlaceLink.value });
  inputPlaceName.value = "";
  inputPlaceLink.value = "";
  openPopupToggle(1);
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

  imgElement.addEventListener("click", (evt) => {
    popupImageElement.classList.toggle("popup_opened");
    const popupImage = popupImageElement.querySelector(".popup__image");
    const popupImageInfo = popupImageElement.querySelector(".popup__caption");
    popupImage.src = evt.target.src;
    popupImageInfo.textContent = titleElement.textContent;
    popupImage.alt = evt.target.alt;
  });

  const likeButton = newElement.querySelector(".element__like-btn");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like-btn_active");
  });

  const deleteButton = newElement.querySelector(".element__delete-btn");
  deleteButton.addEventListener("click", handleDeleteElementCard);
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
