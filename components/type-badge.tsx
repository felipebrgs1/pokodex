import { typeColors } from '@/lib/constants';

interface TypeBadgeProps {
    type: string;
}

export function TypeBadge({ type }: TypeBadgeProps) {
    return (
        <span
            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${typeColors[type]}`}
        >
            {type}
        </span>
    );
}
