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
    size = 48,
    user,
}) => {
    const sizeBox = `${size - 4}px`;
    const sizeInner = `${size - 8}px`;
    const sizeWrapper = `${size}px`;
    const sizeIcon = size * 0.6;

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
                setAtToStringAndPx(size - 8)
            );
            avatarRef.current.style.setProperty(
                "--avatar-width",
                setAtToStringAndPx(size - 8)
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
                style={{
                    width: sizeInner,
                    height: sizeInner,
                }}
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
            <div
                className={classes.Border}
                style={{ width: sizeWrapper, height: sizeWrapper }}
            >
                <div
                    className={classes.BorderBox}
                    style={{ width: sizeBox, height: sizeBox }}
                />
            </div>
        </div>
    );
};
