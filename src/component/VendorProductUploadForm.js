import React, { useState, useRef } from "react";
import firebase from "firebase/app";
import nescafe from "../resources/nescafe.jpg";

const VendorProductUploadForm = ({ setShowFormModal }) => {
  //Product Attributes
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [productSlug, setProductSlug] = useState(null);
  const [shortDesc, setShortDesc] = useState(null);
  const [longDesc, setLongDesc] = useState(null);
  // const [mainImgUrl, setMainImgUrl] = useState(null);
  // const [otherImgUrl, setOtherImgUrl] = useState(null);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [weight, setWeight] = useState(null);
  // const [categoryId, setCategoryId] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const formRef = useRef(null);

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setShowFormModal(false);
    }
  };

  const addProductName = (e) => {
    setName(e.target.value);
    setProductSlug("AH-" + e.target.value);
  };

  const addProduct = (e) => {
    setIsUploaded(true);
    e.preventDefault();

    firebase
      .firestore()
      .collection("products")
      .add({
        name: name,
        category_name: category,
        subCategory_name: subCategory,
        category_id: "na",
        product_slug: productSlug,
        vendor_id: "N3Et62BEbrcOlgxHVypH",
        price: price,
        salePrice: salePrice,
        color: color,
        weight: weight,
        mainImgUrl: "na",
        otherImgUrl: "na",
        shortDesc: shortDesc,
        longDesc: longDesc,
        size: size,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);

        //Empty the input fields for new upload
        formRef.current.reset();
        setIsUploaded(false);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div onClick={handleClick} className="backdrop">
      <div className="p-container">
        <div className="p-title">Add Product</div>
        <div className="r-flex">
          <img width="35px" src={nescafe} />
          <div className="p-card">
            <div className="p-label">Name</div>
            <div>
              <input placeholder="Enter product name" />
            </div>
          </div>
        </div>
        <div className="r-flex">
          <div className="p-card">
            <div className="p-label">Price</div>
            <div>
              <input type="number" placeholder="Enter price" />
            </div>
          </div>
          <div className="p-card">
            <div class="p-label">Sale Price</div>
            <div>
              <input type="number" placeholder="Enter sale price" />
            </div>
          </div>
        </div>
        <div className="r-flex">
          <div className="p-card">
            <div className="p-label">Category</div>
            <div>
              <select>
                <option value="Food">Food</option>
                <option value="Electronics">Electronics</option>
                <option value="Medicine">Medicine</option>
                <option value="Hardware">Hardware</option>
              </select>
            </div>
          </div>
          <div className="p-card">
            <div class="p-label">Sub Category</div>
            <div>
              <select>
                <option value="baby-food">Baby foods</option>
                <option value="breakfast">Breakfast</option>
                <option value="snacks">Snacks</option>
                <option value="baked-goods">baked goods</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-card">
          <div className="p-label">Details</div>
          <div>
            <input placeholder="Enter product details" />
          </div>
        </div>

        <div className="p-card">
          <div className="p-label">Name</div>
          <div>
            <input placeholder="Enter product name" />
          </div>
        </div>

        <div className="p-card">
          <div className="p-label">Name</div>
          <div>
            <input placeholder="Enter product name" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProductUploadForm;
