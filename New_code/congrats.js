const modal = document.getElementById("rules-modal");
const btnRules = document.getElementsByClassName("rules")[0];
const cross = document.getElementsByClassName("cross")[0];


if (!modal) {
  console.error("Modal element with ID 'rules-modal' not found.");
}

if (!btnRules) {
  console.error("Button with class 'rules' not found.");
}

if (!cross) {
  console.error("Close button with class 'cross' not found.");
}


if (btnRules && modal && cross) {
  btnRules.addEventListener("click", () => {
    try {
      modal.style.display = "block";
      cross.style.display = "flex";
    } catch (e) {
      console.error("Failed to show modal:", e);
    }
  });

  cross.addEventListener("click", () => {
    try {
      modal.style.display = "none";
      cross.style.display = "none";
    } catch (e) {
      console.error("Failed to hide modal:", e);
    }
  });

  window.addEventListener("click", (event) => {
    try {
      if (event.target === modal) {
        modal.style.display = "none";
        cross.style.display = "none";
      }
    } catch (e) {
      console.error("Error during modal background click handling:", e);
    }
  });
}
