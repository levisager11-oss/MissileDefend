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
eyJ2IjogMSwgInN0YXRlIjogeyJzY29yZSI6IDEwMDAwLCAiY3JlZGl0cyI6IDEwMDAwLCAiY3BzIjogMCwgImJ1aWxkaW5ncyI6IHt9LCAibGV2ZWwiOiAxLCAiY2l0aWVzIjogW3sieCI6IDQwLCAiYWxpdmUiOiB0cnVlLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDE2MCwgImFsaXZlIjogdHJ1ZSwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiAyODAsICJhbGl2ZSI6IHRydWUsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogNjgwLCAiYWxpdmUiOiB0cnVlLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDgwMCwgImFsaXZlIjogdHJ1ZSwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiA5MjAsICJhbGl2ZSI6IHRydWUsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfV0sICJiYXR0ZXJpZXMiOiBbeyJ4IjogNDAsICJ5IjogNTgwLCAiYW1tbyI6IDEwLCAibWF4QW1tbyI6IDEwLCAiZGlzYWJsZWQiOiAwfSwgeyJ4IjogNDgwLCAieSI6IDU4MCwgImFtbW8iOiAxMCwgIm1heEFtbW8iOiAxMCwgImRpc2FibGVkIjogMH0sIHsieCI6IDkyMCwgInkiOiA1ODAsICJhbW1vIjogMTAsICJtYXhBbW1vIjogMTAsICJkaXNhYmxlZCI6IDB9XSwgImluY29taW5nTWlzc2lsZXMiOiBbXSwgImNvdW50ZXJNaXNzaWxlcyI6IFtdLCAiZXhwbG9zaW9ucyI6IFtdLCAicGFydGljbGVzIjogW10sICJib21iZXJzIjogW10sICJhc3Rlcm9pZHMiOiBbXSwgImdhbWVPdmVyIjogZmFsc2UsICJwaGFzZSI6ICJzaG9wIiwgImxldmVsQ29tcGxldGUiOiBmYWxzZSwgImxldmVsVHJhbnNpdGlvblRpbWVyIjogMCwgIm1pc3NpbGVTcGF3blRpbWVyIjogNjAsICJtaXNzaWxlc1NwYXduZWRUaGlzTGV2ZWwiOiAwLCAidG90YWxNaXNzaWxlc1RoaXNMZXZlbCI6IDEwLCAiY3Vyc29yWCI6IDQ4MCwgImN1cnNvclkiOiAzMjAsICJzdGFycyI6IFtdLCAic2NyZWVuU2hha2UiOiAwLCAiYm9udXNUZXh0IjogW10sICJ1cGdyYWRlcyI6IHsiYmxhc3RSYWRpdXMiOiAwLCAibWlzc2lsZVNwZWVkIjogMCwgImV4dHJhQW1tbyI6IDAsICJjaGFpblJlYWN0aW9uIjogMCwgImFybW9yUGxhdGluZyI6IDAsICJtdWx0aVNob3QiOiAwLCAiZW1wQnVyc3QiOiAwLCAibHVja3lTdHJpa2UiOiAwLCAiYXV0b1R1cnJldCI6IDAsICJzaGllbGRHZW5lcmF0b3IiOiAwLCAibGFzZXJXZWFwb24iOiAwLCAic3dhcm1XZWFwb24iOiAwLCAibWluZVdlYXBvbiI6IDB9LCAic2hvcEhvdmVyIjogLTEsICJhdXRvVHVycmV0VGltZXIiOiAwLCAic2hpZWxkSGl0cyI6IFswLCAwLCAwLCAwLCAwLCAwXSwgImVtcEFjdGl2ZSI6IDAsICJ0b3RhbFNwZW50IjogMCwgImJsaXp6YXJkQWxwaGEiOiAwLCAiYmxpenphcmRQYXJ0aWNsZXMiOiBbXSwgImVydXB0aW9uVGltZXIiOiAwLCAiZXJ1cHRpb25BY3RpdmUiOiAwLCAiYXN0ZXJvaWRTcGF3blRpbWVyIjogMCwgImJvbWJlclNwYXduVGltZXIiOiAwLCAem9uZUludHJvVGltZXIiOiAwLCAicHJldmlvdXNab25lSWQiOiAwLCAiaGlnaFNjb3JlIjogMCwgImF1dG9Nb2RlIjogZmFsc2UsICJib3NzIjogbnVsbCwgImJvc3NEZWZlYXRlZCI6IGZhbHNlLCAiaXNCb3NzTGV2ZWwiOiBmYWxzZSwgInNwZWNpYWxXZWFwb25zIjogW3sidHlwZSI6ICJsYXNlciIsICJjaGFyZ2VzIjogMCwgIm1heENoYXJnZXMiOiAwLCAiY29vbGRvd25UaW1lciI6IDB9LCB7InR5cGUiOiAic3dhcm0iLCAiY2hhcmdlcyI6IDAsICJtYXhDaGFyZ2VzIjogMCwgImNvb2xkb3duVGltZXIiOiAwfSwgeyJ0eXBlIjogIm1pbmUiLCAiY2hhcmdlcyI6IDAsICJtYXhDaGFyZ2VzIjogMCwgImNvb2xkb3duVGltZXIiOiAwfV0sICJzZWxlY3RlZFdlYXBvbiI6IC0xLCAibWluZXMiOiBbXSwgImxhc2VyQmVhbXMiOiBbXSwgImNvbWJvQ291bnQiOiAwLCAiY29tYm9UaW1lciI6IDAsICJjb21ib011bHRpcGxpZXIiOiAxLCAibWF4Q29tYm8iOiAwLCAicnVuTWlzc2lsZXNEZXN0cm95ZWQiOiAwLCAicnVuQm9zc2VzRGVmZWF0ZWQiOiAwLCAiYWNoaWV2ZW1lbnRUb2FzdHMiOiBbXSwgIndlYXBvbnNVc2VkVGhpc0xldmVsIjogW119fQ==
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjogMSwgInN0YXRlIjogeyJzY29yZSI6IDEwMDAwLCAiY3JlZGl0cyI6IDEwMDAwLCAiY3BzIjogMCwgImJ1aWxkaW5ncyI6IHt9LCAibGV2ZWwiOiA1LCAiY2l0aWVzIjogW3sieCI6IDQwLCAiYWxpdmUiOiB0cnVlLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDE2MCwgImFsaXZlIjogdHJ1ZSwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiAyODAsICJhbGl2ZSI6IHRydWUsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogNjgwLCAiYWxpdmUiOiB0cnVlLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDgwMCwgImFsaXZlIjogdHJ1ZSwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiA5MjAsICJhbGl2ZSI6IHRydWUsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfV0sICJiYXR0ZXJpZXMiOiBbeyJ4IjogNDAsICJ5IjogNTgwLCAiYW1tbyI6IDEwLCAibWF4QW1tbyI6IDEwLCAiZGlzYWJsZWQiOiAwfSwgeyJ4IjogNDgwLCAieSI6IDU4MCwgImFtbW8iOiAxMCwgIm1heEFtbW8iOiAxMCwgImRpc2FibGVkIjogMH0sIHsieCI6IDkyMCwgInkiOiA1ODAsICJhbW1vIjogMTAsICJtYXhBbW1vIjogMTAsICJkaXNhYmxlZCI6IDB9XSwgImluY29taW5nTWlzc2lsZXMiOiBbXSwgImNvdW50ZXJNaXNzaWxlcyI6IFtdLCAiZXhwbG9zaW9ucyI6IFtdLCAicGFydGljbGVzIjogW10sICJib21iZXJzIjogW10sICJhc3Rlcm9pZHMiOiBbXSwgImdhbWVPdmVyIjogZmFsc2UsICJwaGFzZSI6ICJwbGF5aW5nIiwgImxldmVsQ29tcGxldGUiOiBmYWxzZSwgImxldmVsVHJhbnNpdGlvblRpbWVyIjogMCwgIm1pc3NpbGVTcGF3blRpbWVyIjogNjAsICJtaXNzaWxlc1NwYXduZWRUaGlzTGV2ZWwiOiAwLCAidG90YWxNaXNzaWxlc1RoaXNMZXZlbCI6IDIwLCAiY3Vyc29yWCI6IDQ4MCwgImN1cnNvclkiOiAzMjAsICJzdGFycyI6IFtdLCAic2NyZWVuU2hha2UiOiAwLCAiYm9udXNUZXh0IjogW10sICJ1cGdyYWRlcyI6IHsiYmxhc3RSYWRpdXMiOiAwLCAibWlzc2lsZVNwZWVkIjogMCwgImV4dHJhQW1tbyI6IDAsICJjaGFpblJlYWN0aW9uIjogMCwgImFybW9yUGxhdGluZyI6IDAsICJtdWx0aVNob3QiOiAwLCAiZW1wQnVyc3QiOiAwLCAibHVja3lTdHJpa2UiOiAwLCAiYXV0b1R1cnJldCI6IDAsICJzaGllbGRHZW5lcmF0b3IiOiAwLCAibGFzZXJXZWFwb24iOiAzLCAic3dhcm1XZWFwb24iOiAzLCAibWluZVdlYXBvbiI6IDN9LCAic2hvcEhvdmVyIjogLTEsICJhdXRvVHVycmV0VGltZXIiOiAwLCAic2hpZWxkSGl0cyI6IFswLCAwLCAwLCAwLCAwLCAwXSwgImVtcEFjdGl2ZSI6IDAsICJ0b3RhbFNwZW50IjogMCwgImJsaXp6YXJkQWxwaGEiOiAwLCAiYmxpenphcmRQYXJ0aWNsZXMiOiBbXSwgImVydXB0aW9uVGltZXIiOiAwLCAiZXJ1cHRpb25BY3RpdmUiOiAwLCAiYXN0ZXJvaWRTcGF3blRpbWVyIjogMCwgImJvbWJlclNwYXduVGltZXIiOiAwLCAem9uZUludHJvVGltZXIiOiAwLCAicHJldmlvdXNab25lSWQiOiAwLCAiaGlnaFNjb3JlIjogMCwgImF1dG9Nb2RlIjogZmFsc2UsICJib3NzIjogbnVsbCwgImJvc3NEZWZlYXRlZCI6IGZhbHNlLCAiaXNCb3NzTGV2ZWwiOiB0cnVlLCAic3BlY2lhbFdlYXBvbnMiOiBbeyJ0eXBlIjogImxhc2VyIiwgImNoYXJnZXMiOiAzLCAibWF4Q2hhcmdlcyI6IDMsICJjb29sZG93blRpbWVyIjogMH0sIHsidHlwZSI6ICJzd2FybSIsICJjaGFyZ2VzIjogNiwgIm1heENoYXJnZXMiOiA2LCAiY29vbGRvd25UaW1lciI6IDB9LCB7InR5cGUiOiAibWluZSIsICJjaGFyZ2VzIjogOSwgIm1heENoYXJnZXMiOiA5LCAiY29vbGRvd25UaW1lciI6IDB9XSwgInNlbGVjdGVkV2VhcG9uIjogLTEsICJtaW5lcyI6IFtdLCAibGFzZXJCZWFtcyI6IFtdLCAiY29tYm9Db3VudCI6IDAsICJjb21ib1RpbWVyIjogMCwgImNvbWJvTXVsdGlwbGllciI6IDEsICJtYXhDb21ibyI6IDAsICJydW5NaXNzaWxlc0Rlc3Ryb3llZCI6IDAsICJydW5Cb3NzZXNEZWZlYXRlZCI6IDAsICJhY2hpZXZlbWVudFRvYXN0cyI6IFtdLCAid2VhcG9uc1VzZWRUaGlzTGV2ZWwiOiBbXX19
```

## 📝 License

This project is open source.
