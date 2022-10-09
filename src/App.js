import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function App(props) {
	const [code, setCode] = useState("");
	const [messages, setMessages] = useState([]);
	const [filter, setFilter] = useState([]);
	const [err, setErr] = useState("");

	return (
		<div
			className="App"
			style={{
				flex: 1,
				justifyContent: "center",
				marginLeft: "30%",
				marginRight: "30%",
			}}
		>
			<h1>Enter 8-digit code to view message</h1>
			<input
				placeholder=""
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
					setCode(e.target.value);
				}}
			/>
			<input
				type="button"
				value="View Message"
				style={{
					fontSize: 25,
					padding: 10,
					borderRadius: 10,
					width: 200,
					height: 60,
				}}
				onClick={() => {
					viewMessages();
				}}
				disabled={code == ""}
			/>

			{err == "" ? (
				messages.length != 0 && (
					<div
						style={{
							borderRadius: 10,
							padding: 20,
							border: "2px solid green",
							marginTop: 10,
						}}
					>
						<label style={{ fontSize: 40, padding: 10 }}>
							Received Message
						</label>
						{messages.map((item) => {
							return <MessageBox message={item} />;
						})}
					</div>
				)
			) : (
				<h1 style={{ color: "red" }}>{err}</h1>
			)}

			{filter.length !== 0 && (
				<div style={{ justifyContent: "center" }}>
					<h1 style={{ fontSize: 40, fontWeight: "900" }}>Fitlers</h1>
					<div
						style={{
							flexDirection: "row",
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<text style={{ fontSize: 35, fontWeight: "900" }}>
							Expiry Date
						</text>
					</div>
					{filter.map((item) => {
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
									padding: 10,
									borderRadius: 15,
								}}
							>
								<text style={{ fontSize: 20, margin: 10 }}>
									{new Date(item.expiry).toDateString()}
								</text>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);

	function viewMessages() {
		const get_messages_url = appRoot + "/message/?code=" + code;
		axios({
			method: "get",
			url: get_messages_url,
		})
			.then(({ data }) => {
				if (data.message.length > 0) {
					setErr("");
					setMessages(data.message);
				} else {
					setErr("There is no any message to display");
				}

				setFilter(
					data.filter.filter((item) => {
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
				setFilter([]);
				setErr(response.data.mess);
			});
	}
}

function MessageBox({ message }) {
	return (
		<div
			style={{
				borderWidth: 1,
				borderRadius: 10,
				backgroundColor: "goldenrod",
				margin: 20,
				flex: 1,
				justifyContent: "center",
				paddingBottom: 10,
			}}
		>
			<h4 style={{ color: "white", padding: 10, fontSize: 25 }}>
				{message.body}
			</h4>
			<text
				style={{
					textAlign: "left",
					color: "black",
					fontWeight: "bold",
					marginRight: "auto",
				}}
			>
				{message.date_sent}
			</text>
		</div>
	);
}

export default App;
