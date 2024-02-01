// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(dataCard) {
    const cardElement = cardTmp.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardElement.querySelector('.card__image').src = dataCard.link;
    cardElement.querySelector('.card__image').alt = dataCard.name;
    cardElement.querySelector('.card__title').textContent = dataCard.name;
   
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
        console.info('Удалена карточка', dataCard.name);
    });
    
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(dataCard => {
    placesList.append(createCard(dataCard));
    console.info('Выведены карточки на страницу');
});