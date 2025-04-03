import { saveJobPost, unSaveJobPost } from "@/app/actions";
import arcjet, { detectBot, tokenBucket } from "@/app/utils/arcjet";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/listOfBenefits";
import { JsonToHtml } from "@/components/general/JsonToHtml";
import { SaveJobButton } from "@/components/general/SubmitButtons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { request } from "@arcjet/next";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const aj = arcjet
    .withRule(
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW",],
        })
    )

function getClient(session: boolean) {
    if (session) {
        return aj.withRule(
            tokenBucket({
                mode: "DRY_RUN",
                capacity: 100,
                interval: 60,
                refillRate: 30,
            })
        );
    } else {
        return aj.withRule(
            tokenBucket({
                mode: "DRY_RUN",
                capacity: 100,
                interval: 60,
                refillRate: 10,
            })
        );
    }
}

async function getJob(jobId: string, userId?: string) {

    const [jobData, savedJob] = await Promise.all([
        await prisma.jobPost.findUnique({
            where: {
                status: "ACTIVE",
                id: jobId,
            },
            select: {
                jobTitle: true,
                jobType: true,
                jobProvince: true,
                jobDistrict: true,
                jobSubDistrict: true,
                employmentType: true,
                salaryFrom: true,
                salaryTo: true,
                timeFrom: true,
                timeTo: true,
                jobDescription: true,
                benefits: true,
                listingDuration: true,
                createdAt: true,
                Company: {
                    select: {
                        name: true,
                        logo: true,
                        about: true,
                        province: true,
                        district: true,
                        subDistrict: true,
                        gmail: true,
                        lineAccount: true,
                        tel1: true,
                        tel2: true,
                    },
                },
            },
        }),

        userId
            ?
            prisma.savedJobPost.findUnique({
                where: {
                    userId_jobPostId: {
                        userId: userId,
                        jobPostId: jobId,
                    },
                },
                select: {
                    id: true,
                },
            })
            : null,
    ]);

    if (!jobData) {
        return notFound();
    }

    return {
        jobData,
        savedJob,
    }
}

type Params = Promise<{ jobId: string }>;
export default async function JobIdPage({ params }: { params: Params }) {
    const { jobId } = await params;

    const session = await auth();

    const req = await request();

    const decision = await getClient(!!session).protect(req, { requested: 10 });

    if (decision.isDenied()) {
        throw new Error("Forbidden");
    }

    const { jobData: data, savedJob } = await getJob(jobId, session?.user?.id);
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-8 col-span-2">
                {/* header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{data.jobTitle}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="font-medium">{data.Company?.name}</p>

                            <Badge className="rounded-full" variant="secondary">
                                {data.employmentType}
                            </Badge>
                            <span className="hidden md:inline text-muted-foreground">•</span>

                            <Badge className="rounded-full">
                                {data.jobProvince}
                            </Badge>
                        </div>
                    </div>

                    {session?.user ? (
                        <form action={
                            savedJob
                                ? unSaveJobPost.bind(null, savedJob.id)
                                : saveJobPost.bind(null, jobId)
                        }
                        >
                            <SaveJobButton savedJob={!!savedJob} />
                        </form>
                    ) : (
                        <Link
                            href="/login"
                            className={buttonVariants({ variant: "outline" })}
                        >
                            <Heart className="size-4" />
                            รายการโปรด
                        </Link>
                    )}
                </div>

                <section>
                    <JsonToHtml json={JSON.parse(data.jobDescription)} />
                </section>

                <section>
                    <h3 className="font-semibold mb-4">สวัสดิการ</h3>

                    <div className="flex flex-wrap gap-3">
                        {benefits.map((benefit) => {

                            const isOffered = data.benefits.includes(benefit.id)
                            return (
                                <Badge
                                    className={cn(
                                        isOffered ? '' : 'opacity-75 cursor-not-allowed',
                                        "text-sm px-4 py-1.5 rounded-full"
                                    )}
                                    key={benefit.id}
                                    variant={isOffered ? "default" : "outline"}
                                >
                                    <span className="flex items-center gap-2">
                                        {benefit.icon}
                                        {benefit.label}
                                    </span>
                                </Badge>
                            )
                        })}
                    </div>
                </section>
            </div>

            <div className="space-y-6">
                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">สมัครงานตอนนี้</h3>
                            <span className="text-sm text-muted-foreground">
                                กรุณาแจ้งให้ {data.Company?.name} ทราบว่าคุณพบงานนี้ผ่านทาง <span className="text-primary">&ldquo;หางานเภสัช&rdquo;</span> เพื่อช่วยให้แพลตฟอร์มของเราเติบโตและพัฒนาต่อไป 💚
                            </span>
                        </div>

                        <Button className="w-full">ส่งใบสมัคร</Button>
                    </div>
                </Card>
                {/* job details card */}
                <Card className="p-6">
                    <h3 className="font-semibold">รายละเอียดงาน</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">สมัครก่อนวันที่</span>
                            <span className="text-sm">
                                {new Date(data.createdAt.getTime() + data.listingDuration * 24 * 60 * 60 * 1000).toLocaleDateString("th-TH", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        {/* <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">เริ่มประกาศวันที่</span>

                            <span className="text-sm">
                                {data.createdAt.toLocaleDateString('th-TH', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div> */}

                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ประเภทธุรกิจ</span>

                            <span className="text-sm">
                                {data.jobType}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ประเภทพนักงาน</span>

                            <span className="text-sm">
                                {data.employmentType}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">จังหวัด</span>

                            <span className="text-sm">
                                {data.jobProvince}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">อำเภอ/เขต</span>

                            <span className="text-sm">
                                {data.jobDistrict}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ตำบล/แขวง</span>

                            <span className="text-sm">
                                {data.jobSubDistrict}
                            </span>
                        </div>

                    </div>
                </Card>

                {/* Company Card */}
                <Card className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Image
                                src={data.Company?.logo ?? "/placeholder.png"}
                                alt={"Company logo"}
                                width={48}
                                height={48}
                                className="rounded-full size-12"
                            />

                            <div className="flex flex-col">
                                <h3 className="font-semibold">{data.Company?.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {data.Company?.about}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}
