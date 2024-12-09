//Initial References
const letterContainer = document.querySelector(".letters");
const optionsContainer = document.querySelector(".options");
const userInputSection = document.querySelector(".user-input");
const newGameContainer = document.querySelector(".new-game");
const newGameButton = document.querySelector(".new-game-btn");
const canvas = document.querySelector(".hangman-canvas");
const resultText = document.querySelector(".result-text");

const hintContainer = document.querySelector(".hint-container");
const hintButton = document.querySelector(".hint-btn");
const hintText = document.querySelector(".hint-text");

const livesContainer = document.querySelector(".lives-container");
const livesText = document.querySelector(".lives-text");

//Categories and words (Mongolian words for categories)
let options = {
  жимс: ["алим", "нэрс", "мандарин", "хан боргоцой", "анар", "тарвас"],
  амьтан: ["хавтгай", "янгир", "цоохор ирвэс", "ятуу", "тогоруу", "хандгай"],
  кино: ["Mean Girls", "Howl's Moving Castle", "Me before you", "Parasite", "Divergent", "home alone"],
  дуучин: ["Billie_Eilish", "Lana_Del_Rey", "Rose", "Annie_Lennox", "Artemas", "Chase_Atlantic "]
};

let hints = {
  жимс: [
    "өдөрт 1-ийг идвэл эмч юу ч билээ",
    "жижигхэн хөх цэнхэр өнгөтэй",
    "арилгаж иддэг улбар шар",
    "i have a pen i have --",
    "колаген нтр гээл байдаг даа",
    "Ховдын--"
  ],
  амьтан: [
    "---",
    "---",
    "---",
    "---",
    "---",
    "--"
  ],  
  кино: [
    "omg i love your skirt where did you get it?",
    "calcifer sophie",
    "aimr sad zaluu ni uhchdeg, ghde bayn baisan bolohoor aimr ih mungu uldeedeg",
    "аав нь баян айлын агуулахад амьдраад дуусдаг",
    "энийг би ч мэдэхгүй юм байна аа",
    "шинэ жилийн сүлд кино"
  ],  
  дуучин: [
    "im bad guy",
    "pepsi cola",
    "kissy face kissy face",
    "энийг угаасаа бараг таахгүй дээ",
    "сая зун трэнд болоод байсан дууны эзэн",
    "swim ээр нь мэднэ дээ"
  ],
};

//Game variables
let winCount = 0;
let count = 0; // Wrong attempts
let chosenWord = "";
let chosenHint = "";
let totalLives = 5; // Total lives
let totalLetters = 0; // Count only letters for win condition

//Mongolian Cyrillic Alphabet
const mongolianLetters = [
  "А","Б","В","Г","Д","Е","Ё","Ж","З","И","Й","К","Л","М","Н","О","Ө",
  "П","Р","С","Т","У","Ү","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"
];

// English Alphabet [A-Z]
const englishLetters = [];
for (let i = 65; i < 91; i++) {
  englishLetters.push(String.fromCharCode(i));
}

//Display options (categories)
const displayOptions = () => {
  const categoriesContainer = optionsContainer.querySelector(".categories-container");
  categoriesContainer.innerHTML = "";
  
  for (let value in options) {
    let button = document.createElement("button");
    button.classList.add("category-btn");
    button.innerText = value;
    button.addEventListener("click", () => generateWord(value));
    categoriesContainer.appendChild(button);
  }
};

//Create Keyboard based on category
const createKeyboard = (category) => {
  // Clear previous letters
  letterContainer.innerHTML = "";

  // Determine which keyboard to use
  let lettersArray;
  if (category === "жимс" || category === "амьтан") {
    // Use Mongolian letters
    lettersArray = mongolianLetters;
  } else {
    // Use English letters
    lettersArray = englishLetters;
  }

  // Create buttons from the chosen alphabet
  lettersArray.forEach((letter) => {
    let button = document.createElement("button");
    button.classList.add("letter-btn");
    button.innerText = letter;

    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      const guessedLetter = letter.toUpperCase();
      let dashes = document.getElementsByClassName("dashes");

      // Check if guessed letter is in the word
      if (charArray.includes(guessedLetter)) {
        //Correct guess
        charArray.forEach((char, index) => {
          if (char === guessedLetter) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount === totalLetters) {
              resultText.innerHTML = `<h2 class='win-msg'>Та яллаа!!</h2><p>Таах үг: <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
        });
      } else {
        //Wrong guess
        count += 1;
        drawMan(count);
        // Update lives left
        livesText.innerText = `Амь: ${totalLives - count}`;

        if (count === totalLives) {
          // Player loses
          resultText.innerHTML = `<h2 class='lose-msg'>Та ялагдлаа!!</h2><p>Таах үг: <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button after guess
      button.disabled = true;
    });

    letterContainer.append(button);
  });
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".category-btn");
  let letterButtons = document.querySelectorAll(".letter-btn");

  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled = true;
  });

  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".category-btn");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  // Show letters, hint container, and lives
  letterContainer.classList.remove("hide");
  hintContainer.classList.remove("hide");
  livesContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  let randomIndex = Math.floor(Math.random() * optionArray.length);
  
  // Trim and uppercase for consistent checking
  chosenWord = optionArray[randomIndex].trim().toUpperCase();
  chosenHint = hints[optionValue][randomIndex];

  // Calculate total letters (A-ZА-ЯӨҮЁ)
  totalLetters = chosenWord.split('').filter(ch => /[A-ZА-ЯӨҮЁ]/i.test(ch)).length;

  // Show 5 lives initially
  livesText.innerText = `Амь: ${totalLives - count}`;

  // Build the displayItem
  let displayItem = '';
  for (let char of chosenWord) {
    if (/[A-ZА-ЯӨҮЁ]/i.test(char)) {
      // It's a letter: underscore it
      displayItem += `<span class="dashes">&nbsp;</span>`;
    } else if (char === ' ') {
      // It's a space
      displayItem += `<span class="dashes-space">&nbsp;</span>`;
    } else {
      // Punctuation or other chars, show directly (revealed from start)
      displayItem += `<span class="dashes punct">${char}</span>`;
    }
  }

  userInputSection.innerHTML = displayItem;

  // Hide hint text initially
  hintText.classList.add("hide");

  // Create the keyboard based on the chosen category
  createKeyboard(optionValue);
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;
  chosenWord = "";
  chosenHint = "";
  totalLetters = 0;
  livesText.innerText = `Амь: ${totalLives}`; // reset lives display to full

  //Reset display
  userInputSection.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  hintContainer.classList.add("hide");
  livesContainer.classList.add("hide");
  hintText.classList.add("hide");
  hintText.innerText = "";
  letterContainer.innerHTML = "";

  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => drawLine(70, 40, 70, 80);
  const leftArm = () => drawLine(70, 50, 50, 70);
  const rightArm = () => drawLine(70, 50, 90, 70);
  const leftLeg = () => drawLine(70, 80, 50, 110);

  //5 lives total: head(1), body(2), leftArm(3), rightArm(4), leftLeg(5)

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg };
};

//Draw the man based on count
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    default:
      break;
  }
};

//Show hint on hint button click
hintButton.addEventListener("click", () => {
  hintText.innerText = chosenHint;
  hintText.classList.remove("hide");
});

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
