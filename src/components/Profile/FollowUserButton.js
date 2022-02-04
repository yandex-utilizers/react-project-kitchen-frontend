import React from "react";
import { useDispatch } from "react-redux";
import agent from "agent";
import { FOLLOW_USER, UNFOLLOW_USER } from "constants/actionTypes";
import { Button } from "ui-kit";
import classes from "./Profile.module.scss";

export const FollowUserButton = ({ user, isUser }) => {
    const dispatch = useDispatch();

    if (isUser) {
        return null;
    }

    const handleClick = event => {
        event.preventDefault();
        if (user.following) {
            dispatch({
                type: UNFOLLOW_USER,
                payload: agent.Profile.unfollow(user.username),
            });
        } else {
            dispatch({
                type: FOLLOW_USER,
                payload: agent.Profile.follow(user.username),
            });
        }
    };

    return (
        <div className={classes.Profile_FollowUserButton}>
            <Button
                typeIcon={user.following ? "Minus" : "Plus"}
                onClick={handleClick}
            >
                {user.following ? "Отписаться" : "Подписаться"}
            </Button>
        </div>
    );
};
