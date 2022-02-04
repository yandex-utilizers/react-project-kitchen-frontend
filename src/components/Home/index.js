import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import agent from "agent";
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER,
} from "constants/actionTypes";
import Intro from "./Intro";
import MainView from "./MainView";
import Tags from "./Tags";

const Promise = global.Promise;

const Home = () => {
    const dispatch = useDispatch();
    const token = useSelector(store => store.common.token);
    const tags = useSelector(store => store.home.tags);

    const onClickTag = (tag, pager, payload) =>
        dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
    const onLoad = (tab, pager, payload) =>
        dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload });
    const onUnload = () => dispatch({ type: HOME_PAGE_UNLOADED });

    useEffect(() => {
        const tab = token ? "feed" : "all";
        const articlesPromise = token
            ? agent.Articles.feed
            : agent.Articles.all;

        onLoad(
            tab,
            articlesPromise,
            Promise.all([agent.Tags.getAll(), articlesPromise()])
        );
        return () => {
            onUnload();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className="home-page">
            <Intro />
            <div className="container page">
                <div className="row">
                    <MainView />
                    <Tags tags={tags} onClickTag={onClickTag} />
                </div>
            </div>
        </div>
    );
};

export default Home;
