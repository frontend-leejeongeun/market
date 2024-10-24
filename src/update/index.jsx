import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/constants";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  Divider,
} from "antd";
import "./index.css";

function UpdatePage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
        setImageUrl(result.data.product.imageUrl); // 기존 이미지 설정
      })
      .catch(function (error) {
        message.error(`상품 정보를 불러오는 중 오류가 발생했습니다: ${error}`);
      });
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const onSubmit = (values) => {
    if (!imageUrl) {
      message.error("이미지를 업로드해주세요.");
      return;
    }

    axios
      .put(`${API_URL}/products/${id}`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((response) => {
        message.success("상품 정보가 성공적으로 업데이트되었습니다.");
        history.push(`/products/${id}`); // 상품 상세 페이지로 이동
      })
      .catch((error) => {
        message.error(
          `상품 정보 수정 중 오류가 발생했습니다: ${error.message}`
        );
      });
  };

  const onChangeImage = (info) => {
    if (info.file.status === "done") {
      const response = info.file.response;
      setImageUrl(response.imageUrl);
    }
  };

  if (!product) {
    return <h1>상품 정보를 불러오는 중...</h1>;
  }

  return (
    <div className="upload-wrap">
      <Form name="상품 수정" onFinish={onSubmit} initialValues={product}>
        <Form.Item
          name="upload"
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            listType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img
                className="upload-image"
                src={`${API_URL}/${imageUrl}`}
                alt="product"
              />
            ) : (
              <div className="upload-image-placeholder">
                <img src="/images/icons/camera.png" alt="upload" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item
          name="seller"
          label={<div className="upload-label">판매자 명</div>}
          rules={[{ required: true, message: "판매자 이름을 입력해주세요" }]}
        >
          <Input className="upload-name" placeholder="판매자 이름" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="name"
          label={<div className="upload-label">상품 이름</div>}
          rules={[{ required: true, message: "상품 이름을 입력해주세요" }]}
        >
          <Input className="upload-name" placeholder="상품 이름" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="price"
          label={<div className="upload-label">상품 가격</div>}
          rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
        >
          <InputNumber className="upload-price" />
        </Form.Item>
        <Divider />
        <Form.Item
          name="description"
          label={<div className="upload-label">상품 소개</div>}
          rules={[{ required: true, message: "상품 소개를 입력해주세요" }]}
        >
          <Input.TextArea
            className="product-description"
            showCount
            maxLength={300}
            placeholder="상품 소개를 적어주세요."
          />
        </Form.Item>
        <Button className="submit-button" type="primary" htmlType="submit">
          상품 수정하기
        </Button>
      </Form>
    </div>
  );
}

export default UpdatePage;
