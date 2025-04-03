"use client";

import { provinceList } from "@/app/utils/provinceList";
import { jobSchema } from "@/app/utils/zodSchemas";
import { BenefitsSelector } from "@/components/general/BenefitsSelector";
import { SalaryRangeSelector } from "@/components/general/SalaryRangeSelector";
import { TimeRangeSelector } from "@/components/general/TimeRangeSelector";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { JobDescriptionEditor } from "@/components/richTextEditor.tsx/JobDescriptionEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { XIcon } from "lucide-react";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { editJobPost } from "@/app/actions";

interface iAppProps {
    jobPost: {
        jobTitle: string;
        jobType: string;
        jobProvince: string;
        jobDistrict: string;
        jobSubDistrict: string;
        employmentType: string;
        salaryFrom: number;
        salaryTo: number;
        timeFrom: number;
        timeTo: number;
        jobDescription: string;
        benefits: string[];
        listingDuration: number;
        id: string;
        Company: {
            name: string;
            province: string;
            district: string;
            subDistrict: string;
            lineAccount: string | null;
            gmail: string;
            tel1: string;
            tel2: string | null;
            about: string;
            logo: string;
        } | null;
    }
}

export function EditJobForm({ jobPost }: iAppProps) {

    const form = useForm<z.infer<typeof jobSchema>>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            jobTitle: jobPost.jobTitle,
            jobType: jobPost.jobType,
            jobProvince: jobPost.jobProvince,
            jobDistrict: jobPost.jobDistrict,
            jobSubDistrict: jobPost.jobSubDistrict,
            employmentType: jobPost.employmentType,
            salaryFrom: jobPost.salaryFrom,
            salaryTo: jobPost.salaryTo,
            timeFrom: jobPost.timeFrom,
            timeTo: jobPost.timeTo,
            jobDescription: jobPost.jobDescription,
            benefits: jobPost.benefits,
            listingDuration: jobPost.listingDuration,

            companyName: jobPost.Company?.name,
            companyProvince: jobPost.Company?.province,
            companyDistrict: jobPost.Company?.district,
            companySubDistrict: jobPost.Company?.subDistrict,
            companyAbout: jobPost.Company?.about,
            companyLogo: jobPost.Company?.logo,
            companyGmail: jobPost.Company?.gmail,
            companyLineAccount: jobPost.Company?.lineAccount || "",
            companyTel1: jobPost.Company?.tel1,
            companyTel2: jobPost.Company?.tel2 || "",
        }
    });

    const [pending, setPending] = useState(false);

    async function onSubmit(values: z.infer<typeof jobSchema>) {
        try {
            setPending(true);
            await editJobPost(values, jobPost.id);
        } catch (error) {
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                console.log("Error creating job");
            }
        } finally {
            setPending(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-1 lg:col-span-2 flex flex-col gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>ข้อมูลตำแหน่งงาน</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ชื่อที่ทำงาน<FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input placeholder="ระบุชื่อสถานที่" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="jobType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ประเภทธุรกิจ<FormMessage /></FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="เลือก" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="ร้านขายยา">ร้านขายยา</SelectItem>
                                                    <SelectItem value="โรงพยาบาล">โรงพยาบาล</SelectItem>
                                                    <SelectItem value="คลินิก">คลินิก</SelectItem>
                                                    <SelectItem value="ราชการ/ภาครัฐ">ราชการ/ภาครัฐ</SelectItem>
                                                    <SelectItem value="โรงงาน">โรงงาน</SelectItem>
                                                    <SelectItem value="บริษัทยา">บริษัทยา</SelectItem>
                                                    <SelectItem value="วิจัย">วิจัย</SelectItem>
                                                    <SelectItem value="อื่น ๆ">อื่น ๆ</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="employmentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ประเภทพนักงาน<FormMessage /></FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="เลือก" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                                    <SelectItem value="Full & Part-time">Full & Part-time</SelectItem>
                                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                                    <SelectItem value="Freelance">Freelance</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="jobProvince"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>จังหวัด<FormMessage /></FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="เลือก" />
                                                </SelectTrigger>
                                            </FormControl>
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
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="jobDistrict"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>อำเภอ / เขต<FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input placeholder="โปรดระบุ" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="jobSubDistrict"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ตำบล / แขวง<FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input placeholder="โปรดระบุ" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <FormItem>
                                <FormLabel>ค่าตอบแทน (ต่อเดือน)</FormLabel>
                                <FormControl>
                                    <SalaryRangeSelector
                                        control={form.control}
                                        minSalary={0}
                                        maxSalary={150000}
                                        step={1000}
                                    />
                                </FormControl>
                            </FormItem>

                            <FormItem>
                                <FormLabel>เวลาทำงาน (โมง)</FormLabel>
                                <FormControl>
                                    <TimeRangeSelector
                                        control={form.control}
                                        minTime={0}
                                        maxTime={24}
                                        step={1}
                                    />
                                </FormControl>
                            </FormItem>
                        </div>

                        <FormField
                            control={form.control}
                            name="jobDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>รายละเอียดงาน<FormMessage /></FormLabel>
                                    <FormControl>
                                        <JobDescriptionEditor field={field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="benefits"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tag สวัสดิการ</FormLabel>
                                    <FormControl>
                                        <BenefitsSelector field={field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>ข้อมูลบริษัท / องค์กร</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ชื่อบริษัท<FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input placeholder="ระบุชื่อบริษัทของคุณ" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="companyProvince"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>จังหวัด<FormMessage /></FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="เลือก" />
                                                </SelectTrigger>
                                            </FormControl>
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
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="companyDistrict"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>อำเภอ / เขต<FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input placeholder="โปรดระบุ" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="companySubDistrict"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ตำบล / แขวง<FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input placeholder="โปรดระบุ" {...field} />
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="companyGmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email ติดต่อ<FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input placeholder="...@gmail.com" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="companyLineAccount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Line</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="companyTel1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>เบอร์ผู้ติดต่อ (หลัก)<FormMessage /></FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="companyTel2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>เบอร์ผู้ติดต่อ (รอง)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <FormField
                            control={form.control}
                            name="companyAbout"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ข้อมูลเกี่ยวกับบริษัท<FormMessage /></FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="บอกเราหน่อยว่าบริษัทของคุณเป็นอย่างไร" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="companyLogo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Logo บริษัท<FormMessage /></FormLabel>
                                    <FormControl>
                                        <div>
                                            {field.value ? (
                                                <div className="relative w-fit">
                                                    <Image
                                                        src={field.value}
                                                        alt="Company Logo"
                                                        width={100}
                                                        height={100}
                                                        className="rounded-lg"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute -top-2 -right-2"
                                                        onClick={() => field.onChange("")}
                                                    >
                                                        <XIcon className="size-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <UploadDropzone endpoint="imageUploader"
                                                    onClientUploadComplete={(res) => {
                                                        field.onChange(res[0].url);
                                                    }}
                                                    onUploadError={() => {
                                                        console.log("Upload error");
                                                    }}
                                                    className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                                                />
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    </CardContent>
                </Card>

                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                </Button>

            </form>
        </Form>
    );
}