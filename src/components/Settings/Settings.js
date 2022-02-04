import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import agent from "agent";
import {
    SETTINGS_SAVED,
    SETTINGS_PAGE_UNLOADED,
    LOGOUT,
} from "constants/actionTypes";
import { ROUTES } from "routes";
import { Button, Input, TextArea } from "ui-kit";
import classes from "./Settings.module.scss";

const SettingsForm = ({ currentUser, onSubmitForm }) => {
    const [state, setState] = useState({
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
    });
    const settings = useSelector(state => state.settings);
    const history = useHistory();

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSubmitForm = event => {
        event.preventDefault();

        const user = Object.assign({}, state);
        if (!user.password) {
            delete user.password;
        }

        onSubmitForm(event, user);
        history.push(ROUTES.HOME);
    };

    useEffect(() => {
        if (currentUser) {
            setState(prevState => ({
                ...prevState,
                image: currentUser.image || "",
                username: currentUser.username,
                bio: currentUser.bio,
                email: currentUser.email,
            }));
        }
    }, [currentUser]);

    return (
        <form onSubmit={handleSubmitForm}>
            <fieldset>
                <fieldset className={classes.FormGroup}>
                    <Input
                        errors={settings.errors}
                        id="image"
                        label="Изображение профиля"
                        name="image"
                        type="text"
                        placeholder="URL изображения профиля"
                        value={state.image}
                        onChange={handleChange}
                    />
                </fieldset>
                <fieldset className={classes.FormGroup}>
                    <Input
                        errors={settings.errors}
                        id="username"
                        label="Имя пользователя"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={state.username}
                        onChange={handleChange}
                    />
                </fieldset>
                <fieldset className={classes.FormGroup}>
                    <TextArea
                        label="Информация о вас"
                        name="bio"
                        placeholder="Информация о вас"
                        rows="8"
                        type="text"
                        value={state.bio}
                        onChange={handleChange}
                    />
                </fieldset>
                <fieldset className={classes.FormGroup}>
                    <Input
                        errors={settings.errors}
                        id="email"
                        label="E-mail"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={state.email}
                        onChange={handleChange}
                    />
                </fieldset>
                <fieldset className={classes.FormGroup}>
                    <Input
                        autoComplete="on"
                        errors={settings.errors}
                        id="password"
                        label="Новый пароль"
                        name="password"
                        type="password"
                        placeholder="New Password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </fieldset>
                <div className={classes.Control}>
                    <Button type="submit">Сохранить</Button>
                </div>
            </fieldset>
        </form>
    );
};

export const Settings = ({ className }) => {
    const common = useSelector(state => state.common);
    const { currentUser } = common;
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        return () => dispatch({ type: SETTINGS_PAGE_UNLOADED });
    }, [dispatch]);

    const handleClickLogout = () => {
        dispatch({ type: LOGOUT });
        history.push(ROUTES.HOME);
    };

    const handleSubmitForm = (event, user) => {
        event.preventDefault();
        const options = agent.Auth.save(user);
        dispatch({ type: SETTINGS_SAVED, payload: options });
    };

    return (
        <div className={classnames(classes.Settings, className)}>
            <div className={classes.Container}>
                <h1 className={classes.Title}>Ваши настройки</h1>
                <SettingsForm
                    currentUser={currentUser}
                    onSubmitForm={handleSubmitForm}
                />
                <hr />
                <div className={classes.Footer}>
                    <button
                        className={classes.Logout}
                        onClick={handleClickLogout}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
};
