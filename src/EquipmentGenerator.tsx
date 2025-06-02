import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Equipment, EquipmentGenerator as Generator } from './models/Equipment';
import { EquipmentCard } from './components/EquipmentCard';
import { EquipmentHistory } from './components/EquipmentHistory';

const EquipmentGenerator = () => {
    const [currentEquipment, setCurrentEquipment] = useState<Equipment | null>(null);
    const [equipmentHistory, setEquipmentHistory] = useState<Equipment[]>(() => {
        // 从 localStorage 加载历史记录
        const savedHistory = localStorage.getItem('equipmentHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });
    const generator = new Generator();

    // 当装备历史记录更新时，保存到 localStorage
    useEffect(() => {
        localStorage.setItem('equipmentHistory', JSON.stringify(equipmentHistory));
    }, [equipmentHistory]);

    // 随机生成装备
    const generateEquipment = (): void => {
        const newEquipment = generator.generateEquipment();
        setCurrentEquipment(newEquipment);
        setEquipmentHistory((prev: Equipment[]) => {
            const newHistory = [newEquipment, ...prev.slice(0, 49)]; // 保留最近50个
            return newHistory;
        });
    };

    // 清除历史记录
    const clearHistory = (): void => {
        if (window.confirm('确定要清除所有历史记录吗？')) {
            setEquipmentHistory([]);
            localStorage.removeItem('equipmentHistory');
        }
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
                            <EquipmentCard equipment={currentEquipment} />
                        </div>
                    </div>
                )}

                {/* 生成历史 */}
                <EquipmentHistory
                    equipmentHistory={equipmentHistory}
                    onClearHistory={clearHistory}
                />
            </div>
        </div>
    );
};

export default EquipmentGenerator; 