import { useContext, useEffect, useState } from "react";
import { RouterContext } from "../../Shared/Hyunouter/Router";
import Link from "../../Shared/Hyunouter/Link";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { path } = useContext(RouterContext);
  const isActive = (linkPath: string) => path === linkPath;
  // 네비게이션 바 표시 상태를 관리하는 state
  const [showNav, setShowNav] = useState(true);
  // 마지막 스크롤 위치를 저장하는 state
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    // 스크롤 이벤트를 처리하는 함수
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // 스크롤이 아래로 진행되었는지 확인
      if (currentScrollY > lastScrollY) {
        setShowNav(false); // 스크롤을 내릴 때 네비게이션 바 숨기기
      } else {
        setShowNav(true); // 스크롤을 올릴 때 네비게이션 바 표시
      }
      // 마지막 스크롤 위치 업데이트
      setLastScrollY(currentScrollY);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 클린업 함수에서 이벤트 리스너 제거
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`${
        showNav ? "" : "hideNav"
      } relative bg-navigation flex justify-center items-center h-16 border-b-4 border-navigationUnderline header`}
    >
      <div className="absolute left-0 ml-10 logo">
        <Link to="/mainpage">
          <img src="/src/Shared/assets/casperLogo.svg" alt="casperLogo" />
        </Link>
      </div>
      <ul className="navbar flex list-none text-white space-x-28 h-full items-center">
        <li
          className={`navbarMenu h-full flex justify-center items-center px-5 relative
            before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-white
            before:transform before:transition-transform before:duration-300 before:ease-in-out
            ${
              isActive("/mainpage")
                ? "before:scale-x-100"
                : "before:scale-x-0 hover:before:scale-x-50"
            }
          `}
        >
          <div className="h-full flex items-center ">
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
          className={`navbarMenu h-full flex justify-center items-center px-5 relative
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
          className={`navbarMenu h-full flex justify-center items-center px-5 relative
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
