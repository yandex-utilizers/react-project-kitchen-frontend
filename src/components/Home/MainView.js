import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import agent from "agent";
import { CHANGE_TAB } from "constants/actionTypes";
import { ArticleList } from "../index";
import classes from "./MainView.module.scss";

const YourFeedTab = props => {
    if (props.token) {
        const clickHandler = event => {
            event.preventDefault();
            props.onTabClick(
                "feed",
                agent.Articles.feed,
                agent.Articles.feed()
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

const MainView = props => {
    const articleListProps = useSelector(store => store.articleList);
    const token = useSelector(store => store.common.token);

    const dispatch = useDispatch();
    const onTabClick = (tab, pager, payload) =>
        dispatch({ type: CHANGE_TAB, tab, pager, payload });

    return (
        <div className="col-md-9">
            <div className={classes.TabControls}>
                <ul>
                    <YourFeedTab
                        token={token}
                        tab={articleListProps.tab}
                        onTabClick={onTabClick}
                    />

                    <GlobalFeedTab
                        tab={articleListProps.tab}
                        onTabClick={onTabClick}
                    />

                    <TagFilterTab tag={articleListProps.tag} />
                </ul>
            </div>

            <ArticleList
                pager={props.pager}
                articles={articleListProps.articles}
                loading={props.loading}
                articlesCount={articleListProps.articlesCount}
                currentPage={articleListProps.currentPage}
            />
        </div>
    );
};

export default MainView;
