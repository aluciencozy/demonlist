import Link from "next/link"
import { Button } from "@/components/ui/button"

const AccountButtons = async () => {
  return (
    <div className="flex-center gap-5 text-primary">
      <Button asChild variant="outline" className="">
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild variant="default" size="sm">
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );
}

export default AccountButtons