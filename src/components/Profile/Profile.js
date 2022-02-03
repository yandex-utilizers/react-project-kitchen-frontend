import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import classnames from "classnames";
import agent from "agent";
import {
    FOLLOW_USER,
    UNFOLLOW_USER,
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED,
} from "constants/actionTypes";
import { ROUTES } from "routes";
import { Button } from "ui-kit";
import { ArticleList } from "../index";
import classes from "./Profile.module.scss";

const EditProfileSettings = ({ isUser }) => {
    const history = useHistory();

    const handleRouteToEditProfile = () => {
        history.push(ROUTES.SETTINGS);
    };

    if (isUser) {
        return (
            <Button typeIcon="Settings" onClick={handleRouteToEditProfile}>
                Редактировать профиль
            </Button>
        );
    }
    return null;
};

const FollowUserButton = ({ user, isUser}) => {
    const dispatch = useDispatch();

    if (isUser) {
        return null;
    }

    const handleClick = event => {
        event.preventDefault();
        if (user.following) {
            dispatch({
                type: UNFOLLOW_USER,
                payload: agent.Profile.unfollow(user.username),
            })
        } else {
            dispatch({
                type: FOLLOW_USER,
                payload: agent.Profile.follow(user.username),
            })
        }
    };

    return (
        <div className={classes.Profile_FollowUserButton}>
            <Button typeIcon={user.following ? "Minus" : "Plus"} onClick={handleClick}>
                {user.following ? "Отписаться" : "Подписаться"}
            </Button>
        </div>
    );
};

export const Profile = () => {
    const articleList = useSelector(state => state.articleList);
    const { articles, articlesCount, currentPage } = articleList;
    const common = useSelector(state => state.common);
    const { currentUser } = common;
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const params = useParams();
    const username = params.username;

    useEffect(() => {
        const payload = Promise.all([
            agent.Profile.get(username),
            agent.Articles.byAuthor(username),
        ]);
        dispatch({ type: PROFILE_PAGE_LOADED, payload });
        return () => dispatch({ type: PROFILE_PAGE_UNLOADED });
    }, [dispatch, username]);

    const renderTabs = () => {
        return (
            <ul className={classes.Profile_Navigation}>
                <li className={classes.Profile_NavigationItem}>
                    <Link
                        className={classnames(classes.Profile_NavigationLink, classes.Profile_NavigationLink__active)}
                        to={`/@${profile.username}`}
                    >
                        Ваши посты
                    </Link>
                </li>

                <li className={classes.Profile_NavigationItem}>
                    <Link
                        className={classes.Profile_NavigationLink}
                        to={`/@${profile.username}/favorites`}
                    >
                        Любимые посты
                    </Link>
                </li>
            </ul>
        );
    }

    if (!profile) {
        return null;
    }

    const isUser =
        currentUser &&
        profile.username === currentUser.username;

    return (
        <div className={classes.Profile}>
            <div className={classes.Profile_UserInfo}>
                <div className={classes.Profile_Container}>
                    <img
                        className={classes.Profile_UserImage}
                        src={profile.image}
                        alt={profile.username}
                    />
                    <h4 className={classes.Profile_UserName}>
                        {profile.username}
                    </h4>
                    <p className={classes.Profile_UserDescription}>{profile.bio}</p>
                    <EditProfileSettings isUser={isUser} />
                    <FollowUserButton
                        isUser={isUser}
                        user={profile}
                    />
                </div>
            </div>

            <div className={classes.Profile_Container}>
                <div className={classes.Profile_Row}>
                    <div className={classes.Profile_ArticlesToggle}>
                        {renderTabs()}
                    </div>
                    <ArticleList
                        articles={articles}
                        articlesCount={articlesCount}
                        state={currentPage}
                    />
                </div>
            </div>
        </div>
    );
}
