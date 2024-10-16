import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = React.useState(null);
  React.useEffect(function () {
    axios
      .get(
        `https://d9e6b78c-0d63-4a2f-927a-2cd38422b255.mock.pstmn.io/products/${id}`
      )
      .then(function (result) {
        console.log("상세 통신완료", result);
        setProduct(result.data);
      })
      .catch(function (error) {
        console.error("에러", error);
      });
  }, []);

  if (product === null) {
    return <h1>상품 정보를 받고 있습니다</h1>;
  }

  return (
    <div>
      <div className="image-box">
        <img src={product.imageUrl} alt="" />
      </div>
      <div className="profile-box">
        <img src="/images/icons/mimoticon-heart.png" alt="" />
        <span>{product.seller}</span>
      </div>
      <div className="contents-box">
        <div className="name">{product.name}</div>
        <div className="price">{product.price}</div>
        <div className="createdAt">2024년 10월 11일</div>
        <div className="description">{product.description}</div>
      </div>
    </div>
  );
}

export default ProductPage;
