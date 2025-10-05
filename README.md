# Shout Out - Web-Based Game

A web-based game, built with TypeScript, Svelte, and Vite. Perfect for game nights, parties, or virtual gatherings!

## 🎮 How to Play

### For Hosts

1. **Load Your Game Configuration**
   - Upload a JSON file with your questions and answers, or
   - Paste JSON directly into the text area

2. **Run the Game**
   - Share your screen with players
   - Read the question aloud
   - Players shout out answers
   - Click on each answer as it's guessed correctly
   - When the timer runs out, click "Reveal All" to show remaining answers
   - Click "Next Question" to move to the next round

3. **Scoring** (Optional)
   - Award points based on how many answers were guessed before time ran out
   - Keep track of scores manually or use a separate scoring system

## 📝 JSON Configuration Format

Your game configuration must follow this structure:

```json
{
  "timerDuration": 60,
  "questions": [
    {
      "text": "Name a popular pizza topping",
      "answers": [
        "Pepperoni",
        "Cheese",
        "Mushrooms",
        "Sausage",
        "Onions",
        "Peppers",
        "Olives",
        "Bacon",
        "Pineapple",
        "Anchovies"
      ]
    }
  ]
}
```

### Configuration Fields

- **`timerDuration`** (number, required): Time in seconds for each question
- **`questions`** (array, required): Array of question objects
  - **`text`** (string, required): The question to display
  - **`answers`** (array, required): Exactly 10 answer strings

## 📦 Sample Configurations

Check the `public/` directory for sample configuration files:

- `sample-pizza.json` - Pizza-themed questions
- `sample-animals.json` - Animal-themed questions
- `sample-movies.json` - Movie-themed questions

## 🚀 Development

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run check
```

### Project Structure

```
shout-out/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ConfigLoader.svelte  # JSON config loader
│   │   │   ├── GameBoard.svelte     # Main game interface
│   │   │   ├── Answer.svelte        # Individual answer tile
│   │   │   └── Timer.svelte         # Countdown timer
│   │   ├── stores/
│   │   │   └── gameStore.ts         # Svelte store for game state
│   │   └── types/
│   │       └── game.ts              # TypeScript type definitions
│   ├── App.svelte                   # Root component
│   └── main.ts                      # Application entry point
├── public/
│   └── sample-*.json                # Sample game configurations
└── .github/
    └── workflows/
        └── deploy.yml               # GitHub Pages deployment
```

## 🌐 Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Setup Steps

1. **Enable GitHub Pages**
   - Go to your repository Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Update Base Path** (if needed)
   - Edit `vite.config.ts` and change the base path to match your repository name:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/'
   ```

3. **Push to Main Branch**
   - The GitHub Action will automatically build and deploy your site
   - Your game will be available at: `https://yourusername.github.io/your-repo-name/`

## 🎨 Features

- ✅ Configurable timer duration
- ✅ 10 answers per question
- ✅ Click-to-reveal answers
- ✅ Visual timer with color indicators
- ✅ Reveal all remaining answers when time expires
- ✅ Multiple questions per game
- ✅ Responsive design (mobile and desktop)
- ✅ Smooth animations and transitions
- ✅ Easy JSON configuration
- ✅ No backend required - runs entirely in the browser

## 🛠️ Technology Stack

- **Framework**: Svelte 4
- **Language**: TypeScript
- **Build Tool**: Vite 5
- **Styling**: Vanilla CSS (no framework)
- **Deployment**: GitHub Pages via GitHub Actions

## 📄 License

MIT License - feel free to use this for your game nights!

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Share your custom game configurations

## 💡 Tips for Creating Great Questions

1. **Choose Clear Categories**: Make sure the question is specific enough
2. **Vary Difficulty**: Mix obvious answers with challenging ones
3. **Test Your Questions**: Try them with friends first
4. **Adjust Timer**: 60 seconds is standard, but adjust based on difficulty
5. **Theme Your Games**: Create themed sets for holidays, events, or interests

## 🎯 Game Variations

- **Team Play**: Divide into teams and alternate questions
- **Point System**: Award points based on number of answers guessed
- **Speed Round**: Reduce timer to 30 seconds for extra challenge
- **Bonus Points**: Award extra points for guessing all 10 answers

---

Enjoy your game night! 🎉
