import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import classnames from "classnames";
import agent from "agent";
import {
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED,
} from "constants/actionTypes";
import classes from "./ProfileFavorites.module.scss";

const ProfileFavorites = () => {
    const profile = useSelector(state => state.profile);
    const articleList = useSelector(state => state.articleList);
    const { currentPage } = articleList;
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

export default ProfileFavorites;
