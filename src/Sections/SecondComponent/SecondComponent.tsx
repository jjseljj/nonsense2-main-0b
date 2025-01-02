import React from 'react';
import { RxShare2 } from "react-icons/rx";
import Link from 'next/link';

export default function SecondComponent() {
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
    <div className="second-component">
      <div className="second-component__wrapper">
        <p className="second-component__text">
          Настоящая фигня. Без красителей и заменителей. Гораздо круче той
          фигни, что вокруг продаётся и фигнёю зовётся. Экологически чистая - не
          портит воздух, не загрязняет воду, её не повезёт вонючий грузовик,
          для неё не выпилят зелёный лес. Годится как экологический подарок
          вместо любой другой фигни. Хотите потратить деньги на очередную
          пластмассовую фигню - покупайте лучше здесь! Дарите чистый воздух,
          зелёные леса, цветочные луга!
          <br />
          <br />
          Отлично подходит в ситуации, когда всё не так, пора менять. Позволяет
          закинуть, задвинуть, затоптать, уничтожить, разобраться, посмеяться,
          обновиться, раскрутиться, начать сначала и всего остального.
          <br />
          <br />
          Ассортимент постоянно пополняется, если чего-то не хватает, есть
          замечательный раздел "На заказ"** - пиши чего хочешь, плати сколько
          влезет. Уплочено - значит твоё. Для наилучшего результата имеет смысл
          повторить. И не забудь поделиться ссылкой***.
          <br />
          <br />
          Берегите чеки, остерегайтесь подделок!
          <br />
          <br />
          Администратор
        </p>
        {/*<div className="second-component__actions">
          <Link href="/Product">
            <button className="second-component__button">
              <RxShare2 className="second-component__icon" />
            </button>
          </Link>
        </div> */}
        <div className="second-component__actions">
          <button className="second-component__button" onClick={handleShare}>
          <RxShare2 className="second-component__icon" />
          </button>
        </div>
     

      </div>
    </div>
  );
}