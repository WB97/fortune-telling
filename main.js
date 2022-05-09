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
  imgs = [
    { src: "img1.jpg", text: "It's Img1" },
    { src: "img2.jpg", text: "It's Img2" },
    { src: "img3.jpg", text: "It's Img3" },
    { src: "img4.jpg", text: "It's Img4" },
  ];
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
  selectCardBackground.style.background = "rgba(0, 0, 0, 0.5)";
  selectCardBackground.appendChild(selectedCard);
  target.remove();
};

const handleHiddenBackground = (e) => {
  const target = e.currentTarget.childNodes;
  selectCardBackground.style.display = "none";
  target[0].remove();
};

for (const target of cardBox) {
  target.addEventListener("click", handleClickCard);
}
footbarToggle.addEventListener("click", handleFootBarToggle);
window.addEventListener("load", handleImgSet);
selectCardBackground.addEventListener("click", handleHiddenBackground);
