import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./index.css";

function Header() {
  const history = useHistory();

  return (
    <div className="header">
      <div className="header-area">
        <Link to="/">
          <img src="/images/icons/mimoticon-heart.png" />
          <span className="text">Market</span>
        </Link>
        <Button
          size="large"
          onClick={function () {
            history.push("/upload");
          }}
          icon={<UploadOutlined />}
        >
          상품 업로드
        </Button>
      </div>
    </div>
  );
}

export default Header;
