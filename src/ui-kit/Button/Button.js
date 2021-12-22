import React from "react";
import classnames from "classnames";
import { Icon } from "ui-kit";
import classes from "./Button.module.scss";

export const Button = ({
    className,
    children,
    theme,
    type = "button",
    typeIcon,
    isDisabled = false,
    onClick,
    ...rest
}) => {
    return (
        <button
            className={classnames(
                classes.Button,
                classes[`Button__${theme}`],
                className,
                {
                    [classes.Button__disabled]: isDisabled,
                }
            )}
            disabled={isDisabled}
            type={type}
            onClick={onClick}
            {...rest}
        >
            {typeIcon && <Icon type={typeIcon} />}
            <span className={typeIcon ? classes.Text : ""}>{children}</span>
        </button>
    );
};
