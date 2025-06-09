interface HeaderProps {
    title: string;
    subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    return (
        <div className='text-center mb-6'>
            <h1 className='text-4xl font-bold text-white mb-2'>{title}</h1>
            <p className='text-blue-100'>{subtitle}</p>
        </div>
    );
}
