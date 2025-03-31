import {
  Briefcase,
  Users,
  Zap,
  FileText,
  Home,
  CalendarDays,
  Umbrella,
  Clock,
  CalendarCheck,
  Layers,
  Landmark,
  ShieldPlus,
  HeartPulse,
  Stethoscope,
  Dumbbell,
  HelpingHand,
  GraduationCap,
  Sun,
  MonitorSmartphone,
  Plane,
} from "lucide-react";

interface Benefit {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const benefits: Benefit[] = [
  {
    id: "overtime",
    label: "OT (ค่าล่วงเวลา)",
    icon: <Briefcase className="w-3 h-3" />
  },
  {
    id: "commission",
    label: "ค่าคอมมิชชั่น",
    icon: <Users className="w-3 h-3" />,
  },
  {
    id: "annual_bonus",
    label: "โบนัสประจำปี",
    icon: <Zap className="w-3 h-3" />
  },
  {
    id: "license_fee",
    label: "ค่าใบประกอบ",
    icon: <FileText className="w-3 h-3" />,
  },
  {
    id: "accommodation",
    label: "มีที่พักให้",
    icon: <Home className="w-3 h-3" />,
  },
  {
    id: "public_holidays",
    label: "วันหยุดนักขัตฤกษ์",
    icon: <CalendarDays className="w-3 h-3" />,
  },
  {
    id: "weekly_leave",
    label: "วันหยุดประจำสัปดาห์",
    icon: <Umbrella className="w-3 h-3" />,
  },
  {
    id: "paid_vacation",
    label: "ลาพักร้อน",
    icon: <Clock className="w-3 h-3" />
  },
  {
    id: "sick_leave",
    label: "ลาป่วย / ลากิจ",
    icon: <CalendarCheck className="w-3 h-3" />,
  },
  {
    id: "leave_accumulation",
    label: "สะสมวันหยุดได้",
    icon: <Layers className="w-3 h-3" />,
  },
  {
    id: "social_security",
    label: "ประกันสังคม",
    icon: <Landmark className="w-3 h-3" />,
  },
  {
    id: "health_insurance",
    label: "ประกันสุขภาพ / อุบัติเหตุ",
    icon: <ShieldPlus className="w-3 h-3" />,
  },
  {
    id: "annual_checkup",
    label: "ตรวจสุขภาพประจำปี",
    icon: <HeartPulse className="w-3 h-3" />,
  },
  {
    id: "medical_discount",
    label: "ส่วนลดค่ารักษา / ยา",
    icon: <Stethoscope className="w-3 h-3" />,
  },
  {
    id: "pharmacy_assistant",
    label: "มีผู้ช่วยเภสัช",
    icon: <HelpingHand className="w-3 h-3" />,
  },
  {
    id: "new_graduates",
    label: "รับเภสัชจบใหม่",
    icon: <GraduationCap className="w-3 h-3" />,
  },
  {
    id: "no_night_shift",
    label: "ไม่มีเวรดึก",
    icon: <Sun className="w-3 h-3" />,
  },
  {
    id: "store_management",
    label: "มีระบบจัดการร้าน",
    icon: <MonitorSmartphone className="w-3 h-3" />,
  },
  {
    id: "travel_allowance",
    label: "ค่าที่พัก / เดินทางสำหรับต่างจังหวัด",
    icon: <Plane className="w-3 h-3" />,
  },
];
