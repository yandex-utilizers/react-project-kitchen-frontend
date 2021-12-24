import React from "react";
import agent from "../../agent";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_TAB } from "../../constants/actionTypes";
import { ArticleList } from "../index";
import { store } from "store";

const YourFeedTab = props => {
    if (props.token) {
        const clickHandler = ev => {
            ev.preventDefault();
            props.onTabClick(
                "feed",
                agent.Articles.feed,
                agent.Articles.feed()
            );
        };

        return (
            <li className="nav-item">
                <a
                    href=""
                    className={
                        props.tab === "feed" ? "nav-link active" : "nav-link"
                    }
                    onClick={clickHandler}
                >
                    Ваша лента
                </a>
            </li>
        );
    }
    return null;
};

const GlobalFeedTab = props => {
    const clickHandler = ev => {
        ev.preventDefault();
        props.onTabClick("all", agent.Articles.all, agent.Articles.all());
    };
    return (
        <li className="nav-item">
            <a
                href=""
                className={props.tab === "all" ? "nav-link active" : "nav-link"}
                onClick={clickHandler}
            >
                Лента
            </a>
        </li>
    );
};

const TagFilterTab = props => {
    if (!props.tag) {
        return null;
    }

    return (
        <li className="nav-item">
            <a href="" className="nav-link active">
                <i className="ion-pound"></i> {props.tag}
            </a>
        </li>
    );
};

const MainView = props => {
    const articleListProps = useSelector(store => store.articleList);
    const token = useSelector(store => store.common.token);
    const tags = useSelector(store => store.home.tags);

    const dispatch = useDispatch();
    const onTabClick = (tab, pager, payload) =>
        dispatch({ type: CHANGE_TAB, tab, pager, payload });

    return (
        <div className="col-md-9">
            <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
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
