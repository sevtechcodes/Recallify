import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { doSignOut } from '../../../firebase/auth';

const Logout = () => {
    const [loggedOut, setLoggedOut] = useState(false);

    const handleLogout = () => {
        doSignOut()
            .then(() => {
                setLoggedOut(true);  // Update state to trigger navigation
                console.log("Signed out successfully");
            })
            .catch((error) => {
                console.log("Error during logout", error);
            });
    };

    // Navigate to login page if logged out
    if (loggedOut) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <button onClick={handleLogout}>
                <span className="block font-sans text-sm font-normal leading-normal text-inherit antialiased">Logout</span>
            </button>
        </div>
    );
};

export default Logout;
