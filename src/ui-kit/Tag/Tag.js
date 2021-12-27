import React from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import classes from "./Tag.module.scss";

export const Tag = ({ className, children, onClick }) => {
    const activeTag = useSelector(store => store.articleList.tag);
    const isActive = children === activeTag;

    return (
        <button
            onClick={onClick}
            className={classnames(classes.Tag, className, {
                [classes.Tag__active]: isActive,
            })}
        >
            {children}
        </button>
    );
};
