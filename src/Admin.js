import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function App(props) {
	const [num, setNum] = useState("");
	const [num2, setNum2] = useState("");
	const [keyword, setKeyword] = useState("");
	const [expiry, setExpiry] = useState();
	const [filter, setFilter] = useState([]);
	const [err, setErr] = useState("");
	const [err2, setErr2] = useState("");
	const [code, setCode] = useState("");
	const [isClick, setClick] = useState(false);

	return (
		<div style={{ alignItems: "center" }}>
			{" "}
			<h1 style={{ textAlign: "center" }}>Admin Panel</h1>
			<div
				className="App"
				style={{
					display: "flex",
					flex: 1,
					flexDirection: "row",
					justifyContent: "flex-start",
				}}
			>
				<div
					style={{
						flex: 0.5,
						alignItems: "flex-start",
						justifyContent: "flex-start",
					}}
				>
					<input
						placeholder="Enter Number"
						type="text"
						style={{
							fontSize: 25,
							padding: 10,
							borderWidth: 2,
							borderRadius: 15,
							width: 260,
							height: 40,
							margin: 10,
						}}
						onChange={(e) => {
							setNum(e.target.value);
						}}
					/>

					<input
						type="button"
						value="Generate code"
						style={{
							fontSize: 25,
							padding: 10,
							borderRadius: 10,
							width: 200,
							height: 60,
						}}
						onClick={() => {
							generateCode();
						}}
						disabled={num == ""}
					/>
					{err != "" ? (
						<h1 style={{ color: "red" }}>{err}</h1>
					) : (
						code != "" && (
							<h1 style={{ color: "green", padding: "20px" }}>
								Your code is{" "}
								<label style={{ fontWeight: "900", fontSize: 40 }}>
									{code}
								</label>
							</h1>
						)
					)}
				</div>

				<div style={{ display: "flex", flex: 0.4, justifyContent: "center" }}>
					<div style={{ justifyContent: "flex-start" }}>
						<input
							placeholder="Enter Number"
							type="text"
							style={{
								fontSize: 25,
								padding: 10,
								borderWidth: 2,
								borderRadius: 15,
								width: 260,
								height: 40,
								margin: 10,
							}}
							onChange={(e) => {
								setNum2(e.target.value);
							}}
						/>

						<input
							type="button"
							value="View Filters"
							style={{
								fontSize: 25,
								padding: 10,
								borderRadius: 10,
								width: 200,
								height: 60,
							}}
							onClick={() => {
								viewFilters();
							}}
							disabled={num2 == ""}
						/>

						{isClick && err2 == "" && (
							<div>
								<input
									placeholder="Enter Keyword"
									type="text"
									style={{
										fontSize: 20,
										padding: 10,
										borderWidth: 2,
										borderRadius: 15,
										width: 200,
										height: 30,
										margin: 10,
									}}
									onChange={(e) => {
										setKeyword(e.target.value);
									}}
								/>
								<input
									type="date"
									style={{
										fontSize: 20,
										padding: 10,
										borderWidth: 2,
										borderRadius: 15,
										width: 200,
										height: 30,
										margin: 10,
									}}
									onChange={(e) => {
										setExpiry(e.target.value);
									}}
								/>
								<input
									type="button"
									value="Add Filter"
									style={{
										marginBottom: "30px",
										fontSize: 20,
										padding: 10,
										borderRadius: 10,
										width: 150,
										height: 50,
									}}
									onClick={() => {
										addFilter();
									}}
									disabled={keyword == "" || !expiry}
								/>
							</div>
						)}

						{err2 != "" && <h1 style={{ color: "red" }}>{err2}</h1>}
						{isClick && err2 == "" && (
							<div
								style={{
									flexDirection: "row",
									display: "flex",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<label style={{ fontSize: 35, fontWeight: "900" }}>
									Keywords
								</label>

								<label
									style={{ fontSize: 35, marginLeft: 50, fontWeight: "900" }}
								>
									Expiry Date
								</label>
							</div>
						)}
						{err2 == "" &&
							filter.length !== 0 &&
							filter.map((item) => {
								return (
									<div
										style={{
											flexDirection: "row",
											alignItems: "center",
											display: "flex",
											justifyContent: "space-between",
											border: "2px solid black",
											marginBottom: 5,
											width: "100%",
											padding: 5,
											borderRadius: 15,
										}}
									>
										<div
											style={{
												flexDirection: "row",
												alignItems: "center",
												display: "flex",
											}}
										>
											<button
												style={{
													color: "red",
													backgroundColor: "white",
													borderRadius: 20,
													borderColor: "red",
													marginRight: "20px",
												}}
												onClick={() => {
													removeFilter(item.keyword);
												}}
											>
												X
											</button>
											<label
												style={{ fontSize: 25, fontWeight: "900", margin: 5 }}
											>
												{item.keyword}
											</label>
										</div>{" "}
										<label style={{ fontSize: 20, marginLeft: 50, margin: 5 }}>
											{new Date(item.expiry).toDateString()}
										</label>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);

	function generateCode() {
		const generate_code_url =
			appRoot + "/generate/?number=" + encodeURIComponent(num);
		axios({
			method: "post",
			url: generate_code_url,
		})
			.then(({ data }) => {
				setErr("");
				setCode(data.code);
			})
			.catch(({ response }) => {
				setErr(response.data.mess);
			});
	}

	function viewFilters() {
		setClick(true);
		const get_filters_url =
			appRoot + "/filter/?number=" + encodeURIComponent(num2);
		axios({
			method: "get",
			url: get_filters_url,
		})
			.then(({ data }) => {
				setErr2("");
				setFilter(
					data.filter((item) => {
						const curr = moment();
						const expiry = moment(item.expiry, "YYYY-MM-DD HH:mm");
						if (curr.isBefore(expiry)) {
							return true;
						} else {
							return false;
						}
					})
				);
			})
			.catch(({ response }) => {
				setErr2(response.data.mess);
			});
	}

	function addFilter() {
		const add_filters_url =
			appRoot + "/filter/?number=" + encodeURIComponent(num2);
		let data = filter;
		let flag = false;

		data = data.map((item) => {
			if (item.keyword == keyword) {
				flag = true;
				item.expiry = expiry;
				return item;
			} else {
				return item;
			}
		});
		if (!flag) {
			data.push({
				keyword: keyword,
				expiry: expiry,
			});
		}
		setFilter(data);
		axios({
			method: "post",
			url: add_filters_url,
			data: {
				filter: data,
			},
			headers: { "Content-Type": "application/json" },
		})
			.then(({ data }) => {
				setErr2("");
			})
			.catch(({ response }) => {
				if (response?.data?.mess) {
					setErr2(response?.data?.mess);
				}
			});
	}

	function removeFilter(key) {
		const update_filters_url =
			appRoot + "/filter/?number=" + encodeURIComponent(num2);
		const data = filter.filter((item) => item.keyword !== key);
		setFilter(data);

		// remove from backend
		axios({
			method: "post",
			url: update_filters_url,
			data: {
				filter: data,
			},
			headers: { "Content-Type": "application/json" },
		})
			.then(({ data }) => {
				setErr2("");
			})
			.catch(({ response }) => {
				if (response?.data?.mess) {
					setErr2(response?.data?.mess);
				}
			});
	}
}

export default App;
