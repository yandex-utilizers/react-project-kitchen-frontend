import React from "react";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import { DELETE_ARTICLE } from "../../constants/actionTypes";
import { Button } from "ui-kit";
import agent from "../../agent";
import classes from './ArticleActions.module.scss';


const ArticleActions = props => {

    const dispatch = useDispatch();

    const onClickDelete = payload => dispatch({ type: DELETE_ARTICLE, payload });

    const article = props.article;
    const del = () => {
        onClickDelete(agent.Articles.del(article.slug));
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

export default ArticleActions;
