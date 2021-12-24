import React from "react";
import classnames from "classnames";
import { Comment } from "components/Article/Comment";
import classes from "./CommentList.module.scss";

export const CommentList = ({ className, comments, currentUser, slug }) => {
    return (
        <div className={classnames(classes.CommentList, className)}>
            {comments &&
                comments.map(comment => (
                    <Comment
                        className={classes.Comment}
                        comment={comment}
                        currentUser={currentUser}
                        key={comment.id}
                        slug={slug}
                    />
                ))}
        </div>
    );
};
