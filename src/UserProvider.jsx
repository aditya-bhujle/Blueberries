import React, { useState, createContext, useEffect } from "react";
import { auth } from "./firebase/config";
import App from "./App";

export const UserContext = createContext({ user: null });

function UserProvider() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth().onAuthStateChanged((userAuth) => setUser(userAuth));
	}, []);

	return (
		<UserContext.Provider value={user}>
			<App />
		</UserContext.Provider>
	);
}
export default UserProvider;
