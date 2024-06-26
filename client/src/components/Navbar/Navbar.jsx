import "./NavbarStyle.css";
// import search from '../../assets/search.svg';
import myLogo from '../../assets/logo.png';

const Navbar = ({ setIsFormVisible }) => (
  <div className="navbar">
		<div className="navbar-content">
			<img className="logo" src={myLogo} alt="logo" />
			<p className='my-memories-text'> My memories</p>
			<button className="stick-create-button" onClick={() => setIsFormVisible(true)}>+ Create New</button>
		</div>
	</div>
);

export default Navbar;

