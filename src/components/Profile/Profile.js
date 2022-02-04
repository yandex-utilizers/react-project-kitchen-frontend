import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";
import agent from "agent";
import { ArticleList } from "components";
import { EditProfileSettings } from "components/Profile/EditProfileSettings";
import { FollowUserButton } from "components/Profile/FollowUserButton";
import {
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED,
} from "constants/actionTypes";
import classes from "./Profile.module.scss";

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
                        className={classnames(
                            classes.Profile_NavigationLink,
                            classes.Profile_NavigationLink__active
                        )}
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
    };

    if (!profile) {
        return null;
    }

    const isUser = currentUser && profile.username === currentUser.username;

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
                    <p className={classes.Profile_UserDescription}>
                        {profile.bio}
                    </p>
                    <EditProfileSettings isUser={isUser} />
                    <FollowUserButton isUser={isUser} user={profile} />
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
};
