import React, { useEffect, useState } from "react"
import { Router, NavLink, Switch, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { history } from "helpers/history"
import { clearMessage } from "actions/message"
import "shared/style/app.scss"

import Home from "pages/Home"
import Login from "pages/Login"
import Register from "pages/Register"

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth)
  const [switcher, toggleSwitcher] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage())
    })
  }, [dispatch]) // 只有dispatch變更的時候 才會再重呼叫一次此useEffect

  const toggleSideBar = () => {
    toggleSwitcher(!switcher)
  }

  return (
    <Router history={history}>
      <header></header>
      <div className="wrapper">
        <div
          className={
            switcher ? "switcher mCustomScrollbar" : "mCustomScrollbar"
          }
          data-mcs-theme="minimal"
        >
          <nav id={`sidebar`}>
            <div className="sidebar-header">
              <img src="pic/logo.svg" alt="logo"></img>
              <div>
                Tsohue
                <br />
                Backstage
              </div>
            </div>

            <ul className={`list-unstyled components`}>
              <li>
                <a
                  href="#user-submenu"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className={`dropdown-toggle manager-title`}
                >
                  使用者管理
                </a>
                <ul className={`collapse`} id="user-submenu">
                  <li>
                    <NavLink to={"/member-manager"} activeClassName="selected">
                      會員管理
                    </NavLink>
                    {/* 會員清單(基本資料 購買記錄) 會員查詢 會員新增(基本資料 角色權限) 會員刪除 會員編輯 */}
                  </li>
                  <li>
                    <NavLink to={"/employee-manager"} activeClassName="selected">
                      員工管理
                    </NavLink>
                    {/* 員工清單(基本資料) 員工查詢 員工新增(基本資料 角色權限) 員工刪除 員工編輯 */}
                  </li>
                </ul>
              </li>

              <li>
                <NavLink
                  to={"/order-manager"}
                  className={` manager-title`}
                  activeClassName="selected"
                >
                  訂單管理
                </NavLink>
                {/* 訂單總覽 編輯/刪除訂單 更新狀態 */}
              </li>

              <li>
                <a
                  href="#kitchen-submenu"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className={`dropdown-toggle manager-title`}
                >
                  央廚管理
                </a>
                <ul className="collapse list-unstyled" id="kitchen-submenu">
                  <li>
                    <NavLink to={"/all-order"} activeClassName="selected">
                      訂單總覽
                    </NavLink>
                    {/* (確認過庫存的)訂單清單/可批次列印 訂單詳細/可單筆列印(食譜 食材) */}
                  </li>
                  <li>
                    <NavLink to={"/wrapper-stop"} activeClassName="selected">
                      分裝站
                    </NavLink>
                    {/* 蔬果站 肉站 其他站 */}
                  </li>
                </ul>
              </li>

              <li>
                <a
                  href="#ingredients-submenu"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  className={`dropdown-toggle manager-title`}
                >
                  食材管理
                </a>
                <ul className="collapse list-unstyled" id="ingredients-submenu">
                  <li>
                    <NavLink to={"/ingredients-stock"} activeClassName="selected">
                      食材庫存
                    </NavLink>
                    {/* 食材清單 食材查詢 食材詳細(食材進銷貨紀錄) 新增食材 刪除食材 */}
                  </li>
                  <li>
                    <NavLink
                      to={"/ingredients-purchase"}
                      activeClassName="selected"
                    >
                      進貨管理
                    </NavLink>
                    {/* 進貨記錄 進貨紀錄查詢 進貨新增 刪除 */}
                  </li>
                </ul>
              </li>

              <li>
                <NavLink
                  to={"/recipe-manager"}
                  className={` manager-title`}
                  activeClassName="selected"
                >
                  食譜管理
                </NavLink>
                {/* 食譜總覽 新增/編輯/刪除食譜 (名稱 影片網址 分類 照片 食材 編輯影片標籤)  */}
              </li>
            </ul>

            {currentUser ? (
              <p className="identity">Hello, {currentUser.username}</p>
            ) : (
              <div className={`identity`}>
                <NavLink to={"/login"} activeClassName="selected">
                  登入
                </NavLink>
                <NavLink to={"/register"} activeClassName="selected">
                  註冊
                </NavLink>
              </div>
            )}
          </nav>
        </div>

        {/* 展開sidebar的按鈕 */}
        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                onClick={toggleSideBar} // 如果是直接寫togglesideBar() 那就會在render時直接call 就會出現Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </nav>
        </div>
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
