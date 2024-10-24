import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/constants";
import { Button, message } from "antd";
import "./index.css";

function DeletePage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const history = useHistory();

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        message.error(
          `상품 정보를 불러오는 중 오류가 발생했습니다: ${error.message}`
        );
      });
  };

  const onClickDelete = () => {
    axios
      .delete(`${API_URL}/products/${id}`)
      .then(function () {
        message.success("상품이 성공적으로 삭제되었습니다.");
        history.push("/"); // 삭제 후 메인 페이지로 이동
      })
      .catch(function (error) {
        message.error(`상품 삭제 중 오류가 발생했습니다: ${error.message}`);
      });
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) {
    return <h1>상품 정보를 불러오는 중...</h1>;
  }

  return (
    <div className="product-delete-wrap">
      <h2>정말로 상품을 삭제하시겠습니까?</h2>
      <div className="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
      </div>
      <div className="contents-box">
        <div className="name">{product.name}</div>
        <div className="price">{product.price}원</div>
      </div>
      <div className="delete-button-wrap">
        <Button type="primary" danger onClick={onClickDelete}>
          삭제하기
        </Button>
      </div>
    </div>
  );
}

export default DeletePage;
