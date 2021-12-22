import React from "react";
import classnames from "classnames";
import classes from "./Button.module.scss";

export const Button = ({
    className,
    children,
    type = "button",
    isDisabled = false,
    onClick,
    ...rest
}) => {
    return (
        <button
            className={classnames(classes.Button, className, {
                [classes.Button__disabled]: isDisabled,
            })}
            disabled={isDisabled}
            type={type}
            onClick={onClick}
            {...rest}
        >
            <span>{children}</span>
        </button>
    );
};
