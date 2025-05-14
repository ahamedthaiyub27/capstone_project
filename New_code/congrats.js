const modal = document.getElementById("rules-modal");
const btnRules = document.getElementsByClassName("rules")[0];
const cross = document.getElementsByClassName("cross")[0];

btnRules.addEventListener("click", () => {
  modal.style.display = "block";
  cross.style.display = "flex";
});

cross.addEventListener("click", () => {
  modal.style.display = "none";
  cross.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    cross.style.display = "none";
  }
});
