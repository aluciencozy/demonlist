import Link from "next/link"

const AccountButtons = async () => {
  return (
    <div className="flex-center gap-5">
      <button className="flex-center font-mono relative group">
        <Link
          href="/login"
          className="glint-hover flex-center relative rounded-xl px-4 py-2 bg-linear-to-r from-surface/90 to-surface/70 text-sm font-bold text-main overflow-hidden"
        >
          Login
        </Link>
      </button>
      <button className="flex-center font-mono relative group">
        <Link
          href="/register"
          className="glint-hover flex-center relative rounded-xl px-4 py-2 bg-linear-to-r from-primary/90 to-primary/70 text-sm font-bold text-main overflow-hidden"
        >
          Register
        </Link>
      </button>
    </div>
  );
}

export default AccountButtons