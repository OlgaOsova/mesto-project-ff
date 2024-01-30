// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(initialCards, deleteCard) {
    const cardElement = cardTmp.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardElement.querySelector('.card__image').src = initialCards.link;
    cardElement.querySelector('.card__image').alt = initialCards.name;
    cardElement.querySelector('.card__title').textContent = initialCards.name;
   
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
        console.log('Удалена карточка', initialCards.name);
    });
    
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    placesList.append(createCard(item));
    console.log('Выведены карточки на страницу');
});