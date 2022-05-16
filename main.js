const imgs = [
  { id: "guri", src: "./img1.jpg", text: "It's img1" },
  { id: "man", src: "./img2.jpg", text: "It's img2" },
  { id: "siba", src: "./img3.jpg", text: "It's img3" },
  { id: "zoro", src: "./img4.jpg", text: "It's img4" },
];

const imgsWrap = document.getElementById("imgs-wrap");
const timeBox = document.getElementById("timeBox");
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
const myCard = document.querySelector(".myCard");
const timeText = document.getElementById("timeText");

const handleFootBarToggle = (e) => {
  if (footBar.className) {
    //보이게 하기
    footBar.className = "";
    myCard.classList.remove("myCardHidden");
    footBar.style.height = "250px";
    footbarToggle.style.transform = "rotate(180deg)";
  } else {
    //안보이게 하기
    footBar.className = "hide";
    myCard.classList.add("myCardHidden");
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

  card1.parentElement.id = imgs[0].id;
  card2.parentElement.id = imgs[1].id;
  card3.parentElement.id = imgs[2].id;
  card4.parentElement.id = imgs[3].id;

  card1Back.innerText = imgs[0].text;
  card2Back.innerText = imgs[1].text;
  card3Back.innerText = imgs[2].text;
  card4Back.innerText = imgs[3].text;
};

const setMyCard = (newCard) => {
  myCard.style.backgroundImage = `url(${newCard.src})`;
  myCard.id = newCard.id;
};

const showCard = (targetCard) => {
  const selectedCard = document.createElement("div");
  const front = document.createElement("div");
  const back = document.createElement("div");
  selectedCard.id = "selectCard";
  front.className = "newCard selectFront";
  back.className = "newCard selectBack";
  selectedCard.appendChild(front);
  selectedCard.appendChild(back);
  for (i = 0; i < imgs.length; i++) {
    if (targetCard.id == imgs[i].id) {
      const newCard = {
        id: imgs[i].id,
        src: imgs[i].src,
        text: imgs[i].text,
      };
      if (userName && !cardSession) {
        // 유저 세션이 있다면 카드 저장하기
        localStorage.setItem(cardKey, JSON.stringify(newCard));
        setMyCard(newCard);
      }
      front.style.backgroundImage = `url(${newCard.src})`;
      back.innerText = newCard.text;
      selectCardBackground.style.display = "block";
      selectCardBackground.style.background = "rgba(0, 0, 0, 0.8)";
      selectCardBackground.appendChild(selectedCard);
      return;
    }
  }
};

const handleClickCard = (e) => {
  const targetCard = e.currentTarget;
  showCard(targetCard); // 선택 카드 보여주기, 카드 저장하기
  setTime();
  targetCard.remove();
};

const handleHiddenBackground = (check) => {
  const removeCard = document.getElementById("selectCard");
  if (!removeCard) {
    return;
  }
  selectCardBackground.removeChild(removeCard);
  selectCardBackground.style.display = "none";
  if (check != 1) {
    window.location.reload();
  }
};

const handleClickMyCard = (e) => {
  if (!cardSession) {
    return;
  }
  const targetCard = e.currentTarget;
  const check = 1;
  handleHiddenBackground(check);
  setTimeout(() => {
    showCard(targetCard);
  }, 1);
};

const showTimer = () => {
  const time = new Date();
  const second = String(59 - time.getSeconds()).padStart(2, "0");
  const minute = String(59 - time.getMinutes()).padStart(2, "0");
  const hour = String(23 - time.getHours()).padStart(2, "0");
  timeText.innerText = `${hour} : ${minute} : ${second}`;
};

const getTime = () => {
  showTimer();
  setInterval(showTimer, 1000);
};

const setTime = () => {
  const time = new Date();
  const saveTime = time.getDate() + 1;
  localStorage.setItem("nextDay", saveTime);
};

for (const target of cardBox) {
  target.addEventListener("click", handleClickCard);
}
footbarToggle.addEventListener("click", handleFootBarToggle);
window.addEventListener("load", handleImgSet);
backButton.addEventListener("click", handleHiddenBackground);
myCard.addEventListener("click", handleClickMyCard);

//localStorage section

const loginForm = document.getElementById("loginForm");
const loginInput = document.getElementById("FormInput");
const nameBox = document.getElementById("nameBox");

const nameKey = "userName";
const cardKey = "card";
const dayKey = "nextDay";
const userName = localStorage.getItem(nameKey);
const cardSession = localStorage.getItem(cardKey);
const daySession = localStorage.getItem(dayKey);

const showNameBox = (name) => {
  loginForm.remove();
  nameBox.classList.remove("hidden");
  nameBox.innerText = `Have a good day ${name}!`;
};

const handleSubmit = (e) => {
  const setName = loginInput.value;
  if (setName == "") {
    e.preventDefault();
    alert("Name is required");
    loginInput.focus();
    return;
  } else {
    localStorage.setItem(nameKey, setName);
    loginInput.value = "";
    window.location.reload();
  }
};

if (userName == null) {
  // 유저세션이 비어있다면 로그인 폼 보여주기
  loginForm.addEventListener("submit", handleSubmit);
} else {
  // 유저 세션이 있다면 로그인 폼은 가리고 인사메세지 띄우기
  showNameBox(userName);
  const compareTime = new Date();
  const compareDay = compareTime.getDate();
  if (daySession && compareDay >= daySession) {
    // 현재 날짜와 세션에 저장된 다음날짜를 비교해서 날짜가 지났으면 유저네임을 제외한 세션 초기화
    localStorage.removeItem(cardKey);
    localStorage.removeItem(dayKey);
    window.location.reload();
  }
  if (cardSession) {
    // 카드가 저장되어 있다면 중앙 카드선택창 가리고 타이머 띄우기, 하단에 내 카드 이미지 띄우기
    imgsWrap.id = "";
    imgsWrap.classList.add("hidden");
    timeBox.classList.remove("hidden");
    setMyCard(JSON.parse(cardSession));
    getTime();
  }
}
