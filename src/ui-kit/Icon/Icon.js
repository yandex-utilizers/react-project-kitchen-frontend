import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import { setAtToStringAndPx } from "utils/common";
import { iconTypes } from "./IconType";
import classes from "./Icon.module.scss";

const getIcon = type => iconTypes.get(type);

export const Icon = ({ className, height, width, size, type, ...rest }) => {
    const iconRef = useRef(null);

    useEffect(() => {
        if (iconRef.current) {
            if (size && !height && !width) {
                iconRef.current.style.setProperty(
                    "--icon-height",
                    setAtToStringAndPx(size)
                );
                iconRef.current.style.setProperty(
                    "--icon-width",
                    setAtToStringAndPx(size)
                );
            } else if (!size && height && width) {
                iconRef.current.style.setProperty(
                    "--icon-height",
                    setAtToStringAndPx(height)
                );
                iconRef.current.style.setProperty(
                    "--icon-width",
                    setAtToStringAndPx(width)
                );
            }
        }
    }, [height, size, width]);

    return (
        <div
            className={classNames(classes.Icon, className)}
            ref={iconRef}
            {...rest}
        >
            {getIcon(type)}
        </div>
    );
};
