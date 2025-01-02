import React, { useState, useEffect } from "react";
import Link from "next/link";
import LogoComponent from "@/Sections/LogoComponent/LogoComponent";
import { FaRegSquare, FaRegCheckSquare } from "react-icons/fa";
import { LuPower } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { services } from "@/source";


interface ProductDetailsProps {
  productId: string | string[] | undefined;
  initialView?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, initialView = "description" }) => {
  const [view, setView] = useState<string>(initialView);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isFirstChecked, setIsFirstChecked] = useState(false);
  const [isSecondChecked, setIsSecondChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setView(initialView); 
  }, [initialView]);

  const parsedProductId = Array.isArray(productId) ? productId[0] : productId;

  if (!parsedProductId) {
    return <div>Товар не найден</div>;
  }

  const product = services.find((service) => service.id === parseInt(parsedProductId, 10));

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const handleLogoClick = () => {
    setIsLogoModalOpen((prevState) => !prevState);
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
    <div className="product-details">
      <div className="product-details__image-wrapper">
        <img src="/images/3.png" alt="Background" className="header__background" />
        <div className="product-details__border">
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

            <div className="product-details__header">
              <button
                className={`product-details__tab1 ${
                  view === "description" ? "active" : ""
                }`}
                onClick={() => setView("description")}
              >
                На заказ               
              </button>
              <button
                className={`product-details__tab2 ${view === "form" ? "active" : ""}`}
                onClick={() => setView("form")}
              >
                Прайс                
              </button>
            </div>


          <div className="product-details__wrapper">
           
            <div className="product-details__content">
              {view === "description" ? (
                <div className="product-details__price">
                  <div className="product-details__price-section">
                    <div className="product-details__price-name">
                      <h2>Написать</h2>
                    </div>
                    {/*<div className="product-details__price-amount">
                      <span>100</span>
                    </div>*/}
                  </div>
                  <div className="product-details__price-description">
                    <textarea
                      placeholder="Введите текст"
                      rows={4}
                      className="product-details__price-textarea"
                    ></textarea>
                  </div>
                  <div className="product-details__price-actions">
                    <button className="price-actions__button-rate">Оценить</button>
                    <input
                      type="number"
                      className="price-actions__button-empty"
                      placeholder="Введите количество"                     
                    />
                  </div>

                  <div className="product-details__price-delivery-option">
                    <div
                      className="item"
                      onClick={() => setIsFirstChecked(!isFirstChecked)}
                    >
                      {isFirstChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}

                      <span className="text text-first">Отпустить, пусть летит</span>
                    </div>
                    <div
                      className="item"
                      onClick={() => setIsSecondChecked(!isSecondChecked)}
                    >
                      {isSecondChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}
                      <span className="text text-second">Отправить по адресу</span>
                    </div>
                  </div>

                  <div className="product-details__price-email">
                    <input
                      type="email"
                      placeholder="example@domain.com"
                      className="product-details__email-input"
                    />
                  </div>

                  {/*<div className="product-details__price-email">
                  <div className="product-details__email-prefix">
                    <input
                      type="text"
                      placeholder="example"
                      className="product-details__email-prefix-input"
                    />
                  </div>
                    <div className="product-details__email-symbol">
                    <MdOutlineAlternateEmail className="email-icon" />
                    </div>
                    <div className="product-details__email-domain">
                      <input
                        type="text"
                        placeholder="domain.com"
                        className="product-details__email-domain-input"
                      />
                    </div>
                  </div>*/}

                  <div
                      className="item2"
                      onClick={() => setIsChecked(!isChecked)}
                    >
                      {isChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}
                      <span className="text">Запомнить</span>
                  </div>      

                   <div className="product-details__price-actions-bottom">
                    <div className="product-details__back-home">
                      <Link href="/" className="back-home__button">На главную</Link>
                    </div>
                    
                    <button className="product-details__price-icon">
                      <div className="payment-button__content">
                        <div className="payment-button__text">Оплатить</div>
                        <div className="payment-button__icon">
                          <LuPower className="power-icon" />
                        </div>
                      </div>
                    </button>

                  </div>

                </div>
              ) : (
                <div className="product-details__description">
                  <div className="product-details__description-title">                
                    <h2>{product.title}</h2>
                  </div>
                  <div className="product-details__description-text">
                    <p className="product-details__description-paragraph">
                      {product.description}
                    </p>           
                  </div>    
                  <div className="product-details__price-actions">
                    <button className="price-actions__button-rate">Оценить</button>
                    <span className="price-actions__button-empty-1">{product.price}</span>
                  </div>

                  <div className="product-details__price-delivery-option">
                    <div
                      className="item"
                      onClick={() => setIsFirstChecked(!isFirstChecked)}
                    >
                      {isFirstChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}

                      <span className="text text-first">Отпустить, пусть летит</span>
                    </div>
                    <div
                      className="item"
                      onClick={() => setIsSecondChecked(!isSecondChecked)}
                    >
                      {isSecondChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}
                      <span className="text text-second">Отправить по адресу</span>
                    </div>
                  </div>

                  <div className="product-details__price-email">
                    <input
                      type="email"
                      placeholder="example@domain.com"
                      className="product-details__email-input"
                    />
                  </div>

                  {/*<div className="product-details__price-email">
                  <div className="product-details__email-prefix">
                    <input
                      type="text"
                      placeholder="example"
                      className="product-details__email-prefix-input"
                    />
                  </div>
                    <div className="product-details__email-symbol">
                    <MdOutlineAlternateEmail className="email-icon" />
                    </div>
                    <div className="product-details__email-domain">
                      <input
                        type="text"
                        placeholder="domain.com"
                        className="product-details__email-domain-input"
                      />
                    </div>
                  </div>*/}

                  <div
                      className="item2"
                      onClick={() => setIsChecked(!isChecked)}
                    >
                      {isChecked ? (
                        <FaRegCheckSquare className="icon icon-checked" />
                      ) : (
                        <FaRegSquare className="icon icon-unchecked" />
                      )}
                      <span className="text">Запомнить</span>
                  </div>      

                   <div className="product-details__price-actions-bottom">
                    <div className="product-details__back-home">
                      <Link href="/" className="back-home__button">На главную</Link>
                    </div>
                    <button className="product-details__price-icon">
                      <div className="payment-button__content">
                        <div className="payment-button__text">Оплатить</div>
                        <div className="payment-button__icon">
                          <LuPower className="power-icon" />
                        </div>
                      </div>
                    </button>

                  </div>
                               
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;



