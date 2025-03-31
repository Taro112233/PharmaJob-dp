export function formatRelativeTime(date: Date) {
    const now = new Date();
    const diffInDays = Math.floor(
        (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
        return "ใหม่ล่าสุด";
    } else if (diffInDays === 1) {
        return "เมื่อวาน";
    } else {
        return `เมื่อ ${diffInDays} วันที่แล้ว`;
    }
}
