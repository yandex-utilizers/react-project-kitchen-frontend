import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import agent from "agent";
import { LOGIN, LOGIN_PAGE_UNLOADED } from "constants/actionTypes";
import { Button, Input, Spinner } from "ui-kit";
import classes from "./Login.module.scss";

const Login = ({ className }) => {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const auth = useSelector(state => state.auth);
    const common = useSelector(state => state.common);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (common.token) {
            history.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [common]);

    useEffect(() => {
        return () => dispatch({ type: LOGIN_PAGE_UNLOADED });
    }, [dispatch]);

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = event => {
        event.preventDefault();
        dispatch({
            type: LOGIN,
            payload: agent.Auth.login(state.email, state.password),
        });
    };

    if (auth.inProgress) return <Spinner />;

    return (
        <div className={classnames(classes.Login, className)}>
            <div className={classes.Container}>
                <h1 className={classes.Title}>Войти</h1>
                <p className={classes.TextCenter}>
                    <Link className={classes.Link} to="/register">
                        Хотите создать аккаунт?
                    </Link>
                </p>
                <form onSubmit={handleSubmitForm}>
                    <fieldset>
                        <fieldset className={classes.FormGroup}>
                            <Input
                                autoComplete="username"
                                errors={auth.errors}
                                id="email"
                                label="E-mail"
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                value={state.email}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className={classes.FormGroup}>
                            <Input
                                autoComplete="current-password"
                                errors={auth.errors}
                                id="password"
                                label="Пароль"
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                value={state.password}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <div className={classes.Control}>
                            <Button type="submit" isDisabled={auth.inProgress}>
                                Войти
                            </Button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Login;
