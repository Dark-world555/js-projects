const cardsArray = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
  ];
  
  let flippedCards = [];
  let matchedPairs = 0;
  let score = 0;
  let time = 0;
  let timerInterval;
  
  const gameBoard = document.getElementById('gameBoard');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');
  const resetButton = document.getElementById('resetButton');
  
  // Shuffle the card array
  function shuffleCards() {
    return cardsArray.sort(() => Math.random() - 0.5);
  }
  
  // Create a card element
  function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', cardValue);
    card.addEventListener('click', flipCard);
    return card;
  }
  
  // Flip a card and handle game logic
  function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) return;
  
    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-value');
    flippedCards.push(this);
  
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
  
  // Check if the flipped cards match
  function checkForMatch() {
    const [card1, card2] = flippedCards;
  
    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
      matchedPairs++;
      score += 4;  // Correct match = +2 points
      card1.classList.add('matched');
      card2.classList.add('matched');
      flippedCards = [];
      scoreDisplay.textContent = score;
  
      if (matchedPairs === cardsArray.length / 2) {
        clearInterval(timerInterval);
        alert(`You win! Final Score: ${score}`);
      }
    } else {
      score -= 1;  // Incorrect match = -1 point
      scoreDisplay.textContent = score;
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
        flippedCards = [];
      }, 1000);
    }
  }
  
  // Start a new game
  function startGame() {
    matchedPairs = 0;
    score = 0;
    time = 0;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = time;
    
    // Shuffle cards and display them on the board
    const shuffledCards = shuffleCards();
    gameBoard.innerHTML = '';
    shuffledCards.forEach(cardValue => {
      const card = createCard(cardValue);
      gameBoard.appendChild(card);
    });
    
    // Start the timer
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      time++;
      timerDisplay.textContent = time;
    }, 1000);
  }
  
  // Add event listener to the reset button
  resetButton.addEventListener('click', startGame);
  
  // Start the game on page load
  startGame();
  