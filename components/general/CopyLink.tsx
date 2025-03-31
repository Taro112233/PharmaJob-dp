"use client";

import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

export function CopyLinkMenuItem({ jobUrl }: { jobUrl: string }) {
    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(jobUrl);
            toast.success("คัดลอกลิงก์สำเร็จ");
        } catch (error) {
            console.log(error);
            toast.error("คัดลอกลิงก์ไม่สำเร็จ");
        }
    }
    return (
        <DropdownMenuItem onSelect={handleCopy}>
            <Link2 className="size-4" />
            <span>คัดลอกลิงก์</span>
        </DropdownMenuItem>
    )
}