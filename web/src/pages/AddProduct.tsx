import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useAddImageMutation,
  useAddProductMutation,
} from "../features/product/productApiSlice";
import { setProductCredentials } from "../features/product/productslice";

const AddProduct = () => {
  const errRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [productPictures, setProductPictures] = useState<string>("");

  const [errMsg, setErrMsg] = useState<any>("");
  const navigate = useNavigate();

  const [addproduct, { isLoading }] = useAddProductMutation();
  const dispatch = useDispatch();

  //   const uploadFileHandler = async (e:React.FocusEvent) => {
  //     const file = (e.target as HTMLInputElement).files[0];
  //     const bodyFormData = new FormData();
  //     bodyFormData.append("image", file);
  //     try {

  //       setImage(data);
  //     } catch (err: any) {
  //       if (!err?.originalStatus) {
  //         // isLoading: true until timeout occurs
  //         setErrMsg("No Server Response");
  //       } else if (err.originalStatus === 400) {
  //         setErrMsg("Missing Username or Password");
  //       } else if (err.originalStatus === 401) {
  //         setErrMsg("Unauthorized");
  //       } else {
  //         setErrMsg("Login Failed");
  //       }
  //       errRef?.current?.focus();
  //     }
  //   };
  //   };
  const [addImage] = useAddImageMutation();
  const uploadFileHandler = async (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    e.preventDefault();
    try {
        const data = await addImage(bodyFormData).unwrap();
        console.log("data:",data)
        setProductPictures(data)
        setErrMsg("")
    } catch (error) {
        setErrMsg("image is not set")
        console.log("error:",error)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = await addproduct({
        name,
        price,
        quantity,
        description,
        productPictures,
      }).unwrap();
      dispatch(setProductCredentials({ ...productData }));
      setName("");
      setPrice("");
      setProductPictures("");
      setDescription("");
      setQuantity("");
      navigate("/product");
    } catch (err: any) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef?.current?.focus();
    }
  };

  const handleNameInput = (e: React.FormEvent) =>
    setName((e.target as HTMLInputElement).value);

  const handleimgInput = (e: React.FormEvent) =>
    setProductPictures((e.target as HTMLInputElement).value);

  const handleDescInput = (e: React.FormEvent) =>
    setDescription((e.target as HTMLInputElement).value);

  const handleQtyInput = (e: React.FormEvent) =>
    setQuantity((e.target as HTMLInputElement).value);

  const handlePriceInput = (e: React.FormEvent) =>
    setPrice((e.target as HTMLInputElement).value);
  const contant = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          {" "}
          {errMsg && (
            <p
              ref={errRef}
              className={errMsg ? "text-danger" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <h3> Add Product</h3>
            <div className="mb-3">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleNameInput}
                placeholder="Enter Product Name"
              />
            </div>
            <div className="mb-3">
              <label>Product image</label>
              <input
                type="file"
                className="form-control"
                onChange={uploadFileHandler}
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <input
                type="text area"
                className="form-control"
                onChange={handleDescInput}
                placeholder="Enter Product Name"
              />
            </div>
            <div className="mb-3">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                onChange={handleQtyInput}
                placeholder="Enter Product Name"
              />
            </div>
            <div className="mb-3">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                onChange={handlePriceInput}
                placeholder="Enter Product Name"
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return contant;
};

export default AddProduct;
