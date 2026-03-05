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
eyJ2IjoxLCJzdGF0ZSI6eyJjcmVkaXRzIjoxMDAwMCwic2NvcmUiOjEwMDAwLCJjcHMiOjAsImJ1aWxkaW5ncyI6eyJzb2xhcl9mYXJtIjowLCJzY3JhcF95YXJkIjowLCJtdW5pdGlvbnNfZmFjdG9yeSI6MCwib3JiaXRhbF9taW5lIjowLCJkZWZlbnNlX2NvbnRyYWN0IjowLCJhaV9jb3JlIjowfSwibGV2ZWwiOjEsImNpdGllcyI6W3sieCI6MTIwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEsIm1heEhwIjoxfSx7IngiOjIwMCwiYWxpdmUiOnRydWUsImhwIjoxLCJtYXhIcCI6MX0seyJ4IjoyODAsImFsaXZlIjp0cnVlLCJocCI6MSwibWF4SHAiOjF9LHsieCI6NjAwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEsIm1heEhwIjoxfSx7IngiOjY4MCwiYWxpdmUiOnRydWUsImhwIjoxLCJtYXhIcCI6MX0seyJ4Ijo3NjAsImFsaXZlIjp0cnVlLCJocCI6MSwibWF4SHAiOjF9XSwiYmF0dGVyaWVzIjpbeyJ4Ijo0MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjQ4MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjkyMCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfV0sImluY29taW5nTWlzc2lsZXMiOltdLCJjb3VudGVyTWlzc2lsZXMiOltdLCJleHBsb3Npb25zIjpbXSwicGFydGljbGVzIjpbXSwiYm9tYmVycyI6W10sImFzdGVyb2lkcyI6W10sImdhbWVPdmVyIjpmYWxzZSwicGhhc2UiOiJ0aXRsZSIsImxldmVsQ29tcGxldGUiOmZhbHNlLCJsZXZlbFRyYW5zaXRpb25UaW1lciI6MCwibWlzc2lsZVNwYXduVGltZXIiOjAsIm1pc3NpbGVzU3Bhd25lZFRoaXNMZXZlbCI6MCwidG90YWxNaXNzaWxlc1RoaXNMZXZlbCI6MTAsImN1cnNvclgiOjQ4MCwiY3Vyc29yWSI6MzIwLCJzdGFycyI6W10sInNjcmVlblNoYWtlIjowLCJib251c1RleHQiOltdLCJ1cGdyYWRlcyI6eyJibGFzdFJhZGl1cyI6MCwibWlzc2lsZVNwZWVkIjowLCJleHRyYUFtbW8iOjAsImNoYWluUmVhY3Rpb24iOjAsImFybW9yUGxhdGluZyI6MCwibXVsdGlTaG90IjowLCJlbXBCdXJzdCI6MCwibHVja3lTdHJpa2UiOjAsImF1dG9UdXJyZXQiOjAsInNoaWVsZEdlbmVyYXRvciI6MCwibGFzZXJXZWFwb24iOjAsInN3YXJtV2VhcG9uIjowLCJtaW5lV2VhcG9uIjowfSwic2hvcEhvdmVyIjotMSwiYXV0b1R1cnJldFRpbWVyIjowLCJzaGllbGRIaXRzIjpbMCwwLDAsMCwwLDBdLCJlbXBBY3RpdmUiOjAsInRvdGFsU3BlbnQiOjAsImJsaXp6YXJkQWxwaGEiOjAsImJsaXp6YXJkUGFydGljbGVzIjpbXSwiZXJ1cHRpb25UaW1lciI6MCwiZXJ1cHRpb25BY3RpdmUiOjAsImFzdGVyb2lkU3Bhd25UaW1lciI6MCwiYm9tYmVyU3Bhd25UaW1lciI6MCwiem9uZUludHJvVGltZXIiOjAsInByZXZpb3VzWm9uZUlkIjowLCJoaWdoU2NvcmUiOjAsImF1dG9Nb2RlIjpmYWxzZSwiYm9zcyI6bnVsbCwiYm9zc0RlZmVhdGVkIjpmYWxzZSwiaXNCb3NzTGV2ZWwiOmZhbHNlLCJzcGVjaWFsV2VhcG9ucyI6W3sidHlwZSI6Imxhc2VyIiwiY2hhcmdlcyI6MCwibWF4Q2hhcmdlcyI6MCwiY29vbGRvd25UaW1lciI6MH0seyJ0eXBlIjoic3dhcm0iLCJjaGFyZ2VzIjowLCJtYXhDaGFyZ2VzIjowLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJtaW5lIiwiY2hhcmdlcyI6MCwibWF4Q2hhcmdlcyI6MCwiY29vbGRvd25UaW1lciI6MH1dLCJzZWxlY3RlZFdlYXBvbiI6LTEsIm1pbmVzIjpbXSwibGFzZXJCZWFtcyI6W10sImNvbWJvQ291bnQiOjAsImNvbWJvVGltZXIiOjAsImNvbWJvTXVsdGlwbGllciI6MSwibWF4Q29tYm8iOjAsInJ1bk1pc3NpbGVzRGVzdHJveWVkIjowLCJydW5Cb3NzZXNEZWZlYXRlZCI6MCwiYWNoaWV2ZW1lbnRUb2FzdHMiOltdLCJ3ZWFwb25zVXNlZFRoaXNMZXZlbCI6W119fQ==
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJjcmVkaXRzIjoxMDAwMCwic2NvcmUiOjEwMDAwLCJjcHMiOjAsImJ1aWxkaW5ncyI6eyJzb2xhcl9mYXJtIjowLCJzY3JhcF95YXJkIjowLCJtdW5pdGlvbnNfZmFjdG9yeSI6MCwib3JiaXRhbF9taW5lIjowLCJkZWZlbnNlX2NvbnRyYWN0IjowLCJhaV9jb3JlIjowfSwibGV2ZWwiOjUsImNpdGllcyI6W3sieCI6MTIwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEsIm1heEhwIjoxfSx7IngiOjIwMCwiYWxpdmUiOnRydWUsImhwIjoxLCJtYXhIcCI6MX0seyJ4IjoyODAsImFsaXZlIjp0cnVlLCJocCI6MSwibWF4SHAiOjF9LHsieCI6NjAwLCJhbGl2ZSI6dHJ1ZSwiaHAiOjEsIm1heEhwIjoxfSx7IngiOjY4MCwiYWxpdmUiOnRydWUsImhwIjoxLCJtYXhIcCI6MX0seyJ4Ijo3NjAsImFsaXZlIjp0cnVlLCJocCI6MSwibWF4SHAiOjF9XSwiYmF0dGVyaWVzIjpbeyJ4Ijo0MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjQ4MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjkyMCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfV0sImluY29taW5nTWlzc2lsZXMiOltdLCJjb3VudGVyTWlzc2lsZXMiOltdLCJleHBsb3Npb25zIjpbXSwicGFydGljbGVzIjpbXSwiYm9tYmVycyI6W10sImFzdGVyb2lkcyI6W10sImdhbWVPdmVyIjpmYWxzZSwicGhhc2UiOiJwbGF5aW5nIiwibGV2ZWxDb21wbGV0ZSI6ZmFsc2UsImxldmVsVHJhbnNpdGlvblRpbWVyIjowLCJtaXNzaWxlU3Bhd25UaW1lciI6MCwibWlzc2lsZXNTcGF3bmVkVGhpc0xldmVsIjowLCJ0b3RhbE1pc3NpbGVzVGhpc0xldmVsIjoyMCwiY3Vyc29yWCI6NDgwLCJjdXJzb3JZIjozMjAsInN0YXJzIjpbXSwic2NyZWVuU2hha2UiOjAsImJvbnVzVGV4dCI6W10sInVwZ3JhZGVzIjp7ImJsYXN0UmFkaXVzIjowLCJtaXNzaWxlU3BlZWQiOjAsImV4dHJhQW1tbyI6MCwiY2hhaW5SZWFjdGlvbiI6MCwiYXJtb3JQbGF0aW5nIjowLCJtdWx0aVNob3QiOjAsImVtcEJ1cnN0IjowLCJsdWNreVN0cmlrZSI6MCwiYXV0b1R1cnJldCI6MCwic2hpZWxkR2VuZXJhdG9yIjowLCJsYXNlcldlYXBvbiI6Mywic3dhcm1XZWFwb24iOjMsIm1pbmVXZWFwb24iOjN9LCJzaG9wSG92ZXIiOi0xLCJhdXRvVHVycmV0VGltZXIiOjAsInNoaWVsZEhpdHMiOlswLDAsMCwwLDAsMF0sImVtcEFjdGl2ZSI6MCwidG90YWxTcGVudCI6MCwiYmxpenphcmRBbHBoYSI6MCwiYmxpenphcmRQYXJ0aWNsZXMiOltdLCJlcnVwdGlvblRpbWVyIjowLCJlcnVwdGlvbkFjdGl2ZSI6MCwiYXN0ZXJvaWRTcGF3blRpbWVyIjowLCJib21iZXJTcGF3blRpbWVyIjowLCJ6b25lSW50cm9UaW1lciI6MCwicHJldmlvdXNab25lSWQiOjAsImhpZ2hTY29yZSI6MCwiYXV0b01vZGUiOmZhbHNlLCJib3NzIjpudWxsLCJib3NzRGVmZWF0ZWQiOmZhbHNlLCJpc0Jvc3NMZXZlbCI6dHJ1ZSwic3BlY2lhbFdlYXBvbnMiOlt7InR5cGUiOiJsYXNlciIsImNoYXJnZXMiOjMsIm1heENoYXJnZXMiOjMsImNvb2xkb3duVGltZXIiOjB9LHsidHlwZSI6InN3YXJtIiwiY2hhcmdlcyI6NiwibWF4Q2hhcmdlcyI6NiwiY29vbGRvd25UaW1lciI6MH0seyJ0eXBlIjoibWluZSIsImNoYXJnZXMiOjksIm1heENoYXJnZXMiOjksImNvb2xkb3duVGltZXIiOjB9XSwic2VsZWN0ZWRXZWFwb24iOi0xLCJtaW5lcyI6W10sImxhc2VyQmVhbXMiOltdLCJjb21ib0NvdW50IjowLCJjb21ib1RpbWVyIjowLCJjb21ib011bHRpcGxpZXIiOjEsIm1heENvbWJvIjowLCJydW5NaXNzaWxlc0Rlc3Ryb3llZCI6MCwicnVuQm9zc2VzRGVmZWF0ZWQiOjAsImFjaGlldmVtZW50VG9hc3RzIjpbXSwid2VhcG9uc1VzZWRUaGlzTGV2ZWwiOltdfX0=
```

## 📝 License

This project is open source.
