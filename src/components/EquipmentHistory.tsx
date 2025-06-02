import React from 'react';
import { Equipment } from '../models/Equipment';
import { EquipmentCard } from './EquipmentCard';

interface EquipmentHistoryProps {
    equipmentHistory: Equipment[];
    onClearHistory: () => void;
}

export const EquipmentHistory: React.FC<EquipmentHistoryProps> = ({
    equipmentHistory,
    onClearHistory
}) => {
    if (equipmentHistory.length === 0) return null;

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">📜 生成历史</h3>
                <button
                    onClick={onClearHistory}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded border border-red-400/30 hover:border-red-300/30"
                >
                    清除历史
                </button>
            </div>
            <div className="grid gap-3">
                {equipmentHistory.map((equipment, index) => (
                    <EquipmentCard
                        key={equipment.id}
                        equipment={equipment}
                        showIndex={equipmentHistory.length - index}
                        isHistory={true}
                    />
                ))}
            </div>
        </div>
    );
}; 