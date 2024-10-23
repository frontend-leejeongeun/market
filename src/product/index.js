import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  React.useEffect(function () {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        console.log("상세 통신완료", result);
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error("에러", error);
      });
  }, []);

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다</h1>;
  }

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
      </div>
    </div>
  );
}

export default ProductPage;
