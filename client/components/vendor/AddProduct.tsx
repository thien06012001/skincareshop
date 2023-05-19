/* eslint-disable @next/next/no-img-element */
"use client";
import { createProduct } from "@/redux/actions/product";
import { useAppDispatch } from "@/redux/hook";
import { server } from "@/server";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { types } from "@/static/data";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
type Props = {};

function AddProduct({}: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const { user } = useSelector((state: any) => state.user);
  const { success, error } = useSelector((state: any) => state.products);
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [applicationMode, setApplicationMode] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const maxWords = 500;
  const handleDescriptionChange = (e: any) => {
    const input = e.target.value;
    const words = input.length;
    console.log(words);
    if (words.length <= maxWords) {
      setDescription(input);
    }
  };
  let remainingWords = 500 - description.length;
  console.log(remainingWords);
  useEffect(() => {
    if (error) {
      toast.error(error);
      setIsLoading(false);
    }
    if (success) {
      toast.success("Product created successfully!");
      window.location.reload();
      
    }
  }, [dispatch, error, success]);
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (!/^[0-9\s]*$/.test(price) && price !== undefined) {
      toast.error("The price must only contain numbers.");
      setIsLoading(false);
      return;
    }
    const newForm = new FormData();
    if (image) {
      newForm.append("file", image);
    }
    newForm.append("name", name);
    newForm.append("price", price);
    newForm.append("category", category);
    newForm.append("description", description);
    newForm.append("applicationMode", applicationMode);
    newForm.append("ingredients", ingredients);
    newForm.append("shopId", user._id);
    dispatch(createProduct(newForm));
  };
  return (
    <form onSubmit={handleSubmit} className="flex min-h-screen flex-col">
      <div className="">
        <h1 className="pb-10 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">
          ADD NEW PRODUCT
        </h1>
        <div className="flex flex-col justify-center md:flex-row">
          <div className="flex w-full flex-col items-center md:w-[30%]">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="avatar"
                className="h-20 w-20 md:h-32 md:w-32"
              />
            ) : (
              <div className="flex flex-col items-center justify-center border border-[#BBA999] bg-white p-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-20 w-20 text-[#BBA898] md:h-32 md:w-32"
                >
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path
                    fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <hr className="w-full border border-[#BBA898]" />
              </div>
            )}
            <label
              htmlFor="file-input"
              className=" mx-auto mt-1 flex w-fit cursor-pointer items-center justify-center rounded-md bg-[#BBA999] px-4 py-2 font-medium shadow-md md:mt-2 lg:mt-4"
            >
              <span className="text-base font-light text-white">
                Select Photo
              </span>
              <input
                type="file"
                name="avatar"
                id="file-input"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInputChange}
                className="sr-only"
              />
            </label>
          </div>
          <div className="mt-3 flex w-full flex-col items-center gap-6 font-bold text-[#2C2C2CBF] md:w-[60%]">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-#BBA999 w-full border bg-white p-2 outline-none"
              name=""
              id=""
            />
            <div className="flex w-full flex-col gap-5 md:flex-row">
              <div className="flex w-full flex-col items-center gap-5 md:w-[45%] md:flex-row">
                <select
                  name="category"
                  autoComplete="category"
                  placeholder="Choose Category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border-b-2 border-[#55564E] bg-transparent px-3 py-2 placeholder:tracking-wider placeholder:text-[#55564E] focus:bg-transparent focus:outline-none"
                >
                  <option value="" className="block border pb-2 text-center">
                    Category
                  </option>
                  {types.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="w-full overflow-hidden bg-transparent text-[#55564E]"
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-[45%]">
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-#BBA999 w-full border bg-white p-2 outline-none "
                  name=""
                  id=""
                />
              </div>
            </div>
            <p className="w-full text-start">Description</p>
            <textarea
              name=""
              id=""
              value={description}
              className="min-h-[10rem] w-full bg-white px-2 py-1"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p>Max Characters: 500</p>
            <p className="w-full text-start">Application Mode</p>
            <textarea
              name=""
              id=""
              value={applicationMode}
              className="min-h-[10rem] w-full bg-white px-2 py-1"
              placeholder="Application Mode"
              onChange={(e) => setApplicationMode(e.target.value)}
            ></textarea>
            <p className="w-full text-start">Ingredients</p>
            <textarea
              name=""
              id=""
              value={ingredients}
              className="min-h-[10rem] w-full bg-white px-2 py-1"
              placeholder="Ingredients"
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div
          className="flex items-center justify-center tracking-widest"
          role="status"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mr-2 h-12 w-12 animate-spin fill-[#55564E] text-gray-200"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <button
          type="submit"
          className="mx-auto mt-1 flex w-fit cursor-pointer items-center justify-center rounded-md bg-[#BBA999] px-4 py-2 font-medium text-white shadow-md md:mt-2 lg:mt-4"
        >
          Create
        </button>
      )}
    </form>
  );
}

export default AddProduct;
