import React, { useEffect, useState } from "react";
import "../component/ProductsTable.css";
import firebase from "firebase/app";

const ProductsTable = (params) => {
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  let isEdit = true;

  useEffect(() => {
    //console.log("rendered useEffect");

    let unsubscribe = firebase
      .firestore()
      .collection("products")
      .onSnapshot(function (docs) {
        docs.docChanges().forEach(function (change) {
          if (change.type === "added") {
            console.log("added : ", change.doc.data());
            setProds((oldArr) => [
              ...oldArr,
              {
                id: change.doc.id,
                name: change.doc.data().name,
                price: change.doc.data().price,
                category: change.doc.data().category_name,
                salePrice: change.doc.data().salePrice,
                color: change.doc.data().color,
              },
            ]);
            setLoading(false);
          }
          if (change.type === "modified") {
            console.log("Modified : ", change.doc.data());
          }
          if (change.type === "removed") {
            console.log("Removed : ", change.doc.data());
          }
        });
      });

    return () => unsubscribe();
  }, []);

  //get prods index of the current editable row.
  let findIndexInProd = (id) => {
    let primeIndex = null;

    prods.forEach((prod, i) => {
      if (prod.id === id) {
        primeIndex = i;
      }
    });

    return primeIndex;
  };

  //Key Handler
  const keyHandler = (e) => {
    let id,
      name,
      category,
      color,
      price,
      salePrice = null;

    id = e.target.parentNode.id;

    var keycode = e.charCode || e.keyCode;
    if (keycode == 13) {
      e.preventDefault();
    }

    let children = Array.from(e.target.parentNode.children);

    let index = findIndexInProd(id);

    children.forEach((child, i) => {
      if (i === 0) {
        if (prods[index].name !== child.innerHTML) {
          children[children.length - 1].style.visibility = "visible";
        } else {
          children[children.length - 1].style.visibility = "hidden";
        }
      } else if (i === 1) {
        if (prods[index].price !== child.innerHTML) {
          children[children.length - 1].style.visibility = "visible";
        } else {
          children[children.length - 1].style.visibility = "hidden";
        }
      } else if (i === 2) {
        if (prods[index].salePrice !== child.innerHTML) {
          children[children.length - 1].style.visibility = "visible";
        } else {
          children[children.length - 1].style.visibility = "hidden";
        }
      } else if (i === 3) {
        if (prods[index].color !== child.innerHTML) {
          children[children.length - 1].style.visibility = "visible";
        } else {
          children[children.length - 1].style.visibility = "hidden";
        }
      } else if (i === 4) {
        if (prods[index].category !== child.innerHTML) {
          children[children.length - 1].style.visibility = "visible";
        } else {
          children[children.length - 1].style.visibility = "hidden";
        }
      }
    });
  };

  //DB: Update/Edit Data
  const uploadChanges = (id, name, category, color, price, salePrice) => {
    console.log(name);
    firebase
      .firestore()
      .collection("products")
      .doc(id)
      .update({
        name: name,
        category_name: category,
        price: price,
        salePrice: salePrice,
        color: color,
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  //DB: Remove/Delete Data
  const DeleteData = (id) => {
    firebase
      .firestore()
      .collection("products")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };
  //Submit Handler
  const submitEditedProducts = (e) => {
    let children = Array.from(e.target.parentNode.children);
    let id,
      name,
      category,
      color,
      price,
      salePrice = null;
    id = e.target.parentNode.id;

    children.map((child, i) => {
      if (i === 0) name = child.innerHTML;
      else if (i === 1) price = child.innerHTML;
      else if (i === 2) salePrice = child.innerHTML;
      else if (i === 3) color = child.innerHTML;
      else if (i === 4) category = child.innerHTML;
    });

    uploadChanges(id, name, category, color, price, salePrice);

    children.map((child) => {
      child.contentEditable = "false";
    });

    e.target.remove();
  };

  //delete handler
  const deleteProduct = (e) => {
    let id = e.target.parentNode.id;
    DeleteData(id);

    e.target.parentNode.remove();
  };

  //Edit Handler
  const editProduct = (e) => {
    let children = Array.from(e.target.parentNode.children);

    if (isEdit) {
      let submitBtn = document.createElement("button");

      submitBtn.onclick = submitEditedProducts;
      submitBtn.innerHTML = "Submit";
      submitBtn.classList.add("prod-submit-btn");
      submitBtn.style.visibility = "hidden";
      e.target.parentNode.appendChild(submitBtn);
      isEdit = false; // to avoid creation of multiple Submit btns
    }
    children.map((child, i) => {
      if (i < 5) {
        child.contentEditable = "true";
      }

      if (child.addEventListener) {
        child.addEventListener("keyup", keyHandler, false);
        child.addEventListener("keypress", keyHandler, false);
      } else {
        child.attachEvent("keyup", keyHandler);
        child.attachEvent("keypress", keyHandler);
      }
    });
  };

  //cancel handler
  const cancelEdit = (e) => {
    let children = Array.from(e.target.parentNode.children);

    children.map((child) => {
      child.contentEditable = "false";
    });

    //removing the submit btn that was appended on edit
    e.target.nextSibling.nextSibling.remove();
    //resetting to enable edit the next time
    isEdit = true;
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
              width="20"
              height="20"
              fill="white"
              className="filter bi bi-filter-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM3.5 5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zM5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
        </div>

        <div className="inner-table-container">
          {console.log(prods)}
          {loading ? (
            <div>..Loading</div>
          ) : (
            prods.map((prod, i) => {
              return (
                <div id={prod.id} key={prod.id} className="one">
                  <p>{prod.name}</p>
                  <div>{prod.price}</div>
                  <div>{prod.salePrice}</div>
                  <div>{prod.color}</div>
                  <div>{prod.category}</div>

                  <button onClick={(e) => editProduct(e)}>Edit</button>
                  <button onClick={(e) => cancelEdit(e)}>Cancel</button>
                  <button onClick={(e) => deleteProduct(e)}>Delete</button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
