import React from "react";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import agent from "agent";
import { DELETE_COMMENT } from "constants/actionTypes";
import { Icon } from "ui-kit";
import classes from "./DeleteButton.module.scss";

export const DeleteButton = ({ className, commentId, show, slug }) => {
    const dispatch = useDispatch();

    const handleDeletePost = () => {
        const payload = agent.Comments.delete(slug, commentId);
        dispatch({ type: DELETE_COMMENT, payload, commentId });
    };

    if (show) {
        return (
            <div
                className={classnames(classes.DeleteButton, className)}
                onClick={handleDeletePost}
            >
                <Icon type="Trash" />
            </div>
        );
    }
    return null;
};
