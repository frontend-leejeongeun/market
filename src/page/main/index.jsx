import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Carousel } from "antd";
import { API_URL } from "../../config/constants";
import "./index.css";

dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(function () {
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

    axios
      .get(`${API_URL}/banners`)
      .then(function (result) {
        console.log("배너 통신완료", result);
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch(function (error) {
        console.error("에러", error);
      });
  }, []);

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div className="banner">
                <img src={`${API_URL}/${banner.imageUrl}`} />
              </div>
            </Link>
          );
        })}
      </Carousel>

      <div className="product-wrap">
        <h2>판매되는 상품들</h2>
        <div className="product-list">
          {products.map(function (product, index) {
            return (
              <div className="product-card" key={index}>
                {console.log(product.soldout)} {/* soldout 값 확인 */}
                {product.soldout === 1 && (
                  <div className="product-blur">판매완료</div>
                )}
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
                    </div>
                    <span className="product-date">
                      {dayjs(product.createdAt).fromNow()}
                    </span>
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
