const Footer: React.FC = () => {
  return (
    <footer className="bg-footer h-48 text-footerText flex flex-row items-center text-center">
      <div className="basis-3/12 h-full flex justify-end items-start">
        <img
          src="/public/assets/hyundaiLogo.svg"
          alt="hyundaiLogo"
          className="mt-14 mr-2"
        />
      </div>
      <div className="basis-5/12 flex flex-col">
        <div className="">
          <ul className="flex text-xs mb-3">
            <li className="border-r border-footerVerticalLine pr-4 ">
              <a href="https://casper.hyundai.com/agreements">
                캐스퍼 온라인 이용약관
              </a>
            </li>
            <li className="border-r border-footerVerticalLine px-4 text-white">
              <a href="https://privacy.hyundai.com/overview/full-policy">
                개인정보 처리방침
              </a>
            </li>
            <li className="border-r border-footerVerticalLine px-4">
              <a href="https://www.hyundai.com/kr/ko/copyright">저작권안내</a>
            </li>
            <li className="pl-4">
              <a href="https://www.hyundai.com/kr/ko/e">현대자동차 홈페이지</a>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="grid grid-cols-3 gap-y-2 gap-x-4 text-xs text-left">
            <li>사업자등록번호 : 101-81-09147</li>
            <li>통신판매업신고번호 : 2002-01546</li>
            <li>대표이사 : 장재훈</li>
            <li>캐스퍼 고객센터 : 080-500-6000</li>
            <li>주소 : 서울시 서초구 헌릉로 12</li>
            <li>호스팅서비스 제공 : 현대오토에버(주)</li>
          </ul>
        </div>
        <div className="flex">
          <span className="mt-3 text-xs">
            COPYRIGHT ⓒ HYUNDAI MOTOR COMPANY, ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
      <div className="basis-4/12"></div>
    </footer>
  );
};

export default Footer;
