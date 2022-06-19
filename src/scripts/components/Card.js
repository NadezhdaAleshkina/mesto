export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  // Получаем шаблон карточки
  _getTemplate() {
    // забираем разметку и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }
// слушатели
  _setEventListeners() {
    // кнопка удаления карточки
    this._buttonDelete
     .addEventListener("click", () => {
      this._element.remove();
      this._element = null;
     });
    //  кнопка лайк
    this._buttonLike.addEventListener("click", () => {
        this._buttonLike.classList.toggle("element__like-btn_active");
      });
     //  открыть картинку
     
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
     }); 
     
  }
  // Генерируем готовую карточку
  generateCard() {
    this._element = this._getTemplate();
    // Добавим данные 
    this._cardImage = this._element.querySelector(".element__image");  
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._buttonLike = this._element.querySelector(".element__like-btn");
    this._buttonDelete = this._element.querySelector(".element__delete-btn");
    this._setEventListeners();
    
    // Вернём элемент наружу
    return this._element;
  }
}
