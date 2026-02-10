export type OrbitalUpgradeWing = 'offense' | 'defense' | 'economy';

export interface OrbitalUpgradeDefinition {
    id: string;
    name: string;
    description: string;
    wing: OrbitalUpgradeWing;
    maxLevel: number;
    baseCost: number;
    costScale: number; // multiplier per level
    icon: string;
    // Effect parameters (to be interpreted by game logic)
    effectType: 'ammo_max' | 'city_hp' | 'credit_multiplier' | 'shop_discount' | 'special_cooldown' | 'shield_recharge';
    effectValue: number; // base value per level
}

export const ORBITAL_UPGRADE_DEFS: OrbitalUpgradeDefinition[] = [
    // ─── OFFENSE ─────────────────────────────────────────────────────────
    {
        id: 'silo_expansion',
        name: 'Silo Expansion',
        description: '+2 Max Ammo per battery per level',
        wing: 'offense',
        maxLevel: 5,
        baseCost: 5,
        costScale: 1.5,
        icon: '🏭',
        effectType: 'ammo_max',
        effectValue: 2,
    },
    {
        id: 'rapid_rearm',
        name: 'Rapid Rearm',
        description: '-5% Special Weapon Cooldown per level',
        wing: 'offense',
        maxLevel: 5,
        baseCost: 10,
        costScale: 1.5,
        icon: '⚡',
        effectType: 'special_cooldown',
        effectValue: 0.05,
    },

    // ─── DEFENSE ─────────────────────────────────────────────────────────
    {
        id: 'bunker_tech',
        name: 'Bunker Tech',
        description: 'Cities can survive +1 hit (Global)',
        wing: 'defense',
        maxLevel: 3,
        baseCost: 20,
        costScale: 2.0,
        icon: '🛡️',
        effectType: 'city_hp',
        effectValue: 1,
    },
    {
        id: 'aegis_overclock',
        name: 'Aegis Overclock',
        description: '+10% Shield Recharge Rate',
        wing: 'defense',
        maxLevel: 5,
        baseCost: 8,
        costScale: 1.4,
        icon: '🔋',
        effectType: 'shield_recharge',
        effectValue: 0.1,
    },

    // ─── ECONOMY ─────────────────────────────────────────────────────────
    {
        id: 'auto_salvage',
        name: 'Automated Salvage',
        description: '+10% Credits from kills',
        wing: 'economy',
        maxLevel: 10,
        baseCost: 10,
        costScale: 1.2,
        icon: '💰',
        effectType: 'credit_multiplier',
        effectValue: 0.1,
    },
    {
        id: 'market_influence',
        name: 'Market Influence',
        description: '-5% Shop Prices',
        wing: 'economy',
        maxLevel: 5,
        baseCost: 15,
        costScale: 1.6,
        icon: '📉',
        effectType: 'shop_discount',
        effectValue: 0.05,
    },
];

export function getOrbitalUpgradeCost(def: OrbitalUpgradeDefinition, currentLevel: number): number {
    // Simple geometric series or similar
    return Math.floor(def.baseCost * Math.pow(def.costScale, currentLevel));
}
