import React, { forwardRef } from "react";
import classNames from "classnames";
import classes from "./TextArea.module.scss";

export const TextArea = forwardRef(
    (
        {
            className,
            errors,
            id,
            label,
            name,
            placeholder,
            rows,
            type,
            value,
            onChange,
            ...rest
        },
        ref
    ) => {
        return (
            <>
                {label && (
                    <label className={classes.Label} htmlFor={id}>
                        {label}
                    </label>
                )}
                <textarea
                    className={classNames(className, classes.TextArea, {
                        [classes.TextArea__error]: errors,
                    })}
                    id={id}
                    name={name}
                    ref={ref}
                    rows={rows}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                    {...rest}
                />
            </>
        );
    }
);

TextArea.displayName = "TextArea";
