// Додайте цей код в файл index.js
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_TWSNzcXXshd2wTlx8wGZmTOAPuw0U7qAOkoVyaq40AXWXmhZ2AgSxAzpuz2uAlxb";
import SlimSelect from 'slim-select';
import Notiflix from "notiflix";
export const fetchBreeds = () => {
   return axios.get("https://api.thecatapi.com/v1/breeds");
 };

 export const fetchCatByBreed = (breedId) => {
   const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
   return axios.get(url);
 };

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

fetchBreeds()
  .then((response) => {
    const breeds = response.data;
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Помилка при завантаженні списку порід", error);
    Notiflix.Notify.Failure("Oops! Something went wrong! Try reloading the page!");
  });

// Додати обробку вибору породи та виклик fetchCatByBreed
breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  loader.style.display = "block"; // Показуємо завантажувач під час запиту
  error.style.display = "none";
  fetchCatByBreed(selectedBreedId)
    .then((response) => {
      // Отримали дані про кішку, відображаємо їх
      const catData = response.data[0]; // Беремо перший об'єкт, може бути більше одного, в залежності від запиту
      catInfo.innerHTML = `<img src="${catData.url}" alt="Cat Image">
                           <div style="max-width: 500px">
                           <p style="font-size: 32px; color: blue;">${catData.breeds[0].name}</p>
                           <p> <span style="font-weight: 700;">Description: </span>${catData.breeds[0].description}</p>
                           <p><span style="font-weight: 700;">Temperament: </span>${catData.breeds[0].temperament}</p>
                           </div>`;
    })
    .catch((error) => {
      console.error("Помилка при запиті інформації про кота", error);
      error.style.display = "block"; // Виводимо повідомлення про помилку
    })
    .finally(() => {
      loader.style.display = "none"; // Приховуємо завантажувач після завершення запиту
    });
});


