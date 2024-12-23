import React, { useRef } from "react";
import { BiSolidLike } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../features/FilterSlice";
import { likedSelect } from "../features/likedSlice";
import { useNavigate } from "react-router";

function ProductItem({ product, maxLength, titleMaxLength }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const liked = useSelector(likedSelect);

  if (!product) {
    return null;
  }

  const navigateFunc = () => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const handleLiked = () => {
    dispatch({
      type: "Liked",
      payload: product.id,
    });
  };

  
  const handleDelete = (id) => {
    dispatch({
      type: "Delete",
      payload: id,
    });
  };

  const isLiked = liked.includes(product.id);

  return (
    <div
      className="w-80 p-4 bg-gray-100 rounded-md flex flex-col gap-5 z-10"
      onClick={navigateFunc}
    >
      <div className="w-full flex flex-col gap-3 items-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(product.id);
          }}
        >
          <MdDeleteForever className="text-3xl text-red-700 flex" />
        </button>

        <img
          src={product.image}
          alt=""
          className="w-full h-72 object-contain rounded-md"
        />
      </div>

      <h4 className="text-gray-700 text-xl">
        {product.title.length >= titleMaxLength
          ? product.title.slice(0, titleMaxLength) + "..."
          : product.title}
      </h4>

      <span className="text-gray-500">
        {product.description.length >= maxLength
          ? product.description.slice(0, maxLength) + "..."
          : product.description}
      </span>

      <p className="text-gray-400 text-xl">{product.price}$</p>

      <div className="w-full flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLiked();
          }}
        >
          <BiSolidLike
            className={`text-4xl transition-all ${
              isLiked ? "text-red-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
