import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Discover from "./Routes/Discover/Discover";
import Favorites from "./Routes/Favorites/Favorites";
import Search from "./Routes/Search/Search";

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<Discover />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/search" element={<Search />} />
			</Route>
			<Route path="*" element={<div>404 پیدا نشد.</div>} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
