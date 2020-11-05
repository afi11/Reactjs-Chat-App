import React, { useState, useEffect } from "react";
import axios from "axios";
import { urlApiMain, urlWeb } from "../../utils/url";

const EditUser = () => {
  const [profil, setProfil] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [updatePhoto, setUpdatePhoto] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setProfil({
      ...profil,
      [name]: value,
    });
    console.log(profil);
  };

  const getProfil = () => {
    axios
      .get(`${urlApiMain}profil`)
      .then((res) => {
        setProfil({
          ...profil,
          ["id"]: res.data[0].id,
          ["name"]: res.data[0].name,
          ["email"]: res.data[0].email,
          ["password"]: res.data[0].password,
          ["photo"]: res.data[0].photo,
          ["old_photo"]: res.data[0].photo,
        });
      })
      .catch((err) => {});
  };

  const getFile = () => {
    document.getElementById("fileImage").click();
    setUpdatePhoto(true);
  };

  const getFileMessage = (event) => {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    const { type } = event.target.files[0];
    console.log(event.target.files[0]);
    if (type == "image/png" || type == "image/jpeg") {
      fileReader.onload = (e) => {
        setProfil({
          ...profil,
          ["photo"]: e.target.result,
        });
      };
    } else {
      alert("Image must has extention is png or jpeg.");
    }
  };

  const updateProfil = () => {
    axios
      .post(`${urlApiMain}update_profil`, profil)
      .then((res) => {
        alert("Congratulations, you succeed to update profil! ");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getProfil();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-white md:w-1/3 mt-6 rounded shadow-md px-6 py-6">
        <p className="font-semibold text-lg">Edit Profil</p>
        <div className="flex flex-col items-center">
          <img
            className="w-1/3 flex-1 rounded-full items-center"
            src={updatePhoto ? profil.photo : `${urlWeb}profil/${profil.photo}`}
          />
          <input
            type="file"
            name="photo"
            onChange={(e) => getFileMessage(e)}
            id="fileImage"
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={getFile}
            className="bg-blue-500 mt-3 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-full"
          >
            <i class="fas fa-camera"></i>
          </button>
        </div>
        <label className="bloc text-gray-700 text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={profil.name}
          className="mt-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => onInputChange(e)}
          placeholder="Robert"
        />
        <label className="bloc text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={profil.email}
          className="mt-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => onInputChange(e)}
          placeholder="Robert@gmail.com"
        />
        <label className="bloc text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="mt-2 mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => onInputChange(e)}
          placeholder="*********"
        />
        <div className="flex mt-2">
          <button
            onClick={updateProfil}
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline focus:shadow-outline"
          >
            SIMPAN
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
