import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function SpinLoad({ big, small }) {
	return (
		<div style={{ textAlign: "center" }}>
			<Spin
				indicator={
					<LoadingOutlined
						style={{ fontSize: big ? 36 : small ? 20 : 24 }}
						spin
					/>
				}
			/>
		</div>
	);
}
