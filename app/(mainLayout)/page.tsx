import { JobFilter } from "@/components/general/JobFilters";
import JobListingLoading from "@/components/general/JobListingsLoading";
import { JobListings } from "@/components/general/๋JobListings";
import { Suspense } from "react";

type searchParams = {
    searchParams: Promise<{
        page?: string;
        jobTypes?: string;
        province?: string;
    }>;
};

export default async function Home({ searchParams }: searchParams) {
    const params = await searchParams;

    const currentPage = Number(params.page) || 1;
    const jobTypes = params.jobTypes?.split(",") || [];
    const province = params.province || "";

    const filterKey = `page=${currentPage};types=${jobTypes.join(",")};province=${province}`;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="md:col-span-1">
                <JobFilter />
            </div>

            <div className="md:col-span-2 flex flex-col gap-6">
                <Suspense fallback={<JobListingLoading />} key={filterKey}>
                    <JobListings province={province} currentPage={currentPage} jobTypes={jobTypes} />
                </Suspense>
            </div>
        </div>
    );
}
