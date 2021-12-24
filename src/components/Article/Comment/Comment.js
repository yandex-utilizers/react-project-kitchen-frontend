import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Avatar } from "ui-kit";
import { DeleteButton } from "components/Article/DeleteButton";
import classes from "./Comment.module.scss";

export const Comment = ({ className, comment, currentUser, slug }) => {
    const show =
        currentUser && currentUser.username === comment.author.username;

    return (
        <div className={classnames(classes.Comment, className)}>
            <div className={classes.Block}>
                <p className={classes.BlockText}>{comment.body}</p>
            </div>
            <div className={classes.Footer}>
                <div className={classes.User}>
                    <Link to={`/@${comment.author.username}`}>
                        <Avatar
                            imageAlt={comment.author.username}
                            size={48}
                            user={comment.author.image}
                        />
                    </Link>
                    <div className={classes.UserInfo}>
                        <Link to={`/@${comment.author.username}`}>
                            <div className={classes.UserName}>
                                {comment.author.username}
                            </div>
                        </Link>

                        <span className={classes.DatePosted}>
                            {new Date(comment.createdAt).toDateString()}
                        </span>
                    </div>
                </div>
                <DeleteButton show={show} slug={slug} commentId={comment.id} />
            </div>
        </div>
    );
};
