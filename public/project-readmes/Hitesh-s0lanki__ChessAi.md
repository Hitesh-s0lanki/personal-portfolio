# ♟️ Chess (Python + Pygame)

This is a visually interactive **Chess game** built using **Python** and **Pygame**. It supports piece movement, UI themes, drag-and-drop functionality, and more.

![Screenshot](./images/screenshot.png)

---

## 🎮 Features

- ✔️ Drag-and-drop piece movement
- ✔️ Highlight last move
- ✔️ Sound effects
- ✔️ Configurable themes and board colors
- ✔️ Organized modular structure
- 🔄 Easy to extend with AI or multiplayer support

---

## 🛠 Installation

### Requirements

- Python 3.6+
- Pygame

### Install dependencies

```bash
pip install pygame
```

---

## ▶️ Run the Game

```bash
python main.py
```

> Or use this (as shown in your terminal):

```bash
python -u "path/to/main.py"
```

---

## 💡 Controls

- Drag and drop pieces with your mouse
- All standard chess rules enforced (movement, turns)

---

## 📁 Project Structure

```
ChessAI/
├── main.py          # Main loop and Pygame setup
├── board.py         # Board setup and rendering
├── config.py        # Game configuration and constants
├── constants.py     # Dimensions, colors, and layout settings
├── game.py          # Game state controller
├── move.py          # Move handling logic
├── piece.py         # Piece object definitions
├── sound.py         # Sound effects manager
├── square.py        # Square class and logic
├── theme.py         # Theme color schemes
├── assets/          # Piece images, sounds, etc.
├── README.md        # You're reading it!
└── .gitignore       # Git ignored files
```

---

## 🔊 Sound Support

- Sound effects are enabled via `sound.py`
- Add custom sounds in the `assets/` folder and reference them in the code

---

## 🧩 Customization

You can easily change:

- Themes: edit `theme.py`
- Board color: modify `constants.py`
- Piece graphics: replace PNGs in `assets/`

---

## 🧠 Future Enhancements (Ideas)

- Add AI opponent using Minimax or Stockfish
- Implement move validation and legal check/mate detection
- Multiplayer mode (local or online)
- Move history tracking

---

## 👨‍💻 Author

Built by **Hitesh Solanki**

---

## 📄 License

This project is open source under the MIT License.

```

```
