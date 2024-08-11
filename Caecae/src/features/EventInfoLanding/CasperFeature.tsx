import { useState, useEffect } from "react";

interface ImageData {
  id: number;
  src: string;
  alt: string;
  header: string;
  paragraph: string;
}

const CasperFeature = () => {
  const images: ImageData[] = [
    {
      id: 0,
      src: "/assets/casperMerit1.svg",
      alt: "casperMerit1",
      header: "길어진 주행거리\n많아진 즐길거리",
      paragraph:
        "1회 충전으로 315km 주행이 가능하여\n경쾌한 장거리 여행을 경험할 수 있습니다.",
    },
    {
      id: 1,
      src: "/assets/casperMerit2.svg",
      alt: "casperMerit2",
      header: "다양한 라이프스타일에\n딱 맞는 옵션",
      paragraph:
        "차별화된 커스터마이징을 통해 고객에게\n다양한 라이프스타일을 제공합니다.",
    },
    {
      id: 2,
      src: "/assets/casperMerit3.svg",
      alt: "casperMerit3",
      header: "길어진 휠베이스로\n더욱 넓어진 공간",
      paragraph:
        "풀 폴딩 시트를 통해 1열과 2열의 공간을\n넓고 자유롭게 사용 가능합니다.",
    },
    {
      id: 3,
      src: "/assets/casperMerit4.svg",
      alt: "casperMerit4",
      header: "더 스마트하게, 더 센스있게\n다양한 주행보조장치",
      paragraph:
        "동급 대비 최고사양의 주행보조장치로\n더 원활한 주행이 가능해집니다.",
    },
  ];

  const [hoveredImageId, setHoveredImageId] = useState<number | null>(null);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  const handleMouseEnter = (id: number) => {
    setHoveredImageId(id);
  };

  const handleMouseLeave = () => {
    setHoveredImageId(null);
    setFadeIn(false);
  };

  useEffect(() => {
    if (hoveredImageId !== null) {
      const timer = setTimeout(() => {
        setFadeIn(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [hoveredImageId]);

  return (
    <>
      <div className="flex overflow-hidden h-screen">
        {images.map((image) => (
          <div
            key={image.id}
            className={`relative overflow-hidden flex-1 transition-all duration-300 ease-in-out ${
              hoveredImageId === image.id ? "flex-[2]" : "flex-[1]"
            }`}
            onMouseEnter={() => handleMouseEnter(image.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
            {hoveredImageId === image.id && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center transition-opacity duration-500">
                <div
                  className={`absolute bottom-[80px] left-[80px] transition-opacity duration-500 ${
                    fadeIn ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h1 className="text-white text-[36px] font-bold whitespace-pre-line leading-tight">
                    {image.header}
                  </h1>
                  <p className="text-white text-[20px] mt-5 whitespace-pre-line">
                    {image.paragraph}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CasperFeature;
