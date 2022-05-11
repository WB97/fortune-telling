const imgs = [
  { id: "guri", src: "./img1.jpg", text: "It's img1" },
  { id: "man", src: "./img2.jpg", text: "It's img2" },
  { id: "siba", src: "./img3.jpg", text: "It's img3" },
  { id: "zoro", src: "./img4.jpg", text: "It's img4" },
];

const imgsWrap = document.getElementById("imgs-wrap");
const footBar = document.getElementById("footBar");
const footbarToggle = document.getElementById("footbarToggle");
const cardBox = document.querySelectorAll(".cardBox");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
const card1Back = document.getElementById("card1Back");
const card2Back = document.getElementById("card2Back");
const card3Back = document.getElementById("card3Back");
const card4Back = document.getElementById("card4Back");
const selectCardBackground = document.getElementById("selectCardBackground");
const backButton = document.getElementById("backButton");

const handleFootBarToggle = (e) => {
  if (footBar.className) {
    footBar.classList.remove("hide");
    footBar.style.height = "200px";
    footbarToggle.style.transform = "rotate(180deg)";
  } else {
    footBar.className = "hide";
    footBar.style.height = "40px";
    footbarToggle.style.transform = "rotate(0deg)";
  }
};

const handleImgSet = () => {
  imgs.sort(() => Math.random() - 0.5);
  card1.style.backgroundImage = `url(${imgs[0].src})`;
  card2.style.backgroundImage = `url(${imgs[1].src})`;
  card3.style.backgroundImage = `url(${imgs[2].src})`;
  card4.style.backgroundImage = `url(${imgs[3].src})`;
  card1Back.innerText = imgs[0].text;
  card2Back.innerText = imgs[1].text;
  card3Back.innerText = imgs[2].text;
  card4Back.innerText = imgs[3].text;
};

const handleClickCard = (e) => {
  const target = e.currentTarget;
  const front = target.querySelector(".front");
  const back = target.querySelector(".back");
  const selectedCard = document.createElement("div");
  selectedCard.appendChild(front);
  selectedCard.appendChild(back);
  selectedCard.id = "selectCard";
  selectedCard.childNodes[0].className = "newCard selectFront";
  selectedCard.childNodes[1].className = "newCard selectBack";
  selectCardBackground.style.display = "block";
  selectCardBackground.style.background = "rgba(0, 0, 0, 0.8)";
  selectCardBackground.appendChild(selectedCard);
  target.remove();
};

const handleHiddenBackground = (e) => {
  const target = e.currentTarget.parentElement;
  selectCardBackground.style.display = "none";
  target.removeChild(target.lastChild);
};

for (const target of cardBox) {
  target.addEventListener("click", handleClickCard);
}
footbarToggle.addEventListener("click", handleFootBarToggle);
window.addEventListener("load", handleImgSet);
backButton.addEventListener("click", handleHiddenBackground);

//localStorage section

const loginForm = document.getElementById("loginForm");
const loginInput = document.getElementById("FormInput");
const nameBox = document.getElementById("nameBox");

const nameKey = "userName";
const userName = localStorage.getItem(nameKey);

const showNameBox = (name) => {
  loginForm.remove();
  nameBox.classList.remove("hidden");
  nameBox.innerText = `Hello ${name}`;
};

const handleSubmit = (e) => {
  const setName = loginInput.value;
  e.preventDefault();
  if (setName == "") {
    alert("Name is required");
    loginInput.focus();
    return;
  } else {
    localStorage.setItem(nameKey, setName);
    loginInput.value = "";
    loginForm.remove();
    showNameBox(setName);
  }
};

if (userName == null) {
  loginForm.addEventListener("submit", handleSubmit);
} else {
  showNameBox(userName);
}
