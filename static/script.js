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
const modeToggle = document.getElementById('mode-toggle');
const flashcardMode = document.getElementById('flashcard-mode');
const notesMode = document.getElementById('notes-mode');
const notesContent = document.getElementById('notes-content');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const closeSidebar = document.getElementById('close-sidebar');
const sidebarNav = document.getElementById('sidebar-nav');
const overlay = document.getElementById('overlay');

// State
let cards = [];
let filteredCards = [];
let currentIndex = 0;
let isFlipped = false;
let isNotesMode = false;
let notesData = '';

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

// --- Notes Features ---

let noteSections = [];
const prevNoteButton = document.getElementById('prev-note-btn');
const nextNoteButton = document.getElementById('next-note-btn');
const notesControls = document.querySelector('.notes-controls');
let currentNoteIndex = 0;

async function loadNotes() {
    try {
        const response = await fetch('notes.md');
        if (!response.ok) throw new Error('Failed to load notes');
        notesData = await response.text();
        renderNotes(notesData);
    } catch (error) {
        console.error('Error loading notes:', error);
        notesContent.innerHTML = '<p>Error loading notes. Please make sure "notes.md" exists.</p>';
    }
}

function renderNotes(markdown) {
    // Parse markdown using marked.js
    const htmlContent = marked.parse(markdown);

    // Create a temporary container to manipulate the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    notesContent.innerHTML = '';
    noteSections = [];

    // Split content by H1 tags
    const children = Array.from(tempDiv.children);
    let currentSection = null;

    // Handle case where there are no H1s (create one default section)
    if (children.length > 0 && children[0].tagName !== 'H1') {
        currentSection = createSectionElement(0);
        notesContent.appendChild(currentSection);
        noteSections.push({
            element: currentSection,
            title: 'Introduction'
        });
    }

    children.forEach(child => {
        if (child.tagName === 'H1') {
            const index = noteSections.length;
            currentSection = createSectionElement(index);
            notesContent.appendChild(currentSection);
            noteSections.push({
                element: currentSection,
                title: child.textContent
            });
        }

        if (currentSection) {
            currentSection.appendChild(child.cloneNode(true));
        }
    });

    if (noteSections.length > 0) {
        generateSidebarNav();
        notesControls.style.display = 'flex';
        showNoteSection(0);
    } else {
        notesContent.innerHTML = '<p class="placeholder-text">No content found in notes.md</p>';
        notesControls.style.display = 'none';
    }
}

function createSectionElement(index) {
    const div = document.createElement('div');
    div.className = 'note-section';
    div.id = `note-section-${index}`;
    div.style.display = 'none';
    return div;
}

function generateSidebarNav() {
    sidebarNav.innerHTML = '';

    noteSections.forEach((section, index) => {
        // Container for the section link and its subsections
        const navGroup = document.createElement('div');

        // Main H1 Link
        const navItem = document.createElement('div'); // Changed to div to contain valid children if needed, but styling allows 'a' behavior
        navItem.className = 'nav-item';
        navItem.textContent = section.title;
        navItem.onclick = () => {
            showNoteSection(index);
            // Optionally close sidebar on mobile if it's a leaf node interaction, 
            // but for sections with children, user might want to see children.
            // For now, consistent behavior: jump to section.
            closeSidebarMenu();
        };
        navGroup.appendChild(navItem);

        // Find H2s within this section
        const subsections = section.element.querySelectorAll('h2');
        if (subsections.length > 0) {
            const subList = document.createElement('div');
            subList.className = 'nav-sub-list';

            subsections.forEach(h2 => {
                // Ensure H2 has an ID for scrolling
                if (!h2.id) {
                    h2.id = `subsection-${h2.textContent.replace(/\s+/g, '-').toLowerCase()}-${Math.random().toString(36).substr(2, 5)}`;
                }

                const subItem = document.createElement('a');
                subItem.className = 'nav-sub-item';
                subItem.textContent = h2.textContent;
                subItem.onclick = (e) => {
                    e.stopPropagation(); // Prevent triggering parent click if nested
                    showNoteSection(index); // Ensure parent section is visible
                    h2.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    closeSidebarMenu();
                };
                subList.appendChild(subItem);
            });
            navGroup.appendChild(subList);
        }

        sidebarNav.appendChild(navGroup);
    });
}

function showNoteSection(index) {
    if (index < 0 || index >= noteSections.length) return;

    currentNoteIndex = index;

    // Hide all sections
    noteSections.forEach(section => {
        section.element.style.display = 'none';
    });

    // Show current section
    noteSections[currentNoteIndex].element.style.display = 'block';

    // Update active state in sidebar
    document.querySelectorAll('.nav-item').forEach((item, i) => {
        if (i === currentNoteIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update buttons
    prevNoteButton.disabled = currentNoteIndex === 0;
    nextNoteButton.disabled = currentNoteIndex === noteSections.length - 1;

    // Scroll to top
    notesContent.scrollTop = 0;
}

function nextNoteSection() {
    if (currentNoteIndex < noteSections.length - 1) {
        showNoteSection(currentNoteIndex + 1);
    }
}

function prevNoteSection() {
    if (currentNoteIndex > 0) {
        showNoteSection(currentNoteIndex - 1);
    }
}

function scrollToSection(id) {
    // Deprecated in favor of showNoteSection
    // Keeping for reference if needed, but not used in new logic
}

function toggleMode() {
    isNotesMode = !isNotesMode;

    if (isNotesMode) {
        flashcardMode.style.display = 'none';
        notesMode.style.display = 'block';
        modeToggle.textContent = 'Switch to Flashcards';
        document.body.classList.add('notes-active');

        if (!notesData) {
            loadNotes();
        } else {
            // If notes are already loaded, ensure controls are visible if there are sections
            if (noteSections.length > 0) {
                notesControls.style.display = 'flex';
                showNoteSection(currentNoteIndex); // Re-display current section
            }
        }
    } else {
        flashcardMode.style.display = 'block';
        notesMode.style.display = 'none';
        modeToggle.textContent = 'Switch to Notes';
        document.body.classList.remove('notes-active');
        notesControls.style.display = 'none'; // Hide notes controls when switching back to flashcards
    }
}

function toggleSidebarMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebarMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (isNotesMode) {
        if (e.key === 'ArrowLeft') {
            prevNoteSection();
        } else if (e.key === 'ArrowRight') {
            nextNoteSection();
        }
        return;
    }

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

// New Event Listeners
modeToggle.addEventListener('click', toggleMode);
sidebarToggle.addEventListener('click', toggleSidebarMenu);
closeSidebar.addEventListener('click', closeSidebarMenu);
overlay.addEventListener('click', closeSidebarMenu);

prevNoteButton.addEventListener('click', prevNoteSection);
nextNoteButton.addEventListener('click', nextNoteSection);

// Initialize
initTheme();
loadCards();
