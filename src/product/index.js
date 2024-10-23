import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";
import { Button, message } from "antd";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        console.log("상세 통신완료", result);
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error("에러", error);
      });
  };

  React.useEffect(function () {
    getProduct();
  }, []);

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then(function (result) {
        message.info("구매가 완료되었습니다.");
        getProduct();
      })
      .catch(function (error) {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div className="product-detail-wrap">
      <div className="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} alt="" />
      </div>
      <div className="profile-box">
        <img src="/images/icons/mimoticon-heart.png" alt="" />
        <span>{product.seller}</span>
      </div>
      <div className="contents-box">
        <div className="name">{product.name}</div>
        <div className="price">{product.price}원</div>
        <div className="createdAt">
          {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
        </div>
        <pre className="description">{product.description}</pre>
        <Button
          className="purchase-button"
          size="large"
          type="primary"
          danger
          onClick={onClickPurchase}
          disabled={product.soldout === 1}
        >
          구매하기
        </Button>
      </div>
    </div>
  );
}

export default ProductPage;
