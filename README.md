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
eyJ2IjoxLCJzdGF0ZSI6eyJzY29yZSI6MTAwMDAsImNyZWRpdHMiOjEwMDAwLCJjcHMiOjAsImJ1aWxkaW5ncyI6e30sImNpdGllcyI6W3sieCI6NDAsImFsaXZlIjp0cnVlLCJocCI6MTAwLCJtYXhIcCI6MTAwfSx7IngiOjE2MCwiYWxpdmUiOnRydWUsImhwIjoxMDAsIm1heEhwIjoxMDB9LHsieCI6MjgwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEwMCwibWF4SHAiOjEwMH0seyJ4Ijo2ODAsImFsaXZlIjp0cnVlLCJocCI6MTAwLCJtYXhIcCI6MTAwfSx7IngiOjgwMCwiYWxpdmUiOnRydWUsImhwIjoxMDAsIm1heEhwIjoxMDB9LHsieCI6OTIwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEwMCwibWF4SHAiOjEwMH1dLCJiYXR0ZXJpZXMiOlt7IngiOjQwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6NDgwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6OTIwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9XSwiaW5jb21pbmdNaXNzaWxlcyI6W10sImNvdW50ZXJNaXNzaWxlcyI6W10sImV4cGxvc2lvbnMiOltdLCJwYXJ0aWNsZXMiOltdLCJib21iZXJzIjpbXSwiYXN0ZXJvaWRzIjpbXSwiZ2FtZU92ZXIiOmZhbHNlLCJsZXZlbENvbXBsZXRlIjpmYWxzZSwibGV2ZWxUcmFuc2l0aW9uVGltZXIiOjAsIm1pc3NpbGVTcGF3blRpbWVyIjo2MCwibWlzc2lsZXNTcGF3bmVkVGhpc0xldmVsIjowLCJjdXJzb3JYIjo0ODAsImN1cnNvclkiOjMyMCwic3RhcnMiOltdLCJzY3JlZW5TaGFrZSI6MCwiYm9udXNUZXh0IjpbXSwic2hvcEhvdmVyIjotMSwiYXV0b1R1cnJldFRpbWVyIjowLCJzaGllbGRIaXRzIjpbMCwwLDAsMCwwLDBdLCJlbXBBY3RpdmUiOjAsInRvdGFsU3BlbnQiOjAsImJsaXp6YXJkQWxwaGEiOjAsImJsaXp6YXJkUGFydGljbGVzIjpbXSwiZXJ1cHRpb25UaW1lciI6MCwiZXJ1cHRpb25BY3RpdmUiOjAsImFzdGVyb2lkU3Bhd25UaW1lciI6MCwiYm9tYmVyU3Bhd25UaW1lciI6MCwiem9uZUludHJvVGltZXIiOjAsInByZXZpb3VzWm9uZUlkIjowLCJoaWdoU2NvcmUiOjAsImF1dG9Nb2RlIjpmYWxzZSwiYm9zcyI6bnVsbCwiYm9zc0RlZmVhdGVkIjpmYWxzZSwibWluZXMiOltdLCJsYXNlckJlYW1zIjpbXSwiY29tYm9Db3VudCI6MCwiY29tYm9UaW1lciI6MCwiY29tYm9NdWx0aXBsaWVyIjoxLCJtYXhDb21ibyI6MCwicnVuTWlzc2lsZXNEZXN0cm95ZWQiOjAsInJ1bkJvc3Nlc0RlZmVhdGVkIjowLCJhY2hpZXZlbWVudFRvYXN0cyI6W10sIndlYXBvbnNVc2VkVGhpc0xldmVsIjpbXSwibGV2ZWwiOjEsInBoYXNlIjoic2hvcCIsInRvdGFsTWlzc2lsZXNUaGlzTGV2ZWwiOjEwLCJ1cGdyYWRlcyI6eyJibGFzdFJhZGl1cyI6MCwibWlzc2lsZVNwZWVkIjowLCJleHRyYUFtbW8iOjAsImNoYWluUmVhY3Rpb24iOjAsImFybW9yUGxhdGluZyI6MCwibXVsdGlTaG90IjowLCJlbXBCdXJzdCI6MCwibHVja3lTdHJpa2UiOjAsImF1dG9UdXJyZXQiOjAsInNoaWVsZEdlbmVyYXRvciI6MCwibGFzZXJXZWFwb24iOjAsInN3YXJtV2VhcG9uIjowLCJtaW5lV2VhcG9uIjowfSwiaXNCb3NzTGV2ZWwiOmZhbHNlLCJzcGVjaWFsV2VhcG9ucyI6W3sidHlwZSI6Imxhc2VyIiwiY2hhcmdlcyI6MCwibWF4Q2hhcmdlcyI6MCwiY29vbGRvd25UaW1lciI6MH0seyJ0eXBlIjoic3dhcm0iLCJjaGFyZ2VzIjowLCJtYXhDaGFyZ2VzIjowLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJtaW5lIiwiY2hhcmdlcyI6MCwibWF4Q2hhcmdlcyI6MCwiY29vbGRvd25UaW1lciI6MH1dLCJzZWxlY3RlZFdlYXBvbiI6LTF9fQ==
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJzY29yZSI6MTAwMDAsImNyZWRpdHMiOjEwMDAwLCJjcHMiOjAsImJ1aWxkaW5ncyI6e30sImNpdGllcyI6W3sieCI6NDAsImFsaXZlIjp0cnVlLCJocCI6MTAwLCJtYXhIcCI6MTAwfSx7IngiOjE2MCwiYWxpdmUiOnRydWUsImhwIjoxMDAsIm1heEhwIjoxMDB9LHsieCI6MjgwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEwMCwibWF4SHAiOjEwMH0seyJ4Ijo2ODAsImFsaXZlIjp0cnVlLCJocCI6MTAwLCJtYXhIcCI6MTAwfSx7IngiOjgwMCwiYWxpdmUiOnRydWUsImhwIjoxMDAsIm1heEhwIjoxMDB9LHsieCI6OTIwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEwMCwibWF4SHAiOjEwMH1dLCJiYXR0ZXJpZXMiOlt7IngiOjQwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6NDgwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9LHsieCI6OTIwLCJ5Ijo1ODAsImFtbW8iOjEwLCJtYXhBbW1vIjoxMCwiZGlzYWJsZWQiOjB9XSwiaW5jb21pbmdNaXNzaWxlcyI6W10sImNvdW50ZXJNaXNzaWxlcyI6W10sImV4cGxvc2lvbnMiOltdLCJwYXJ0aWNsZXMiOltdLCJib21iZXJzIjpbXSwiYXN0ZXJvaWRzIjpbXSwiZ2FtZU92ZXIiOmZhbHNlLCJsZXZlbENvbXBsZXRlIjpmYWxzZSwibGV2ZWxUcmFuc2l0aW9uVGltZXIiOjAsIm1pc3NpbGVTcGF3blRpbWVyIjo2MCwibWlzc2lsZXNTcGF3bmVkVGhpc0xldmVsIjowLCJjdXJzb3JYIjo0ODAsImN1cnNvclkiOjMyMCwic3RhcnMiOltdLCJzY3JlZW5TaGFrZSI6MCwiYm9udXNUZXh0IjpbXSwic2hvcEhvdmVyIjotMSwiYXV0b1R1cnJldFRpbWVyIjowLCJzaGllbGRIaXRzIjpbMCwwLDAsMCwwLDBdLCJlbXBBY3RpdmUiOjAsInRvdGFsU3BlbnQiOjAsImJsaXp6YXJkQWxwaGEiOjAsImJsaXp6YXJkUGFydGljbGVzIjpbXSwiZXJ1cHRpb25UaW1lciI6MCwiZXJ1cHRpb25BY3RpdmUiOjAsImFzdGVyb2lkU3Bhd25UaW1lciI6MCwiYm9tYmVyU3Bhd25UaW1lciI6MCwiem9uZUludHJvVGltZXIiOjAsInByZXZpb3VzWm9uZUlkIjowLCJoaWdoU2NvcmUiOjAsImF1dG9Nb2RlIjpmYWxzZSwiYm9zcyI6bnVsbCwiYm9zc0RlZmVhdGVkIjpmYWxzZSwibWluZXMiOltdLCJsYXNlckJlYW1zIjpbXSwiY29tYm9Db3VudCI6MCwiY29tYm9UaW1lciI6MCwiY29tYm9NdWx0aXBsaWVyIjoxLCJtYXhDb21ibyI6MCwicnVuTWlzc2lsZXNEZXN0cm95ZWQiOjAsInJ1bkJvc3Nlc0RlZmVhdGVkIjowLCJhY2hpZXZlbWVudFRvYXN0cyI6W10sIndlYXBvbnNVc2VkVGhpc0xldmVsIjpbXSwibGV2ZWwiOjUsInBoYXNlIjoicGxheWluZyIsInRvdGFsTWlzc2lsZXNUaGlzTGV2ZWwiOjIwLCJ1cGdyYWRlcyI6eyJibGFzdFJhZGl1cyI6MCwibWlzc2lsZVNwZWVkIjowLCJleHRyYUFtbW8iOjAsImNoYWluUmVhY3Rpb24iOjAsImFybW9yUGxhdGluZyI6MCwibXVsdGlTaG90IjowLCJlbXBCdXJzdCI6MCwibHVja3lTdHJpa2UiOjAsImF1dG9UdXJyZXQiOjAsInNoaWVsZEdlbmVyYXRvciI6MCwibGFzZXJXZWFwb24iOjMsInN3YXJtV2VhcG9uIjozLCJtaW5lV2VhcG9uIjozfSwiaXNCb3NzTGV2ZWwiOnRydWUsInNwZWNpYWxXZWFwb25zIjpbeyJ0eXBlIjoibGFzZXIiLCJjaGFyZ2VzIjozLCJtYXhDaGFyZ2VzIjozLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJzd2FybSIsImNoYXJnZXMiOjYsIm1heENoYXJnZXMiOjYsImNvb2xkb3duVGltZXIiOjB9LHsidHlwZSI6Im1pbmUiLCJjaGFyZ2VzIjo5LCJtYXhDaGFyZ2VzIjo5LCJjb29sZG93blRpbWVyIjowfV0sInNlbGVjdGVkV2VhcG9uIjotMX19
```

## 📝 License

This project is open source.
