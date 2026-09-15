import { Outlet, Link, useNavigate } from "react-router-dom";
import "./TabDemoLayout.css";

const TabDemoLayout = () => {
  const navigate = useNavigate();

  function openPage(path) {
    navigate(path);
  }

  return (
    <div className="tab-demo-layout-container">
      <div className="tab-demo-layout">
        <span>我是导航栏啊</span>
        <button onClick={() => openPage("home")}>
          useNavigate跳转home页面
        </button>
        <Link to="home">Link跳转home页面</Link>
        <button onClick={() => openPage("demo")}>
          useNavigate跳转demo页面
        </button>
        <Link to="demo">Link跳转demo页面</Link>
      </div>
      <div className="tab-demo-layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default TabDemoLayout;
