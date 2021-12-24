import React from "react";
import agent from "../../agent";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_TAB } from "../../constants/actionTypes";
import { ArticleList } from "../index";
import { store } from "store";
import classes from "./MainView.module.scss";

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
            <li className={props.tab === "feed" ? classes.active : ""}>
                <a
                    href=""
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
        <li className={props.tab === "all" ? classes.active : ""}>
            <a
                href=""
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
        <li className={classes.active}>
            <a href="">
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
    const onTabClick = (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload });

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
