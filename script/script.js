const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = popup.querySelector(".popup__input_type_name");
const jobInput = popup.querySelector(".popup__input_type_job");
const openEditButton = document.querySelector(".profile__btn-edit");
const popupSaveButton = popup.querySelector(".popup__form");
const closeEditButton = popup.querySelector(".popup__btn-close");

function popupOpenToggle() {
  popup.classList.toggle("popup_opened");
}

openEditButton.addEventListener("click", popupOpenToggle);
closeEditButton.addEventListener("click", popupOpenToggle);

function popupOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
popupOpen();

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

popupSaveButton.addEventListener("submit", formSubmitHandler);
