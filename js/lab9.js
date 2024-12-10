//document.querySelector(): CSS selector hamgiin ehnii taarsan elemtiig songono -dom

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


//songolt bolon hintiig aguulsan heseg
let options = {
  жимс: ["алим", "нэрс", "мандарин", "хан боргоцой", "анар", "тарвас"],
  амьтан: ["тэмээ", "янгир", "цоохор ирвэс", "ятуу", "тогоруу", "хандгай"],
  кино: ["Mean Girls", "Howl's Moving Castle", "Me before you", "Parasite", "Divergent", "home alone"],
  дуучин: ["Billie_Eilish", "Lana_Del_Rey", "Rose", "Annie_Lennox", "Artemas", "Chase_Atlantic "]
};

let hints = {
  жимс: [
    "модонд ургадаг бөгөөд ихэвчлэн улаан, ногоон эсвэл шар өнгөтэй байдаг",
    "жижиг, бөөрөнхий бөгөөд хөх өнгөтэй, ойд ургадаг",
    "нимгэн хальстай, улбар шар өнгөтэй, амттай бөгөөд арилгахад амархан",
    "урт навчтай ургамал дээр ургадаг, гадар нь хатуу бөгөөд дотор нь шар амттай хэсэгтэй",
    "улаан өнгөтэй, дотор нь олон жижиг үртэй бөгөөд амт нь чихэрлэг эсвэл исгэлэн байдаг",
    "том, бөөрөнхий, доторх нь улаан, гаднах нь ногоон өнгөтэй бөгөөд зуны улиралд хамгийн түгээмэл байдаг"
  ],
  амьтан: [
    "халуун хуурай газарт амьдардаг, нуруун дээр өөх хуримтлагдсан байдаг ",
    "өндөр уулын хадан дээр амьдардаг бөгөөд урт, тахир эвэртэй",
    "Өндөр уулын цасан бүрхүүлтэй газар нутагт амьдардаг, маш цөөн тоотой ховор амьтан",
    "ой модонд амьдардаг бөгөөд түүний өдийг шувууны чимэглэлд их хэрэглэдэг",
    "Урт хүзүү, урт хөлтэй ба нүүдлийн амьдралтай шувуу",
    "ой модонд амьдардаг бөгөөд хамгийн том эвэртэй хөхтөн амьтдын нэг"
  ],  
  кино: [
    "ахлах сургуулийн охидын хоорондын өрсөлдөөн, нөхөрлөлийн талаар өгүүлдэг",
    "аниме кино бөгөөд нисдэг шидэт байшин, шидтэн, зоригтой охины тухай өгүүлдэг",
    "хайр, амьдралын утга учрын талаар, хөгжлийн бэрхшээлтэй залуу болон түүнийг асрагч охины түүхийг өгүүлдэг",
    " баян, ядуу хоёр гэр бүлийн харилцааны тухай өгүүлдэг бөгөөд Оскарын шагнал хүртсэн",
    "ирээдүйд ангилалд хуваагдсан нийгэмд өөрийн онцгой чадвараа нуудаг охины түүхийг өгүүлдэг",
    "зул сарын үеэр гэртээ ганцаараа үлдсэн жаал хүүгийн адал явдлын тухай өгүүлдэг"
  ],  
  дуучин: [
    "түүний дуу хоолой маш өвөрмөц бөгөөд шивнэх мэт сонсогддог",
    "дуучны бүтээлүүд ихэвчлэн меланхолик, винтэж стильтэй бөгөөд 'Summertime Sadness' дуугаараа алдаршсан",
    "K-pop хамтлагийн гишүүн бөгөөд солог дуу хоолойгоороо олон хүний хайрыг татсан",
    "'Eurythmics' хамтлагийн нэгэн хэсэг байсан бөгөөд 'Sweet Dreams' дуугаараа алдартай",
    "инди-поп, электро-поп төрлөөр уран бүтээлээ туурвидаг бөгөөд өвөрмөц стильтэй, дуунууд нь тикток дээр дандаа трэнд болдог",
    "R&B, поп болон электро элементүүдийг хослуулсан өвөрмөц дуу хөгжмөөрөө алдартай"
  ],
};

//togloomiin ywtsiin utga hadgalah

let winCount = 0; //zuw taasan useg hadgalna
let count = 0; //buruu taasan useg hadgalna hangman zurahad ashiglana
let chosenWord = ""; //randomoor songoson ugiig hadgalna 
let chosenHint = ""; //hintiig hadgalna
let totalLives = 5; //niit ami
let totalLetters = 0; //songogdson ugiin niit useg


//mongol useg
const mongolianLetters = [
  "А","Б","В","Г","Д","Е","Ё","Ж","З","И","Й","К","Л","М","Н","О","Ө",
  "П","Р","С","Т","У","Ү","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"
];

//angli useg
const englishLetters = [];
for (let i = 65; i < 91; i++) {
  englishLetters.push(String.fromCharCode(i));
}


//turuld tohirson usegnuudiig haruulah heseg
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


//keyboard uusgeh heseg
const createKeyboard = (category) => {
  letterContainer.innerHTML = ""; //lettercontainer hesgiig reset hiine

  //ymar turul songohoos shaltgaalj ali keyboardiig delgetsen haruulahaa songono
  let lettersArray;
  if (category === "жимс" || category === "амьтан") {
    lettersArray = mongolianLetters;
  } else {
    lettersArray = englishLetters;
  }

  //useg burt button uusgeh
  //lettersArray dotor angli bolon mongol usegnuud bagtana
  //forEach funktseer useg bureer ni loop hiine
  //dom dtrh elemented shine button uusgene
  //css classlist uusgene
  //buttond usgiig hadgalah
  lettersArray.forEach((letter) => {
    let button = document.createElement("button"); 
    button.classList.add("letter-btn"); 
    button.innerText = letter; 

    //buttond click uidel hiih ued yu hiihiig shiideh click uildel hiigdeh ued dtrh funkts ajillana
    //chosenword buyu songoson ugig char aar huwaana
    //bugdiig ni uppercase char bolgono
    //useg burt dash
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      const guessedLetter = letter.toUpperCase();
      let dashes = document.getElementsByClassName("dashes");

      //taamag zuw esehiig shalgana
      //taasan useg chararray-d baigaa esehiig shalgana
      //chararray dahi useg buriig shalgana
      if (charArray.includes(guessedLetter)) {
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
      } else { //esreg tohioldold, drawman funktsiig duudna 
        count += 1;
        drawMan(count);
        livesText.innerText = `Амь: ${totalLives - count}`;

        if (count === totalLives) {
          resultText.innerHTML = `<h2 class='lose-msg'>Та ялагдлаа!!</h2><p>Таах үг: <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      button.disabled = true;  //daragdsan towchiig idewhgui bolgono
    });

    letterContainer.append(button);
  });
};

//blocker funtks - hereglegch neg songoh uildel hiisen bol tsaashd ymr negen nemelt uildel hiihiig haah
//buh button iig idewhgui bolgoj shineer ehluuleh towchiig haruulna
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".category-btn");
  let letterButtons = document.querySelectorAll(".letter-btn");

  //categor dahi buh button iig idewhgui bolgono
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  letterButtons.forEach((button) => {
    button.disabled = true;
  });

  newGameContainer.classList.remove("hide");
};


//ug bolon hint songoh
//optionValue - categort songogdson utga
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".category-btn");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //hide class iig arilgah
  letterContainer.classList.remove("hide");
  hintContainer.classList.remove("hide");
  livesContainer.classList.remove("hide");
  userInputSection.innerText = "";


  let optionArray = options[optionValue];
  let randomIndex = Math.floor(Math.random() * optionArray.length);
  
  chosenWord = optionArray[randomIndex].trim().toUpperCase();
  chosenHint = hints[optionValue][randomIndex];
  totalLetters = chosenWord.split('').filter(ch => /[A-ZА-ЯӨҮЁ]/i.test(ch)).length;
  livesText.innerText = `Амь: ${totalLives - count}`;

  //songogdson ugiig delgets ruu haruulah
  let displayItem = '';
  for (let char of chosenWord) {
    if (/[A-ZА-ЯӨҮЁ]/i.test(char)) {
      displayItem += `<span class="dashes">&nbsp;</span>`;
    } else if (char === ' ') {
      displayItem += `<span class="dashes-space">_</span>`;
    } else {
      displayItem += `<span class="dashes punct">${char}</span>`;
    }
  }

  userInputSection.innerHTML = displayItem;
  hintText.classList.add("hide");
  createKeyboard(optionValue);
};

//utguudiig reset hiih
const initializer = () => {
  winCount = 0;
  count = 0;
  chosenWord = "";
  chosenHint = "";
  totalLetters = 0;
  livesText.innerText = `Амь: ${totalLives}`;

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


//hangman zuragdah heseg
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

  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg };
};


//hangman zurah heseg 
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

hintButton.addEventListener("click", () => {
  hintText.innerText = chosenHint;
  hintText.classList.remove("hide");
});

newGameButton.addEventListener("click", initializer);
window.onload = initializer;