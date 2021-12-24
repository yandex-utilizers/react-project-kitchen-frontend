import React from "react";
import classes from "./Intro.module.scss";
import Avatar from "../../ui-kit/Avatar";

const Intro = () => {
    return (
        <section className={classes.intro}>
            <div className={"container " + classes.container}>
                <h1 className={classes.heading}>ДелиУтиль</h1>
                <p className={classes.headline}>
                    Дайте вторую жизнь ненужным вещам
                </p>
            </div>
        </section>
    );
};

export default Intro;
