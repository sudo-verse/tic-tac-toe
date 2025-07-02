let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let win = document.querySelector(".msg");
let restart = document.querySelector(".reset");
let modeSelect = document.getElementById("mode");

let turn0 = "o";
let isGameOver = false;

const winPatterns = [
    [0,1,2],[0,3,6],[0,4,8],
    [1,4,7],[2,5,8],[2,4,6],
    [3,4,5],[6,7,8],
];

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1 = boxes[a].innerText;
        let pos2 = boxes[b].innerText;
        let pos3 = boxes[c].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            stopGame();
            return true;
        }
    }

    if ([...boxes].every(box => box.innerText !== "")) {
        showWinner("Draw");
        stopGame();
        return true;
    }

    return false;
};

const showWinner = (winner) => {
    win.innerText = winner === "Draw" ? "It's a Draw!" : `Congratulations, winner is ${winner}`;
    win.classList.remove("hide");
    isGameOver = true;
};

const stopGame = () => {
    boxes.forEach(box => box.disabled = true);
};

const renew = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    isGameOver = false;
};

const resetGame = () => {
    turn0 = "o";
    renew();
    win.classList.add("hide");
};

// Minimax AI

const aiMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerText === "") {
            boxes[i].innerText = "X";
            let score = minimax(boxes, 0, false);
            boxes[i].innerText = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    if (move !== undefined) {
        boxes[move].innerText = "X";
        boxes[move].disabled = true;
        if (!checkWinner()) {
            turn0 = "o";
        }
    }
};

const minimax = (newBoxes, depth, isMaximizing) => {
    let result = getResult(newBoxes);
    if (result !== null) {
        const scores = {
            X: 1,
            O: -1,
            Draw: 0
        };
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoxes.length; i++) {
            if (newBoxes[i].innerText === "") {
                newBoxes[i].innerText = "X";
                let score = minimax(newBoxes, depth + 1, false);
                newBoxes[i].innerText = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoxes.length; i++) {
            if (newBoxes[i].innerText === "") {
                newBoxes[i].innerText = "O";
                let score = minimax(newBoxes, depth + 1, true);
                newBoxes[i].innerText = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

const getResult = (newBoxes) => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1 = newBoxes[a].innerText;
        let pos2 = newBoxes[b].innerText;
        let pos3 = newBoxes[c].innerText;
        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            return pos1;
        }
    }

    if ([...newBoxes].every(box => box.innerText !== "")) {
        return "Draw";
    }

    return null;
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || isGameOver) return;

        if (turn0 === "o") {
            box.innerText = "O";
            box.disabled = true;
            if (checkWinner()) return;

            turn0 = "X";

            if (modeSelect.value === "pvc") {
                setTimeout(() => {
                    aiMove();
                }, 200);
            }
        } else if (modeSelect.value === "pvp") {
            box.innerText = "X";
            box.disabled = true;
            if (checkWinner()) return;

            turn0 = "o";
        }
    });
});

restart.addEventListener("click", resetGame);
