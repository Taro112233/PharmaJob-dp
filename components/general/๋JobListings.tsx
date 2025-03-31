import { prisma } from "@/app/utils/db"
import { EmptyState } from "./EmptyState";
import { JobCard } from "./JobCard";
import { MainPagination } from "./MainPagination";
import { JobPostStatus } from "@prisma/client";

async function getData({
    page = 1,
    pageSize = 4,
    jobTypes = [],
    province = "",
}: {
    page: number;
    pageSize: number;
    jobTypes?: string[];
    province?: string;
}) {
    const skip = (page - 1) * pageSize;

    const where = {
        status: JobPostStatus.ACTIVE,
        ...(jobTypes.length > 0 && {
            employmentType: {
                in: jobTypes,
            },
        }),
        ...(province &&
            province !== "All" && {
            jobProvince: province,
        }
        )
    };

    const [data, totalCount] = await Promise.all([
        prisma.jobPost.findMany({
            where: where,  // Use the dynamic where object instead
            take: pageSize,
            skip: skip,
            select: {
                jobTitle: true,
                id: true,
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
            orderBy: {
                createdAt: "desc"
            },
        }),

        prisma.jobPost.count({
            where: where,  // Also use it here for consistent counts
        }),
    ]);

    return {
        jobs: data,
        totalPages: Math.ceil(totalCount / pageSize),
    };
}

export async function JobListings({
    currentPage,
    jobTypes,
    province,
}: {
    currentPage: number;
    jobTypes: string[];
    province: string;
}) {
    const { jobs, totalPages } = await getData({
        page: currentPage,
        pageSize: 4,
        jobTypes: jobTypes,
        province: province,
    });

    return (
        <>
            {jobs.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {jobs.filter(job => job.Company !== null).map((job) => (
                        <JobCard key={job.id} job={{ ...job, Company: job.Company as { name: string; logo: string; province: string; about: string } }} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="ไม่พบงานที่คุณค้นหา"
                    description="ลองค้นหาด้วยชื่อตำแหน่งงานหรือสถานที่ที่แตกต่างกัน"
                    buttonText="ล้างตัวกรองทั้งหมด"
                    href="/"
                />
            )}

            <div className="flex justify-center mt-6">
                <MainPagination totalPages={totalPages} currentPage={currentPage} />
            </div>
        </>
    )
}