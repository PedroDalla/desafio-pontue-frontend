import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Logo } from "./Logo";
import { IconLogout } from "@tabler/icons-react";

export const Nav: React.FC = () => {
  const auth = useAuth();
  return (
    <nav className="mb-[80px]">
      <div className="h-[80px] w-full bg-white shadow-md px-2 md:px-0 fixed top-0 left-0 z-50">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link to="/">
            <Logo width={125} height={50} />
          </Link>
          <div className="flex gap-4 items-center text-indigo-900">
            <span className="text-xs font-medium">
              {auth?.credentials?.email}
            </span>
            <button onClick={auth?.logout} className="cursor-pointer">
              <IconLogout
                size={30}
                stroke={1.5}
                className="text-indigo-800 hover:text-indigo-600 transition-colors duration-150"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
