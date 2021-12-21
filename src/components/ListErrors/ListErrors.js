import React from "react";
import classnames from "classnames";
import classes from "./ListErrors.module.scss";

export const ListErrors = ({ className, errors }) => {
    if (errors) {
        return (
            <ul className={classnames(className)}>
                {Object.keys(errors).map(key => {
                    return (
                        <li className={classes.Item} key={key}>
                            {key} {errors[key]}
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return null;
    }
};
