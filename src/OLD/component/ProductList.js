import React, { useEffect, useState } from "react";


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
