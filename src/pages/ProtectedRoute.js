import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({children}) => {
    const {user} = useSelector((store)=>store.user);
    //if user do not exist
    if(!user) {
        return <Navigate to='/landing' />
    }
    return children;
}

export default ProtectedRoute;