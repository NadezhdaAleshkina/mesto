import './index.css';
import {validSettings, initialCards, popupEdit, nameInput, jobInput, buttonEdit, formElementEdit, formAdd, popupOpenAdd} from "../utils/constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";

  
//  класс с информацией о пользователе
const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__job"
});
// создание попапа с формой редактирования профиля
const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: (dataForm) => {
    userInfo.setUserInfo({
      name: dataForm.name,
      job: dataForm.job
   });
    editProfilePopup.close();
  }
});
editProfilePopup.setEventListeners();
// Заносим данные в форму попапа редактирования профиля
function editProfileFormInputs({ name, job }) {
  nameInput.value = name ;
  jobInput.value = job;
};

// Обработчик кнопки попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
 const info = userInfo.getUserInfo();
  editProfileFormInputs({
    name: info.name,
    job: info.job
  });
  editProfilePopup.open();
});

/* Карточки с изображениями */
//функция создания новой карточки 
const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      openImagePopup.open(name, link);  
  }}, 
".element-template");
const cardElement = card.generateCard();
return cardElement;
};

/* Попап просмотра изображения */
const openImagePopup =  new PopupWithImage('.popup-image');
openImagePopup.setEventListeners();



// карточки из массива
const cardsList = new Section({
    items: initialCards,
   renderer: (item) => {
     cardsList.addItem(createCard(item));
   },
  },
  ".elements__list");
cardsList.renderItems();

// создание попапа с формой добавления новой карточки
const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: (formData) => {
    cardsList.addItem(createCard(formData));
    addCardPopup.close();
 }
});

// добавляем слушатели этому попапу:
addCardPopup.setEventListeners();
// обработчик открытия попапа
popupOpenAdd.addEventListener('click', () => {
  validformAdd.disableSubmitButton();
  addCardPopup.open();
})

//  Валидация попапов
const validformElementEdit = new FormValidator(validSettings, formElementEdit);
validformElementEdit.enableValidation();

const validformAdd = new FormValidator(validSettings, formAdd);
validformAdd.enableValidation();
