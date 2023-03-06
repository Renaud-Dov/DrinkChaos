import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Error404 from "./components/Dashboard/404/404";
import {Provider} from "./services/data";
import TransactionsView from "./components/Dashboard/TransactionsView";
import DrinkView from "./components/Dashboard/DrinkView";
import Login from "./components/auth/Login";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard"/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}>
                            <Route index element={<DrinkView/>}/>
                            <Route path="transactions" element={<TransactionsView/>}/>
                            {/*<Route path="drinks" element={<DrinkCard/>}/>*/}
                            {/*<Route path="drinks/:drinkId" element={<DashboardHome/>}/>*/}
                            <Route path="*" element={<Error404/>}/>
                        </Route>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<Error404/>}/>
                    </Routes>
                </Layout>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
