import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Добавляем тип для пропса onClose
interface LogoComponentProps {
  onClose: () => void;
}

const LogoComponent: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router.asPath]);

  
  return (
    <div className="logo-modal">
      {/* Иконка сверху */}
     <div className="logo-modal__icon">
        <img src="/лого.png" alt="Логотип" />
      </div>
      <div className="logo-modal__content">
        <p>
          Согласно Теории Большого Взрыва наша Вселенная произошла из одной
          очень маленькой точки. Это было очень и очень давно, но Вселенная с
          тех пор продолжает расширяться и скорость этого расширения растёт.
        </p>
        <p>
          Мы живём на своей планете, летим куда-то со своими мыслями и делами и
          даже не знаем куда.
        </p>
        <p>
          Мы часто выбираем для себя пустое и ненужное, а по настоящему важное и
          нужное - не замечаем и теряем не успевая оценить. Но иногда мир вдруг
          открывается для нас с другой стороны и узнав что-то новое мы уже не
          хотим возвращаться назад. Мы хотим идти дальше, идти наперекор,
          искать, исследовать, готовы упорно верить и ждать своего часа.
        </p>
        <p>
          Увидеть метаморфозы настоящего превращения, узнать кое-что о себе,
          раздать всем по заслугам и спасти планету можно здесь*.
        </p>
        <p>========</p>      
        <p>Администратор</p>
      </div>
      <div className="logo-modal__footer">
      <button
        className="logo-modal__back-button"
        onClick={() => {
          onClose?.(); 
        }}
      >
        Назад
      </button>
        <Link href="/" className="logo-modal__link">
            Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default LogoComponent;
