
interface iAppProps {
    days: number;
    price: number;
    description: string;
}
export const jobListingDurationPricing: iAppProps[] = [
    {
        "days": 3,
        "price": 100,
        "description": "Basic Boost"
    },
    {
        "days": 7,
        "price": 180,
        "description": "Visibility Plus"
    },
    {
        "days": 14,
        "price": 320,
        "description": "Premium Exposure"
    },
    {
        "days": 30,
        "price": 500,
        "description": "Ultimate Reach"
    }
];