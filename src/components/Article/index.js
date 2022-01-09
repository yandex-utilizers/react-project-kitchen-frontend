import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import agent from "agent";
import marked from "marked";
import ArticleMeta from "./ArticleMeta";
import { CommentContainer } from "./CommentContainer";
import {
    ARTICLE_PAGE_LOADED,
    ARTICLE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import classes from './Article.module.scss';

const mapStateToProps = state => ({
    ...state.article,
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
    onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});

class Article extends React.Component {
    componentWillMount() {
        this.props.onLoad(
            Promise.all([
                agent.Articles.get(this.props.match.params.id),
                agent.Comments.forArticle(this.props.match.params.id),
            ])
        );
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        if (!this.props.article) {
            return  null;
        }

        const markup = {
            __html: marked(this.props.article.body, { sanitize: true }),
        };
        const canModify =
            this.props.currentUser &&
            this.props.currentUser.username ===
                this.props.article.author.username;
        return (
            <div className="article-page">
                <hr />
                <div className="banner">
                    <div className="container">
                        <ArticleMeta
                            article={this.props.article}
                            canModify={canModify}
                        />

                    </div>
                    <hr />

                </div>

                <div className="container page">
                    <div className="row article-content">
                        <div className="col-xs-12">
                            <h1 className={classes.Title}>{this.props.article.title}</h1>
                            <div className={classes.Image}><img src={''}></img></div>
                            <div className={classes.Content} dangerouslySetInnerHTML={markup}></div>
                            <ul className={classes.TagList}>
                                {this.props.article.tagList.map(tag => {
                                    return (
                                        <li
                                            className="tag-default tag-pill tag-outline"
                                            key={tag}
                                        >
                                            {'#'+tag}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    <div className="article-actions"></div>

                    <div className="row">
                        <CommentContainer
                            comments={this.props.comments || []}
                            errors={this.props.commentErrors}
                            slug={this.props.match.params.id}
                            currentUser={this.props.currentUser}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
