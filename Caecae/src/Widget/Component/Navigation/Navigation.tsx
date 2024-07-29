import { useContext } from "react";
import { RouterContext } from "../../../Shared/Hyunouter/Router";
import Link from "../../../Shared/Hyunouter/Link";

const Navigation: React.FC = () => {
  const { path } = useContext(RouterContext);
  const isActive = (linkPath: string) => path === linkPath;

  return (
    <nav className="relative bg-navigation flex justify-center items-center h-16 border-b-4 border-navigationUnderline">
      <div className="absolute left-0 ml-10">
        <Link to="/mainpage">
          <img src="/src/Shared/assets/casperLogo.svg" alt="casperLogo" />
        </Link>
      </div>
      <ul className="flex list-none text-white space-x-28 h-full items-center">
        <li
          className={`h-full flex justify-center items-center px-5 relative
            before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-white
            before:transform before:transition-transform before:duration-300 before:ease-in-out
            ${
              isActive("/mainpage")
                ? "before:scale-x-100"
                : "before:scale-x-0 hover:before:scale-x-50"
            }
          `}
        >
          <div className="h-full flex items-center">
            <Link to="/mainpage">
              <span
                className={`font-bold ${
                  isActive("/mainpage")
                    ? "text-white"
                    : "text-navigationText hover:text-white transition-colors duration-300"
                }`}
              >
                이벤트 소개
              </span>
            </Link>
          </div>
        </li>
        <li
          className={`h-full flex justify-center items-center px-5 relative
            before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-white
            before:transform before:transition-transform before:duration-300 before:ease-in-out
            ${
              isActive("/findcasper")
                ? "before:scale-x-100"
                : "before:scale-x-0 hover:before:scale-x-50"
            }
          `}
        >
          <div className="h-full flex items-center">
            <Link to="/findcasper">
              <span
                className={`font-bold ${
                  isActive("/findcasper")
                    ? "text-white"
                    : "text-navigationText hover:text-white transition-colors duration-300"
                }`}
              >
                나를 찾아봐
              </span>
            </Link>
          </div>
        </li>
        <li
          className={`h-full flex justify-center items-center px-5 relative
            before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-white
            before:transform before:transition-transform before:duration-300 before:ease-in-out
            ${
              isActive("/racecasper")
                ? "before:scale-x-100"
                : "before:scale-x-0 hover:before:scale-x-50"
            }
          `}
        >
          <div className="h-full flex items-center">
            <Link to="/racecasper">
              <span
                className={`font-bold ${
                  isActive("/racecasper")
                    ? "text-white"
                    : "text-navigationText hover:text-white transition-colors duration-300"
                }`}
              >
                전력으로 315Km
              </span>
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
