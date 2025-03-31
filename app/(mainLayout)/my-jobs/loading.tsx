import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";

const LoadingMyJobs = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>งานของฉัน</CardTitle>
                <CardDescription>
                    จัดการรายการงานและใบสมัครของคุณได้ที่นี่
                </CardDescription>
            </CardHeader>
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
                        {[...Array(10)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="size-10 rounded-lg" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[140px]" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[180px]" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[100px]" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[120px]" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default LoadingMyJobs;