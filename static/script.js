let cards = [];
let filteredCards = [];
let currentIndex = 0;
let isFlipped = false;

// DOM Elements
const cardElement = document.getElementById('flashcard');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const categorySelect = document.getElementById('category-select');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const progressElement = document.getElementById('progress');

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Fetch cards from JSON file
async function loadCards() {
    try {
        const response = await fetch('flashcards.json');
        cards = await response.json();

        // Populate category dropdown
        populateCategoryDropdown();

        // Initially show all cards
        filteredCards = [...cards];
        displayCard();
    } catch (error) {
        console.error('Error loading cards:', error);
        questionElement.textContent = 'Error loading flashcards. Please refresh the page.';
    }
}

// Populate category dropdown with unique categories
function populateCategoryDropdown() {
    const categories = [...new Set(cards.map(card => card.category))];

    // Define custom order for categories
    const categoryOrder = {
        'Intro': 1,
        'Cloud Computing': 2,
        'AWS Cloud Locations': 3,
        'Shared Responsibility': 4
    };

    // Sort categories by custom order
    categories.sort((a, b) => {
        const orderA = categoryOrder[a] || 999;
        const orderB = categoryOrder[b] || 999;
        return orderA - orderB;
    });

    // Add numbered categories to dropdown
    categories.forEach((category, index) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = `${index + 1}. ${category}`;
        categorySelect.appendChild(option);
    });
}

// Filter cards by category
function filterByCategory(category) {
    if (category === 'all') {
        filteredCards = [...cards];
    } else {
        filteredCards = cards.filter(card => card.category === category);
    }
    currentIndex = 0;
    displayCard();
}

// Display current card
function displayCard() {
    if (filteredCards.length === 0) {
        questionElement.textContent = 'No cards in this category';
        answerElement.textContent = '';
        progressElement.textContent = 'Card 0 of 0';
        prevButton.disabled = true;
        nextButton.disabled = true;
        return;
    }

    const card = filteredCards[currentIndex];
    questionElement.textContent = card.question;
    answerElement.textContent = card.answer;

    // Reset flip state
    if (isFlipped) {
        cardElement.classList.remove('flipped');
        isFlipped = false;
    }

    // Update progress
    progressElement.textContent = `Card ${currentIndex + 1} of ${filteredCards.length}`;

    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === filteredCards.length - 1;
}

// Flip card
function flipCard() {
    cardElement.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

// Navigate to previous card
function previousCard() {
    if (currentIndex > 0) {
        currentIndex--;
        displayCard();
    }
}

// Navigate to next card
function nextCard() {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        displayCard();
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousCard();
    } else if (e.key === 'ArrowRight') {
        nextCard();
    } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flipCard();
    }
});

// Event listeners
cardElement.addEventListener('click', flipCard);
prevButton.addEventListener('click', previousCard);
nextButton.addEventListener('click', nextCard);
categorySelect.addEventListener('change', (e) => {
    filterByCategory(e.target.value);
});
themeToggle.addEventListener('click', toggleTheme);

// Initialize
initTheme();
loadCards();
