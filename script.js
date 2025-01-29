const randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 5;
let gameOver = false;

function checkGuess() {
    if (gameOver) return;

    const guessInput = document.getElementById('guess');
    const guess = parseInt(guessInput.value);
    const messageDiv = document.getElementById('message');
    const attemptsSpan = document.getElementById('attempts');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageDiv.textContent = "Please enter a valid number between 1 and 100";
        return;
    }

    attemptsLeft--;
    attemptsSpan.textContent = attemptsLeft;

    if (guess === randomNumber) {
        handleWin();
    } else {
        if (attemptsLeft === 0) {
            handleLoss();
        } else {
            provideHint(guess);
        }
    }

    guessInput.value = '';
}

function provideHint(guess) {
    const messageDiv = document.getElementById('message');
    const difference = Math.abs(guess - randomNumber);
    let hint = '';

    if (guess > randomNumber) {
        hint = 'Too high! ';
    } else {
        hint = 'Too low! ';
    }

    if (difference > 50) {
        hint += "You're freezing cold!";
    } else if (difference > 30) {
        hint += "You're cold!";
    } else if (difference > 20) {
        hint += "You're warm!";
    } else if (difference > 10) {
        hint += "You're getting hot!";
    } else {
        hint += "You're burning hot!";
    }

    messageDiv.textContent = hint;
}

function handleWin() {
    const messageDiv = document.getElementById('message');
    const guessButton = document.querySelector('button');
    const guessInput = document.getElementById('guess');
    
    messageDiv.textContent = "Congratulations! You've won! 🎉";
    messageDiv.style.color = "rgb(7, 248, 35)";
    gameOver = true;
    guessButton.disabled = true;
    guessInput.disabled = true;
    showResult(true);
}

function handleLoss() {
    const messageDiv = document.getElementById('message');
    const guessButton = document.querySelector('button');
    const guessInput = document.getElementById('guess');
    
    messageDiv.textContent = `Game Over! The number was ${randomNumber}. 😢`;
    messageDiv.style.color = "rgb(134, 7, 7)";
    gameOver = true;
    guessButton.disabled = true;
    guessInput.disabled = true;
    showResult(false);
}

function showResult(isWin) {
    const resultContainer = document.getElementById('resultContainer');
    const resultImage = document.getElementById('resultImage');
    resultContainer.style.display = 'block';
    
    // Set GIF source based on win/lose state
    resultImage.src = isWin ? 'win.gif' : 'lose.gif';
    resultImage.style.border = isWin ? '3px solid #4CAF50' : '3px solid #ff4444';
}

// Add keyboard event listener for better user experience
document.getElementById('guess').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !gameOver) {
        checkGuess();
    }
});