import React, { useState } from 'react';
import { Sword, Shield, Sparkles, RefreshCw, Hammer } from 'lucide-react';
import { Equipment, EquipmentGenerator as Generator, Enchantment, Quality, SkillEnchantment, EquipmentState } from './models/Equipment';

// 容量进度条组件
const CapacityBar = ({ used, total }: { used: number; total: number }) => {
    const percentage = Math.min((used / total) * 100, 100);
    const getBarColor = () => {
        if (percentage >= 90) return 'bg-red-500';
        if (percentage >= 70) return 'bg-yellow-500';
        return 'bg-emerald-500';
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full ${getBarColor()} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="text-xs whitespace-nowrap text-gray-300">
                {used}/{total}
            </div>
        </div>
    );
};

const EquipmentGenerator = () => {
    const [currentEquipment, setCurrentEquipment] = useState<Equipment | null>(null);
    const [equipmentHistory, setEquipmentHistory] = useState<Equipment[]>([]);
    const generator = new Generator();

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

        // 诅咒和堕落状态添加额外的视觉效果
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

    // 随机生成装备
    const generateEquipment = (): void => {
        const newEquipment = generator.generateEquipment();
        setCurrentEquipment(newEquipment);
        setEquipmentHistory((prev: Equipment[]) => [newEquipment, ...prev.slice(0, 9)]); // 保留最近10个
    };

    // 获取装备名称颜色
    const getEquipmentNameStyle = (quality: Quality, state: EquipmentState): string => {
        const rarityColor = getRarityColor(quality);
        const stateClass = state === 'cursed' ? 'animate-pulse' :
            state === 'corrupted' ? 'animate-pulse' : '';
        return `${rarityColor} ${stateClass}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
            <div className="max-w-4xl mx-auto">
                {/* 标题 */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">⚔️ 装备生成器</h1>
                    <p className="text-gray-300">随机生成游戏装备名称</p>
                </div>

                {/* 生成按钮 */}
                <div className="text-center mb-8">
                    <button
                        onClick={generateEquipment}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                    >
                        <RefreshCw className="w-5 h-5" />
                        生成装备
                    </button>
                </div>

                {/* 当前生成的装备 */}
                {currentEquipment && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
                        <div className="text-center">
                            <h2 className="text-xl text-gray-300 mb-4">✨ 新生成的装备</h2>
                            <div className={`flex flex-col items-center gap-4 rounded-lg p-6 border-2 ${getQualityBg(currentEquipment.quality, currentEquipment.state)}`}>
                                <div className="flex items-center gap-4">
                                    <div className={getEquipmentNameStyle(currentEquipment.quality, currentEquipment.state)}>
                                        {getEquipmentIcon(currentEquipment.noun)}
                                    </div>
                                    <div>
                                        <div className={`text-2xl font-bold ${getEquipmentNameStyle(currentEquipment.quality, currentEquipment.state)}`}>
                                            {currentEquipment.name}
                                        </div>
                                        <div className="text-sm text-gray-400 mt-1">
                                            生成时间: {currentEquipment.timestamp}
                                        </div>
                                        <div className="flex gap-3 text-sm mt-1">
                                            <div className="text-yellow-400">
                                                等级: {currentEquipment.level}
                                            </div>
                                        </div>
                                        <div className="mt-1 w-full">
                                            <div className="text-gray-400 text-xs mb-1">附魔容量:</div>
                                            <CapacityBar
                                                used={currentEquipment.usedCapacity}
                                                total={currentEquipment.enchantmentCapacity}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 附魔词条显示 */}
                                {currentEquipment.enchantments.length > 0 && (
                                    <div className="w-full">
                                        <div className="text-sm text-gray-300 mb-2">附魔词条:</div>
                                        <div className="space-y-2">
                                            {currentEquipment.enchantments.map((enchantment, index) => (
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
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* 生成历史 */}
                {equipmentHistory.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                        <h3 className="text-xl font-semibold text-white mb-4">📜 生成历史</h3>
                        <div className="grid gap-3">
                            {equipmentHistory.map((equipment, index) => (
                                <div
                                    key={equipment.id}
                                    className={`rounded-lg p-4 border-2 ${getQualityBg(equipment.quality, equipment.state)} hover:scale-[1.02] transition-transform`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={getEquipmentNameStyle(equipment.quality, equipment.state)}>
                                            {getEquipmentIcon(equipment.noun)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className={`font-semibold ${getEquipmentNameStyle(equipment.quality, equipment.state)}`}>
                                                    {equipment.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    #{equipmentHistory.length - index}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-400 mb-2">
                                                {equipment.timestamp}
                                            </div>
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

                                            {/* 历史装备的附魔词条 */}
                                            {equipment.enchantments.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {equipment.enchantments.map((enchantment, enchantmentIndex) => (
                                                        <span
                                                            key={enchantmentIndex}
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
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EquipmentGenerator; 