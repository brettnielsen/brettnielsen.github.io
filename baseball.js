let numOfStrikes = 0;
let numOfBalls = 0;
let numOfOuts = 0;
let numOfRuns = 0;
let firstBase = false;
let secondBase = false;
let thirdBase = false;

function newGame() {
    let strikes = document.getElementById('strike');
    let balls = document.getElementById('ball');
    let frst = document.getElementById('firstBase');
    let scnd = document.getElementById('secondBase');
    let thrd = document.getElementById('thirdBase');
    let outs = document.getElementById('outs');
    let runs = document.getElementById('runs');
    let results = document.getElementById('results');
    results.innerText = "NEW GAME";
    numOfStrikes = 0;
    numOfBalls = 0;
    numOfOuts = 0;
    numOfRuns = 0;
    firstBase = false;
    secondBase = false;
    thirdBase = false;
    balls.innerText = numOfBalls.toString();
    strikes.innerText = numOfStrikes.toString();
    outs.innerText = numOfOuts.toString();
    frst.innerText = '';
    scnd.innerText = '';
    thrd.innerText = '';
    runs.innerText = numOfRuns.toString();
}

function newBatter() {
    let strikes = document.getElementById('strike');
    let balls = document.getElementById('ball');
    numOfStrikes = 0;
    numOfBalls = 0;
    balls.innerText = numOfBalls.toString();
    strikes.innerText = numOfStrikes.toString();
}

function pitchLogic() {
    var results = document.getElementById('results');
    results.innerText = ".";
    var pitchButton = document.getElementById('pitchButton');
    var newGameButton = document.getElementById('newGameButton');

    pitchButton.disabled = true;
    pitchButton.innerText = "Pitching...";
    newGameButton.disabled = true;

    setTimeout(function() {
        results.innerText = '.';
        setTimeout(function() {
            results.innerText += '.';
            setTimeout(function() {
                results.innerText += '.';
                setTimeout(function() {
                    if(ballOrStrike()) { //true = Strike
                        if(hitOrMiss()) { //true = Hit
                            results.innerText = "HIT.";
                            moveBases();
                            newBatter();
                        }
                        else { //false = Miss
                            results.innerText = "STRIKE";
                            numOfStrikes++;
                            checkAndUpdateCount(true);
                        }
                    }
                    else { //false = Ball
                        results.innerText = "BALL";
                        numOfBalls++;
                        checkAndUpdateCount(false);
                    }
                    pitchButton.disabled = false;
                    pitchButton.innerText = "Pitch";
                    newGameButton.disabled = false;
                }, 100);
            }, 100);
        }, 100);
    }, 100);

}

function ballOrStrike() { // 50/50 ball strike
    let random = Math.random();
    return random > .5;
}

function hitOrMiss() { // 20% chance of hit when it is a strike
    let random = Math.random();
    console.log(random);
    return random > .8;
}

function checkAndUpdateCount(isAStrike) {
    let ball = document.getElementById('ball');
    let strike = document.getElementById('strike');
    let results = document.getElementById('results');

    if(isAStrike) {
        strike.innerText = numOfStrikes.toString();
    }
    else {
        ball.innerText = numOfBalls.toString();
    }

    if(numOfStrikes == 3) {
        newBatter();
        results.innerText = "STRIKE. You struck out.";
        numOfOuts++;
        addOuts();
    }

    if(numOfBalls == 4) {
        newBatter();
        results.innerText = "BALL. You Walk.";
        moveBases();
    }
}

function addOuts() {
    let outs = document.getElementById('outs');
    outs.innerText = numOfOuts.toString();
    if(numOfOuts == 3) {
        var results = document.getElementById('results');
        results.innerText = "3 Outs. New Game";
        newGame();
    }
}

function displayBases() {
    let frst = document.getElementById('firstBase');
    let scnd = document.getElementById('secondBase');
    let thrd = document.getElementById('thirdBase');

    if(firstBase) {
        frst.innerText = 'Runner on First';
    }

    if(secondBase) {
        scnd.innerText = 'Runner on Second';
    }

    if(thirdBase) {
        thrd.innerText = 'Runner on Third';
    }
}

function moveBases() {
    if(firstBase) {
        if(secondBase) {
            if(thirdBase) {
                let runs = document.getElementById('runs');
                let results = document.getElementById('results');
                numOfRuns++;
                results.innerText += " Score. +1!";
                runs.innerText = numOfRuns.toString();
            }
            else {
                thirdBase = true;
                displayBases();
            }
        }
        else {
            secondBase = true;
            displayBases();
        }
    }
    else {
        firstBase = true;
        displayBases();
    }
}