import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { ROUTES } from "routes";
import { Avatar, Icon } from "ui-kit";
import { Logo } from "../Logo/Logo";
import classes from "./Header.module.scss";

const LoggedOutView = ({ currentUser }) => {
    if (!currentUser) {
        return (
            <nav className={cn(classes.navBar)}>
                <ul className={cn(classes.navList)}>
                    <li className={cn(classes.navItem)}>
                        <Link to={ROUTES.HOME} className={cn(classes.navLink)}>
                            <Icon className={classes.LinkIcon} type="Home" />
                            Главная
                        </Link>
                    </li>

                    <li className={cn(classes.navItem)}>
                        <Link to={ROUTES.LOGIN} className={cn(classes.navLink)}>
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

const LoggedInView = ({ currentUser }) => {
    if (currentUser) {
        return (
            <nav className={cn(classes.navBar)}>
                <ul className={cn(classes.navList)}>
                    <li className={cn(classes.navItem)}>
                        <Link to={ROUTES.HOME} className={cn(classes.navLink)}>
                            <Icon className={classes.LinkIcon} type="Home" />
                            Главная
                        </Link>
                    </li>

                    <li className={cn(classes.navItem)}>
                        <Link
                            to={ROUTES.EDITOR}
                            className={cn(classes.navLink)}
                        >
                            <Icon className={classes.LinkIcon} type="Edit" />
                            Новая запись
                        </Link>
                    </li>

                    <li className={cn(classes.navItem)}>
                        <Link
                            to={ROUTES.SETTINGS}
                            className={cn(classes.navLink)}
                        >
                            <Icon
                                className={classes.LinkIcon}
                                type="Settings"
                            />
                            Настройки
                        </Link>
                    </li>

                    <li className={cn(classes.navItem)}>
                        <Link
                            to={`/@${currentUser.username}`}
                            className={cn(classes.navLink)}
                        >
                            <Avatar size={24} user={currentUser.image} />
                            <span className={classes.UserName}>
                                {currentUser.username}
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }

    return null;
};

const Header = props => {
    return (
        <header className={cn(classes.header)}>
            <div className={cn(classes.wrapper, "container")}>
                <Link to={ROUTES.HOME} className={cn(classes.logo)}>
                    <Logo />
                </Link>

                <LoggedOutView currentUser={props.currentUser} />

                <LoggedInView currentUser={props.currentUser} />
            </div>
        </header>
    );
};

export { Header };
