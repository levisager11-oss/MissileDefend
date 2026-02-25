# Missile Command - Zone Defense

A modern, feature-rich reimagining of the classic arcade game Missile Command, built with React, TypeScript, and HTML5 Canvas.

## 🎮 Game Description

Defend your cities from relentless missile attacks across 5 distinct zones with increasing difficulty. Manage your economy, purchase upgrades, and deploy special weapons to survive the onslaught. Face off against powerful bosses every 5 levels and prestige to gain permanent bonuses.

## ✨ Features

- **Zone Progression System**: Battle through 5 unique zones (Green Valley, Desert Outpost, Arctic Base, Volcanic Fortress, Space Station), each with distinct visual themes and hazards.
- **Dynamic Hazards**: Encounter heat-seeking missiles, bombers, blizzards, decoy missiles, asteroids, EMP enemies, and volcanic eruptions.
- **Economy & Buildings**: Earn credits by destroying missiles and building passive income structures:
  - **Solar Farm**: Basic energy harvesting.
  - **Scrap Yard**: Recycles debris for credits.
  - **Munitions Factory**: Mass-produces ammunition.
  - **Orbital Mine**: Automated mining in space.
  - **Defense Contract**: Government funding for defense.
  - **AI Core**: High-frequency trading algorithms.
- **Research Upgrades**: Purchase upgrades including Blast Radius, Missile Velocity, Ammo Cache, Chain Reaction, Lucky Strike, Multi-Shot, EMP Burst, Auto Turret, Shield Generator, and City Repair.
- **Special Weapons**: Unlock and deploy powerful special weapons:
  - **Laser Beam**: Instantly destroys everything in its path.
  - **Missile Swarm**: Fires multiple missiles in a spread pattern.
  - **Area Mine**: Proximity mines that decimate groups of enemies.
- **Boss Battles**: Challenge unique bosses (Mothership, Fortress, Swarm Queen) with special attack patterns every 5 levels.
- **Orbital Command (Prestige System)**: Reset your run to earn Command Credits for permanent orbital upgrades:
  - **Offense**: Silo Expansion, Rapid Rearm.
  - **Defense**: Bunker Tech, Aegis Overclock.
  - **Economy**: Automated Salvage, Market Influence.
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

### 🛠️ Debug Keys

- **L**: Skip Level.
- **M**: Add 5000 Credits.

## 💾 Save Codes

Use these codes to jump start your game. Click on `[SAVE / LOAD]` in the bottom left corner and paste the code.

**Level 1 Head Start (10,000 Credits)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJzY29yZSI6MTAwMDAsImxldmVsIjoxLCJjaXRpZXMiOlt7IngiOjQwLCJhbGl2ZSI6dHJ1ZX0seyJ4IjoxNjAsImFsaXZlIjp0cnVlfSx7IngiOjI4MCwiYWxpdmUiOnRydWV9LHsieCI6NjgwLCJhbGl2ZSI6dHJ1ZX0seyJ4Ijo4MDAsImFsaXZlIjp0cnVlfSx7IngiOjkyMCwiYWxpdmUiOnRydWV9XSwiYmF0dGVyaWVzIjpbeyJ4Ijo0MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjQ4MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjkyMCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfV0sImluY29taW5nTWlzc2lsZXMiOltdLCJjb3VudGVyTWlzc2lsZXMiOltdLCJleHBsb3Npb25zIjpbXSwicGFydGljbGVzIjpbXSwiYm9tYmVycyI6W10sImFzdGVyb2lkcyI6W10sImdhbWVPdmVyIjpmYWxzZSwicGhhc2UiOiJzaG9wIiwibGV2ZWxDb21wbGV0ZSI6ZmFsc2UsImxldmVsVHJhbnNpdGlvblRpbWVyIjowLCJtaXNzaWxlU3Bhd25UaW1lciI6NjAsIm1pc3NpbGVzU3Bhd25lZFRoaXNMZXZlbCI6MCwidG90YWxNaXNzaWxlc1RoaXNMZXZlbCI6MTAsImN1cnNvclgiOjQ4MCwiY3Vyc29yWSI6MzIwLCJzdGFycyI6W10sInNjcmVlblNoYWtlIjowLCJib251c1RleHQiOltdLCJ1cGdyYWRlcyI6eyJibGFzdFJhZGl1cyI6MCwibWlzc2lsZVNwZWVkIjowLCJleHRyYUFtbW8iOjAsImNoYWluUmVhY3Rpb24iOjAsImFybW9yUGxhdGluZyI6MCwibXVsdGlTaG90IjowLCJlbXBCdXJzdCI6MCwibHVja3lTdHJpa2UiOjAsImF1dG9UdXJyZXQiOjAsInNoaWVsZEdlbmVyYXRvciI6MCwibGFzZXJXZWFwb24iOjAsInN3YXJtV2VhcG9uIjowLCJtaW5lV2VhcG9uIjowfSwic2hvcEhvdmVyIjotMSwiYXV0b1R1cnJldFRpbWVyIjowLCJzaGllbGRIaXRzIjpbMCwwLDAsMCwwLDBdLCJlbXBBY3RpdmUiOjAsInRvdGFsU3BlbnQiOjAsImJsaXp6YXJkQWxwaGEiOjAsImJsaXp6YXJkUGFydGljbGVzIjpbXSwiZXJ1cHRpb25UaW1lciI6MCwiZXJ1cHRpb25BY3RpdmUiOjAsImFzdGVyb2lkU3Bhd25UaW1lciI6MCwiYm9tYmVyU3Bhd25UaW1lciI6MCwiem9uZUludHJvVGltZXIiOjAsInByZXZpb3VzWm9uZUlkIjowLCJoaWdoU2NvcmUiOjAsImF1dG9Nb2RlIjpmYWxzZSwiYm9zcyI6bnVsbCwiYm9zc0RlZmVhdGVkIjpmYWxzZSwiaXNCb3NzTGV2ZWwiOmZhbHNlLCJzcGVjaWFsV2VhcG9ucyI6W3sidHlwZSI6Imxhc2VyIiwiY2hhcmdlcyI6MCwibWF4Q2hhcmdlcyI6MCwiY29vbGRvd25UaW1lciI6MH0seyJ0eXBlIjoic3dhcm0iLCJjaGFyZ2VzIjowLCJtYXhDaGFyZ2VzIjowLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJtaW5lIiwiY2hhcmdlcyI6MCwibWF4Q2hhcmdlcyI6MCwiY29vbGRvd25UaW1lciI6MH1dLCJzZWxlY3RlZFdlYXBvbiI6LTEsIm1pbmVzIjpbXSwibGFzZXJCZWFtcyI6W10sImNvbWJvQ291bnQiOjAsImNvbWJvVGltZXIiOjAsImNvbWJvTXVsdGlwbGllciI6MSwibWF4Q29tYm8iOjB9fQ==
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJzY29yZSI6MTAwMDAsImxldmVsIjo1LCJjaXRpZXMiOlt7IngiOjQwLCJhbGl2ZSI6dHJ1ZX0seyJ4IjoxNjAsImFsaXZlIjp0cnVlfSx7IngiOjI4MCwiYWxpdmUiOnRydWV9LHsieCI6NjgwLCJhbGl2ZSI6dHJ1ZX0seyJ4Ijo4MDAsImFsaXZlIjp0cnVlfSx7IngiOjkyMCwiYWxpdmUiOnRydWV9XSwiYmF0dGVyaWVzIjpbeyJ4Ijo0MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjQ4MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjkyMCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfV0sImluY29taW5nTWlzc2lsZXMiOltdLCJjb3VudGVyTWlzc2lsZXMiOltdLCJleHBsb3Npb25zIjpbXSwicGFydGljbGVzIjpbXSwiYm9tYmVycyI6W10sImFzdGVyb2lkcyI6W10sImdhbWVPdmVyIjpmYWxzZSwicGhhc2UiOiJwbGF5aW5nIiwibGV2ZWxDb21wbGV0ZSI6ZmFsc2UsImxldmVsVHJhbnNpdGlvblRpbWVyIjowLCJtaXNzaWxlU3Bhd25UaW1lciI6NjAsIm1pc3NpbGVzU3Bhd25lZFRoaXNMZXZlbCI6MCwidG90YWxNaXNzaWxlc1RoaXNMZXZlbCI6MjAsImN1cnNvclgiOjQ4MCwiY3Vyc29yWSI6MzIwLCJzdGFycyI6W10sInNjcmVlblNoYWtlIjowLCJib251c1RleHQiOltdLCJ1cGdyYWRlcyI6eyJibGFzdFJhZGl1cyI6MCwibWlzc2lsZVNwZWVkIjowLCJleHRyYUFtbW8iOjAsImNoYWluUmVhY3Rpb24iOjAsImFybW9yUGxhdGluZyI6MCwibXVsdGlTaG90IjowLCJlbXBCdXJzdCI6MCwibHVja3lTdHJpa2UiOjAsImF1dG9UdXJyZXQiOjAsInNoaWVsZEdlbmVyYXRvciI6MCwibGFzZXJXZWFwb24iOjMsInN3YXJtV2VhcG9uIjozLCJtaW5lV2VhcG9uIjozfSwic2hvcEhvdmVyIjotMSwiYXV0b1R1cnJldFRpbWVyIjowLCJzaGllbGRIaXRzIjpbMCwwLDAsMCwwLDBdLCJlbXBBY3RpdmUiOjAsInRvdGFsU3BlbnQiOjAsImJsaXp6YXJkQWxwaGEiOjAsImJsaXp6YXJkUGFydGljbGVzIjpbXSwiZXJ1cHRpb25UaW1lciI6MCwiZXJ1cHRpb25BY3RpdmUiOjAsImFzdGVyb2lkU3Bhd25UaW1lciI6MCwiYm9tYmVyU3Bhd25UaW1lciI6MCwiem9uZUludHJvVGltZXIiOjAsInByZXZpb3VzWm9uZUlkIjowLCJoaWdoU2NvcmUiOjAsImF1dG9Nb2RlIjpmYWxzZSwiYm9zcyI6bnVsbCwiYm9zc0RlZmVhdGVkIjpmYWxzZSwiaXNCb3NzTGV2ZWwiOnRydWUsInNwZWNpYWxXZWFwb25zIjpbeyJ0eXBlIjoibGFzZXIiLCJjaGFyZ2VzIjozLCJtYXhDaGFyZ2VzIjozLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJzd2FybSIsImNoYXJnZXMiOjYsIm1heENoYXJnZXMiOjYsImNvb2xkb3duVGltZXIiOjB9LHsidHlwZSI6Im1pbmUiLCJjaGFyZ2VzIjo5LCJtYXhDaGFyZ2VzIjo5LCJjb29sZG93blRpbWVyIjowfV0sInNlbGVjdGVkV2VhcG9uIjotMSwibWluZXMiOltdLCJsYXNlckJlYW1zIjpbXSwiY29tYm9Db3VudCI6MCwiY29tYm9UaW1lciI6MCwiY29tYm9NdWx0aXBsaWVyIjoxLCJtYXhDb21ibyI6MH19
```

## 📝 License

This project is open source.
