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
eyJ2IjoxLCJzdGF0ZSI6eyJjcmVkaXRzIjoxMDAwMCwic2NvcmUiOjAsImNwcyI6MCwiYnVpbGRpbmdzIjp7InNvbGFyX2Zhcm0iOjAsInNjcmFwX3lhcmQiOjAsIm11bml0aW9uc19mYWN0b3J5IjowLCJvcmJpdGFsX21pbmUiOjAsImRlZmVuc2VfY29udHJhY3QiOjAsImFpX2NvcmUiOjB9LCJsZXZlbCI6MSwiY2l0aWVzIjpbeyJ4IjoxMjAsImFsaXZlIjp0cnVlLCJocCI6MSwibWF4SHAiOjF9LHsieCI6MjAwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEsIm1heEhwIjoxfSx7IngiOjI4MCwiYWxpdmUiOnRydWUsImhwIjoxLCJtYXhIcCI6MX0seyJ4Ijo2MDAsImFsaXZlIjp0cnVlLCJocCI6MSwibWF4SHAiOjF9LHsieCI6NjgwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEsIm1heEhwIjoxfSx7IngiOjc2MCwiYWxpdmUiOnRydWUsImhwIjoxLCJtYXhIcCI6MX1dLCJiYXR0ZXJpZXMiOlt7IngiOjQwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6NDgwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6OTIwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9XSwiaW5jb21pbmdNaXNzaWxlcyI6W10sImNvdW50ZXJNaXNzaWxlcyI6W10sImV4cGxvc2lvbnMiOltdLCJwYXJ0aWNsZXMiOltdLCJib21iZXJzIjpbXSwiYXN0ZXJvaWRzIjpbXSwiZ2FtZU92ZXIiOmZhbHNlLCJwaGFzZSI6InNob3AiLCJsZXZlbENvbXBsZXRlIjpmYWxzZSwibGV2ZWxUcmFuc2l0aW9uVGltZXIiOjAsIm1pc3NpbGVTcGF3blRpbWVyIjo2MCwibWlzc2lsZXNTcGF3bmVkVGhpc0xldmVsIjowLCJ0b3RhbE1pc3NpbGVzVGhpc0xldmVsIjoxMCwiY3Vyc29yWCI6NDgwLCJjdXJzb3JZIjozMjAsInN0YXJzIjpbXSwic2NyZWVuU2hha2UiOjAsImJvbnVzVGV4dCI6W10sInVwZ3JhZGVzIjp7ImJsYXN0UmFkaXVzIjowLCJtaXNzaWxlU3BlZWQiOjAsImV4dHJhQW1tbyI6MCwiY2hhaW5SZWFjdGlvbiI6MCwiYXJtb3JQbGF0aW5nIjowLCJtdWx0aVNob3QiOjAsImVtcEJ1cnN0IjowLCJsdWNreVN0cmlrZSI6MCwiYXV0b1R1cnJldCI6MCwic2hpZWxkR2VuZXJhdG9yIjowLCJsYXNlcldlYXBvbiI6MCwic3dhcm1XZWFwb24iOjAsIm1pbmVXZWFwb24iOjB9LCJzaG9wSG92ZXIiOi0xLCJhdXRvVHVycmV0VGltZXIiOjAsInNoaWVsZEhpdHMiOlswLDAsMCwwLDAsMF0sImVtcEFjdGl2ZSI6MCwidG90YWxTcGVudCI6MCwiYmxpenphcmRBbHBoYSI6MCwiYmxpenphcmRQYXJ0aWNsZXMiOltdLCJlcnVwdGlvblRpbWVyIjowLCJlcnVwdGlvbkFjdGl2ZSI6MCwiYXN0ZXJvaWRTcGF3blRpbWVyIjowLCJib21iZXJTcGF3blRpbWVyIjowLCJ6b25lSW50cm9UaW1lciI6MCwicHJldmlvdXNab25lSWQiOjAsImhpZ2hTY29yZSI6MCwiYXV0b01vZGUiOmZhbHNlLCJib3NzIjpudWxsLCJib3NzRGVmZWF0ZWQiOmZhbHNlLCJpc0Jvc3NMZXZlbCI6ZmFsc2UsInNwZWNpYWxXZWFwb25zIjpbeyJ0eXBlIjoibGFzZXIiLCJjaGFyZ2VzIjowLCJtYXhDaGFyZ2VzIjowLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJzd2FybSIsImNoYXJnZXMiOjAsIm1heENoYXJnZXMiOjAsImNvb2xkb3duVGltZXIiOjB9LHsidHlwZSI6Im1pbmUiLCJjaGFyZ2VzIjowLCJtYXhDaGFyZ2VzIjowLCJjb29sZG93blRpbWVyIjowfV0sInNlbGVjdGVkV2VhcG9uIjotMSwibWluZXMiOltdLCJsYXNlckJlYW1zIjpbXSwiY29tYm9Db3VudCI6MCwiY29tYm9UaW1lciI6MCwiY29tYm9NdWx0aXBsaWVyIjoxLCJtYXhDb21ibyI6MCwicnVuTWlzc2lsZXNEZXN0cm95ZWQiOjAsInJ1bkJvc3Nlc0RlZmVhdGVkIjowLCJhY2hpZXZlbWVudFRvYXN0cyI6W10sIndlYXBvbnNVc2VkVGhpc0xldmVsIjpbXX19
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJjcmVkaXRzIjoxMDAwMCwic2NvcmUiOjEwMDAwLCJjcHMiOjAsImJ1aWxkaW5ncyI6eyJzb2xhcl9mYXJtIjowLCJzY3JhcF95YXJkIjowLCJtdW5pdGlvbnNfZmFjdG9yeSI6MCwib3JiaXRhbF9taW5lIjowLCJkZWZlbnNlX2NvbnRyYWN0IjowLCJhaV9jb3JlIjowfSwibGV2ZWwiOjUsImNpdGllcyI6W3sieCI6MTIwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEsIm1heEhwIjoxfSx7IngiOjIwMCwiYWxpdmUiOnRydWUsImhwIjoxLCJtYXhIcCI6MX0seyJ4IjoyODAsImFsaXZlIjp0cnVlLCJocCI6MSwibWF4SHAiOjF9LHsieCI6NjAwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEsIm1heEhwIjoxfSx7IngiOjY4MCwiYWxpdmUiOnRydWUsImhwIjoxLCJtYXhIcCI6MX0seyJ4Ijo3NjAsImFsaXZlIjp0cnVlLCJocCI6MSwibWF4SHAiOjF9XSwiYmF0dGVyaWVzIjpbeyJ4Ijo0MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjQ4MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjkyMCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfV0sImluY29taW5nTWlzc2lsZXMiOltdLCJjb3VudGVyTWlzc2lsZXMiOltdLCJleHBsb3Npb25zIjpbXSwicGFydGljbGVzIjpbXSwiYm9tYmVycyI6W10sImFzdGVyb2lkcyI6W10sImdhbWVPdmVyIjpmYWxzZSwicGhhc2UiOiJwbGF5aW5nIiwibGV2ZWxDb21wbGV0ZSI6ZmFsc2UsImxldmVsVHJhbnNpdGlvblRpbWVyIjowLCJtaXNzaWxlU3Bhd25UaW1lciI6NjAsIm1pc3NpbGVzU3Bhd25lZFRoaXNMZXZlbCI6MCwidG90YWxNaXNzaWxlc1RoaXNMZXZlbCI6MjAsImN1cnNvclgiOjQ4MCwiY3Vyc29yWSI6MzIwLCJzdGFycyI6W10sInNjcmVlblNoYWtlIjowLCJib251c1RleHQiOltdLCJ1cGdyYWRlcyI6eyJibGFzdFJhZGl1cyI6MCwibWlzc2lsZVNwZWVkIjowLCJleHRyYUFtbW8iOjAsImNoYWluUmVhY3Rpb24iOjAsImFybW9yUGxhdGluZyI6MCwibXVsdGlTaG90IjowLCJlbXBCdXJzdCI6MCwibHVja3lTdHJpa2UiOjAsImF1dG9UdXJyZXQiOjAsInNoaWVsZEdlbmVyYXRvciI6MCwibGFzZXJXZWFwb24iOjMsInN3YXJtV2VhcG9uIjozLCJtaW5lV2VhcG9uIjozfSwic2hvcEhvdmVyIjotMSwiYXV0b1R1cnJldFRpbWVyIjowLCJzaGllbGRIaXRzIjpbMCwwLDAsMCwwLDBdLCJlbXBBY3RpdmUiOjAsInRvdGFsU3BlbnQiOjAsImJsaXp6YXJkQWxwaGEiOjAsImJsaXp6YXJkUGFydGljbGVzIjpbXSwiZXJ1cHRpb25UaW1lciI6MCwiZXJ1cHRpb25BY3RpdmUiOjAsImFzdGVyb2lkU3Bhd25UaW1lciI6MCwiYm9tYmVyU3Bhd25UaW1lciI6MCwiem9uZUludHJvVGltZXIiOjAsInByZXZpb3VzWm9uZUlkIjowLCJoaWdoU2NvcmUiOjAsImF1dG9Nb2RlIjpmYWxzZSwiYm9zcyI6bnVsbCwiYm9zc0RlZmVhdGVkIjpmYWxzZSwiaXNCb3NzTGV2ZWwiOnRydWUsInNwZWNpYWxXZWFwb25zIjpbeyJ0eXBlIjoibGFzZXIiLCJjaGFyZ2VzIjozLCJtYXhDaGFyZ2VzIjozLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJzd2FybSIsImNoYXJnZXMiOjYsIm1heENoYXJnZXMiOjYsImNvb2xkb3duVGltZXIiOjB9LHsidHlwZSI6Im1pbmUiLCJjaGFyZ2VzIjo5LCJtYXhDaGFyZ2VzIjo5LCJjb29sZG93blRpbWVyIjowfV0sInNlbGVjdGVkV2VhcG9uIjotMSwibWluZXMiOltdLCJsYXNlckJlYW1zIjpbXSwiY29tYm9Db3VudCI6MCwiY29tYm9UaW1lciI6MCwiY29tYm9NdWx0aXBsaWVyIjoxLCJtYXhDb21ibyI6MCwicnVuTWlzc2lsZXNEZXN0cm95ZWQiOjAsInJ1bkJvc3Nlc0RlZmVhdGVkIjowLCJhY2hpZXZlbWVudFRvYXN0cyI6W10sIndlYXBvbnNVc2VkVGhpc0xldmVsIjpbXX19
```

## 📝 License

This project is open source.
