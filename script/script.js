const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = popup.querySelector(".popup__input_type_name");
const jobInput = popup.querySelector(".popup__input_type_job");
const openEditButton = document.querySelector(".profile__btn-edit");
const popupSaveButton = popup.querySelector(".popup__btn-save");
const closeEditButton = popup.querySelector(".popup__btn-close");

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function popupOpenToggle() {
  popup.classList.toggle("popup_opened");
}

function popupOverlayClic(evt) {
  if (evt.target === evt.currentTarget) {
    popupOpenToggle();
  }
}
openEditButton.addEventListener("click", popupOpenToggle);
closeEditButton.addEventListener("click", popupOpenToggle);
popup.addEventListener("click", popupOverlayClic);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

popupSaveButton.addEventListener("click", formSubmitHandler);
