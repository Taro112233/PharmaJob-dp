import { prisma } from "@/app/utils/db"
import { requireUser } from "@/app/utils/requireUser";
import { CopyLinkMenuItem } from "@/components/general/CopyLink";
import { EmptyState } from "@/components/general/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link2, MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getJobs(userId: string) {
    const data = await prisma.jobPost.findMany({
        where: {
            Company: {
                userId: userId,
            },
        },
        select: {
            id: true,
            jobTitle: true,
            status: true,
            createdAt: true,
            Company: {
                select: {
                    name: true,
                    logo: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}

export default async function MyJobPage() {
    const session = await requireUser();
    const data = await getJobs(session.id as string);

    return (
        <>
            {data.length === 0 ? (
                <EmptyState
                    title="ไม่มีงานที่ประกาศ"
                    description="คุณยังไม่มีงานที่ประกาศ คุณสามารถเริ่มต้นด้วยการประกาศงาน"
                    buttonText="ประกาศงาน"
                    href="/post-job"
                />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>งานของฉัน</CardTitle>
                        <CardDescription>
                            จัดการรายการงานและใบสมัครของคุณได้ที่นี่
                        </CardDescription>
                        <CardContent>
                            <Table>
                                <TableHeader>

                                    <TableRow>
                                        <TableHead>โลโก้</TableHead>
                                        <TableHead>บริษัท</TableHead>
                                        <TableHead>สถานที่ทำงาน</TableHead>
                                        <TableHead>สถานะ</TableHead>
                                        <TableHead>วันที่สร้าง</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((listing) => (
                                        <TableRow key={listing.id}>
                                            <TableCell>
                                                <Image
                                                    src={listing.Company?.logo || "/placeholder-logo.png"}
                                                    alt="logo of company"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-md size-10"
                                                />
                                            </TableCell>
                                            <TableCell>{listing.Company?.name}</TableCell>
                                            <TableCell>{listing.jobTitle}</TableCell>
                                            <TableCell>{listing.status}</TableCell>
                                            <TableCell>
                                                {listing.createdAt.toLocaleDateString("th-TH", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Link href={`/my-jobs/${listing.id}/edit`}>
                                                                📝 แก้ไข
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <CopyLinkMenuItem jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${listing.id}`} />
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Link href={`/my-jobs/${listing.id}/delete`}>
                                                                🗑️ ลบ
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </CardHeader>
                </Card>
            )}
        </>
    )
}