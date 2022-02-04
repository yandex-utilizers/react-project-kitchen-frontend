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
import classes from "./ProfileFavorites.module.scss";

const ProfileFavorites = () => {
    const common = useSelector(state => state.common);
    const { currentUser } = common;
    const profile = useSelector(state => state.profile);
    const articleList = useSelector(state => state.articleList);
    const { articles, articlesCount, currentPage } = articleList;
    const dispatch = useDispatch();
    const params = useParams();
    const username = params.username;

    useEffect(() => {
        const pager = () => agent.Articles.favoritedBy(username, currentPage);
        const payload = Promise.all([
            agent.Profile.get(username),
            agent.Articles.favoritedBy(username),
        ]);
        dispatch({ type: PROFILE_PAGE_LOADED, pager, payload });
        return () => dispatch({ type: PROFILE_PAGE_UNLOADED });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, username]);

    const renderTabs = () => {
        return (
            <ul className={classes.ProfileFavorites_Navigation}>
                <li className={classes.ProfileFavorites_NavigationItem}>
                    <Link
                        className={classes.ProfileFavorites_NavigationLink}
                        to={`/@${profile.username}`}
                    >
                        Ваши посты
                    </Link>
                </li>

                <li className={classes.ProfileFavorites_NavigationItem}>
                    <Link
                        className={classnames(
                            classes.ProfileFavorites_NavigationLink,
                            classes.ProfileFavorites_NavigationLink__active
                        )}
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
        <div className={classes.ProfileFavorites}>
            <div className={classes.ProfileFavorites_UserInfo}>
                <div className={classes.ProfileFavorites_Container}>
                    <img
                        className={classes.ProfileFavorites_UserImage}
                        src={profile.image}
                        alt={profile.username}
                    />
                    <h4 className={classes.ProfileFavorites_UserName}>
                        {profile.username}
                    </h4>
                    <p className={classes.ProfileFavorites_UserDescription}>
                        {profile.bio}
                    </p>
                    <EditProfileSettings isUser={isUser} />
                    <FollowUserButton isUser={isUser} user={profile} />
                </div>
            </div>

            <div className={classes.ProfileFavorites_Container}>
                <div className={classes.ProfileFavorites_Row}>
                    <div className={classes.ProfileFavorites_ArticlesToggle}>
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

export default ProfileFavorites;
