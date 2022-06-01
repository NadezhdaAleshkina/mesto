export class Card {
  constructor(elementData, cardSelector) {
    this._name = elementData.name;
    this._link = elementData.link;
    this._cardSelector = cardSelector;
  
  }
  // Получаем шаблон карточки
  _getTemplate() {
    // забираем разметку и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  // кнопка "лайк"
  _handleLikeCard() {
    const buttonLike = this._element.querySelector(".element__like-btn");
    buttonLike.classList.toggle("element__like-btn_active");
  }

  //  кнопка "удалить"
  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

// слушатели
  _setEventListeners() {
   
    // кнопка удаления карточки
    this._element
      .querySelector(".element__delete-btn")
     .addEventListener("click", () => {
        this._handleDeleteCard();
     });
    //  кнопка лайк
    this._element
     .querySelector(".element__like-btn")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });
  }

  // Генерируем готовую карточку
  generateCard() {
    this._element = this._getTemplate();
    // Добавим данные
    this._setEventListeners();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    // Вернём элемент наружу
    return this._element;
  }
}