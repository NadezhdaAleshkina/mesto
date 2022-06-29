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
  // объект с селекторами
   const validSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__btn-save",
    inactiveButtonClass: "popup__btn-save_inactive",
    inputErrorClass: "popup__input_type_error",
    errorInput: "popup__input-error_active",
  };
   const popupEdit = document.querySelector(".popup_edit");
   const formElementEdit = popupEdit.querySelector(".popup__form");
   const nameInput = formElementEdit.querySelector('#name');
   const jobInput = formElementEdit.querySelector('#job');
   const buttonEdit = document.querySelector(".profile__btn-edit");
   
   const popupElemeht = document.querySelector(".popup_add");
   const popupOpenAdd = document.querySelector(".profile__btn-add");
   const formAdd = popupElemeht.querySelector(".popup__form");
   const popupEditAvatar = document.querySelector('.popup_avatar');
   const avatar = document.querySelector('.profile__avatar');
   const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
   const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
   export {validSettings, initialCards, popupEdit, nameInput, jobInput, buttonEdit, formElementEdit, formAdd, popupOpenAdd, avatar, buttonEditAvatar, formEditAvatar};
