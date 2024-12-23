import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRegistered, selectuserInfo } from "../features/SubmitSlice";
import { Link } from "react-router-dom";

function Account() {
  const dispatch = useDispatch();

  const userInfo = useSelector(selectuserInfo);
  const isRegistered = useSelector(selectIsRegistered);

  if (!isRegistered) {
    return (
      <div className="w-full h-[100vh] bg-gray-50 flex justify-center items-center">
        <Link to="/contact" className="text-6xl">
          Зарегистрироваться
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    dispatch({
      type: "Logout",
      paylaod: undefined,
    });
  };

  return (
    <div className="w-full bg-gray-50 p-14 flex justify-center">
      <div className="w-[800px] flex flex-col gap-9 bg-white p-8 rounded-3xl">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-3">
            <h4 className="text-5xl">{userInfo.name}</h4>
            <p>{userInfo.surename ? userInfo.surename : ""}</p>
          </div>

          {userInfo.image ? (
            <img
              src={userInfo.image}
              className="w-36 h-36 object-cover rounded-xl"
            />
          ) : (
            <div className="w-36 h-36 bg-gray-50 flex justify-center items-center rounded-xl">
              Profile
            </div>
          )}
        </div>

        <div className="w-full flex flex-col gap-3">
          <h4>Информация от пользователе</h4>

          <span className="w-full p-2 bg-gray-50 rounded-2xl">
            {userInfo.bio ? userInfo.bio : "Информация отсутствует"}
          </span>
        </div>

        <div className="w-full flex flex-col gap-3 bg-gray-50 p-5 rounded-2xl">
            <p>Имя: {userInfo.name}</p>

            <p>Фамилия: {userInfo.surename}</p>
            
            <p>Почта: {userInfo.email}</p>

            <p>Пароль: {userInfo.password}</p>
        </div>

        <button
          href=""
          onClick={handleLogout}
          className="w-44 text-white bg-red-600 p-2 rounded-2xl"
        >
          Выйти
        </button>
      </div>
    </div>
  );
}

export default Account;
