import Popup from "./Popup.js";
export default class PopupWithDelete extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
      }
  
      submitCallback(removing) {
        this._handleSubmit = removing;
      }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('click', (evt) => {
        evt.preventDefault();
        this._handleSubmit();
      });
    }
  
  }