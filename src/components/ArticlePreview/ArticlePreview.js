import React from "react";
import { Link } from "react-router-dom";
import agent from "../../agent";
import { connect } from "react-redux";
import {
    ARTICLE_FAVORITED,
    ARTICLE_UNFAVORITED,
} from "../../constants/actionTypes";

import classes from './ArticlePreview.module.scss';
import { Avatar, Icon, Tag } from "ui-kit";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const mapDispatchToProps = dispatch => ({
    favorite: slug =>
        dispatch({
            type: ARTICLE_FAVORITED,
            payload: agent.Articles.favorite(slug),
        }),
    unfavorite: slug =>
        dispatch({
            type: ARTICLE_UNFAVORITED,
            payload: agent.Articles.unfavorite(slug),
        }),
});

const ArticlePreview = props => {
    const article = props.article;
    const favoriteButtonClass = article.favorited
        ? FAVORITED_CLASS
        : NOT_FAVORITED_CLASS;

    const handleClick = ev => {
        ev.preventDefault();
        if (article.favorited) {
            props.unfavorite(article.slug);
        } else {
            props.favorite(article.slug);
        }
    };

    return (
        <article className={classes.ArticlePreview}>
            <div className={classes.Image}></div>
            <div className={classes.PreviewContent}>
                <div className={classes.Header}>
                    <Link to={`/@${article.author.username}`} className={classes.Avatar}>
                        <Avatar size={48}/>
                    </Link>
                    <div className={classes.Info}>
                        <Link
                            className="author"
                            to={`/@${article.author.username}`}
                        >
                            {article.author.username}
                        </Link>
                        <span className="date">
                            {
                                new Date(article.createdAt).toLocaleDateString('ru-RU', {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    weekday: "short",
                                })
                            }
                        </span>
                    </div>
                    <button
                        className={classes.LikeButton}
                        onClick={handleClick}
                    >
                        <span>{article.favoritesCount}</span>
                        <Icon type="Like" />
                    </button>

                </div>
               <Link to={`/article/${article.slug}`} className={classes.ArticleLink}>
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
        // <div className="article-preview">
        //     <div className="article-meta">
        //         <Link to={`/@${article.author.username}`}>
        //             <img
        //                 src={article.author.image}
        //                 alt={article.author.username}
        //             />
        //         </Link>

        //         <div className="info">
        //             <Link
        //                 className="author"
        //                 to={`/@${article.author.username}`}
        //             >
        //                 {article.author.username}
        //             </Link>
        //             <span className="date">
        //                 {new Date(article.createdAt).toDateString()}
        //             </span>
        //         </div>

        //         <div className="pull-xs-right">
        //             <button
        //                 className={favoriteButtonClass}
        //                 onClick={handleClick}
        //             >
        //                 <i className="ion-heart"></i> {article.favoritesCount}
        //             </button>
        //         </div>
        //     </div>

        //     <Link to={`/article/${article.slug}`} className="preview-link">
        //         <h1>{article.title}</h1>
        //         <p>{article.description}</p>
        //         <span>Read more...</span>
        //         <ul className="tag-list">
        //             {article.tagList.map(tag => {
        //                 return (
        //                     <li
        //                         className="tag-default tag-pill tag-outline"
        //                         key={tag}
        //                     >
        //                         {tag}
        //                     </li>
        //                 );
        //             })}
        //         </ul>
        //     </Link>
        // </div>
    );
};

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
