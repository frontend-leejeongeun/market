import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./layout/header";
import Footer from "./layout/footer";
import MainPageComponent from "./page/main";
import UploadPage from "./page/upload";
import ProductPage from "./page/product";
import UpdatePage from "./page/update";
import DeletePage from "./page/delete";
import "./App.css";

function App() {
  const history = useHistory();
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Switch>
          <Route exact={true} path="/" component={MainPageComponent} />
          <Route exact={true} path="/upload" component={UploadPage} />
          <Route exact={true} path="/products/:id" component={ProductPage} />
          <Route exact path="/products/update/:id" component={UpdatePage} />
          <Route exact path="/products/delete/:id" component={DeletePage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
