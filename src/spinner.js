//  articleSection 은 spinner_area 을 감싸고 있는 부모 태그 요소이다.

export default function createSpinner(parent) {
  try {
    const spinnerAreaEl = parent.querySelector(".spinner_area");
    const imageEl = document.createElement("img");
    imageEl.alt = "spinner";
    imageEl.src = "./src/spin.gif";
    spinnerAreaEl.append(imageEl);
  } catch (error) {
    console.error(error);
  }
}
