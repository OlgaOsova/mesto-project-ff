export { openPopup, closePopup };

// Функция открытия окна
function openPopup(popupInfo) {
  popupInfo.classList.add("popup_is-opened", "popup_is-animated");
  popupInfo.addEventListener("click", formCloseOverlay);
  document.addEventListener("keydown", formCloseEsc);
}

// Функция закрытия окна
function closePopup(popupInfo) {
  popupInfo.classList.remove("popup_is-opened");
  popupInfo.removeEventListener("click", formCloseOverlay);
  document.removeEventListener("keydown", formCloseEsc);
}

// Закрытие окна кликом по оверлею
const formCloseOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Закрытие окна кнопкой Esc
const formCloseEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}