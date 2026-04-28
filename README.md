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
eyJ2IjogMSwgInN0YXRlIjogeyJjcmVkaXRzIjogMTAwMDAsICJzY29yZSI6IDAsICJjcHMiOiAwLCAiYnVpbGRpbmdzIjogeyJzb2xhcl9mYXJtIjogMCwgInNjcmFwX3lhcmQiOiAwLCAibXVuaXRpb25zX2ZhY3RvcnkiOiAwLCAib3JiaXRhbF9taW5lIjogMCwgImRlZmVuc2VfY29udHJhY3QiOiAwLCAiYWlfY29yZSI6IDB9LCAibGV2ZWwiOiAxLCAiY2l0aWVzIjogW3sieCI6IDEyMCwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiAyMDAsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogMjgwLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDYwMCwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiA2ODAsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogNzYwLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH1dLCAiYmF0dGVyaWVzIjogW3sieCI6IDQwLCAieSI6IDU4MCwgImFtbW8iOiAxMCwgIm1heEFtbW8iOiAxMCwgImRpc2FibGVkIjogMH0sIHsieCI6IDQ4MCwgInkiOiA1ODAsICJhbW1vIjogMTAsICJtYXhBbW1vIjogMTAsICJkaXNhYmxlZCI6IDB9LCB7IngiOiA5MjAsICJ5IjogNTgwLCAiYW1tbyI6IDEwLCAibWF4QW1tbyI6IDEwLCAiZGlzYWJsZWQiOiAwfV0sICJpbmNvbWluZ01pc3NpbGVzIjogW10sICJjb3VudGVyTWlzc2lsZXMiOiBbXSwgImV4cGxvc2lvbnMiOiBbXSwgInBhcnRpY2xlcyI6IFtdLCAiYm9tYmVycyI6IFtdLCAiYXN0ZXJvaWRzIjogW10sICJnYW1lT3ZlciI6IGZhbHNlLCAicGhhc2UiOiAic2hvcCIsICJsZXZlbENvbXBsZXRlIjogZmFsc2UsICJsZXZlbFRyYW5zaXRpb25UaW1lciI6IDAsICJtaXNzaWxlU3Bhd25UaW1lciI6IDYwLCAibWlzc2lsZXNTcGF3bmVkVGhpc0xldmVsIjogMCwgInRvdGFsTWlzc2lsZXNUaGlzTGV2ZWwiOiAxMCwgImN1cnNvclgiOiA0ODAsICJjdXJzb3JZIjogMzIwLCAic3RhcnMiOiBbXSwgInNjcmVlblNoYWtlIjogMCwgImJvbnVzVGV4dCI6IFtdLCAidXBncmFkZXMiOiB7ImJsYXN0UmFkaXVzIjogMCwgIm1pc3NpbGVTcGVlZCI6IDAsICJleHRyYUFtbW8iOiAwLCAiY2hhaW5SZWFjdGlvbiI6IDAsICJhcm1vclBsYXRpbmciOiAwLCAibXVsdGlTaG90IjogMCwgImVtcEJ1cnN0IjogMCwgImx1Y2t5U3RyaWtlIjogMCwgImF1dG9UdXJyZXQiOiAwLCAic2hpZWxkR2VuZXJhdG9yIjogMCwgImxhc2VyV2VhcG9uIjogMCwgInN3YXJtV2VhcG9uIjogMCwgIm1pbmVXZWFwb24iOiAwfSwgInNob3BIb3ZlciI6IC0xLCAiYXV0b1R1cnJldFRpbWVyIjogMCwgInNoaWVsZEhpdHMiOiBbMCwgMCwgMCwgMCwgMCwgMF0sICJlbXBBY3RpdmUiOiAwLCAidG90YWxTcGVudCI6IDAsICJibGl6emFyZEFscGhhIjogMCwgImJsaXp6YXJkUGFydGljbGVzIjogW10sICJlcnVwdGlvblRpbWVyIjogMCwgImVydXB0aW9uQWN0aXZlIjogMCwgImFzdGVyb2lkU3Bhd25UaW1lciI6IDAsICJib21iZXJTcGF3blRpbWVyIjogMCwgInpvbmVJbnRyb1RpbWVyIjogMCwgInByZXZpb3VzWm9uZUlkIjogMCwgImhpZ2hTY29yZSI6IDAsICJhdXRvTW9kZSI6IGZhbHNlLCAiYm9zcyI6IG51bGwsICJib3NzRGVmZWF0ZWQiOiBmYWxzZSwgImlzQm9zc0xldmVsIjogZmFsc2UsICJzcGVjaWFsV2VhcG9ucyI6IFt7InR5cGUiOiAibGFzZXIiLCAiY2hhcmdlcyI6IDAsICJtYXhDaGFyZ2VzIjogMCwgImNvb2xkb3duVGltZXIiOiAwfSwgeyJ0eXBlIjogInN3YXJtIiwgImNoYXJnZXMiOiAwLCAibWF4Q2hhcmdlcyI6IDAsICJjb29sZG93blRpbWVyIjogMH0sIHsidHlwZSI6ICJtaW5lIiwgImNoYXJnZXMiOiAwLCAibWF4Q2hhcmdlcyI6IDAsICJjb29sZG93blRpbWVyIjogMH1dLCAic2VsZWN0ZWRXZWFwb24iOiAtMSwgIm1pbmVzIjogW10sICJsYXNlckJlYW1zIjogW10sICJjb21ib0NvdW50IjogMCwgImNvbWJvVGltZXIiOiAwLCAiY29tYm9NdWx0aXBsaWVyIjogMSwgIm1heENvbWJvIjogMCwgInJ1bk1pc3NpbGVzRGVzdHJveWVkIjogMCwgInJ1bkJvc3Nlc0RlZmVhdGVkIjogMCwgImFjaGlldmVtZW50VG9hc3RzIjogW10sICJ3ZWFwb25zVXNlZFRoaXNMZXZlbCI6IFtdfX0=
```

**Level 5 Boss Fight Ready (Fully Loaded)**
```
eyJ2IjogMSwgInN0YXRlIjogeyJjcmVkaXRzIjogMTAwMDAsICJzY29yZSI6IDAsICJjcHMiOiAwLCAiYnVpbGRpbmdzIjogeyJzb2xhcl9mYXJtIjogMCwgInNjcmFwX3lhcmQiOiAwLCAibXVuaXRpb25zX2ZhY3RvcnkiOiAwLCAib3JiaXRhbF9taW5lIjogMCwgImRlZmVuc2VfY29udHJhY3QiOiAwLCAiYWlfY29yZSI6IDB9LCAibGV2ZWwiOiA1LCAiY2l0aWVzIjogW3sieCI6IDEyMCwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiAyMDAsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogMjgwLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH0sIHsieCI6IDYwMCwgImhwIjogMTAwLCAibWF4SHAiOiAxMDB9LCB7IngiOiA2ODAsICJocCI6IDEwMCwgIm1heEhwIjogMTAwfSwgeyJ4IjogNzYwLCAiaHAiOiAxMDAsICJtYXhIcCI6IDEwMH1dLCAiYmF0dGVyaWVzIjogW3sieCI6IDQwLCAieSI6IDU4MCwgImFtbW8iOiAxMCwgIm1heEFtbW8iOiAxMCwgImRpc2FibGVkIjogMH0sIHsieCI6IDQ4MCwgInkiOiA1ODAsICJhbW1vIjogMTAsICJtYXhBbW1vIjogMTAsICJkaXNhYmxlZCI6IDB9LCB7IngiOiA5MjAsICJ5IjogNTgwLCAiYW1tbyI6IDEwLCAibWF4QW1tbyI6IDEwLCAiZGlzYWJsZWQiOiAwfV0sICJpbmNvbWluZ01pc3NpbGVzIjogW10sICJjb3VudGVyTWlzc2lsZXMiOiBbXSwgImV4cGxvc2lvbnMiOiBbXSwgInBhcnRpY2xlcyI6IFtdLCAiYm9tYmVycyI6IFtdLCAiYXN0ZXJvaWRzIjogW10sICJnYW1lT3ZlciI6IGZhbHNlLCAicGhhc2UiOiAicGxheWluZyIsICJsZXZlbENvbXBsZXRlIjogZmFsc2UsICJsZXZlbFRyYW5zaXRpb25UaW1lciI6IDAsICJtaXNzaWxlU3Bhd25UaW1lciI6IDYwLCAibWlzc2lsZXNTcGF3bmVkVGhpc0xldmVsIjogMCwgInRvdGFsTWlzc2lsZXNUaGlzTGV2ZWwiOiAyMCwgImN1cnNvclgiOiA0ODAsICJjdXJzb3JZIjogMzIwLCAic3RhcnMiOiBbXSwgInNjcmVlblNoYWtlIjogMCwgImJvbnVzVGV4dCI6IFtdLCAidXBncmFkZXMiOiB7ImJsYXN0UmFkaXVzIjogMCwgIm1pc3NpbGVTcGVlZCI6IDAsICJleHRyYUFtbW8iOiAwLCAiY2hhaW5SZWFjdGlvbiI6IDAsICJhcm1vclBsYXRpbmciOiAwLCAibXVsdGlTaG90IjogMCwgImVtcEJ1cnN0IjogMCwgImx1Y2t5U3RyaWtlIjogMCwgImF1dG9UdXJyZXQiOiAwLCAic2hpZWxkR2VuZXJhdG9yIjogMCwgImxhc2VyV2VhcG9uIjogMywgInN3YXJtV2VhcG9uIjogMywgIm1pbmVXZWFwb24iOiAzfSwgInNob3BIb3ZlciI6IC0xLCAiYXV0b1R1cnJldFRpbWVyIjogMCwgInNoaWVsZEhpdHMiOiBbMCwgMCwgMCwgMCwgMCwgMF0sICJlbXBBY3RpdmUiOiAwLCAidG90YWxTcGVudCI6IDAsICJibGl6emFyZEFscGhhIjogMCwgImJsaXp6YXJkUGFydGljbGVzIjogW10sICJlcnVwdGlvblRpbWVyIjogMCwgImVydXB0aW9uQWN0aXZlIjogMCwgImFzdGVyb2lkU3Bhd25UaW1lciI6IDAsICJib21iZXJTcGF3blRpbWVyIjogMCwgInpvbmVJbnRyb1RpbWVyIjogMCwgInByZXZpb3VzWm9uZUlkIjogMCwgImhpZ2hTY29yZSI6IDAsICJhdXRvTW9kZSI6IGZhbHNlLCAiYm9zcyI6IG51bGwsICJib3NzRGVmZWF0ZWQiOiBmYWxzZSwgImlzQm9zc0xldmVsIjogdHJ1ZSwgInNwZWNpYWxXZWFwb25zIjogW3sidHlwZSI6ICJsYXNlciIsICJjaGFyZ2VzIjogMywgIm1heENoYXJnZXMiOiAzLCAiY29vbGRvd25UaW1lciI6IDB9LCB7InR5cGUiOiAic3dhcm0iLCAiY2hhcmdlcyI6IDYsICJtYXhDaGFyZ2VzIjogNiwgImNvb2xkb3duVGltZXIiOiAwfSwgeyJ0eXBlIjogIm1pbmUiLCAiY2hhcmdlcyI6IDksICJtYXhDaGFyZ2VzIjogOSwgImNvb2xkb3duVGltZXIiOiAwfV0sICJzZWxlY3RlZFdlYXBvbiI6IC0xLCAibWluZXMiOiBbXSwgImxhc2VyQmVhbXMiOiBbXSwgImNvbWJvQ291bnQiOiAwLCAiY29tYm9UaW1lciI6IDAsICJjb21ib011bHRpcGxpZXIiOiAxLCAibWF4Q29tYm8iOiAwLCAicnVuTWlzc2lsZXNEZXN0cm95ZWQiOiAwLCAicnVuQm9zc2VzRGVmZWF0ZWQiOiAwLCAiYWNoaWV2ZW1lbnRUb2FzdHMiOiBbXSwgIndlYXBvbnNVc2VkVGhpc0xldmVsIjogW119fQ==
```

## 📝 License

This project is open source.
