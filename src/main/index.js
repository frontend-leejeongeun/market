import React from "react";
import "./index.css";
import axios from "axios";

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(
        "https://d9e6b78c-0d63-4a2f-927a-2cd38422b255.mock.pstmn.io/products"
      )
      .then(function (result) {
        console.log("통신완료", result);
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러발생", error);
      });
  }, []);

  return (
    <div className="main-wrapper">
      <div className="header">
        <div className="header-area">
          <img src="images/icons/mimoticon-heart.png" />
          <span className="text">Market</span>
        </div>
      </div>
      <div className="banner">
        <img src="images/banners/banner2.jpg" />
      </div>
      <div className="product-wrap">
        <h2>판매되는 상품들</h2>
        <div className="product-list">
          {products.map(function (product, index) {
            return (
              <div className="product-card" key={index}>
                <div className="product-img">
                  <img src={product.imageUrl} alt="" />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-seller">
                    <img src="images/icons/mimoticon-heart.png" alt="" />
                    <span>{product.seller}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="footer">
        <img src="images/icons/mimoticon-heart.png" alt="" />
        <img src="images/icons/mimoticon-heart.png" alt="" />
        <img src="images/icons/mimoticon-heart.png" alt="" />
      </div>
    </div>
  );
}

export default MainPage;
