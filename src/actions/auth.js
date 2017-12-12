import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid: uid
});

//** 8 min mark of lecure 165 he explains well why login/logout aren't called from startLogin/startLogout like we did in the past

//asynchronous action
export const startLogin = () => {
    return () => {  //not using dispatch, I can leave it out
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => { 
        return firebase.auth().signOut();
    };
};