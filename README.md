# Missile Command - Zone Defense

A modern, feature-rich reimagining of the classic arcade game Missile Command, built with React, TypeScript, and HTML5 Canvas.

## 🎮 Game Description

Defend your cities from relentless missile attacks across 5 distinct zones with increasing difficulty. Manage your economy, purchase upgrades, and deploy special weapons to survive the onslaught. Face off against powerful bosses every 5 levels and prestige to gain permanent bonuses.

## ✨ Features

- **Zone Progression System**: Battle through 5 unique zones (Green Valley, Desert Outpost, Arctic Base, Volcanic Fortress, Space Station), each with distinct visual themes and hazards.
- **Dynamic Hazards**: Encounter heat-seeking missiles, bombers, blizzards, decoy missiles, asteroids, and EMP enemies.
- **Economy & Upgrades**: Earn credits by destroying missiles and building passive income structures (Solar Farms, Scrap Yards, Orbital Mines). Purchase upgrades for blast radius, missile speed, ammo capacity, and more.
- **Special Weapons**: Unlock and deploy powerful special weapons:
  - **Laser Beam**: Instantly destroys everything in its path.
  - **Missile Swarm**: Fires multiple missiles in a spread pattern.
  - **Area Mine**: Proximity mines that decimate groups of enemies.
- **Boss Battles**: Challenge unique bosses (Mothership, Fortress, Swarm Queen) with special attack patterns every 5 levels.
- **Orbital Command (Prestige System)**: Reset your run to earn Command Credits for permanent orbital upgrades across Offense, Defense, and Economy wings.
- **Achievements**: Unlock achievements for completing challenges.
- **Save/Load System**: Export and import your game progress using save codes.
- **Auto-Play Mode**: Unlockable AI assistant (Hint: Konami Code).

## 🛠️ Technologies Used

- **React 19**: UI and game state management.
- **Vite**: Fast build tool and development server.
- **vite-plugin-singlefile**: Bundles the game into a single HTML file for easy distribution.
- **Tailwind CSS 4**: Modern styling for UI components.
- **TypeScript**: Type-safe code for game logic.
- **HTML5 Canvas**: High-performance rendering for game graphics.
- **Bun**: Fast JavaScript runtime used for running tests.

## 🚀 How to Run

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/missile-command-zone-defense.git
    cd missile-command-zone-defense
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

4.  **Run tests**:
    ```bash
    bun test
    ```

5.  **Build for production**:
    ```bash
    npm run build
    ```

## 🕹️ Controls

- **Mouse Movement**: Aim crosshair.
- **Left Click**: Fire counter-missile at cursor location.
- **Number Keys (1, 2, 3)**: Select Special Weapon (Laser, Swarm, Mine).
- **0 / Esc**: Deselect Special Weapon.
- **C**: Cancel Auto-Play Mode.
- **Konami Code**: Activate Auto-Play Mode (↑ ↑ ↓ ↓ ← → ← → B A).

## 💾 Save Codes

Use these codes to jump start your game. Click on `[SAVE / LOAD]` in the bottom left corner and paste the code.

**Level 1 Head Start (10,000 Credits)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJjcmVkaXRzIjoxMDAwMCwic2NvcmUiOjAsImNwcyI6MCwiYnVpbGRpbmdzIjp7InNvbGFyX2Zhcm0iOjAsInNjcmFwX3lhcmQiOjAsIm11bml0aW9uc19mYWN0b3J5IjowLCJvcmJpdGFsX21pbmUiOjAsImRlZmVuc2VfY29udHJhY3QiOjAsImFpX2NvcmUiOjB9LCJsZXZlbCI6MSwiY2l0aWVzIjpbeyJ4IjoxMjAsImhwIjoxLCJtYXhIcCI6MSwiYWxpdmUiOnRydWV9LHsieCI6MjAwLCJocCI6MSwibWF4SHAiOjEsImFsaXZlIjp0cnVlfSx7IngiOjI4MCwiaHAiOjEsIm1heEhwIjoxLCJhbGl2ZSI6dHJ1ZX0seyJ4Ijo2MDAsImhwIjoxLCJtYXhIcCI6MSwiYWxpdmUiOnRydWV9LHsieCI6NjgwLCJocCI6MSwibWF4SHAiOjEsImFsaXZlIjp0cnVlfSx7IngiOjc2MCwiaHAiOjEsIm1heEhwIjoxLCJhbGl2ZSI6dHJ1ZX1dLCJiYXR0ZXJpZXMiOlt7IngiOjQwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6NDgwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6OTIwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9XSwiaW5jb21pbmdNaXNzaWxlcyI6W10sImNvdW50ZXJNaXNzaWxlcyI6W10sImV4cGxvc2lvbnMiOltdLCJwYXJ0aWNsZXMiOltdLCJib21iZXJzIjpbXSwiYXN0ZXJvaWRzIjpbXSwiZ2FtZU92ZXIiOmZhbHNlLCJwaGFzZSI6InNob3AiLCJsZXZlbENvbXBsZXRlIjpmYWxzZSwibGV2ZWxUcmFuc2l0aW9uVGltZXIiOjAsIm1pc3NpbGVTcGF3blRpbWVyIjowLCJtaXNzaWxlc1NwYXduZWRUaGlzTGV2ZWwiOjAsInRvdGFsTWlzc2lsZXNUaGlzTGV2ZWwiOjEwLCJjdXJzb3JYIjo0ODAsImN1cnNvclkiOjMyMCwic3RhcnMiOltdLCJzY3JlZW5TaGFrZSI6MCwiYm9udXNUZXh0IjpbXSwidXBncmFkZXMiOnsiYmxhc3RSYWRpdXMiOjAsIm1pc3NpbGVTcGVlZCI6MCwiZXh0cmFBbW1vIjowLCJjaGFpblJlYWN0aW9uIjowLCJhcm1vclBsYXRpbmciOjAsIm11bHRpU2hvdCI6MCwiZW1wQnVyc3QiOjAsImx1Y2t5U3RyaWtlIjowLCJhdXRvVHVycmV0IjowLCJzaGllbGRHZW5lcmF0b3IiOjAsImxhc2VyV2VhcG9uIjowLCJzd2FybVdlYXBvbiI6MCwibWluZVdlYXBvbiI6MH0sInNob3BIb3ZlciI6LTEsImF1dG9UdXJyZXRUaW1lciI6MCwic2hpZWxkSGl0cyI6WzAsMCwwLDAsMCwwXSwiZW1wQWN0aXZlIjowLCJ0b3RhbFNwZW50IjowLCJibGl6emFyZEFscGhhIjowLCJibGl6emFyZFBhcnRpY2xlcyI6W10sImVydXB0aW9uVGltZXIiOjAsImVydXB0aW9uQWN0aXZlIjowLCJhc3Rlcm9pZFNwYXduVGltZXIiOjAsImJvbWJlclNwYXduVGltZXIiOjAsInpvbmVJbnRyb1RpbWVyIjowLCJwcmV2aW91c1pvbmVJZCI6MCwiaGlnaFNjb3JlIjowLCJhdXRvTW9kZSI6ZmFsc2UsImJvc3MiOm51bGwsImJvc3NEZWZlYXRlZCI6ZmFsc2UsImlzQm9zc0xldmVsIjpmYWxzZSwic3BlY2lhbFdlYXBvbnMiOltdLCJzZWxlY3RlZFdlYXBvbiI6LTEsIm1pbmVzIjpbXSwibGFzZXJCZWFtcyI6W10sImNvbWJvQ291bnQiOjAsImNvbWJvVGltZXIiOjAsImNvbWJvTXVsdGlwbGllciI6MSwibWF4Q29tYm8iOjAsInJ1bk1pc3NpbGVzRGVzdHJveWVkIjowLCJydW5Cb3NzZXNEZWZlYXRlZCI6MCwiYWNoaWV2ZW1lbnRUb2FzdHMiOltdLCJ3ZWFwb25zVXNlZFRoaXNMZXZlbCI6W119fQ==
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJjcmVkaXRzIjoxMDAwMCwic2NvcmUiOjAsImNwcyI6MCwiYnVpbGRpbmdzIjp7InNvbGFyX2Zhcm0iOjAsInNjcmFwX3lhcmQiOjAsIm11bml0aW9uc19mYWN0b3J5IjowLCJvcmJpdGFsX21pbmUiOjAsImRlZmVuc2VfY29udHJhY3QiOjAsImFpX2NvcmUiOjB9LCJsZXZlbCI6NSwiY2l0aWVzIjpbeyJ4IjoxMjAsImhwIjoxLCJtYXhIcCI6MSwiYWxpdmUiOnRydWV9LHsieCI6MjAwLCJocCI6MSwibWF4SHAiOjEsImFsaXZlIjp0cnVlfSx7IngiOjI4MCwiaHAiOjEsIm1heEhwIjoxLCJhbGl2ZSI6dHJ1ZX0seyJ4Ijo2MDAsImhwIjoxLCJtYXhIcCI6MSwiYWxpdmUiOnRydWV9LHsieCI6NjgwLCJocCI6MSwibWF4SHAiOjEsImFsaXZlIjp0cnVlfSx7IngiOjc2MCwiaHAiOjEsIm1heEhwIjoxLCJhbGl2ZSI6dHJ1ZX1dLCJiYXR0ZXJpZXMiOlt7IngiOjQwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6NDgwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6OTIwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9XSwiaW5jb21pbmdNaXNzaWxlcyI6W10sImNvdW50ZXJNaXNzaWxlcyI6W10sImV4cGxvc2lvbnMiOltdLCJwYXJ0aWNsZXMiOltdLCJib21iZXJzIjpbXSwiYXN0ZXJvaWRzIjpbXSwiZ2FtZU92ZXIiOmZhbHNlLCJwaGFzZSI6InBsYXlpbmciLCJsZXZlbENvbXBsZXRlIjpmYWxzZSwibGV2ZWxUcmFuc2l0aW9uVGltZXIiOjAsIm1pc3NpbGVTcGF3blRpbWVyIjowLCJtaXNzaWxlc1NwYXduZWRUaGlzTGV2ZWwiOjAsInRvdGFsTWlzc2lsZXNUaGlzTGV2ZWwiOjIwLCJjdXJzb3JYIjo0ODAsImN1cnNvclkiOjMyMCwic3RhcnMiOltdLCJzY3JlZW5TaGFrZSI6MCwiYm9udXNUZXh0IjpbXSwidXBncmFkZXMiOnsiYmxhc3RSYWRpdXMiOjAsIm1pc3NpbGVTcGVlZCI6MCwiZXh0cmFBbW1vIjowLCJjaGFpblJlYWN0aW9uIjowLCJhcm1vclBsYXRpbmciOjAsIm11bHRpU2hvdCI6MCwiZW1wQnVyc3QiOjAsImx1Y2t5U3RyaWtlIjowLCJhdXRvVHVycmV0IjowLCJzaGllbGRHZW5lcmF0b3IiOjAsImxhc2VyV2VhcG9uIjozLCJzd2FybVdlYXBvbiI6MywibWluZVdlYXBvbiI6M30sInNob3BIb3ZlciI6LTEsImF1dG9UdXJyZXRUaW1lciI6MCwic2hpZWxkSGl0cyI6WzAsMCwwLDAsMCwwXSwiZW1wQWN0aXZlIjowLCJ0b3RhbFNwZW50IjowLCJibGl6emFyZEFscGhhIjowLCJibGl6emFyZFBhcnRpY2xlcyI6W10sImVydXB0aW9uVGltZXIiOjAsImVydXB0aW9uQWN0aXZlIjowLCJhc3Rlcm9pZFNwYXduVGltZXIiOjAsImJvbWJlclNwYXduVGltZXIiOjAsInpvbmVJbnRyb1RpbWVyIjowLCJwcmV2aW91c1pvbmVJZCI6MCwiaGlnaFNjb3JlIjowLCJhdXRvTW9kZSI6ZmFsc2UsImJvc3MiOm51bGwsImJvc3NEZWZlYXRlZCI6ZmFsc2UsImlzQm9zc0xldmVsIjp0cnVlLCJzcGVjaWFsV2VhcG9ucyI6W3sidHlwZSI6Imxhc2VyIiwiY2hhcmdlcyI6MywibWF4Q2hhcmdlcyI6MywiY29vbGRvd25UaW1lciI6MH0seyJ0eXBlIjoic3dhcm0iLCJjaGFyZ2VzIjo2LCJtYXhDaGFyZ2VzIjo2LCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJtaW5lIiwiY2hhcmdlcyI6OSwibWF4Q2hhcmdlcyI6OSwiY29vbGRvd25UaW1lciI6MH1dLCJzZWxlY3RlZFdlYXBvbiI6LTEsIm1pbmVzIjpbXSwibGFzZXJCZWFtcyI6W10sImNvbWJvQ291bnQiOjAsImNvbWJvVGltZXIiOjAsImNvbWJvTXVsdGlwbGllciI6MSwibWF4Q29tYm8iOjAsInJ1bk1pc3NpbGVzRGVzdHJveWVkIjowLCJydW5Cb3NzZXNEZWZlYXRlZCI6MCwiYWNoaWV2ZW1lbnRUb2FzdHMiOltdLCJ3ZWFwb25zVXNlZFRoaXNMZXZlbCI6W119fQ==
```

## 📝 License

This project is open source.
