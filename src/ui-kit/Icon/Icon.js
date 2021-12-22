import React from "react";
import classNames from "classnames";
import { iconTypes } from "./IconType";
import classes from "./Icon.module.scss";

const getIcon = type => iconTypes.get(type);

export const Icon = ({ className, type, ...rest }) => {
    return (
        <div className={classNames(classes.Icon, className)} {...rest}>
            {getIcon(type)}
        </div>
    );
};
