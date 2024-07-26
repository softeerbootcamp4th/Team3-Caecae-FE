import { useContext } from "react";
import { RouterContext } from "../../../Shared/Router/Router";
import Link from "../../../Shared/Router/Link";

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
                <li className={`h-full flex justify-content items-center px-5 ${isActive("/mainpage") ? "border-b-2 border-white" : null }`}>
                    <Link to="/mainpage">
                    <span className={`font-bold ${isActive("/mainpage") ? "text-white" : "text-gray-400"}`}>이벤트 소개</span>
                    </Link>
                </li>
                <li className={`h-full flex justify-content items-center px-5 ${isActive("/findcasper") ? "border-b-2 border-white" : null }`}>
                    <Link to="/findcasper">
                        <span className={`font-bold ${isActive("/findcasper") ? "text-white" : "text-gray-400"}`}>나를 찾아봐</span>
                    </Link>
                </li>
                <li className={`h-full flex justify-content items-center px-5 ${isActive("/racecasper") ? "border-b-2 border-white" : null }`}>
                    <Link to="/racecasper">
                        <span className={`font-bold ${isActive("/racecasper") ? "text-white" : "text-gray-400"}`}>전력으로 315Km</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;