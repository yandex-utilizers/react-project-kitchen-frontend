import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import ArticleActions from "./ArticleActions";
import { Avatar } from "ui-kit";
import classes from "./ArticleMeta.module.scss";

const ArticleMeta = props => {
    const article = props.article;
    return (
        <div className={classes.ArticleMeta}>
            <div className={classes.Header}>
                <Link
                    to={`/@${article.author.username}`}
                    className={classes.Avatar}
                >
                    <Avatar size={48} />
                </Link>
                <div className={classes.Info}>
                    <Link
                        className="author"
                        to={`/@${article.author.username}`}
                    >
                        {article.author.username}
                    </Link>
                    <span className="date">
                            {new Date(article.createdAt).toLocaleDateString(
                                "ru-RU",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    weekday: "short",
                                }
                            )}
                        </span>
                </div>
            </div>
            <ArticleActions canModify={props.canModify} article={article} />
        </div>
    );
};

export default ArticleMeta;
