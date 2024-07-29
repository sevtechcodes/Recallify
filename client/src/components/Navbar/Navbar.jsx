import "./NavbarStyle.css";
import { Link, Navigate } from "react-router-dom";
import myLogo from '../../assets/logo.png';

const Navbar = ({ setIsFormVisible }) => (
  <div className="navbar">
		<div className="navbar-content">
			{/* TODO Create Link to Signin page, not working yet */}
			<p className='my-profile-text'><Link to={'/signout'} className="hover:underline font-bold">My Profile</Link></p>
			<img className="logo" src={myLogo} alt="logo" />
			<p className='my-memories-text'> My memories</p>
			<button className="stick-create-button" onClick={() => setIsFormVisible(true)}>+ Create New</button>
		</div>
	</div>
);

export default Navbar;

