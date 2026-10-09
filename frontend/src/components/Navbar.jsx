import { BriefcaseBusiness, LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  const userName = user?.name || "User";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
        <div className="flex h-[72px] items-center gap-3 border-b border-gray-100 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BriefcaseBusiness size={19} strokeWidth={1.8} />
          </div>

          <div>
            <h1 className="text-sm font-bold tracking-tight text-gray-900">
              Job Tracker
            </h1>
            <p className="mt-0.5 text-xs text-gray-400">
              Application manager
            </p>
          </div>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-400">
            Workspace
          </p>

          <div
            aria-current="page"
            className="flex items-center gap-3 rounded-md bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-700"
          >
            <LayoutDashboard size={18} strokeWidth={1.8} />
            Applications
          </div>
        </div>

        <div className="mt-auto border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
              {initial}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">
                {userName}
              </p>
              <p className="mt-0.5 text-xs text-gray-400">Your workspace</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut size={17} strokeWidth={1.8} />
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <BriefcaseBusiness size={17} strokeWidth={1.8} />
          </div>

          <span className="text-sm font-bold tracking-tight text-gray-900">
            Job Tracker
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="max-w-32 truncate text-sm text-gray-600">
            {userName}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>
    </>
  );
}