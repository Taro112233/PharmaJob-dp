import { prisma } from "@/app/utils/db"
import { requireUser } from "@/app/utils/requireUser";
import { EditJobForm } from "@/components/forms/onboarding/EditJobForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArcjetLogo from "@/public/arcjet.png";
import InngestLogo from "@/public/inngest.png";
import { notFound } from "next/navigation";
import Image from "next/image";

const companies = [
    { id: 0, name: 'Arcjet', logo: ArcjetLogo },
    { id: 1, name: 'Inngest', logo: InngestLogo },
    { id: 2, name: 'Arcjet', logo: ArcjetLogo },
    { id: 3, name: 'Inngest', logo: InngestLogo },
    { id: 4, name: 'Arcjet', logo: ArcjetLogo },
    { id: 5, name: 'Inngest', logo: InngestLogo },
];

const testimonials = [
    {
        quote:
            "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
        author: "Sarah Chen",
        company: "TechCorp",
    },
    {
        quote:
            "The platform made hiring remote talent incredibly simple. Highly recommended!",
        author: "Mark Johnson",
        company: "StartupX",
    },
    {
        quote:
            "We've consistently found high-quality candidates here. It's our go-to platform for all our hiring needs.",
        author: "Emily Rodriguez",
        company: "InnovateNow",
    },
];

const stats = [
    { value: "10k+", label: "Monthly active job seekers" },
    { value: "48h", label: "Average time to hire" },
    { value: "95%", label: "Employer satisfaction rate" },
    { value: "500+", label: "Companies hiring monthly" },
];

async function getData(jobId: string, userId: string) {
    const data = await prisma.jobPost.findUnique({
        where: {
            id: jobId,
            Company: {
                userId: userId,
            },
        },
        select: {
            benefits: true,
            id: true,
            jobTitle: true,
            jobType: true,
            jobDescription: true,
            salaryFrom: true,
            salaryTo: true,
            timeFrom: true,
            timeTo: true,
            jobProvince: true,
            jobDistrict: true,
            jobSubDistrict: true,
            employmentType: true,
            listingDuration: true,
            Company: {
                select: {
                    about: true,
                    name: true,
                    logo: true,
                    gmail: true,
                    province: true,
                    district: true,
                    subDistrict: true,
                    lineAccount: true,
                    tel1: true,
                    tel2: true,
                },
            },
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

type Params = Promise<{ jobId: string }>;

export default async function EditJobPage({ params }: { params: Params }) {
    const { jobId } = await params;
    const user = await requireUser();
    const data = await getData(jobId, user.id as string);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">

            <EditJobForm jobPost={data} />

            <div className="col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Job Preview</CardTitle>
                        <CardDescription>
                            Join thousand of companies hiring top talent
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            {companies.map((company) => (
                                <div key={company.id}>
                                    <Image
                                        src={company.logo}
                                        alt={company.name}
                                        width={80}
                                        height={80}
                                        className="rounded-lg opacity-75 transition-opacity hover:opacity-100"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {testimonials.map((testimonial, index) => (
                                <blockquote key={index} className="border-l-2 border-primary pl-4">
                                    <p className="text-sm text-muted-foreground italic">
                                        &ldquo;{testimonial.quote}&rdquo;
                                    </p>
                                    <footer className="mt-2 text-sm font-medium">
                                        - {testimonial.author}, {testimonial.company}
                                    </footer>
                                </blockquote>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="rounded-lg bg-muted p-4">
                                    <h4 className="text-2xl font-bold">{stat.value}</h4>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}