import React, { useEffect, useState } from 'react';
import ProductDetails from '@/Sections/ProductDetails/ProductDetails';
import { useRouter } from "next/router";

const Product = () => {
  const router = useRouter();
  const { id, view } = router.query; // Получаем id и view из URL
  const [activeView, setActiveView] = useState<string>("description"); // По умолчанию "description"

  useEffect(() => {
    // Обновляем activeView при первом рендере
    if (view === "form") {
      setActiveView("form");
    } else if (view === "description") {
      setActiveView("description");
    }
  }, [view]);

  // Проверяем готовность маршрутизатора
  if (!router.isReady || !id) {
    return <div>Загрузка...</div>; 
  }

  // Обрабатываем случай, если id может быть массивом
  const productId = Array.isArray(id) ? id[0] : id;

  // Если productId отсутствует, показываем "Товар не найден"
  if (!productId) {
    return <div>Товар не найден</div>;
  }

  return (
    <>
      <ProductDetails productId={productId} initialView={activeView} />
    </>
  );
};

export default Product;

/*
http://localhost:3001/Product/id?view=form
*/
