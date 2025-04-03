import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { EmptyState } from "@/components/general/EmptyState";
import { JobCard } from "@/components/general/JobCard";
//test
async function getFavorites(userId: string) {
    const data = await prisma.savedJobPost.findMany({
        where: {
            userId: userId,
        },
        select: {
            JobPost: {
                select: {
                    id: true,
                    jobTitle: true,
                    salaryFrom: true,
                    salaryTo: true,
                    employmentType: true,
                    jobProvince: true,
                    createdAt: true,
                    Company: {
                        select: {
                            name: true,
                            logo: true,
                            province: true,
                            about: true,
                        },
                    },
                },
            },
        },
    });

    return data;
}

export default async function FavoritesPage() {
    const session = await requireUser();
    const data = await getFavorites(session?.id as string);

    if (data.length === 0) {
        return (
            <div className="grid grid-cols-1 mt-5 gap-4">
                <span className="text-2xl font-bold">รายการโปรด</span>
                <EmptyState
                    title="ไม่มีรายการโปรด"
                    description="คุณยังไม่มีรายการโปรด คุณสามารถเริ่มต้นด้วยการเรียกดูงานที่คุณสนใจ"
                    buttonText="ดูงานที่คุณสนใจ"
                    href="/"
                />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 mt-5 gap-4">
            <span className="text-2xl font-bold">รายการโปรด</span>
            {data.filter(favorite => favorite.JobPost.Company !== null).map((favorite) => (
                <JobCard
                    key={favorite.JobPost.id}
                    job={{
                        ...favorite.JobPost,
                        Company: favorite.JobPost.Company!
                    }}
                />
            ))}
        </div>
    )
}