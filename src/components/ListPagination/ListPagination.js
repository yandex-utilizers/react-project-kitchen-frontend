import React from "react";
import agent from "../../agent";
import { useDispatch } from "react-redux";
import { SET_PAGE } from "../../constants/actionTypes";
import cn from "classnames";
import classes from "./ListPagination.module.scss";

const ListPagination = props => {
    const dispatch = useDispatch();

    const onSetPage = (page, payload) =>
        dispatch({ type: SET_PAGE, page, payload });

    if (props.articlesCount <= 10) {
        return null;
    }

    const range = [];
    for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
        range.push(i);
    }

    const setPage = page => {
        if (props.pager) {
            onSetPage(page, props.pager(page));
        } else {
            onSetPage(page, agent.Articles.all(page));
        }
    };

    return (
        <nav className={classes.ListPagination}>
            <ul className={classes.List}>
                {range.map(v => {
                    const isCurrent = v === props.currentPage;
                    const onClick = ev => {
                        ev.preventDefault();
                        setPage(v);
                    };
                    return (
                        <li
                            className={cn(classes.Item, {
                                [`${classes.Active}`]: isCurrent,
                            })}
                            onClick={onClick}
                            key={v.toString()}
                        >
                            <a className={classes.Link} href="">
                                {v + 1}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default ListPagination;
