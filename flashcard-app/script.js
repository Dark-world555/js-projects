document.addEventListener('DOMContentLoaded', () => {
    const addCardButton = document.getElementById('add-card');
    const termInput = document.getElementById('term');
    const definitionInput = document.getElementById('definition');
    const flashcardsContainer = document.getElementById('flashcards-container');
    const messageBox = document.getElementById('message-box'); // Message box to display the success message

    // Load initial flashcards from localStorage and set up the proxy
    let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

    // Create a Proxy to automatically save flashcards on any change
    flashcards = new Proxy(flashcards, {
        set(target, property, value) {
            target[property] = value;
            localStorage.setItem("flashcards", JSON.stringify(target));
            return true;
        },
        deleteProperty(target, property) {
            delete target[property];
            localStorage.setItem("flashcards", JSON.stringify(target));
            return true;
        }
    });

    // Function to show success message when a card is added
    function showSuccessMessage(message) {
        messageBox.textContent = message;
        messageBox.style.display = 'block';
        
        // Hide the message after 3 seconds
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }

    // Function to render flashcards
    function renderFlashcards() {
        flashcardsContainer.innerHTML = ''; // Clear existing cards
        flashcards.forEach(({ term, definition }) => {
            const flashcard = createFlashcardElement(term, definition);
            flashcardsContainer.appendChild(flashcard);
        });
    }

    // Function to create a flashcard element
    function createFlashcardElement(term, definition) {
        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');
        flashcard.innerHTML = `
            <div class="front">
                <h3>${term}</h3>
            </div>
            <div class="back">
                <p>${definition}</p>
            </div>
            <button class="delete-btn">Delete</button>
        `;
        return flashcard;
    }

    // Function to add a flashcard
    function addFlashcard() {
        const term = termInput.value.trim();
        const definition = definitionInput.value.trim();

        if (term && definition) {
            flashcards.push({ term, definition }); // This automatically saves to localStorage due to Proxy

            // Create the flashcard element and append it
            const flashcard = createFlashcardElement(term, definition);
            flashcard.addEventListener('click', () => {
                flashcard.classList.toggle('flip');
            });
            flashcardsContainer.appendChild(flashcard);

            // Clear the input fields
            termInput.value = '';
            definitionInput.value = '';

            // Show the success message
            showSuccessMessage('Card added successfully!');
        }
    }

    // Event listener for the add card button
    addCardButton.addEventListener('click', addFlashcard);

    // Event listener for the delete button
    flashcardsContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('delete-btn')) {
            const cardElement = e.target.parentElement;
            const term = cardElement.querySelector('.front h3').textContent;

            // Remove the flashcard from the flashcards array
            const index = flashcards.findIndex(flashcard => flashcard.term === term);
            if (index > -1) {
                flashcards.splice(index, 1); // Automatically updates localStorage due to Proxy
            }

            // Remove the card from the DOM
            cardElement.remove();
        }
    });

    // Initial render of flashcards from localStorage
    renderFlashcards();
});
