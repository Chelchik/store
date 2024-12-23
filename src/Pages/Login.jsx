import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBio,
  selectEmail,
  selectImage,
  selectName,
  selectPassword,
  selectSurename,
} from "../features/RegisterSlice";
import { selectIsRegistered, selectuserInfo } from "../features/SubmitSlice";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();

  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const name = useSelector(selectName);
  const surename = useSelector(selectSurename);
  const image = useSelector(selectImage);
  const bio = useSelector(selectBio)
  console.log(image);

  const userInfo = useSelector(selectuserInfo);
  const isRegistered = useSelector(selectIsRegistered);

  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = useState(false);
  const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);

  if (isRegistered) {
    return (
      <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-5">
        <h3 className="text-4xl">Добро пожаловать {userInfo.name}</h3>

        <Link to="/profile" className="text-blue-400">
          Перейти на страницу профиля
        </Link>
      </div>
    );
  }

  const handleName = (e) => {
    dispatch({
      type: "Name",
      payload: e.target.value,
    });
  };

  const handleSurename = (e) => {
    dispatch({
      type: "Surename",
      payload: e.target.value,
    });
  };

  const handleEmail = (e) => {
    dispatch({
      type: "Email",
      payload: e.target.value,
    });
  };

  const handleBio = (e) => {
    dispatch({
      type: "Bio",
      payload: e.target.value,
    });
  };

  const handlePassword = (e) => {
    dispatch({
      type: "Password",
      payload: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch({
          type: "Image",
          payload: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailInvalid(!/\S+@\S+\.\S+/.test(email));

    if (name.length == 0) {
      setNameIsEmpty(true);
    } else {
      setNameIsEmpty(false);
    }

    if (password.length == 0) {
      setPasswordIsEmpty(true);
    } else {
      setPasswordIsEmpty(false);
    }

    if (email.length == 0) {
      setEmailIsEmpty(true);
    } else {
      setEmailIsEmpty(false);
    }

    if (email.length >= 1 && password.length >= 1 && name.length >= 1) {
      dispatch({
        type: "Submit",
        payload: {
          id: Math.random(),
          name: name,
          surename: surename,
          email: email,
          password: password,
          bio: bio,
          image: image,
        },
      });
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-50">
      <div className="w-[700px] p-5 rounded-2xl bg-white flex flex-col items-center gap-8">
        <h3 className="text-4xl">Register</h3>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-col gap-8 formMedia:flex-row">
          <div className="w-full flex flex-col gap-6 formMedia:w-1/2">
          <div className="w-full flex flex-col gap-2 formMedia:w-full">
            <input
              type="text"
              placeholder="Ввидите своё имя*"
              className={`w-full p-2 border-2 rounded-xl transition-all hover:border-blue-500 focus:border-blue-500 ${
                nameIsEmpty ? "border-red-600" : "border-gray-200"
              }`}
              onChange={handleName}
            />

            <p className="text-red-600">
              {nameIsEmpty ? "Вы не написали своё имя" : ""}
            </p>
          </div>

          <div className="w-full flex flex-col gap-1">
            <input
              type="text"
              placeholder="Ввидите свою фамилию"
              className="w-full border-gray-200 p-2 border-2 rounded-xl transition-all hover:border-blue-500 focus:border-blue-500"
              onChange={handleSurename}
            />

            <p className="text-gray-400 text-sm">Не обязательно</p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <input
              type="text"
              placeholder="Ввидите свою почту*"
              className={`w-full p-2 border-2 rounded-xl transition-all hover:border-blue-500 focus:border-blue-500 ${
                emailIsEmpty
                  ? "border-red-600"
                  : emailInvalid
                  ? "border-red-600"
                  : "border-gray-200"
              }`}
              onChange={handleEmail}
            />

            <p className="text-red-600">
              {emailIsEmpty ? "Вы не написали свою почту" : ""}
            </p>
            <p className="text-red-600">
              {emailInvalid ? "Неверный формат электронной почты" : ""}
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <input
              type="password"
              placeholder="Ввидите свой пороль*"
              className={`w-full p-2 border-2 rounded-xl transition-all hover:border-blue-500 focus:border-blue-500 ${
                passwordIsEmpty ? "border-red-600" : "border-gray-200"
              }`}
              onChange={handlePassword}
            />

            <p className="text-red-600">
              {passwordIsEmpty ? "Вы не написали свой пароль" : ""}
            </p>
          </div>
          </div>

          <div className="w-full flex flex-col justify-between formMedia:w-1/2">
            <div className="w-full flex flex-col gap-2">
              <textarea
                rows={7}
                placeholder="Информация о вас"
                className="w-full p-2 border-2 rounded-xl transition-all resize-none  hover:border-blue-500 focus:border-blue-500"
                onChange={handleBio}
              ></textarea>

              <p className="text-gray-400 text-sm">Не обязательно</p>
            </div>

            <div className="w-full flex flex-col gap-2">
              <label htmlFor="avatar">Ваш аватар</label>
              <input
                type="file"
                id="avatar"
                className="w-full p-2 border-2 rounded-xl transition-all hover:border-blue-500 focus:border-blue-500"
                onChange={handleImage}
                accept="image/*"
              />
              <p className="text-gray-400 text-sm">Не обязательно</p>
            </div>
          </div>
          </div>

          <input
            type="submit"
            value="Создать"
            className="w-full p-2 rounded-3xl bg-blue-600 text-white transition-all hover:opacity-90 active:opacity-80"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
