import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../images/logo.svg";
import { Logo } from "../Logo/Logo";
import cn from "classnames";
import classes from "./Header.module.scss";
import Icon from '../../ui-kit/Icon';
import Avatar from '../../ui-kit/Avatar';

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <nav className={cn(classes.navBar)}>
                <ul className={cn(classes.navList)}>
                    <li className={cn(classes.navItem)}>
                        <Link to="/" className={cn(classes.navLink)}>
                            <Icon className={classes.LinkIcon} type="Home"/>
                            Главная
                        </Link>
                    </li>

                    <li className={cn(classes.navItem)}>
                        <Link to="/login" className={cn(classes.navLink)}>
                            <Icon className={classes.LinkIcon} type="Login" />
                            Войти
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <nav className={cn(classes.navBar)}>
                <ul className={cn(classes.navList)}>
                    <li className={cn(classes.navItem)}>
                        <Link to="/" className={cn(classes.navLink)}>
                            <Icon className={classes.LinkIcon} type="Home" />
                            Главная
                        </Link>
                    </li>

                    <li className={cn(classes.navItem)}>
                        <Link to="/editor" className={cn(classes.navLink)}>
                            <Icon className={classes.LinkIcon} type="Edit" />
                            Новая запись
                        </Link>
                    </li>

                    <li className={cn(classes.navItem)}>
                        <Link to="/settings" className={cn(classes.navLink)}>
                            <Icon className={classes.LinkIcon} type="Settings" />
                            Настройки
                        </Link>
                    </li>

                    <li className={cn(classes.navItem)}>
                        <Link
                            to={`/@${props.currentUser.username}`}
                            className={cn(classes.navLink)}
                        >
                            {/* <Avatar size={24}/> */}
                            <Icon className={classes.LinkIcon} type="User" size={24} />
                            {props.currentUser.username}
                        </Link>
                    </li>
                </ul>
            </nav>

            // <ul className="nav navbar-nav pull-xs-right">
            //     <li className="nav-item">
            //         <Link to="/editor" className="nav-link">
            //             <i className="ion-compose"></i>&nbsp;New Post
            //         </Link>
            //     </li>

            //     <li className="nav-item">
            //         <Link to="/settings" className="nav-link">
            //             <i className="ion-gear-a"></i>&nbsp;Settings
            //         </Link>
            //     </li>

            //     <li className="nav-item">
            //         <Link
            //             to={`/@${props.currentUser.username}`}
            //             className="nav-link"
            //         >
            //             <span>Hello, {props.currentUser.username}</span>
            //         </Link>
            //     </li>
            // </ul>
        );
    }

    return null;
};

const Header = props => {
    return (
        <header className={cn(classes.header)}>
            <div className={cn(classes.wrapper, "container")}>
                <Link to="/" className={cn(classes.logo)}>
                    <Logo />
                </Link>

                <LoggedOutView currentUser={props.currentUser} />

                <LoggedInView currentUser={props.currentUser} />
            </div>
        </header>
    );
};

export { Header };
