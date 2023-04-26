import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const userAuth = useContext(AuthContext);
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {userAuth.user ? (
                    <>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/posts">Posts</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;