import "./App.css";
import MainPageComponent from "./main";
import UploadPage from "./upload";
import ProductPage from "./product";
import UpdatePage from "./update";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function App() {
  const history = useHistory();
  return (
    <div className="wrapper">
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
      <div className="content">
        <Switch>
          <Route exact={true} path="/">
            <MainPageComponent />
          </Route>
          <Route exact={true} path="/upload">
            <UploadPage />
          </Route>
          <Route exact={true} path="/products/:id">
            <ProductPage />
          </Route>
          <Route exact path="/products/update/:id" component={UpdatePage} />
        </Switch>
      </div>
      <div className="footer">
        <img src="/images/icons/mimoticon-heart.png" alt="" />
        <img src="/images/icons/mimoticon-heart.png" alt="" />
        <img src="/images/icons/mimoticon-heart.png" alt="" />
      </div>
    </div>
  );
}

export default App;
