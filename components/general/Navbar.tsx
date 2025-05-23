import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  const session = await auth();
  return (
    <nav className="flex flex-col gap-4 py-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Logo Pharma Job" width={40} height={40} />
          <h1 className="text-2xl font-bold">
            หางาน<span className="text-primary">เภสัช</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-5'>
          <ThemeToggle />
          <Link className={buttonVariants({ size: "lg" })} href='/post-job'>ประกาศงาน</Link>
          {session?.user ? (
            <UserDropdown
              email={session.user.email as string}
              image={session.user.image as string}
              name={session.user.name as string}
            />
          ) : (
            <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>เข้าสู่ระบบ</Link>
          )}
        </div>

        {/* Mobile Theme Toggle */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation - will only show on mobile */}
      <div className="md:hidden flex items-center justify-between gap-4">
        <Link
          className={buttonVariants({ size: "sm", className: "flex-1" })}
          href='/post-job'
        >
          ประกาศงาน
        </Link>

        {session?.user ? (
          <UserDropdown
            email={session.user.email as string}
            image={session.user.image as string}
            name={session.user.name as string}
          />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "sm", className: "flex-1" })}
          >
            เข้าสู่ระบบ
          </Link>
        )}
      </div>
    </nav>
  );
}