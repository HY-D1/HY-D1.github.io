const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

function shufflePhotos(photos, random = Math.random) {
  const shuffled = [...photos];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

const selectedPhotos = document.querySelector("#personal-photos");
const morePhotos = document.querySelector("#more-photos");

if (selectedPhotos && morePhotos) {
  const photographs = [
    ...selectedPhotos.querySelectorAll("figure"),
    ...morePhotos.querySelectorAll("figure"),
  ];
  if (photographs.length >= 3) {
    const shuffled = shufflePhotos(photographs);
    selectedPhotos.replaceChildren(...shuffled.slice(0, 3));
    morePhotos.replaceChildren(...shuffled.slice(3));
  }
}
