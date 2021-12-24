import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ListErrors } from "components";
import { CommentInput } from "components/Article/CommentInput";
import { CommentList } from "components/Article/CommentList";
import { ROUTES } from "routes";
import classes from "./CommentContainer.module.scss";

export const CommentContainer = ({
    className,
    comments,
    currentUser,
    errors,
    slug,
}) => {
    const renderInput = (currentUser, errors, slug) => {
        if (currentUser) {
            return (
                <div>
                    <ListErrors errors={errors} />
                    <CommentInput slug={slug} currentUser={currentUser} />
                </div>
            );
        } else {
            return (
                <p>
                    <Link to={ROUTES.LOGIN}>Войти</Link>
                    &nbsp;or&nbsp;
                    <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
                    &nbsp;для добавления комментариев к этой статье.
                </p>
            );
        }
    };

    return (
        <div className={classnames(classes.CommentContainer, className)}>
            <div className={classes.Container}>
                <h3 className={classes.Title}>Комментарии</h3>
                {renderInput(currentUser, errors, slug)}
                <CommentList
                    comments={comments}
                    slug={slug}
                    currentUser={currentUser}
                />
            </div>
        </div>
    );
};
