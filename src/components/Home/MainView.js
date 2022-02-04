import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import agent from "agent";
import {
    CHANGE_TAB,
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED,
} from "constants/actionTypes";
import { ArticleList } from "../index";
import classes from "./MainView.module.scss";

const YourFeedTab = props => {
    const common = useSelector(state => state.common);
    const { currentUser } = common;
    if (props.token) {
        const clickHandler = event => {
            event.preventDefault();
            // props.onTabClick(
            //     "feed",
            //     agent.Articles.feed,
            //     agent.Articles.feed()
            // );
            props.onTabClick(
                "feed",
                agent.Profile.get(currentUser.username),
                agent.Articles.byAuthor(currentUser.username)
            );
        };

        return (
            <li className={props.tab === "feed" ? classes.active : ""}>
                <Link to="" onClick={clickHandler}>
                    Ваша лента
                </Link>
            </li>
        );
    }
    return null;
};

const GlobalFeedTab = props => {
    const clickHandler = event => {
        event.preventDefault();
        props.onTabClick("all", agent.Articles.all, agent.Articles.all());
    };
    return (
        <li className={props.tab === "all" ? classes.active : ""}>
            <Link to="" onClick={clickHandler}>
                Лента
            </Link>
        </li>
    );
};

const TagFilterTab = ({ tag }) => {
    if (!tag) {
        return null;
    }

    return (
        <li className={classes.active}>
            <Link to="">
                <i className="ion-pound" /> {tag}
            </Link>
        </li>
    );
};

const MainView = () => {
    const articleList = useSelector(store => store.articleList);
    const token = useSelector(store => store.common.token);
    const common = useSelector(state => state.common);
    const { currentUser } = common;

    const dispatch = useDispatch();
    const onTabClick = (tab, pager, payload) =>
        dispatch({ type: CHANGE_TAB, tab, pager, payload });

    useEffect(() => {
        if (currentUser && currentUser.username) {
            const payload = Promise.all([
                agent.Profile.get(currentUser.username),
                agent.Articles.byAuthor(currentUser.username),
            ]);
            dispatch({ type: PROFILE_PAGE_LOADED, payload });
        }

        return () => dispatch({ type: PROFILE_PAGE_UNLOADED });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className="col-md-9">
            <div className={classes.TabControls}>
                <ul>
                    <YourFeedTab
                        token={token}
                        tab={articleList.tab}
                        onTabClick={onTabClick}
                    />

                    <GlobalFeedTab
                        tab={articleList.tab}
                        onTabClick={onTabClick}
                    />

                    <TagFilterTab tag={articleList.tag} />
                </ul>
            </div>

            <ArticleList
                articles={articleList.articles}
                articlesCount={articleList.articlesCount}
                currentPage={articleList.currentPage}
            />
        </div>
    );
};

export default MainView;
