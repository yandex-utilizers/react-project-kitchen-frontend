import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from '../../routes/'
import {
    ARTICLE_FAVORITED,
    ARTICLE_UNFAVORITED,
} from "../../constants/actionTypes";
import { Avatar, Icon, Tag } from "ui-kit";
import agent from "../../agent";
import classes from "./ArticlePreview.module.scss";


const ArticlePreview = props => {
    const dispatch = useDispatch();
    const article = useSelector(store =>
        store.articleList.articles.find(
            articleInList => articleInList.slug === props.id
        )
    );

    const makeFavorite = slug => {
        dispatch({
            type: ARTICLE_FAVORITED,
            payload: agent.Articles.favorite(slug),
        });
    };
    const makeNotFavorite = slug => {
        dispatch({
            type: ARTICLE_UNFAVORITED,
            payload: agent.Articles.unfavorite(slug),
        });
    };

    const handleClick = ev => {
        ev.preventDefault();
        if (article.favorited) {
            makeNotFavorite(article.slug);
        } else {
            makeFavorite(article.slug);
        }
    };

    return (
        <article className={classes.ArticlePreview}>
            <div className={classes.Image}></div>
            <div className={classes.PreviewContent}>
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
                    <button
                        className={`${classes.LikeButton} ${
                            article.favorited ? classes.active : ""
                        }`}
                        onClick={handleClick}
                    >
                        <span>{article.favoritesCount}</span>
                        <Icon type="Like" />
                    </button>
                </div>
                <Link
                    to={`${ROUTES.ARTICLE}/${article.slug}`}
                    className={classes.ArticleLink}
                >
                    <h3 className={classes.Heading}>{article.title}</h3>
                    <p className={classes.Text}>{article.body}</p>
                    <div className={classes.Footer}>
                        <span className={classes.Link}> Read more</span>
                        <ul className={classes.TagList}>
                            {article.tagList.map(tag => {
                                return (
                                    <li key={tag}>
                                        <Tag>{tag}</Tag>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Link>
            </div>
        </article>
    );
};

export default ArticlePreview;
