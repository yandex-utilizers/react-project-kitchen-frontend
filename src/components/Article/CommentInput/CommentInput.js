import React, { useState } from "react";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import agent from "agent";
import { ADD_COMMENT } from "constants/actionTypes";
import { Avatar, Button, TextArea } from "ui-kit";
import classes from "./CommentInput.module.scss";

export const CommentInput = ({ className, currentUser, slug }) => {
    const [body, setBody] = useState("");
    const dispatch = useDispatch();

    const handleChange = event => {
        setBody(event.target.value);
    };

    const handleSubmitForm = event => {
        event.preventDefault();
        if (slug && body) {
            const payload = agent.Comments.create(slug, {
                body: body,
            });
            setBody("");
            dispatch({ type: ADD_COMMENT, payload });
        }
    };

    return (
        <div className={classnames(classes.CommentInput, className)}>
            <form onSubmit={handleSubmitForm}>
                <TextArea
                    className={classes.Textarea}
                    placeholder="Написать комментарий"
                    rows="5"
                    value={body}
                    onChange={handleChange}
                />
                <div className={classes.Footer}>
                    <div className={classes.User}>
                        <Avatar
                            imageAlt={currentUser.username}
                            size={48}
                            user={currentUser.image}
                        />
                        <div className={classes.UserInfo}>
                            <div className={classes.UserName}>
                                {currentUser.username}
                            </div>
                        </div>
                    </div>
                    <Button type="submit">Отправить комментарий</Button>
                </div>
            </form>
        </div>
    );
};
