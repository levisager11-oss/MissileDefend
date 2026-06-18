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
eyJ2IjoxLCJzdGF0ZSI6eyJzY29yZSI6MCwiY3JlZGl0cyI6MTAwMDAsImNwcyI6MCwiYnVpbGRpbmdzIjp7fSwibGV2ZWwiOjEsImNpdGllcyI6W3sieCI6MTIwLCJocCI6MTAwLCJtYXhIcCI6MTAwfSx7IngiOjIwMCwiaHAiOjEwMCwibWF4SHAiOjEwMH0seyJ4IjoyODAsImhwIjoxMDAsIm1heEhwIjoxMDB9LHsieCI6NjAwLCJocCI6MTAwLCJtYXhIcCI6MTAwfSx7IngiOjY4MCwiaHAiOjEwMCwibWF4SHAiOjEwMH0seyJ4Ijo3NjAsImhwIjoxMDAsIm1heEhwIjoxMDB9XSwiYmF0dGVyaWVzIjpbeyJ4Ijo0MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjQ4MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjkyMCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfV0sImluY29taW5nTWlzc2lsZXMiOltdLCJjb3VudGVyTWlzc2lsZXMiOltdLCJleHBsb3Npb25zIjpbXSwicGFydGljbGVzIjpbXSwiYm9tYmVycyI6W10sImFzdGVyb2lkcyI6W10sImdhbWVPdmVyIjpmYWxzZSwicGhhc2UiOiJzaG9wIiwibGV2ZWxDb21wbGV0ZSI6ZmFsc2UsImxldmVsVHJhbnNpdGlvblRpbWVyIjowLCJtaXNzaWxlU3Bhd25UaW1lciI6MCwibWlzc2lsZXNTcGF3bmVkVGhpc0xldmVsIjowLCJ0b3RhbE1pc3NpbGVzVGhpc0xldmVsIjoxMCwiY3Vyc29yWCI6NDgwLCJjdXJzb3JZIjozMjAsInN0YXJzIjpbXSwic2NyZWVuU2hha2UiOjAsImJvbnVzVGV4dCI6W10sInVwZ3JhZGVzIjp7ImJsYXN0UmFkaXVzIjowLCJtaXNzaWxlU3BlZWQiOjAsImV4dHJhQW1tbyI6MCwiY2hhaW5SZWFjdGlvbiI6MCwiYXJtb3JQbGF0aW5nIjowLCJtdWx0aVNob3QiOjAsImVtcEJ1cnN0IjowLCJsdWNreVN0cmlrZSI6MCwiYXV0b1R1cnJldCI6MCwic2hpZWxkR2VuZXJhdG9yIjowLCJsYXNlcldlYXBvbiI6MCwic3dhcm1XZWFwb24iOjAsIm1pbmVXZWFwb24iOjB9LCJzaG9wSG92ZXIiOi0xLCJhdXRvVHVycmV0VGltZXIiOjAsInNoaWVsZEhpdHMiOlswLDAsMCwwLDAsMF0sImVtcEFjdGl2ZSI6MCwidG90YWxTcGVudCI6MCwiYmxpenphcmRBbHBoYSI6MCwiYmxpenphcmRQYXJ0aWNsZXMiOltdLCJlcnVwdGlvblRpbWVyIjowLCJlcnVwdGlvbkFjdGl2ZSI6MCwiYXN0ZXJvaWRTcGF3blRpbWVyIjowLCJib21iZXJTcGF3blRpbWVyIjowLCJ6b25lSW50cm9UaW1lciI6MCwicHJldmlvdXNab25lSWQiOjAsImhpZ2hTY29yZSI6MCwiYXV0b01vZGUiOmZhbHNlLCJib3NzIjpudWxsLCJib3NzRGVmZWF0ZWQiOmZhbHNlLCJpc0Jvc3NMZXZlbCI6ZmFsc2UsInNwZWNpYWxXZWFwb25zIjpbeyJ0eXBlIjoibGFzZXIiLCJjaGFyZ2VzIjowLCJtYXhDaGFyZ2VzIjowLCJjb29sZG93blRpbWVyIjowfSx7InR5cGUiOiJzd2FybSIsImNoYXJnZXMiOjAsIm1heENoYXJnZXMiOjAsImNvb2xkb3duVGltZXIiOjB9LHsidHlwZSI6Im1pbmUiLCJjaGFyZ2VzIjowLCJtYXhDaGFyZ2VzIjowLCJjb29sZG93blRpbWVyIjowfV0sInNlbGVjdGVkV2VhcG9uIjotMSwibWluZXMiOltdLCJsYXNlckJlYW1zIjpbXSwiY29tYm9Db3VudCI6MCwiY29tYm9UaW1lciI6MCwiY29tYm9NdWx0aXBsaWVyIjoxLCJtYXhDb21ibyI6MCwiYWNoaWV2ZW1lbnRUb2FzdHMiOltdLCJ3ZWFwb25zVXNlZFRoaXNMZXZlbCI6W10sInJ1blN0YXRzIjp7Im1pc3NpbGVzRGVzdHJveWVkIjowLCJidWlsZGluZ3NQdXJjaGFzZWQiOjAsInVwZ3JhZGVzUHVyY2hhc2VkIjowLCJzcGVjaWFsV2VhcG9uc1VzZWQiOjAsImNpdGllc0xvc3QiOjAsImRhbWFnZVRha2VuIjowLCJib3NzZXNEZWZlYXRlZCI6MCwiY3JlZGl0c0Vhcm5lZCI6MH19fQ==
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjoxLCJzdGF0ZSI6eyJzY29yZSI6MCwiY3JlZGl0cyI6MTAwMDAsImNwcyI6MCwiYnVpbGRpbmdzIjp7fSwibGV2ZWwiOjUsImNpdGllcyI6W3sieCI6MTIwLCJocCI6MTAwLCJtYXhIcCI6MTAwfSx7IngiOjIwMCwiaHAiOjEwMCwibWF4SHAiOjEwMH0seyJ4IjoyODAsImhwIjoxMDAsIm1heEhwIjoxMDB9LHsieCI6NjAwLCJocCI6MTAwLCJtYXhIcCI6MTAwfSx7IngiOjY4MCwiaHAiOjEwMCwibWF4SHAiOjEwMH0seyJ4Ijo3NjAsImhwIjoxMDAsIm1heEhwIjoxMDB9XSwiYmF0dGVyaWVzIjpbeyJ4Ijo0MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjQ4MCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfSx7IngiOjkyMCwieSI6NTgwLCJhbW1vIjoxMCwibWF4QW1tbyI6MTAsImRpc2FibGVkIjowfV0sImluY29taW5nTWlzc2lsZXMiOltdLCJjb3VudGVyTWlzc2lsZXMiOltdLCJleHBsb3Npb25zIjpbXSwicGFydGljbGVzIjpbXSwiYm9tYmVycyI6W10sImFzdGVyb2lkcyI6W10sImdhbWVPdmVyIjpmYWxzZSwicGhhc2UiOiJwbGF5aW5nIiwibGV2ZWxDb21wbGV0ZSI6ZmFsc2UsImxldmVsVHJhbnNpdGlvblRpbWVyIjowLCJtaXNzaWxlU3Bhd25UaW1lciI6MCwibWlzc2lsZXNTcGF3bmVkVGhpc0xldmVsIjowLCJ0b3RhbE1pc3NpbGVzVGhpc0xldmVsIjoyMCwiY3Vyc29yWCI6NDgwLCJjdXJzb3JZIjozMjAsInN0YXJzIjpbXSwic2NyZWVuU2hha2UiOjAsImJvbnVzVGV4dCI6W10sInVwZ3JhZGVzIjp7ImJsYXN0UmFkaXVzIjowLCJtaXNzaWxlU3BlZWQiOjAsImV4dHJhQW1tbyI6MCwiY2hhaW5SZWFjdGlvbiI6MCwiYXJtb3JQbGF0aW5nIjowLCJtdWx0aVNob3QiOjAsImVtcEJ1cnN0IjowLCJsdWNreVN0cmlrZSI6MCwiYXV0b1R1cnJldCI6MCwic2hpZWxkR2VuZXJhdG9yIjowLCJsYXNlcldlYXBvbiI6Mywic3dhcm1XZWFwb24iOjMsIm1pbmVXZWFwb24iOjN9LCJzaG9wSG92ZXIiOi0xLCJhdXRvVHVycmV0VGltZXIiOjAsInNoaWVsZEhpdHMiOlswLDAsMCwwLDAsMF0sImVtcEFjdGl2ZSI6MCwidG90YWxTcGVudCI6MCwiYmxpenphcmRBbHBoYSI6MCwiYmxpenphcmRQYXJ0aWNsZXMiOltdLCJlcnVwdGlvblRpbWVyIjowLCJlcnVwdGlvbkFjdGl2ZSI6MCwiYXN0ZXJvaWRTcGF3blRpbWVyIjowLCJib21iZXJTcGF3blRpbWVyIjowLCJ6b25lSW50cm9UaW1lciI6MCwicHJldmlvdXNab25lSWQiOjAsImhpZ2hTY29yZSI6MCwiYXV0b01vZGUiOmZhbHNlLCJib3NzIjpudWxsLCJib3NzRGVmZWF0ZWQiOmZhbHNlLCJpc0Jvc3NMZXZlbCI6dHJ1ZSwic3BlY2lhbFdlYXBvbnMiOlt7InR5cGUiOiJsYXNlciIsImNoYXJnZXMiOjMsIm1heENoYXJnZXMiOjMsImNvb2xkb3duVGltZXIiOjB9LHsidHlwZSI6InN3YXJtIiwiY2hhcmdlcyI6NiwibWF4Q2hhcmdlcyI6NiwiY29vbGRvd25UaW1lciI6MH0seyJ0eXBlIjoibWluZSIsImNoYXJnZXMiOjksIm1heENoYXJnZXMiOjksImNvb2xkb3duVGltZXIiOjB9XSwic2VsZWN0ZWRXZWFwb24iOi0xLCJtaW5lcyI6W10sImxhc2VyQmVhbXMiOltdLCJjb21ib0NvdW50IjowLCJjb21ib1RpbWVyIjowLCJjb21ib011bHRpcGxpZXIiOjEsIm1heENvbWJvIjowLCJhY2hpZXZlbWVudFRvYXN0cyI6W10sIndlYXBvbnNVc2VkVGhpc0xldmVsIjpbXSwicnVuU3RhdHMiOnsibWlzc2lsZXNEZXN0cm95ZWQiOjAsImJ1aWxkaW5nc1B1cmNoYXNlZCI6MCwidXBncmFkZXNQdXJjaGFzZWQiOjAsInNwZWNpYWxXZWFwb25zVXNlZCI6MCwiY2l0aWVzTG9zdCI6MCwiZGFtYWdlVGFrZW4iOjAsImJvc3Nlc0RlZmVhdGVkIjowLCJjcmVkaXRzRWFybmVkIjowfX19
```

## 📝 License

This project is open source.
