import React, { useEffect, useState } from "react";
import "./UpdateItem.css";

const UpdateItem = ({ setEditing, currentItem, updateItem }) => {
  const [item, setItem] = useState(currentItem);

  useEffect(() => {
    setItem(currentItem);
    console.log(" 'currentItem' has been set to 'setItem' ");
  }, [currentItem]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      "onSubmit: Passed props to updataItem() located on the main component"
    );
    updateItem({ currentItem }, item);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <>
      <form className="update-item-form" onSubmit={onSubmit}>
        <label htmlFor="Update Item">Update Item: </label>
        <br />
        <label>Name</label>
        <input type="text" name="name" value={item.name} onChange={onChange} />
        <br />
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={item.price}
          onChange={onChange}
        />
        <br />
        <label>Sale Price</label>
        <input
          type="text"
          name="salePrice"
          value={item.salePrice}
          onChange={onChange}
        />
        <br />
        <label>Color</label>
        <input
          type="text"
          name="color"
          value={item.color}
          onChange={onChange}
        />
        <br />
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={item.category}
          onChange={onChange}
        />
        <button type="submit"> Update</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </form>
    </>
  );
};

export default UpdateItem;
