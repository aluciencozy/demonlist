import Link from "next/link"

const AccountButtons = async () => {
  return (
    <div>
      <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer">Login</Link>
      <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">Register</Link>
    </div>
  )
}

export default AccountButtons