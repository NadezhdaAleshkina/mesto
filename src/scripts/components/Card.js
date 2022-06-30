export default class Card {
  constructor({ data, cardSelector, userId, handleCardClick, handleDeleteClick, handleSetLike, handleRemoveLike}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteClick = handleDeleteClick;
  }
  // Получаем шаблон карточки
  _getTemplate() {
    this._card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return this._card;
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
// слушатели
  _setEventListeners() {
    // кнопка удаления карточки
    this._buttonDelete
     .addEventListener("click", () => {
      this._handleDeleteClick(this._cardId);
      
     });
    //  кнопка лайк
    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains('element__like-btn_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    })
  
     //  открыть картинку
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
     }); 
     
  }
  
   // поставить/удалить лайк, изменение количества лайков
   handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._buttonLike.classList.toggle('element__like-btn_active');
  }
  // Проверка, стоит ли лайк на карточке
  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._buttonLike.classList.add('element__like-btn_active');
    }
  }
  
  // Генерируем готовую карточку
  generateCard() {
    this._element = this._getTemplate();
    // Добавим данные 
    this._cardImage = this._element.querySelector(".element__image");  
    this._buttonLike = this._element.querySelector(".element__like-btn");
    this._buttonDelete = this._element.querySelector(".element__delete-btn");
    this._likesNumber = this._element.querySelector('.element__likes-number');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._checkDeleteBtn();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }
  // проверяем владельца карточки и убираем кнопку Delete
  _checkDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._buttonDelete.remove();
    }
  } 
}