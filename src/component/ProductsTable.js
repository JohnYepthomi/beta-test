import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "../component/ProductsTable.css";
import ItemList from "./ItemList.js";
import UpdateItem from "./UpdateItem";

const ProductsTable = (params) => {
  const initialItemState = [
    { id: null, name: "", price: "", category: "", salePrice: "", color: "" },
  ];
  const [currentItem, setCurrentItem] = useState(initialItemState);
  const [editing, setEditing] = useState(false);

  const editItem = (item) => {
    setEditing(true);
    setCurrentItem({
      id: item.id,
      name: item.name,
      price: item.price,
      salePrice: item.salePrice,
      color: item.color,
      category: item.category_name,
    });
  };

  const updateItem = ({ currentItem }, updatedItem) => {
    console.log("Processing item : " + updatedItem.name + ". ");
    if (currentItem === updatedItem) {
      console.log("No changes made. Nothing to upload.");
    } else {
      firebase
        .firestore()
        .collection("products")
        .doc(currentItem.id)
        .update(updatedItem)
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  };

  return (
    <div className="table-main-container">
      <div className="product-table-container">
        <div className="title-input">
          <div className="table-title">PRODUCTS</div>
          <input
            className="products-table-search"
            placeholder="Search products.."
          />
          <button className="filter-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="gray"
              className="filter bi bi-filter-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM3.5 5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zM5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
        </div>
        <div className="inner-table-container">
          <ItemList editItem={editItem} />
        </div>

        {editing && (
          <UpdateItem
            setEditing={setEditing}
            currentItem={currentItem}
            updateItem={updateItem}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsTable;
