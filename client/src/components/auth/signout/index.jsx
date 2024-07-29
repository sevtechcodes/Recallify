import { Navigate} from 'react-router-dom';
import { doSignOut } from '../../../firebase/auth';

const Logout = () => {
    const handleLogout = () => {               
      doSignOut.then(() => {
        // Sign-out successful.
					<Navigate to={'/login'}/>
          console.log("Signed out successfully")
        }).catch((error) => {
					console.log("Error during logout", error)
      });
    }
  
    return (
        <>
					<div>
						<button onClick={handleLogout}>
							Logout
						</button>
					</div>
        </>
    )
}
export default Logout;