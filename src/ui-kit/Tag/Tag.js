import React from "react";
import classnames from "classnames";
import classes from "./Tag.module.scss";

export const Tag = ({ className, children, isActive }) => {
    return (
        <div
            className={classnames(classes.Tag, className, {
                [classes.Tag__active]: isActive,
            })}
        >
            {children}
        </div>
    );
};
