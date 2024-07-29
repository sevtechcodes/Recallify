import "./NavbarStyle.css";
import myLogo from '../../assets/logo.png';
import AvatarMenu from "./AvatarMenu";

const Navbar = ({ setIsFormVisible }) => (
  <div className="navbar">
		<div className="navbar-content">
			<AvatarMenu/>
			<img className="logo" src={myLogo} alt="logo" />
			<p className='my-memories-text'> My memories</p>
			<button className="stick-create-button" onClick={() => setIsFormVisible(true)}>+ Create New</button>
		</div>
	</div>
);

export default Navbar;
