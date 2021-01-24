import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as loadingjson from "../resources/load-file.json";
import imgy from "../resources/ipad.jpg";
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
        <FadeIn delay={100}>
          <div class="loading-anim">
            <Lottie options={defaultOptions} height={100} width={100} />
            <div class="loading-products">Loading Products</div>
          </div>
        </FadeIn>
      ) : (
        <table className="product-list-table">
          <thead></thead>
          <tbody>
            {listItem.map((item, i) => {
              return (
                <tr id={item.id} key={item.id} className="item">
                  <div className="image-flex">
                    <img width="50px" HEIGHT="50PX" src={imgy} />
                    <div className="name-flex">
                      <td className="list-name">{item.name}</td>
                      <div className="list-price">₹{item.price}</div>
                    </div>
                  </div>
                  <td className="list-sale">{item.salePrice}</td>
                  <td className="tags">{item.category_name}</td>
                  <td>
                    <button onClick={() => editItem(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="gray"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    <button onClick={() => deleteItem(item)}>
                      <svg
                        id="Icons"
                        fill="gray"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 32 32"
                        width="15px"
                        height="15px"
                      >
                        <path
                          d="M27,4H5C3.3,4,2,5.3,2,7v18c0,1.7,1.3,3,3,3h10.4c-0.9-1.5-1.4-3.2-1.4-5c0-5.5,4.5-10,10-10c2.3,0,4.3,0.8,6,2V7
	C30,5.3,28.7,4,27,4z M7.9,8.4C7.9,8.5,7.8,8.6,7.7,8.7C7.5,8.9,7.3,9,7,9S6.5,8.9,6.3,8.7C6.1,8.5,6,8.3,6,8c0-0.3,0.1-0.5,0.3-0.7
	c0,0,0.1-0.1,0.1-0.1c0.1,0,0.1-0.1,0.2-0.1C6.7,7,6.7,7,6.8,7c0.1,0,0.3,0,0.4,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1
	c0,0,0.1,0.1,0.1,0.1c0.1,0.1,0.2,0.2,0.2,0.3C8,7.7,8,7.9,8,8C8,8.1,8,8.3,7.9,8.4z M10.7,8.7C10.5,8.9,10.3,9,10,9
	C9.7,9,9.5,8.9,9.3,8.7C9.1,8.5,9,8.3,9,8c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.2
	C10,6.9,10.4,7,10.7,7.3c0.1,0.1,0.2,0.2,0.2,0.3C11,7.7,11,7.9,11,8C11,8.3,10.9,8.5,10.7,8.7z M13.9,8.4c-0.1,0.1-0.1,0.2-0.2,0.3
	C13.5,8.9,13.3,9,13,9c-0.1,0-0.3,0-0.4-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.2-0.3C12,8.3,12,8.1,12,8
	c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.4-0.4,1-0.4,1.4,0c0.1,0.1,0.2,0.2,0.2,0.3C14,7.7,14,7.9,14,8
	C14,8.1,14,8.3,13.9,8.4z"
                        />
                        <path
                          d="M18.3,17.3c-3.1,3.1-3.1,8.2,0,11.3s8.2,3.1,11.3,0s3.1-8.2,0-11.3S21.5,14.2,18.3,17.3z M26.8,21.6L25.4,23l1.4,1.4
	c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L24,24.4l-1.4,1.4c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l1.4-1.4l-1.4-1.4
	c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l1.4,1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0C27.2,20.6,27.2,21.2,26.8,21.6z"
                        />
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
