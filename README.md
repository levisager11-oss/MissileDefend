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
eyJ2IjogMSwgInN0YXRlIjogeyJzY29yZSI6IDAsICJsZXZlbCI6IDEsICJjaXRpZXMiOiBbeyJ4IjogNDAsICJhbGl2ZSI6IHRydWUsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogMTYwLCAiYWxpdmUiOiB0cnVlLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDI4MCwgImFsaXZlIjogdHJ1ZSwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiA2ODAsICJhbGl2ZSI6IHRydWUsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogODAwLCAiYWxpdmUiOiB0cnVlLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDkyMCwgImFsaXZlIjogdHJ1ZSwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9XSwgImJhdHRlcmllcyI6IFt7IngiOiA0MCwgInkiOiA1ODAsICJhbW1vIjogMTAsICJtYXhBbW1vIjogMTAsICJkaXNhYmxlZCI6IDB9LCB7IngiOiA0ODAsICJ5IjogNTgwLCAiYW1tbyI6IDEwLCAibWF4QW1tbyI6IDEwLCAiZGlzYWJsZWQiOiAwfSwgeyJ4IjogOTIwLCAieSI6IDU4MCwgImFtbW8iOiAxMCwgIm1heEFtbW8iOiAxMCwgImRpc2FibGVkIjogMH1dLCAiaW5jb21pbmdNaXNzaWxlcyI6IFtdLCAiY291bnRlck1pc3NpbGVzIjogW10LCAiZXhwbG9zaW9ucyI6IFtdLCAicGFydGljbGVzIjogW10LCAiYm9tYmVycyI6IFtdLCAiYXN0ZXJvaWRzIjogW10LCAiZ2FtZU92ZXIiOiBmYWxzZSwgInBoYXNlIjogInNob3AiLCAibGV2ZWxDb21wbGV0ZSI6IGZhbHNlLCAibGV2ZWxUcmFuc2l0aW9uVGltZXIiOiAwLCAibWlzc2lsZVNwYXduVGltZXIiOiA2MCwgIm1pc3NpbGVzU3Bhd25lZFRoaXNMZXZlbCI6IDAsICJ0b3RhbE1pc3NpbGVzVGhpc0xldmVsIjogMTAsICJjdXJzb3JYIjogNDgwLCAiY3Vyc29yWSI6IDMyMCwgInN0YXJzIjogW10LCAic2NyZWVuU2hha2UiOiAwLCAiYm9udXNUZXh0IjogW10LCAidXBncmFkZXMiOiB7ImJsYXN0UmFkaXVzIjogMCwgIm1pc3NpbGVTcGVlZCI6IDAsICJleHRyYUFtbW8iOiAwLCAiY2hhaW5SZWFjdGlvbiI6IDAsICJhcm1vclBsYXRpbmciOiAwLCAibXVsdGlTaG90IjogMCwgImVtcEJ1cnN0IjogMCwgImx1Y2t5U3RyaWtlIjogMCwgImF1dG9UdXJyZXQiOiAwLCAic2hpZWxkR2VuZXJhdG9yIjogMCwgImxhc2VyV2VhcG9uIjogMCwgInN3YXJtV2VhcG9uIjogMCwgIm1pbmVXZWFwb24iOiAwfSwgInNob3BIb3ZlciI6IC0xLCAiYXV0b1R1cnJldFRpbWVyIjogMCwgInNoaWVsZEhpdHMiOiBbMCwgMCwgMCwgMCwgMCwgMF0sICJlbXBBY3RpdmUiOiAwLCAidG90YWxTcGVudCI6IDAsICJibGl6emFyZEFscGhhIjogMCwgImJsaXp6YXJkUGFydGljbGVzIjogW10LCAiZXJ1cHRpb25UaW1lciI6IDAsICJlcnVwdGlvbkFjdGl2ZSI6IDAsICJhc3Rlcm9pZFNwYXduVGltZXIiOiAwLCAiYm9tYmVyU3Bhd25UaW1lciI6IDAsICJ6b25lSW50cm9UaW1lciI6IDAsICJwcmV2aW91c1pvbmVJZCI6IDAsICJoaWdoU2NvcmUiOiAwLCAiYXV0b01vZGUiOiBmYWxzZSwgImJvc3MiOiBudWxsLCAiYm9zc0RlZmVhdGVkIjogZmFsc2UsICJpc0Jvc3NMZXZlbCI6IGZhbHNlLCAic3BlY2lhbFdlYXBvbnMiOiBbeyJ0eXBlIjogImxhc2VyIiwgImNoYXJnZXMiOiAwLCAibWF4Q2hhcmdlcyI6IDAsICJjb29sZG93blRpbWVyIjogMH0sIHsidHlwZSI6ICJzd2FybSIsICJjaGFyZ2VzIjogMCwgIm1heENoYXJnZXMiOiAwLCAiY29vbGRvd25UaW1lciI6IDB9LCB7InR5cGUiOiAibWluZSIsICJjaGFyZ2VzIjogMCwgIm1heENoYXJnZXMiOiAwLCAiY29vbGRvd25UaW1lciI6IDB9XSwgInNlbGVjdGVkV2VhcG9uIjogLTEsICJtaW5lcyI6IFtdLCAibGFzZXJCZWFtcyI6IFtdLCAiY29tYm9Db3VudCI6IDAsICJjb21ib1RpbWVyIjogMCwgImNvbWJvTXVsdGlwbGllciI6IDEsICJtYXhDb21ibyI6IDAsICJjcmVkaXRzIjogMTAwMDAsICJjcHMiOiAwLCAiYnVpbGRpbmdzIjoge30sICJydW5NaXNzaWxlc0Rlc3Ryb3llZCI6IDAsICJydW5Cb3NzZXNEZWZlYXRlZCI6IDAsICJhY2hpZXZlbWVudFRvYXN0cyI6IFtdLCAid2VhcG9uc1VzZWRUaGlzTGV2ZWwiOiBbXX19
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjogMSwgInN0YXRlIjogeyJzY29yZSI6IDAsICJsZXZlbCI6IDUsICJjaXRpZXMiOiBbeyJ4IjogNDAsICJhbGl2ZSI6IHRydWUsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogMTYwLCAiYWxpdmUiOiB0cnVlLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDI4MCwgImFsaXZlIjogdHJ1ZSwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiA2ODAsICJhbGl2ZSI6IHRydWUsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogODAwLCAiYWxpdmUiOiB0cnVlLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDkyMCwgImFsaXZlIjogdHJ1ZSwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9XSwgImJhdHRlcmllcyI6IFt7IngiOiA0MCwgInkiOiA1ODAsICJhbW1vIjogMTAsICJtYXhBbW1vIjogMTAsICJkaXNhYmxlZCI6IDB9LCB7IngiOiA0ODAsICJ5IjogNTgwLCAiYW1tbyI6IDEwLCAibWF4QW1tbyI6IDEwLCAiZGlzYWJsZWQiOiAwfSwgeyJ4IjogOTIwLCAieSI6IDU4MCwgImFtbW8iOiAxMCwgIm1heEFtbW8iOiAxMCwgImRpc2FibGVkIjogMH1dLCAiaW5jb21pbmdNaXNzaWxlcyI6IFtdLCAiY291bnRlck1pc3NpbGVzIjogW10LCAiZXhwbG9zaW9ucyI6IFtdLCAicGFydGljbGVzIjogW10LCAiYm9tYmVycyI6IFtdLCAiYXN0ZXJvaWRzIjogW10LCAiZ2FtZU92ZXIiOiBmYWxzZSwgInBoYXNlIjogInBsYXlpbmciLCAibGV2ZWxDb21wbGV0ZSI6IGZhbHNlLCAibGV2ZWxUcmFuc2l0aW9uVGltZXIiOiAwLCAibWlzc2lsZVNwYXduVGltZXIiOiA2MCwgIm1pc3NpbGVzU3Bhd25lZFRoaXNMZXZlbCI6IDAsICJ0b3RhbE1pc3NpbGVzVGhpc0xldmVsIjogMjAsICJjdXJzb3JYIjogNDgwLCAiY3Vyc29yWSI6IDMyMCwgInN0YXJzIjogW10LCAic2NyZWVuU2hha2UiOiAwLCAiYm9udXNUZXh0IjogW10LCAidXBncmFkZXMiOiB7ImJsYXN0UmFkaXVzIjogMCwgIm1pc3NpbGVTcGVlZCI6IDAsICJleHRyYUFtbW8iOiAwLCAiY2hhaW5SZWFjdGlvbiI6IDAsICJhcm1vclBsYXRpbmciOiAwLCAibXVsdGlTaG90IjogMCwgImVtcEJ1cnN0IjogMCwgImx1Y2t5U3RyaWtlIjogMCwgImF1dG9UdXJyZXQiOiAwLCAic2hpZWxkR2VuZXJhdG9yIjogMCwgImxhc2VyV2VhcG9uIjogMywgInN3YXJtV2VhcG9uIjogMywgIm1pbmVXZWFwb24iOiAzfSwgInNob3BIb3ZlciI6IC0xLCAiYXV0b1R1cnJldFRpbWVyIjogMCwgInNoaWVsZEhpdHMiOiBbMCwgMCwgMCwgMCwgMCwgMF0sICJlbXBBY3RpdmUiOiAwLCAidG90YWxTcGVudCI6IDAsICJibGl6emFyZEFscGhhIjogMCwgImJsaXp6YXJkUGFydGljbGVzIjogW10LCAiZXJ1cHRpb25UaW1lciI6IDAsICJlcnVwdGlvbkFjdGl2ZSI6IDAsICJhc3Rlcm9pZFNwYXduVGltZXIiOiAwLCAiYm9tYmVyU3Bhd25UaW1lciI6IDAsICJ6b25lSW50cm9UaW1lciI6IDAsICJwcmV2aW91c1pvbmVJZCI6IDAsICJoaWdoU2NvcmUiOiAwLCAiYXV0b01vZGUiOiBmYWxzZSwgImJvc3MiOiBudWxsLCAiYm9zc0RlZmVhdGVkIjogZmFsc2UsICJpc0Jvc3NMZXZlbCI6IHRydWUsICJzcGVjaWFsV2VhcG9ucyI6IFt7InR5cGUiOiAibGFzZXIiLCAiY2hhcmdlcyI6IDMsICJtYXhDaGFyZ2VzIjogMywgImNvb2xkb3duVGltZXIiOiAwfSwgeyJ0eXBlIjogInN3YXJtIiwgImNoYXJnZXMiOiA2LCAibWF4Q2hhcmdlcyI6IDYsICJjb29sZG93blRpbWVyIjogMH0sIHsidHlwZSI6ICJtaW5lIiwgImNoYXJnZXMiOiA5LCAibWF4Q2hhcmdlcyI6IDksICJjb29sZG93blRpbWVyIjogMH1dLCAic2VsZWN0ZWRXZWFwb24iOiAtMSwgIm1pbmVzIjogW10sICJsYXNlckJlYW1zIjogW10sICJjb21ib0NvdW50IjogMCwgImNvbWJvVGltZXIiOiAwLCAiY29tYm9NdWx0aXBsaWVyIjogMSwgIm1heENvbWJvIjogMCwgImNyZWRpdHMiOiAxMDAwMCwgImNwcyI6IDAsICJidWlsZGluZ3MiOiB7fSwgInJ1bk1pc3NpbGVzRGVzdHJveWVkIjogMCwgInJ1bkJvc3Nlc0RlZmVhdGVkIjogMCwgImFjaGlldmVtZW50VG9hc3RzIjogW10sICJ3ZWFwb25zVXNlZFRoaXNMZXZlbCI6IFtdfX0=
```

## 📝 License

This project is open source.
