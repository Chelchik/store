import React, { useEffect } from "react";
import ProductItem from "../components/ProductItem";
import { FaFilter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../features/FilterSlice";
import { likedSelect } from "../features/likedSlice";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilter);
  const liked = useSelector(likedSelect);

  useEffect(() => {
    const storeFetch = async () => {
      const savedProducts = JSON.parse(localStorage.getItem("allProducts"));

      if (savedProducts && savedProducts.length > 0) {
        dispatch({
          type: "SetProducts",
          payload: savedProducts,
        });
      } else {
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();
          const productsWithLikes = data.map((product) => ({
            ...product,
            liked: false,
          }));

          dispatch({
            type: "SetProducts",
            payload: productsWithLikes,
          });

          localStorage.setItem(
            "allProducts",
            JSON.stringify(productsWithLikes)
          );
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      }
    };

    storeFetch();
  }, [dispatch]);


  return (
    <div className="w-full p-14 flex flex-wrap gap-4 justify-center relative">
      <div className="w-full flex justify-center gap-8">
        <div className="p-2 right-1/2 bg-gray-200 flex items-center justify-center gap-2 rounded-lg">
          <p
            onClick={() => dispatch({ type: "ShowAll" })}
            className="cursor-pointer"
          >
            Все
          </p>

          <FaFilter />

          <p
            onClick={() => dispatch({ type: "Filter", liked })}
            className="cursor-pointer"
          >
            Избранные
          </p>
        </div>

        <div className="p-2 right-1/2 bg-gray-200 flex items-center justify-center gap-2 rounded-lg">
          <p
            onClick={() => dispatch({ type: "Restore" })}
            className="cursor-pointer"
          >
            Восстановить удалённые продукты
          </p>
        </div>
      </div>

      {products.map((product) => {
        return (
          <ProductItem
            product={product}
            maxLength={100}
            titleMaxLength={25}
            key={product.id}
          />
        );
      })}
    </div>
  );
}

export default Home;
