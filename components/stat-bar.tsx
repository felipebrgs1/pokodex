interface StatBarProps {
    label: string;
    value: number;
    color: string;
    maxValue?: number;
}

export function StatBar({ label, value, color, maxValue = 150 }: StatBarProps) {
    const percentage = (value / maxValue) * 100;

    return (
        <div>
            <div className='flex justify-between text-sm mb-1'>
                <span>{label}</span>
                <span>{value}</span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                    className={`h-2 rounded-full ${color}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
