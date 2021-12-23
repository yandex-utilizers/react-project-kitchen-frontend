import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import agent from "agent";
import { REGISTER, REGISTER_PAGE_UNLOADED } from "constants/actionTypes";
import { ROUTES } from "routes";
import { Button, Input, Spinner } from "ui-kit";
import classes from "./Register.module.scss";

export const Register = ({ className }) => {
    const [state, setState] = useState({
        email: "",
        password: "",
        username: "",
    });
    const auth = useSelector(state => state.auth);
    console.log("auth ", auth);
    const common = useSelector(state => state.common);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (common.token) {
            history.push(ROUTES.HOME);
        }
    }, [common, history]);

    useEffect(() => {
        return () => dispatch({ type: REGISTER_PAGE_UNLOADED });
    }, [dispatch]);

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = event => {
        event.preventDefault();
        dispatch({
            type: REGISTER,
            payload: agent.Auth.register(
                state.username,
                state.email,
                state.password
            ),
        });
    };

    if (auth.inProgress) return <Spinner />;

    return (
        <div className={classnames(classes.Register, className)}>
            <div className={classes.Container}>
                <h1 className={classes.Title}>Зарегистрироваться</h1>
                <p className={classes.TextCenter}>
                    <Link className={classes.Link} to={ROUTES.LOGIN}>
                        Уже есть аккаунт?
                    </Link>
                </p>
                <form onSubmit={handleSubmitForm}>
                    <fieldset>
                        <fieldset className="form-group">
                            <Input
                                autoComplete="username"
                                errors={auth.errors}
                                id="username"
                                label="Имя пользователя"
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={state.username}
                                onChange={handleChange}
                            />
                        </fieldset>

                        <fieldset className="form-group">
                            <Input
                                autoComplete="email"
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

                        <fieldset className="form-group">
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
                            <Button
                                className={classes.Button}
                                type="submit"
                                isDisabled={auth.inProgress}
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};
