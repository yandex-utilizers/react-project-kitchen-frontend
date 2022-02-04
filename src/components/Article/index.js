import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import agent from "agent";
import {
    ARTICLE_PAGE_LOADED,
    ARTICLE_PAGE_UNLOADED,
} from "constants/actionTypes";
import ArticleMeta from "./ArticleMeta";
import { CommentContainer } from "./CommentContainer";
import classes from "./Article.module.scss";

const Article = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const [canModify, setCanModify] = useState(false);

    const article = useSelector(state => state.article.article);
    const comments = useSelector(state => state.article.comments);
    const currentUser = useSelector(state => state.common.currentUser);

    const onLoad = payload => dispatch({ type: ARTICLE_PAGE_LOADED, payload });

    useEffect(() => {
        onLoad(
            Promise.all([
                agent.Articles.get(params.id),
                agent.Comments.forArticle(params.id),
            ])
        );
        return () => {
            dispatch({ type: ARTICLE_PAGE_UNLOADED });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (currentUser && article && article.author) {
            if (currentUser.username === article.author.username) {
                setCanModify(true);
            }
        }
    }, [article, currentUser]);

    if (isEmpty(article)) {
        return null;
    } else {
        return (
            <div className="article-page">
                <hr />
                <div className="banner">
                    <div className="container">
                        <ArticleMeta article={article} canModify={canModify} />
                    </div>
                    <hr />
                </div>

                <div className="container page">
                    <div className="row article-content">
                        <div className="col-xs-12">
                            <h1 className={classes.Title}>{article.title}</h1>
                            <div className={classes.Image}>
                                <img src={article.image} alt={article.title} />
                            </div>
                            <div className={classes.Content}>
                                {article.body}
                            </div>
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

                    <div className="article-actions" />
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
