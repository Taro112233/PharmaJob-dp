"use client";

import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { provinceList } from "@/app/utils/provinceList";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const jobTypes = ["Full-time", "Full & Part-time", "Part-time", "Freelance"];

export function JobFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    //get current filter from the url
    const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
    const currentProvince = searchParams.get("province") || "";

    function clearAllFilters() {
        router.push("/");
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            // Reset to page 1 whenever a filter is changed
            params.set("page", "1");

            return params.toString();
        },
        [searchParams]
    );

    function handleJobTypeChange(jobType: string, checked: boolean) {
        const current = new Set(currentJobTypes);

        if (checked) {
            current.add(jobType);
        } else {
            current.delete(jobType);
        }

        const newValue = Array.from(current).join(",");

        router.push(`?${createQueryString("jobTypes", newValue)}`);
    }

    function handleProvinceChange(province: string) {
        router.push(`?${createQueryString("province", province)}`);
    }

    return (
        <Card className="col-span-1 h-fit">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
                <Button
                    onClick={clearAllFilters}
                    variant="destructive"
                    size="sm"
                    className="h-8">
                    <span>Clear</span>
                    <XIcon className="size-4" />
                </Button>
            </CardHeader>
            <Separator className="mb-4" />

            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">ประเภทพนักงาน</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {jobTypes.map((job, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Checkbox onCheckedChange={(checked) => {
                                    handleJobTypeChange(job, checked as boolean);
                                }}
                                    id={job}
                                    checked={currentJobTypes.includes(job)}
                                />
                                <Label className="text-sm font-medium" htmlFor={job}>
                                    {job}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">จังหวัด</Label>

                    <Select onValueChange={(province) => {
                        handleProvinceChange(province);
                    }}
                        value={currentProvince}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือก" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {provinceList.map((province) => (
                                    <SelectItem key={province.id} value={province.name_th}>
                                        <span>{province.name_th}</span>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
