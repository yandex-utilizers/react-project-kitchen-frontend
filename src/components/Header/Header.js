import React from "react";
import { Link } from "react-router-dom";
import logoImg from '../../images/logo.svg';
import {Logo} from '../Logo/Logo';

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Sign in
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Sign up
                    </Link>
                </li>
            </ul>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/editor" className="nav-link">
                        <i className="ion-compose"></i>&nbsp;New Post
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                        <i className="ion-gear-a"></i>&nbsp;Settings
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/@${props.currentUser.username}`}
                        className="nav-link"
                    >
                        <span>Hello, {props.currentUser.username}</span>
                    </Link>
                </li>
            </ul>
        );
    }

    return null;
};

const Header = props => {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <Logo />
                </Link>

                <LoggedOutView currentUser={props.currentUser} />

                <LoggedInView currentUser={props.currentUser} />
            </div>
        </nav>
    );
}

export { Header };
