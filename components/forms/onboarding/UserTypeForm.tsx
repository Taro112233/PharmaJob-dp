import { Button } from "@/components/ui/button";
import { Building2, UserRound } from "lucide-react";

type UserSelectionType = "company" | "jobSeeker" | null;

interface UserTypeSelectionProps {
    onSelect: (type: UserSelectionType) => void;
}

export function UserTypeSelection({ onSelect }: UserTypeSelectionProps) {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">ยินดีต้อนรับ! เริ่มต้นใช้งานกันเลย</h2>
                <p className="text-muted-foreground">กรุณาเลือกว่าคุณต้องการใช้งานแพลตฟอร์มในรูปแบบใด</p>
            </div>
            <div className="grid gap-4">
                <Button
                    onClick={() => onSelect("company")}
                    variant="outline"
                    className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
                >
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="size-6 text-primary" />
                    </div>

                    <div className="text-left">
                        <h3 className="font-semibold text-lg">ร้านยา / โรงพยาบาล หรือ องค์กรต่าง ๆ</h3>
                        <p>ประกาศรับสมัครงานและค้นหาบุคลากรคุณภาพ</p>
                    </div>
                </Button>

                <Button
                    onClick={() => onSelect("jobSeeker")}
                    variant="outline"
                    className="w-full h-auto p-6 items-center gap-4 border-2 transition-all duration-200 hover:border-primary hover:bg-primary/5"
                >
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserRound className="size-6 text-primary" />
                    </div>

                    <div className="text-left">
                        <h3 className="font-semibold text-lg">เภสัชกร</h3>
                        <p>ค้นหางานที่เหมาะกับความต้องการของคุณ</p>
                    </div>
                </Button>
            </div>
        </div>
    )
}