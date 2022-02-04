import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cn from "classnames";
import agent from "agent";
import { SET_PAGE } from "constants/actionTypes";
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
                            <Link className={classes.Link} to="">
                                {v + 1}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default ListPagination;
