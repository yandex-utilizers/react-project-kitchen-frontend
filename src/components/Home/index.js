import MainView from "./MainView";
import Intro from "./Intro";
import React, {useEffect} from "react";
import Tags from "./Tags";
import agent from "../../agent";
import { connect, useSelector, useDispatch } from "react-redux";
import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    APPLY_TAG_FILTER,
} from "../../constants/actionTypes";

const Promise = global.Promise;

const Home = (props) => {
    const dispatch = useDispatch();
    const appName = useSelector(store => store.common.appName);
    const token = useSelector(store => store.common.token);
    const tags = useSelector(store => store.home.tags);

    const onClickTag = (tag, pager, payload) => dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload });
    const onLoad = (tab, pager, payload) => dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload });
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
    }, [token]);

    return (
        <div className="home-page">
            <Intro />
            <div className="container page">
                <div className="row">
                    <MainView />

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Популярные теги</p>

                            <Tags
                                tags={tags}
                                onClickTag={onClickTag}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;