import React from "react";
import classnames from "classnames";
import classes from "./ListErrors.module.scss";

export const ListErrors = ({ className, errors }) => {
    const renderMessage = (errors, key) => {
        if (errors[key] === "can't be blank") {
            return "Поле не может быть пустым.";
        } else if (errors[key] === "is already taken.") {
            return "Пользователь с таким именем уже существует.";
        } else if (errors[key] === "is invalid") {
            return "Не валидные введенные значения.";
        } else {
            return (
                <>
                    {key} {errors[key]}
                </>
            );
        }
    };

    if (errors) {
        return (
            <ul className={classnames(className)}>
                {Object.keys(errors).map(key => {
                    return (
                        <li className={classes.Item} key={key}>
                            {renderMessage(errors, key)}
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return null;
    }
};
