//authCOntext will take care of 2 things: 
//OAuth context (it will copsulate all childeren)
// use O hook(We can use in different component to get to know about the different authantication state related to parameters)
import React, { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const AuthContext = React.createContext();
export function useAuth(){
	return useContext(AuthContext);
}

export function AuthProvider({ childeren }){
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true); //app trying to load the current auth state

	//subscribe event changes (login, logout,..) by listening them
	useEffect(()=>{
		const unsubscribe = onAuthStateChanged(auth, initializeUser);
		return unsubscribe;
	},[]); //Empty array, because we need it only for the first time

	async function initializeUser(user){
		if(user){
			setCurrentUser({ ...user}); //spreading out the users properties into a new object. So that we are not maintaining any references to this user arguman.
			setUserLoggedIn(true);
		} else{
			setCurrentUser(null);
			setUserLoggedIn(false);
		}
		setCurrentUser(false);
	}

	const value = {
		currentUser,
		userLoggedIn,
		loading
	}

	return (
		<AuthContext.Provider value={ value }>
			{!loading && childeren}
			</AuthContext.Provider>
	)
}