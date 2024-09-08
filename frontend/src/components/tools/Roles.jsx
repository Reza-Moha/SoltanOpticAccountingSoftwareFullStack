import Link from "next/link";

const roleToPath = {
  ADMIN: "/admin/dashboard",
  MANAGER: "/manager/dashboard",
  USER: "/user/dashboard",
  EMPLOYEE: "/employee/dashboard",
  OPTOMETRIST: "/optometrist/dashboard",
  TECHNICAL_MANAGER: "/technical-manager/dashboard",
};

const ConditionalLink = ({ user }) => {
  const href = roleToPath[user.role] || "/default-dashboard";

  return (
    <Link href={href} className="px-5 py-2 rounded bg-green-300 text-green-900">
      داشبورد
    </Link>
  );
};

export default ConditionalLink;
