import './index.css';
import {
  validSettings,
  initialCards,
  popupEdit,
  nameInput,
  jobInput,
  buttonEdit,
  formElementEdit,
  formAdd,
  popupOpenAdd,
  avatar,
  buttonEditAvatar,
  formEditAvatar,
} from "../scripts/utils/constants.js";
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete.js";
import FormValidator from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
//Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
  headers: {
    authorization: "21c50e82-5f7d-4a14-b9ba-c2e0e031ce4b",
    "Content-Type": "application/json",
  },
});
let userId;
//Загрузка данных с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

//  информация о пользователе
const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__job",
  avatar: ".profile__avatar",
});
// создание попапа с формой редактирования профиля
const editProfilePopup = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: (dataForm) => {
    editProfilePopup.loading(true),
      api
        .editUserInfo(dataForm)
        .then((dataForm) => {
          userInfo.setUserInfo(dataForm);
          editProfilePopup.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          editProfilePopup.loading(false);
        });
  },
});
editProfilePopup.setEventListeners();

// Заносим данные в форму попапа редактирования профиля
function editProfileFormInputs({ name, job }) {
  nameInput.value = name;
  jobInput.value = job;
}

// Создание попапа редактирования аватара пользователя
const editAvatarPopup = new PopupWithForm({
  popupSelector: ".popup_avatar",
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api
      .editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  },
});
editAvatarPopup.setEventListeners();
// Обработчик кнопки Edit аватара пользователя
buttonEditAvatar.addEventListener("click", () => {
  validAvatarForm.disableSubmitButton();
  editAvatarPopup.open();
});

// Обработчик кнопки попапа редактирования профиля
buttonEdit.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  editProfileFormInputs({
    name: info.name,
    job: info.job,
  });
  editProfilePopup.open();
});

// Карточки с изображениями
//функция создания новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardSelector: ".element-template",
    userId: userId,
    handleCardClick: (name, link) => {
      openImagePopup.open(name, link);
    },
    handleDeleteClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitHandler(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api
        .setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (cardId) => {
      api
        .deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
};

/* Попап просмотра изображения */
const openImagePopup = new PopupWithImage(".popup-image");
openImagePopup.setEventListeners();

// Создаем попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithDelete({
  popupSelector: ".popup_delete-card",
});
deleteCardPopup.setEventListeners();

// карточки
const cardsList = new Section(
  {
    renderer: (card) => {
      cardsList.addItem(createCard(card));
    },
  },
  ".elements__list"
);

// создание попапа с формой добавления новой карточки
const addCardPopup = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: (formData) => {
    addCardPopup.loading(true);
    api
      .addCard(formData)
      .then((formData) => {
        cardsList.addItem(createCard(formData));
        addCardPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        addCardPopup.loading(false);
      });
  },
});

// добавляем слушатели этому попапу:
addCardPopup.setEventListeners();

// обработчик открытия попапа
popupOpenAdd.addEventListener("click", () => {
  validformAdd.disableSubmitButton();
  addCardPopup.open();
});

//  Валидация попапов
const validformElementEdit = new FormValidator(validSettings, formElementEdit);
validformElementEdit.enableValidation();

const validformAdd = new FormValidator(validSettings, formAdd);
validformAdd.enableValidation();

const validAvatarForm = new FormValidator(validSettings, formEditAvatar);
validAvatarForm.enableValidation();
