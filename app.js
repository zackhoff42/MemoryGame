const gameContainer = document.getElementById("game");
let clickCount = 0;
let cardArray = [null, null];
let flippedCard;
let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(clickCount === 2) return;
  let clickedCard = event.target;

  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if(!cardArray[0]){
    clickedCard.classList.add('flipped');
    cardArray[0] = clickedCard;
    clickCount++;
  }

  if(!!cardArray[0] && !cardArray[1]){
    cardArray[1] = clickedCard;
    if(cardArray[0].classList.value === cardArray[1].classList.value){
      cardArray[1] = null;
    } else {
      clickedCard.classList.add('flipped');
      cardArray[1] = clickedCard;
      clickCount++;
    }
  }

  // console.log(clickedCard.classList.value[0], clickedCard.classList.value[1], clickCount); Used this for testing purposes.

  if(clickCount > 1){
    let class1 = cardArray[0].classList.value;
    let class2 = cardArray[1].classList.value;

    if(class1 === class2){
        score += 2;
        cardArray[0].removeEventListener('click', handleCardClick);
        cardArray[1].removeEventListener('click', handleCardClick);
        cardArray = [null, null];
        clickCount = 0;
    } else {
        setTimeout(function(){
            cardArray[0].style.backgroundColor = '';
            cardArray[1].style.backgroundColor = '';
            cardArray[0].classList.remove('flipped');
            cardArray[1].classList.remove('flipped');
            cardArray = [null, null];
            clickCount = 0;
        }, 1000);
    }
}
  if(score === COLORS.length) alert('You Win!');
}
createDivsForColors(shuffledColors);