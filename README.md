# AWS CCP CLF-C02 2026 Flashcards

A minimalistic flashcard web application to study for the AWS Certified Cloud Practitioner (CLF-C02) exam. Features 45 flashcards with category filtering and light/dark mode.

## Features

- 📚 45 flashcards covering AWS CCP exam topics
- 🎯 Category filtering (Intro, Cloud Computing, AWS Cloud Locations, Shared Responsibility)
- 🌙 Light/Dark mode toggle with localStorage persistence
- ⌨️ Keyboard navigation (← → arrows, Space/Enter to flip)
- 📱 Responsive design for desktop and mobile
- 🎨 Clean, minimalistic UI

## Live Demo

🔗 **[View Live Site](https://YOUR-USERNAME.github.io/aws-ccp-flashcards/)**

## Local Development

### Option 1: Simple HTTP Server (Recommended)
```bash
cd aws-ccp-flashcards
python3 -m http.server 8000
```
Then open http://localhost:8000

### Option 2: Open Directly
Simply open `index.html` in your browser (some features may not work due to CORS)

## Deploy to GitHub Pages

1. **Create a new repository** on GitHub (e.g., `aws-ccp-flashcards`)

2. **Push your code:**
```bash
cd aws-ccp-flashcards
git init
git add .
git commit -m "Initial commit: AWS CCP flashcard app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/aws-ccp-flashcards.git
git push -u origin main
```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Click Save

4. **Access your site** at: `https://YOUR-USERNAME.github.io/aws-ccp-flashcards/`

## Project Structure

```
aws-ccp-flashcards/
├── index.html          # Main page
├── flashcards.json     # 45 Q&A pairs organized by category
├── static/
│   ├── style.css      # Minimalistic styling with theme support
│   └── script.js      # Interactive functionality
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Adding More Flashcards

Edit `flashcards.json` and add new cards:

```json
{
  "id": 46,
  "category": "Your Category",
  "question": "Your question?",
  "answer": "Your answer"
}
```

The category dropdown will automatically update!

## Keyboard Shortcuts

- **Space** or **Enter**: Flip card
- **← Left Arrow**: Previous card
- **→ Right Arrow**: Next card
- **Click card**: Flip card

## Technologies

- Pure HTML5, CSS3, JavaScript (ES6+)
- No frameworks or dependencies
- CSS Variables for theming
- LocalStorage for theme persistence

## License

Free to use for educational purposes.

---

Good luck with your AWS CCP exam! 🚀
