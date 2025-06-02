import React from 'react';

interface CapacityBarProps {
    used: number;
    total: number;
}

export const CapacityBar: React.FC<CapacityBarProps> = ({ used, total }) => {
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