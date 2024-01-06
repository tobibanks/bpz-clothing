import { createContext, useState, useEffect } from "react";
import {onAuthStateChangedLister, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'
//actual value i want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value= {currentUser, setCurrentUser}
    
    useEffect(() => {
       const unsubscribe =  onAuthStateChangedLister((user)=>{
      setCurrentUser(user);
    if(user){
         createUserDocumentFromAuth(user);
    }
       });
       
       return unsubscribe;
    }, [])
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}