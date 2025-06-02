import React from 'react';
import { Sword, Shield, Sparkles, Hammer } from 'lucide-react';
import { Equipment, Enchantment, Quality, SkillEnchantment, EquipmentState } from '../models/Equipment';
import { CapacityBar } from './CapacityBar';

interface EquipmentCardProps {
    equipment: Equipment;
    showTimestamp?: boolean;
    showIndex?: number;
    isHistory?: boolean;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
    equipment,
    showTimestamp = true,
    showIndex,
    isHistory = false
}) => {
    // 获取装备稀有度颜色
    const getRarityColor = (quality: Quality): string => {
        const rarityColors: Record<Quality, string> = {
            'darkstar': 'text-red-500',
            'legendary': 'text-orange-500',
            'epic': 'text-purple-500',
            'rare': 'text-blue-500'
        };
        return rarityColors[quality];
    };

    // 获取品质背景色
    const getQualityBg = (quality: Quality, state: EquipmentState): string => {
        const qualityBgs: Record<Quality, string> = {
            'darkstar': 'bg-gradient-to-r from-red-900/20 to-red-600/20 border-red-500/50',
            'legendary': 'bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border-orange-500/50',
            'epic': 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/50',
            'rare': 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/50'
        };

        const stateBg = state === 'cursed' ?
            'shadow-[inset_0_0_15px_rgba(200,0,0,0.3)]' :
            state === 'corrupted' ?
                'shadow-[inset_0_0_15px_rgba(128,0,128,0.3)]' : '';

        return `${qualityBgs[quality]} ${stateBg}`;
    };

    // 获取附魔词条样式
    const getEnchantmentStyle = (enchantment: Enchantment): string => {
        if (enchantment.type === 'negative') {
            return 'bg-red-900/30 text-red-300 border border-red-500/30';
        }
        if (enchantment.type === 'attribute') {
            if (enchantment.isAdvanced) {
                return 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/30';
            } else {
                return 'bg-green-600/20 text-green-300 border border-green-500/30';
            }
        } else {
            return 'bg-blue-600/20 text-blue-300 border border-blue-500/30';
        }
    };

    // 获取装备图标
    const getEquipmentIcon = (noun: string): React.ReactElement => {
        if (noun.includes('剑') || noun.includes('斧') || noun.includes('锤') || noun.includes('枪')) {
            return <Sword className="w-6 h-6" />;
        } else if (noun.includes('盾') || noun.includes('甲') || noun.includes('盔')) {
            return <Shield className="w-6 h-6" />;
        } else {
            return <Sparkles className="w-6 h-6" />;
        }
    };

    // 获取装备名称颜色
    const getEquipmentNameStyle = (quality: Quality, state: EquipmentState): string => {
        const rarityColor = getRarityColor(quality);
        const stateClass = state === 'cursed' ? 'animate-pulse' :
            state === 'corrupted' ? 'animate-pulse' : '';
        return `${rarityColor} ${stateClass}`;
    };

    const renderEnchantments = (enchantments: Enchantment[], isCompact: boolean = false) => {
        if (isCompact) {
            return (
                <div className="flex flex-wrap gap-1 mt-2">
                    {enchantments.map((enchantment, index) => (
                        <span
                            key={index}
                            className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getEnchantmentStyle(enchantment)}`}
                            title={`${enchantment.category}${enchantment.type === 'skill' ? ` (${(enchantment as SkillEnchantment).belongsTo}系)` : ''}`}
                        >
                            {enchantment.display}
                            {enchantment.upgradeable && (
                                <Hammer className="w-3 h-3 text-yellow-500" />
                            )}
                        </span>
                    ))}
                </div>
            );
        }

        return (
            <div className="w-full">
                <div className="text-sm text-gray-300 mb-2">附魔词条:</div>
                <div className="space-y-2">
                    {enchantments.map((enchantment, index) => (
                        <div
                            key={index}
                            className={`text-sm px-3 py-2 rounded-lg ${getEnchantmentStyle(enchantment)}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{enchantment.display}</span>
                                <div className="flex items-center gap-2">
                                    {enchantment.upgradeable && (
                                        <Hammer className="w-4 h-4 text-yellow-500" />
                                    )}
                                    <span className="text-xs opacity-70">
                                        {enchantment.category}
                                        {enchantment.type === 'skill' && ` (${(enchantment as SkillEnchantment).belongsTo}系)`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={`rounded-lg p-4 border-2 ${getQualityBg(equipment.quality, equipment.state)} ${isHistory ? 'hover:scale-[1.02] transition-transform' : ''}`}>
            <div className="flex items-start gap-3">
                <div className={getEquipmentNameStyle(equipment.quality, equipment.state)}>
                    {getEquipmentIcon(equipment.noun)}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div className={`font-semibold ${getEquipmentNameStyle(equipment.quality, equipment.state)}`}>
                            {equipment.name}
                        </div>
                        {showIndex !== undefined && (
                            <div className="text-xs text-gray-500">
                                #{showIndex}
                            </div>
                        )}
                    </div>
                    {showTimestamp && (
                        <div className="text-xs text-gray-400 mb-2">
                            {equipment.timestamp}
                        </div>
                    )}
                    <div className="flex gap-3 text-xs">
                        <div className="text-yellow-400">
                            等级: {equipment.level}
                        </div>
                    </div>
                    <div className="mt-1 w-full">
                        <div className="text-gray-400 text-xs mb-1">附魔容量:</div>
                        <CapacityBar
                            used={equipment.usedCapacity}
                            total={equipment.enchantmentCapacity}
                        />
                    </div>

                    {equipment.enchantments.length > 0 && (
                        renderEnchantments(equipment.enchantments, isHistory)
                    )}
                </div>
            </div>
        </div>
    );
}; 