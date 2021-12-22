import React from "react";
import { Icon } from "ui-kit";
import classes from "./Spinner.module.scss";

export const Spinner = () => {
    return (
        <div className={classes.Spinner}>
            <Icon type="Spinner" />
        </div>
    );
};
