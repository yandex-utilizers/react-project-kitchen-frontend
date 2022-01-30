import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import classnames from "classnames";
import { isEmpty } from "lodash";
import ArticleMeta from "./ArticleMeta";
import { CommentContainer } from "./CommentContainer";
import {
    ARTICLE_PAGE_LOADED,
    ARTICLE_PAGE_UNLOADED
} from "../../constants/actionTypes";
import agent from "../../agent";
import classes from "./Article.module.scss";


const Article = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const article = useSelector(state => state.article.article);
    const comments = useSelector(state => state.article.comments);
    const currentUser = useSelector(state => state.common.currentUser);

    const onLoad = payload => dispatch({ type: ARTICLE_PAGE_LOADED, payload });
    const onUnload = () => dispatch({ type: ARTICLE_PAGE_UNLOADED });


    useEffect(() => {
        console.log("hey");
        onLoad(
            Promise.all([
                agent.Articles.get(params.id),
                agent.Comments.forArticle(params.id)
            ])
        );
    }, [dispatch]);

    const canModify = false;
    /*currentUser &&
    currentUser.username ===
    article.author.username;*/


    if (isEmpty(article)) {
        return null;
    } else {
        return (
            <div className="article-page">
                <hr/>
                <div className="banner">
                    <div className="container">
                        <ArticleMeta
                            article={article}
                            canModify={canModify}
                        />
                    </div>
                    <hr/>

                </div>

                <div className="container page">
                    <div className="row article-content">
                        <div className="col-xs-12">
                            <h1 className={classes.Title}>{article.title}</h1>
                            <div className={classes.Image}><img src={""}></img></div>
                            <div className={classes.Content}>{article.body}</div>
                            <ul className={classes.TagList}>
                                {article.tagList.map(tag => {
                                    return (
                                        <li
                                            className="tag-default tag-pill tag-outline"
                                            key={tag}
                                        >
                                            {"#" + tag}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="article-actions"></div>
                    <div className="row">
                        <CommentContainer
                            comments={comments || []}
                            errors={comments.commentErrors}
                            slug={article.slug}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default Article;

