import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import agent from "agent";
import { DELETE_ARTICLE } from "constants/actionTypes";
import { ROUTES } from "routes";
import { Button } from "ui-kit";
import classes from "./ArticleActions.module.scss";

const ArticleActions = ({ article, canModify }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        const payload = agent.Articles.del(article.slug);
        dispatch({ type: DELETE_ARTICLE, payload });
        history.goBack();
    };

    const handleEdit = () => {
        history.push(`${ROUTES.EDITOR}/${article.slug}`);
    };

    if (canModify) {
        return (
            <span className={classes.ActionsButtons}>
                <Button
                    className={classes.Button}
                    typeIcon="Edit"
                    onClick={handleEdit}
                >
                    Редактировать объявление
                </Button>
                <Button
                    className={classes.Button}
                    theme="Danger"
                    typeIcon="Trash"
                    onClick={handleDelete}
                >
                    Удалить объявление
                </Button>
            </span>
        );
    }

    return <span />;
};

export default ArticleActions;
