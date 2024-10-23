import React from "react";
import "./index.css";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants";

dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(`${API_URL}/products`)
      .then(function (result) {
        console.log("메인 통신완료", result);
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러", error);
      });
  }, []);

  return (
    <div>
      <div className="banner">
        <img src="/images/banners/banner2.jpg" />
      </div>
      <div className="product-wrap">
        <h2>판매되는 상품들</h2>
        <div className="product-list">
          {products.map(function (product, index) {
            return (
              <div className="product-card" key={index}>
                <Link className="product-link" to={`/products/${product.id}`}>
                  <div className="product-img">
                    <img src={`${API_URL}/${product.imageUrl}`} alt="image" />
                  </div>
                  <div className="product-contents">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}원</span>

                    <div className="product-footer">
                      <div className="product-seller">
                        <img src="/images/icons/mimoticon-heart.png" alt="" />
                        <span>{product.seller}</span>
                      </div>
                      <span className="product-date">
                        {dayjs(product.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
