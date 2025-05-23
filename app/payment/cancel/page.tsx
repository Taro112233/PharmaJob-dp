import { requireUser } from "@/app/utils/requireUser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";


export default async function PaymentCancel() {
    await requireUser();
    return (
        <div className="w-full min-h-screen flex flex-1 justify-center items-center">
            <Card className="w-[350px]">
                <div className="p-6">
                    <div className="w-full flex justify-center">
                        <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h2 className="text-xl font-semibold">ชำระเงินไม่สำเร็จ</h2>
                        <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance max-w-sm">
                            ไม่ต้องกังวล ยอดเงินของคุณจะไม่ถูกเรียกเก็บ
                            กรุณาลองทำรายการอีกครั้ง
                        </p>
                        <Button asChild className="w-full mt-5">
                            <Link href="/">กลับไปยังหน้าหลัก</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
