import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";
import { CreateJobForm } from "@/components/forms/CreateJobForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArcjetLogo from "@/public/arcjet.png";
import InngestLogo from "@/public/inngest.png";
import Image from "next/image";
import { redirect } from "next/navigation";

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

async function getCompany(userId: string) {
    const data = await prisma.company.findUnique({
        where: {
            userId: userId,
        },
        select: {
            name: true,
            province: true,
            district: true,
            subDistrict: true,
            gmail: true,
            lineAccount: true,
            tel1: true,
            tel2: true,
            about: true,
            logo: true,

        }
    })

    if (!data) {
        return redirect("/")
    }

    return data;
}

export default async function PostJobPage() {
    const session = await requireUser();
    const data = await getCompany(session.id as string);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
            <CreateJobForm
                companyName={data.name}
                companyProvince={data.province}
                companyDistrict={data.district}
                companySubDistrict={data.subDistrict}
                companyAbout={data.about}
                companyLogo={data.logo}
                companyGmail={data.gmail}
                companyLineAccount={data.lineAccount}
                companyTel1={data.tel1}
                companyTel2={data.tel2}
            />

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
                                        "{testimonial.quote}"
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
    )
}