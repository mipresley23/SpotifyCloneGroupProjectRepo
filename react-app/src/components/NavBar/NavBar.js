import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import * as sessionActions from "../../store/session";
import "./NavBar.css";
const NavBar = ({setSongPage}) => {
	const dispatch = useDispatch()
	const location = useLocation()
	const isLoggedIn = useSelector((state) => state.session.user);

	const [isSongs, setIsSongs] = useState(location.pathname.includes('songs'));
	const [showMenu, setShowMenu] = useState(false)
	const photo_url = 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.repol.copl.ulaval.ca%2Fwp-content%2Fuploads%2F2019%2F01%2Fdefault-user-icon.jpg&f=1&nofb=1'

	useEffect(() => {
		if (location.pathname.includes('songs')) setIsSongs(true);
		else setIsSongs(false);
	}, [location]);

	const handleDemo = () => {
		return dispatch(sessionActions.loginDemo());
	}

	return (
		<nav className="nav-container">
			{isLoggedIn && isSongs && (
				<div id='song-menu-buttons'>
					<button onClick={e => setSongPage('')}>Songs</button>
					<button onClick={e => setSongPage('artists')}>Artists</button>
					<button onClick={e => setSongPage('albums')}>Albums</button>
				</div>
			)}
			<ul className="nav-list">
				{!isLoggedIn && (
					<>
						<li>
							<NavLink to="/login" exact={true} activeClassName="active">
								Log In
							</NavLink>
						</li>
						<li>
							<NavLink to="/sign-up" exact={true} activeClassName="active">
								Sign Up
							</NavLink>
						</li>
						<li>
							<NavLink to="/developers" exact={true} activeClassName="active">
								Developers
							</NavLink>
						</li>
						<button id="demo-button" type="button" onClick={handleDemo}>Demo</button>
					</>
				)}
				{isLoggedIn && (
					<>
						<li>
							<NavLink to="/developers" exact={true} activeClassName="active">
								Developers
							</NavLink>
						</li>
						<div id="nav-bar-user-info" onClick={e => setShowMenu(!showMenu)}>
								<img id='nav-bar-user-img' src={isLoggedIn.photo_url ? isLoggedIn.photo_url : photo_url} alt='navbar profile photo'/>
								<li>{isLoggedIn.username}</li>
							{showMenu && (
								<ul id='profile-menu'>
									<li>
										<NavLink id="nav-bar-user-link" to={`/users/${isLoggedIn.id}`}>Account</NavLink>
									</li>
									<LogoutButton />
								</ul>
							)}
						</div>

					</>)
				}
			</ul>
		</nav>
	);
};

export default NavBar;
