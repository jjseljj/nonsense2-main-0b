import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import Link from 'next/link';
import SecondComponent from "@/Sections/SecondComponent/SecondComponent";
import LogoComponent from "@/Sections/LogoComponent/LogoComponent";
import InfoComponent from "@/Sections/InfoComponent/InfoComponent";
import { services } from "@/source";
import { useSwipeable } from "react-swipeable"; 
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };  

  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false); 

  const handleLogoClick = () => {
    console.log("Клик на логотип");
    setIsLogoModalOpen((prevState) => !prevState); 
  };
  
  const [startIndex, setStartIndex] = useState(0);
  /*const itemsPerPage = 4; */
  const [itemsPerPage, setItemsPerPage] = useState(4); 

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
      const scrollSpeedFactor = 0.001; 

      if (e.deltaY > 0 && startIndex + itemsPerPage < services.length) {
          setStartIndex((prev) =>
              Math.min(prev + Math.ceil(scrollSpeedFactor), services.length - itemsPerPage)
          );
      } else if (e.deltaY < 0 && startIndex > 0) {
          setStartIndex((prev) =>
              Math.max(prev - Math.ceil(scrollSpeedFactor), 0)
          );
      }
  }; 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateItemsPerPage = () => {
        if (window.innerWidth <= 600) {
          setItemsPerPage(8); 
        } else {
          setItemsPerPage(5); 
        }
      };
  
      updateItemsPerPage(); 
      window.addEventListener("resize", updateItemsPerPage);
  
      return () => {
        window.removeEventListener("resize", updateItemsPerPage);
      };
    }
  }, []);

  //обработчик свайпов:
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setIsModalOpen(true),
    onSwipedDown: () => setIsModalOpen(false),
    trackMouse: true,
  });
  
  //переключение вкладок
  const [activeTab, setActiveTab] = useState("price"); 

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  //раскрывающий список смена иконки
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const handleToggle = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Обработчик клика по кнопке
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Заголовок",
          text: "Описание для分享",
          url: "https://example.com", // тут указываете ссылку
        });
        console.log("Успешный шэринг!");
      } catch (error) {
        console.error("Ошибка при шэринге:", error);
      }
    } else {
      alert("Ваш браузер не поддерживает Web Share API.");
    }
  };

  
  return (
    <header className={`header ${isModalOpen ? "modal-open" : ""}`}>
      {/* Блок с картинкой и содержимым */}
      <div className="header__image-wrapper">
        <img src="/1.png" alt="Background" className="header__background" />

        {/* Рамка */}
        <div className="header__border">
          {/* Кнопки сверху */}
          <div className="header-top">
              <button className="top-btn1" onClick={handleShare}>
                  <img src="/Поделиться.png" alt="Поделиться" />
              </button>  

              <div className="top-btn2" onClick={handleLogoClick}>
              <img src="/Group 30.png" alt="Лого" />
            </div>
            {isLogoModalOpen && (
              <div className="modal-logo-overlay" onClick={handleLogoClick}>
                <div
                  className="modal-logo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LogoComponent onClose={() => setIsLogoModalOpen(false)} />
                </div>
              </div>
            )}

            <button className="top-btn3">
                <Link href="/Info">
                    <img src="/Информация.png" alt="Информация" />
                </Link>
            </button>
          </div>
           {/* Вкладки */}
           <div className="header-buttons">
           <Link href={`/Product/1?view=form`}> 
              <button
                className={`header-buttons__tab1 ${activeTab === "price" ? "active" : ""}`}
                onClick={() => handleTabClick("price")}
                style={{
                  backgroundImage: `url('/path-to-price-bg.png')`, 
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              >
                Прайс
              </button>
            </Link>
            <Link href={`/Product/1?view=form`}> 
              <button
                className={`header-buttons__tab2 ${activeTab === "order" ? "active" : ""}`}
                onClick={() => handleTabClick("order")}
              >
                На заказ
              </button>
            </Link>
          </div>
          {/* Центральные кнопки */}       
          <div className="header-scroll">
            {services.map((service, index) => {
              const isExpanded = expandedIndexes.includes(index);
              return (
                <div key={index} className={`button${index + 1}`}>
                  <Link href={`/Product/${service.id}?view=form`}>
                  <button
                    className={`side-btn`}
                    onClick={() => handleToggle(index)}
                  >
                    <div className="side-btn__header">
                      <div className="side-btn__title-wrapper">
                        <span className="side-btn__title">
                          {service?.title || "—"}
                        </span>
                        {isExpanded ? (
                          <BiUpArrow className="side-btn__icon" onClick={(e) => {
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            handleToggle(index); 
                          }}
                           />
                        ) : (
                          <BiDownArrow className="side-btn__icon" onClick={(e) => {
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            handleToggle(index);
                          }}
                           />
                        )}
                      </div>
                      <span className="side-btn__price">{service?.price || "—"}</span>
                    </div>
                    <p
                      className={`side-btn__description ${
                        isExpanded ? "expanded" : "collapsed"
                      }`}
                    >
                      {service?.description || "—"}
                    </p>
                  </button>
                  </Link>
                </div>
              );
            })}
          </div>         
          {/* Кнопка сбоку справа */}
           <div className="button-right" onClick={handleToggleModal}>
              {isModalOpen ? (
                <MdArrowForwardIos className="button-right__icon" />
              ) : (
                <IoIosArrowBack className="button-right__icon" />
              )}
            </div>
            {/* Модальное окно с SecondComponent */}
            {isModalOpen && (
              <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                <div
                className="modal"
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className="modal__content"
                  onMouseDown={(e) => e.stopPropagation()} 
                >
                  <SecondComponent />
                </div>
              </div>
            </div>                     
          )}     
        </div>
      </div>
    </header>
  );
};

export default Header;


