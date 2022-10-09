import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Admin from "./Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter basename={appRoot}>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="xiongxiaomao2022" element={<Admin />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
