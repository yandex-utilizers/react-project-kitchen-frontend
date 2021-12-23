import React, { forwardRef, useState } from "react";
import classnames from "classnames";
import { ListErrors } from "components";
import { Icon } from "ui-kit";
import classes from "./Input.module.scss";

export const Input = forwardRef(
    (
        {
            className,
            autoComplete,
            errors,
            id,
            label,
            name,
            placeholder,
            type = "text",
            value,
            isRequired,
            onChange,
            onKeyUp,
            ...rest
        },
        ref
    ) => {
        const PASSWORD = "password";
        const TEXT = "text";
        const [isShowPassword, setIsShowPassword] = useState(false);

        const handlePasswordShow = () => {
            setIsShowPassword(prevState => !prevState);
        };

        const handleType = type => {
            if (type === TEXT) {
                return TEXT;
            }
            if (type === PASSWORD) {
                type = isShowPassword ? TEXT : PASSWORD;
                return type;
            }
        };

        return (
            <>
                {label && (
                    <label className={classes.Label} htmlFor={id}>
                        {label}
                    </label>
                )}
                <div className={classes.InputField}>
                    <input
                        className={classnames(className, classes.Input, {
                            [classes.Input__error]: errors,
                        })}
                        autoComplete={autoComplete}
                        id={id}
                        name={name}
                        ref={ref}
                        placeholder={placeholder}
                        required={isRequired}
                        type={handleType(type)}
                        value={value}
                        onChange={onChange}
                        onKeyUp={onKeyUp}
                        {...rest}
                    />
                    {type === PASSWORD && !errors && (
                        <div
                            className={classes.InputIcon}
                            onClick={handlePasswordShow}
                        >
                            {isShowPassword ? (
                                <Icon
                                    className={classes.InputIconElement}
                                    type="VisibilityOff"
                                />
                            ) : (
                                <Icon
                                    className={classes.InputIconElement}
                                    type="Visibility"
                                />
                            )}
                        </div>
                    )}
                    {errors && (
                        <div className={classes.InputIcon}>
                            <Icon
                                className={classes.InputIconAlert}
                                type="Alert"
                            />
                        </div>
                    )}
                </div>
                {errors && (
                    <div className={classes.Error}>
                        <ListErrors errors={errors} />
                    </div>
                )}
            </>
        );
    }
);

Input.displayName = "FormInput";
