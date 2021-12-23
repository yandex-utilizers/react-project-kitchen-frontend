import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import { Icon } from "ui-kit";
import { setAtToStringAndPx } from "utils/common";
import classes from "./Avatar.module.scss";

export const Avatar = ({
    className,
    backgroundColor = "#E9E9ED",
    color = "#0A0A0B",
    imageAlt,
    size = 24,
    user,
}) => {
    const sizeInner = `${size}px`;
    const sizeIcon = size * 0.67;

    const avatarRef = useRef(null);

    useEffect(() => {
        if (avatarRef.current) {
            avatarRef.current.style.setProperty(
                "--avatar-backgroundColor",
                backgroundColor
            );
            avatarRef.current.style.setProperty("--avatar-color", color);
            avatarRef.current.style.setProperty(
                "--avatar-height",
                setAtToStringAndPx(size)
            );
            avatarRef.current.style.setProperty(
                "--avatar-width",
                setAtToStringAndPx(size)
            );
            if (!user) {
                avatarRef.current.style.setProperty(
                    "--avatar-border",
                    "3px solid #0A0A0B"
                );
            }
        }
    }, [backgroundColor, color, size, user]);

    return (
        <div className={classnames(classes.Avatar, className)} ref={avatarRef}>
            <div
                className={classnames(classes.Inner)}
            >
                {user ? (
                    <img
                        className={classes.Face}
                        src={user}
                        alt={imageAlt}
                        width={sizeInner}
                        height={sizeInner}
                    />
                ) : (
                    <Icon size={sizeIcon} type="UserAvatar" />
                )}
            </div>
        </div>
    );
};
