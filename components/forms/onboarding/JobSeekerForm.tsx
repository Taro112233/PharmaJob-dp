import { provinceList } from "@/app/utils/provinceList";
import { jobSeekerSchema } from "@/app/utils/zodSchemas";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from 'next/image';
import { useState } from "react";
import { createJobSeeker } from "@/app/actions";
import PdfImage from "@/public/pdf.png";

export function JobSeekerForm() {
    const form = useForm<z.infer<typeof jobSeekerSchema>>({
        resolver: zodResolver(jobSeekerSchema),
        defaultValues: {
            name: "",
            province: "",
            district: "",
            subDistrict: "",
            about: "",
            resume: "",
            gmail: "",
            lineAccount: "",
            tel1: "",
            tel2: "",
        },
    });

    const [pending, setPending] = useState(false);

    async function onSubmit(data: z.infer<typeof jobSeekerSchema>) {
        try {
            setPending(true);
            await createJobSeeker(data);
        } catch (error) {
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                console.log("Error creating job seeker");
            }
        } finally {
            setPending(false);
        }

    }

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ชื่อ-สกุล<FormMessage /></FormLabel>
                                <FormControl>
                                    <Input placeholder="ระบุชื่อของคุณ" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>จังหวัด<FormMessage /></FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
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
                                </FormControl>


                            </FormItem>
                        )}
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="district"
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
                        name="subDistrict"
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
                        name="gmail"
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
                        name="lineAccount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Line<FormMessage /></FormLabel>
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
                        name="tel1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>เบอร์โทร (หลัก)<FormMessage /></FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tel2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>เบอร์โทร (รอง)<FormMessage /></FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>

                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ข้อมูลเกี่ยวกับคุณ<FormMessage /></FormLabel>
                            <FormControl>
                                <Textarea placeholder="บอกเราเกี่ยวกับตัวคุณ..." {...field} />
                            </FormControl>

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resume (PDF)<FormMessage /></FormLabel>
                            <FormControl>
                                <div>
                                    {field.value ? (
                                        <div className="relative w-fit">
                                            <Image
                                                src={PdfImage}
                                                alt="pdf resume image"
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
                                        <UploadDropzone endpoint="resumeUploader"
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

                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? "กำลังบันทึก..." : "บันทึก"}
                </Button>
            </form>
        </Form>
    )
}