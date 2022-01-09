import { Link } from "react-router-dom";
import React from "react";
import classnames from "classnames";
import agent from "../../agent";
import { connect } from "react-redux";
import { DELETE_ARTICLE } from "../../constants/actionTypes";
import { Button } from "ui-kit";
import classes from './ArticleActions.module.scss';

const mapDispatchToProps = dispatch => ({
    onClickDelete: payload => dispatch({ type: DELETE_ARTICLE, payload }),
});

const ArticleActions = props => {
    const article = props.article;
    const del = () => {
        props.onClickDelete(agent.Articles.del(article.slug));
    };
    if (props.canModify) {
        return (
            <span className={classes.ActionsButtons}>
                    <Button className={classes.Button}><i className="ion-edit"></i> Редактировать объявление</Button>
                    <Button theme='Danger' className={classes.Button}><i className="ion-trash-a"></i> Удалить объявление</Button>
            </span>
        );
    }

    return <span></span>;
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
