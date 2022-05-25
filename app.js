const game_lvl_1 = [
    "6", "7", "1", ".", ".", ".", ".", "8", "9",
    ".", ".", ".", "1", "3", "9", "7", ".", "6",
    ".", "9", "5", "8", "6", ".", ".", ".", "4",
    "2", ".", "7", "3", ".", ".", ".", "6", "1",
    ".", "6", "4", ".", "1", "5", "8", ".", "3",
    ".", ".", ".", ".", ".", ".", ".", ".", ".",
    "7", ".", "8", "9", ".", "6", "1", "4", "5",
    "4", ".", ".", ".", ".", ".", "9", "7", ".",
    ".", ".", "9", "4", ".", "1", ".", "3", "8"];
const game1 = [
    "6", ".", "1", ".", ".", ".", ".", "8", "9",
    ".", ".", ".", "1", "3", "9", "7", ".", "6",
    ".", ".", ".", ".", ".", ".", ".", ".", ".",
    "2", "8", ".", "3", ".", ".", ".", "6", "1",
    ".", "6", ".", ".", "1", "5", "8", ".", "3",
    ".", ".", ".", ".", ".", ".", ".", ".", ".",
    "7", ".", "8", "9", ".", "6", "1", "4", "5",
    "4", ".", ".", ".", ".", ".", ".", "7", ".",
    ".", ".", "9", "4", ".", "1", ".", "3", "8"];
const game2 = [
    "5", "3", ".", ".", "7", ".", ".", ".", ".",
    "6", ".", ".", "1", "9", "5", ".", ".", ".",
    ".", "9", ".", ".", ".", ".", ".", "6", ".",
    "8", ".", ".", ".", "6", ".", ".", ".", ".",
    "4", ".", ".", ".", ".", "3", ".", ".", "1",
    "7", ".", ".", ".", "2", ".", ".", "5", ".",
    ".", "6", ".", ".", ".", ".", "2", "8", ".",
    ".", ".", ".", "4", ".", "9", ".", ".", ".",
    ".", ".", ".", ".", "8", ".", ",", "7", "."];

const allPossibleNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const puzzleContainer = document.querySelector('#puzzle-container');
const solveBtn = document.querySelector('#solve-btn');
const startGame1 = document.querySelector('#start-game-1-btn');

const preGivenNumbers = [];
var insolvableInputs = [];
const squaresCount = 81;
var emptyInputs = 81;
var lastCheck = 81;
var solved = false;

const creatBord = () => {
    var c1 = 1, c2 = 2, c3 = 3, c4 = 4, c5 = 5, c6 = 6, c7 = 7, c8 = 8, c9 = 9;
    for (let i = 1; i <= squaresCount; i++) {
        const inputElement = document.createElement('input');
        inputElement.setAttribute('type', 'text');
        // inputElement.readOnly = true;

        // rows
        if (i <= 9) {
            inputElement.classList.add('row-1');
            inputElement.setAttribute('data-row', '1');
        }
        if (i > 9 && i <= 18) {
            inputElement.classList.add('row-2');
            inputElement.setAttribute('data-row', '2');
        }
        if (i > 18 && i <= 27) {
            inputElement.classList.add('row-3');
            inputElement.setAttribute('data-row', '3');
        }
        if (i > 27 && i <= 36) {
            inputElement.classList.add('row-4');
            inputElement.setAttribute('data-row', '4');
        }
        if (i > 36 && i <= 45) {
            inputElement.classList.add('row-5');
            inputElement.setAttribute('data-row', '5');
        }
        if (i > 45 && i <= 54) {
            inputElement.classList.add('row-6');
            inputElement.setAttribute('data-row', '6');
        }
        if (i > 54 && i <= 63) {
            inputElement.classList.add('row-7');
            inputElement.setAttribute('data-row', '7');
        }
        if (i > 63 && i <= 72) {
            inputElement.classList.add('row-8');
            inputElement.setAttribute('data-row', '8');
        }
        if (i > 72 && i <= 81) {
            inputElement.classList.add('row-9');
            inputElement.setAttribute('data-row', '9');
        }

        //cols
        if (i === c1) {
            inputElement.classList.add('col-1');
            inputElement.setAttribute('data-col', '1');
            c1 = i + 9;
        }
        if (i === c2) {
            inputElement.classList.add('col-2');
            inputElement.setAttribute('data-col', '2');
            c2 = i + 9;
        }
        if (i === c3) {
            inputElement.classList.add('col-3');
            inputElement.setAttribute('data-col', '3');
            c3 = i + 9;
        }
        if (i === c4) {
            inputElement.classList.add('col-4');
            inputElement.setAttribute('data-col', '4');
            c4 = i + 9;
        }
        if (i === c5) {
            inputElement.classList.add('col-5');
            inputElement.setAttribute('data-col', '5');
            c5 = i + 9;
        }
        if (i === c6) {
            inputElement.classList.add('col-6');
            inputElement.setAttribute('data-col', '6');
            c6 = i + 9;
        }
        if (i === c7) {
            inputElement.classList.add('col-7');
            inputElement.setAttribute('data-col', '7');
            c7 = i + 9;
        }
        if (i === c8) {
            inputElement.classList.add('col-8');
            inputElement.setAttribute('data-col', '8');
            c8 = i + 9;
        }
        if (i === c9) {
            inputElement.classList.add('col-9');
            inputElement.setAttribute('data-col', '9');
            c9 = i + 9;
        }

        //squares
        let ic = inputElement.classList;

        let row1to3 = (ic.contains('row-1') || ic.contains('row-2') || ic.contains('row-3'));
        let row4to6 = (ic.contains('row-4') || ic.contains('row-5') || ic.contains('row-6'));
        let row7to9 = (ic.contains('row-7') || ic.contains('row-8') || ic.contains('row-9'));

        let col1to3 = (ic.contains('col-1') || ic.contains('col-2') || ic.contains('col-3'));
        let col4to6 = (ic.contains('col-4') || ic.contains('col-5') || ic.contains('col-6'));
        let col7to9 = (ic.contains('col-7') || ic.contains('col-8') || ic.contains('col-9'));

        if (row1to3 && col1to3) {
            inputElement.setAttribute('data-square', '1');
            inputElement.classList.add('square-1');
        }
        if (row1to3 && col4to6) {
            inputElement.setAttribute('data-square', '2');
            inputElement.classList.add('square-2');
        }
        if (row1to3 && col7to9) {
            inputElement.setAttribute('data-square', '3');
            inputElement.classList.add('square-3');
        }

        if (row4to6 && col1to3) {
            inputElement.setAttribute('data-square', '4');
            inputElement.classList.add('square-4');
        }
        if (row4to6 && col4to6) {
            inputElement.setAttribute('data-square', '5');
            inputElement.classList.add('square-5');
        }
        if (row4to6 && col7to9) {
            inputElement.setAttribute('data-square', '6');
            inputElement.classList.add('square-6');
        }

        if (row7to9 && col1to3) {
            inputElement.setAttribute('data-square', '7');
            inputElement.classList.add('square-7');
        }
        if (row7to9 && col4to6) {
            inputElement.setAttribute('data-square', '8');
            inputElement.classList.add('square-8');
        }
        if (row7to9 && col7to9) {
            inputElement.setAttribute('data-square', '9');
            inputElement.classList.add('square-9');
        }


        puzzleContainer.appendChild(inputElement);
    }
};

creatBord();

const inputs = document.querySelectorAll('input');

const getValues = () => {
    inputs.forEach(input => {
        if (input.value) preGivenNumbers.push(input.value);
        else preGivenNumbers.push('.');
    });
};
const startGame = () => {
    inputs.forEach((input, i) => {
        if (+game1[i]) {
            input.value = game1[i];
            input.setAttribute('data-solved', '1');
            emptyInputs--;
            lastCheck--;
        }
    });
};

var noSolution = false;

function solveGame() {
    if (!solved) {
        inputs.forEach((input, i) => {
            if (!input.value) {
                const input_row = input.dataset.row;
                const input_col = input.dataset.col;
                const input_square = input.dataset.square;
                const excludedValues = [];

                const inputsRow = document.querySelectorAll('.row-' + input_row);
                inputsRow.forEach(input => {
                    if (input.value) excludedValues.push(input.value);
                });

                const inputsCol = document.querySelectorAll('.col-' + input_col);
                inputsCol.forEach(input => {
                    if (input.value) excludedValues.push(input.value);
                });

                const inputsSquare = document.querySelectorAll('.square-' + input_square);
                inputsSquare.forEach(input => {
                    if (input.value) excludedValues.push(input.value);
                });

                const uniqueExcludedValues = [...new Set(excludedValues)];
                const possibleNumbers = allPossibleNumbers.filter(x => !uniqueExcludedValues.includes(x));

                if (possibleNumbers.length === 1) {
                    input.value = possibleNumbers[0];
                    input.setAttribute('data-solved', '1');
                    input.style.color = "blue";
                    emptyInputs--;
                } else {
                    if (!noSolution)
                        insolvableInputs.push({square: input_square, index: i, possibleNumbers: possibleNumbers})
                }
            }
        });
        if (lastCheck === emptyInputs) {
            noSolution = true;
            checkPossibilities(insolvableInputs);
        } else {
            lastCheck = emptyInputs;
            if (!noSolution)
                insolvableInputs = [];
        }

        if (emptyInputs === 0) {
            solved = true;
        }
    } else console.log("Solved");
}

const checkPossibilities = (insolvableInputs) => {
    const insolvableInputsGroped = groupBySquare(insolvableInputs, "square");
    var mergedValues = [];
    insolvableInputsGroped.map(i => {
        i.map(p => {
            mergedValues.push(...p.possibleNumbers);
        });
        const values = getNonDuplicatedValues(mergedValues);
        i.map(input => {
            values.map(val => {
                if (input.possibleNumbers.includes(val)) {
                    inputs[input.index].value = val;
                    inputs[input.index].setAttribute('data-solved', '1');
                    inputs[input.index].style.color = "white";
                    emptyInputs--;
                }
            })
        });
        mergedValues = [];
    });
    if (lastCheck !== emptyInputs) {
        noSolution = false;
        solveGame();
    } else {
        nextSolution(insolvableInputs)
    }
};

const nextSolution = (insolvableInputs) => {
    console.log(insolvableInputs);
};

const getNonDuplicatedValues = (arr) => arr.filter((item, index) => {
    arr.splice(index, 1);
    const unique = !arr.includes(item);
    arr.splice(index, 0, item);
    return unique
});

const groupBySquare = (list, key) => {
    return list.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, []);
};

solveBtn.addEventListener('click', () => {
    solveGame();
});
startGame1.addEventListener('click', startGame);