let boxes = document.querySelectorAll(".box");
let clickSound = document.getElementById("clickSound");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count=0;

let turn0 = true; //playerX, playerO

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  resetBoard();
  msgContainer.classList.add("hide");
  count=0;
};

const resetBoard = () => {
  for (let box of boxes) {
    box.innerText = "";
    box.disabled = false;
  }
  count=0;
};

const draw = (count) => {
  if (count == 9){
    disableBoxes();
    msg.innerText = ` Game is DRAW!! `;
  msgContainer.classList.remove("hide")
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      //player(O)
      box.innerText = "O";
      box.style.color= "#9B95C3";
      turn0 = false;
      count+=1;
      clickSound.play();
    } else {
      //player(X)
      box.innerText = "X";
      box.style.color= "#054566";
      turn0 = true;
      count+=1;
      clickSound.play();
    }

    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        break; // Exit the loop if a winner is found
      }
    }
  }
  else if (count === 9) {
    // No winner and all boxes filled, declare a draw
    disableBoxes();
    draw(count);
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
