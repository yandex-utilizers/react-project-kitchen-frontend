import React from "react";
import classnames from "classnames";
import classes from "./Tabs.module.scss";

export const Tabs = ({ className, selectedId, tabs, onTabClick }) => {
    return (
        <div className={classnames(classes.Tabs, className)}>
            {tabs &&
                tabs.map(tab => (
                    <div
                        className={classnames(classes.Tab, {
                            [classes.Tab__selected]: tab.id === selectedId,
                        })}
                        key={tab.id}
                        onClick={() => onTabClick(tab.id)}
                    >
                        <div
                            className={classnames(classes.TabLabel, {
                                [classes.TabLabel__selected]:
                                    tab.id === selectedId,
                            })}
                        >
                            {tab.label}
                        </div>
                    </div>
                ))}
        </div>
    );
};
