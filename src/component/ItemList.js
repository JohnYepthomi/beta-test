import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loadingjson from "../resources/loading.json";

const ItemList = ({ editItem }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingjson.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        const listItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(listItems);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  //DB: Remove/Delete Data
  const deleteItem = (item) => {
    console.log("DB delete called");
    firebase
      .firestore()
      .collection("products")
      .doc(item.id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const listItem = items;
  const loadingStyle = {
    color: "white",
    backgroundColor: "gray",
    fontSize: "13px",
    textAlign: "center",
  };

  return (
    <>
      {loading ? (
        <FadeIn delay={0}>
          <div class="loading-anim">
            <Lottie options={defaultOptions} height={30} width={30} />
            <p class="logging-in">
              <small>Loggin you in</small>
            </p>
          </div>
        </FadeIn>
      ) : (
        <table className="product-list-table">
          <thead>
            <tr className="items-table-header">
              <th>Item</th>
              <th>Price</th>
              <th>Sale Price</th>
              <th>Category</th>
              <th>Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listItem.map((item, i) => {
              return (
                <tr id={item.id} key={item.id} className="item">
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.salePrice}</td>
                  <td>{item.category}</td>
                  <td>{item.color}</td>
                  <td>
                    <button onClick={() => editItem(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-pencil-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    </button>
                    <button onClick={() => deleteItem(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gray"
                        className="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ItemList;
