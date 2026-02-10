import React, { useState } from 'react';
import { OrbitalUpgradeDefinition, ORBITAL_UPGRADE_DEFS, getOrbitalUpgradeCost, OrbitalUpgradeWing } from '../data/orbitalUpgrades';

interface OrbitalCommandProps {
    credits: number;
    upgrades: Record<string, number>;
    onBuy: (def: OrbitalUpgradeDefinition) => void;
    onClose: () => void;
}

export function OrbitalCommand({ credits, upgrades, onBuy, onClose }: OrbitalCommandProps) {
    const [activeWing, setActiveWing] = useState<OrbitalUpgradeWing>('offense');

    const wings: OrbitalUpgradeWing[] = ['offense', 'defense', 'economy'];
    const wingIcons: Record<OrbitalUpgradeWing, string> = {
        offense: '⚔️',
        defense: '🛡️',
        economy: '💰',
    };

    const filteredUpgrades = ORBITAL_UPGRADE_DEFS.filter(def => def.wing === activeWing);

    return (
        <div className="absolute inset-0 bg-gray-900/95 z-40 flex flex-col p-8 text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-blue-400 tracking-wider">ORBITAL COMMAND</h1>
                    <div className="text-sm text-blue-600">PRESTIGE TECH LINK ESTABLISHED</div>
                </div>

                <div className="text-right">
                    <div className="text-xs text-gray-400">COMMAND CREDITS</div>
                    <div className="text-2xl font-mono text-yellow-400 font-bold">
                        ⬡ {credits.toLocaleString()}
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mb-6 border-b border-gray-700 pb-2">
                {wings.map(wing => (
                    <button
                        key={wing}
                        onClick={() => setActiveWing(wing)}
                        className={`px-6 py-2 rounded-t font-bold transition-all ${activeWing === wing
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        {wingIcons[wing]} {wing.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 custom-scrollbar pr-2">
                {filteredUpgrades.map(def => {
                    const currentLevel = upgrades[def.id] || 0;
                    const cost = getOrbitalUpgradeCost(def, currentLevel);
                    const isMaxed = currentLevel >= def.maxLevel;
                    const canAfford = !isMaxed && credits >= cost;

                    return (
                        <div
                            key={def.id}
                            className={`p-4 rounded border transition-all ${isMaxed
                                    ? 'bg-blue-900/20 border-blue-500/30'
                                    : canAfford
                                        ? 'bg-gray-800 border-gray-600 hover:border-blue-400'
                                        : 'bg-gray-800/50 border-gray-700 opacity-60'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">{def.icon}</div>
                                    <div>
                                        <div className="font-bold">{def.name}</div>
                                        <div className="text-xs text-gray-400">
                                            Level {currentLevel} / {def.maxLevel}
                                        </div>
                                    </div>
                                </div>

                                {!isMaxed && (
                                    <button
                                        onClick={() => canAfford && onBuy(def)}
                                        disabled={!canAfford}
                                        className={`px-4 py-1.5 rounded font-bold text-sm ${canAfford
                                                ? 'bg-yellow-600 hover:bg-yellow-500 text-white'
                                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        Buy: {cost}
                                    </button>
                                )}
                                {isMaxed && (
                                    <div className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs rounded border border-blue-800">
                                        MAXED
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-300 text-sm mt-2">{def.description}</p>

                            {/* Progress Bar */}
                            <div className="mt-4 h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-300"
                                    style={{ width: `${(currentLevel / def.maxLevel) * 100}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end">
                <button
                    onClick={onClose}
                    className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-lg transition-transform transform hover:scale-105"
                >
                    RETURN TO TITLE
                </button>
            </div>
        </div>
    );
}
