import JobListingsLoading from "@/components/general/JobListingsLoading";
import React from "react";

const LoadingJobs = () => {
    return (
        <div className="grid grid-cols-1 mt-5 gap-4">
            <span className="text-2xl font-bold">รายการโปรด</span>
            <JobListingsLoading />;
        </div>
    )
};

export default LoadingJobs; 