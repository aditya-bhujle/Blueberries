import { auth, db } from "./config";

export async function signup(email, password) {
	try {
		const result = await auth().createUserWithEmailAndPassword(email, password);
		return await db.collection("users").doc(result.user.uid).set({
			blueberries: 0,
			chats: [],
			classes: [],
			clubs: [],
			major: {},
			school: {},
		});
	} catch (error) {
		if (error.code === "auth/email-already-in-use")
			return "This account is already created";
		else if (error.code === "auth/invalid-email")
			return "The email you entered is not valid";
		else {
			console.log(error);
			return error.message;
		}
	}
}

export function signin(email, password) {
	return auth().signInWithEmailAndPassword(email, password);
}

export async function signinWithGoogle() {
	const provider = new auth.GoogleAuthProvider();
	const result = await auth().signInWithPopup(provider);

	if (result.additionalUserInfo.isNewUser) {
		await db.collection("users").doc(result.user.uid).set({
			blueberries: 0,
			chats: [],
			classes: [],
			clubs: [],
			major: {},
			school: {},
		});
	}
}

export function signInWithFacebook() {
	const provider = new auth.FacebookAuthProvider();
	return auth().signInWithPopup(provider);
}

export async function signOut() {
	await auth().signOut();
	window.location = "/";
}
