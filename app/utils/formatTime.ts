export function formatTime(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 0,
    }).format(amount);
}