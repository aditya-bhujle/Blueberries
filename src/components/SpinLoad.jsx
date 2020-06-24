import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function SpinLoad({ big }) {
	return (
		<div style={{ textAlign: "center" }}>
			<Spin
				indicator={<LoadingOutlined style={{ fontSize: big ? 36 : 24 }} spin />}
			/>
		</div>
	);
}
