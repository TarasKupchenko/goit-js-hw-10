import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

// Показуємо лоадер при завантаженні сторінки
loader.style.display = 'block';

// Приховуємо селект при завантаженні сторінки
breedSelect.style.display = 'none';

function showError(errorMessage) {
  error.textContent = errorMessage;
  error.style.display = 'block';
}

// Функція для приховування блоку з інформацією про породу
function hideCatInfo() {
  catInfo.style.display = 'none';
}

fetchBreeds()
  .then((response) => {
    const breeds = response.data;
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    // Приховуємо лоадер після завантаження даних
    loader.style.display = 'none';
    // Показуємо селект після завантаження
    breedSelect.style.display = 'block';
  })
  .catch((error) => {
    console.error('Помилка при завантаженні списку порід', error);
    // Виводимо повідомлення про помилку на сторінці
    showError('Oops! Something went wrong! Try reloading the page!');
    // Приховуємо лоадер у випадку помилки
    loader.style.display = 'none';
  });

breedSelect.addEventListener('change', () => {
  loader.style.display = 'block';
  hideCatInfo(); // Приховуємо блок інформації про попередню породу
  error.style.display = 'none'; // Приховуємо повідомлення про помилку

  const selectedBreedId = breedSelect.value;

  fetchCatByBreed(selectedBreedId)
    .then((response) => {
      const catData = response.data[0];
      catInfo.innerHTML = `<img src="${catData.url}" alt="Cat Image">
                                <div style="max-width: 500px">
                                <p style="font-size: 32px; color: blue;">${catData.breeds[0].name}</p>
                                <p> <span style="font-weight: 700;">Description: </span>${catData.breeds[0].description}</p>
                               <p><span style="font-weight: 700;">Temperament: </span>${catData.breeds[0].temperament}</p>`;
      // Показуємо блок інформації про нову породу
      catInfo.style.display = 'flex';
    })
    .catch((error) => {
      console.error('Помилка при запиті інформації про кота', error);
      showError('Oops! The selected breed was not found. Please try again.');
      hideCatInfo();
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});
