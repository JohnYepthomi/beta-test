import "./orders.css";
import Appheader from "../component/Appheader.js";
import Sidebar from "../component/sidebar";

function orders() {
  return (
    <>
      <Appheader />
      <div className="main_window">
        <Sidebar />
        <div className="container">
          <h1 className="title">Orders</h1>
          <div className="row"></div>
        </div>
      </div>
    </>
  );
}

export default orders;
