import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { companySchema } from "@/app/utils/zodSchemas"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { provinceList } from "@/app/utils/provinceList";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/components/general/UploadThingReexported";
import { createCompany } from "@/app/actions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { XIcon } from "lucide-react";

export function CompanyForm() {
    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: "",
            province: "",
            district: "",
            subDistrict: "",
            about: "",
            logo: "",
            gmail: "",
            lineAccount: "",
            tel1: "",
            tel2: "",
        },
    });

    const [pending, setPending] = useState(false);

    async function onSubmit(data: z.infer<typeof companySchema>) {
        try {
            setPending(true);
            await createCompany(data);
        } catch (error) {
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                console.log("Error creating company");
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
                                <FormLabel>ชื่อบริษัท<FormMessage /></FormLabel>
                                <FormControl>
                                    <Input placeholder="ระบุชื่อบริษัทของคุณ" {...field} />
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
                                <FormLabel>เบอร์ผู้ติดต่อ (หลัก)<FormMessage /></FormLabel>
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
                                <FormLabel>เบอร์ผู้ติดต่อ (รอง)<FormMessage /></FormLabel>
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
                            <FormLabel>ข้อมูลเกี่ยวกับบริษัท<FormMessage /></FormLabel>
                            <FormControl>
                                <Textarea placeholder="บอกเราหน่อยว่าบริษัทของคุณเป็นอย่างไร" {...field} />
                            </FormControl>

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="logo"
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

                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? "กำลังบันทึก..." : "บันทึก"}
                </Button>
            </form>
        </Form>
    )
}