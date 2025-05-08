import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { MapPin } from "lucide-react";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";

interface iAppProps {
    job: {
        id: string;
        createdAt: Date;
        Company: {
            about: string;
            name: string;
            province: string;
            logo: string;
        };
        jobTitle: string;
        jobProvince: string;
        employmentType: string;
        salaryFrom: number;
        salaryTo: number;
    }
}

export function JobCard({ job }: iAppProps) {
    return (
        <Link href={`/job/${job.id}`}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary">
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Mobile view layout */}
                        <div className="md:hidden flex flex-row gap-4 items-center w-full justify-between">
                            <Image
                                src={job.Company.logo}
                                alt={job.Company.name}
                                width={48}
                                height={48}
                                className="size-12 rounded-lg"
                            />

                            {/* Mobile location and time info */}
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-2">
                                    <MapPin className="size-4" />
                                    <h1>{job.jobProvince}</h1>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {formatRelativeTime(job.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Desktop/tablet view logo */}
                        <div className="hidden md:block">
                            <Image
                                src={job.Company.logo}
                                alt={job.Company.name}
                                width={48}
                                height={48}
                                className="size-12 rounded-lg"
                            />
                        </div>

                        <div>
                            <h1 className="text-xl md:text-2xl font-bold">{job.jobTitle}</h1>
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm text-muted-foreground">
                                    {job.Company.name}
                                </p>
                                <span className="hidden md:inline text-muted-foreground">
                                    •
                                </span>
                                <Badge className="rounded-full" variant="secondary">
                                    {job.employmentType}
                                </Badge>
                                <span className="hidden md:inline text-muted-foreground">
                                    •
                                </span>
                                <Badge className="rounded-full">
                                    {job.jobProvince}
                                </Badge>
                                <span className="hidden md:inline text-muted-foreground">
                                    •
                                </span>
                                <p className="text-sm text-muted-foreground">
                                    {formatCurrency(job.salaryFrom)} -{" "}
                                    {formatCurrency(job.salaryTo)}
                                </p>
                            </div>
                        </div>

                        {/* Desktop location and time info */}
                        <div className="hidden md:block md:ml-auto text-right">
                            <div className="flex items-center gap-2 justify-end">
                                <MapPin className="size-4" />
                                <h1>{job.jobProvince}</h1>
                            </div>
                            <p className="text-sm text-muted-foreground md:text-right">
                                {formatRelativeTime(job.createdAt)}
                            </p>
                        </div>
                    </div>

                    <p className="text-base text-muted-foreground line-clamp-2 !mt-5">
                        {job.Company.about}
                    </p>
                </CardHeader>
            </Card>
        </Link>
    )
}