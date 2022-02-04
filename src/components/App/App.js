import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { push } from "react-router-redux";
import agent from "agent";
import {
    Article,
    Editor,
    Header,
    Home,
    Login,
    Profile,
    ProfileFavorites,
    Register,
    Settings,
} from "components";
import { APP_LOAD, REDIRECT } from "constants/actionTypes";
import { ROUTES } from "routes";
import { store } from "../../store";
import "../../styles/index.scss";

export const App = () => {
    const dispatch = useDispatch();
    const common = useSelector(state => state.common);
    const { appLoaded, appName, currentUser, redirectTo } = common;

    useEffect(() => {
        store.dispatch(push(redirectTo));
        dispatch({ type: REDIRECT });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        const token = window.localStorage.getItem("jwt");
        if (token) {
            agent.setToken(token);
        }
        const payload = token ? agent.Auth.current() : null;
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true });
    }, [dispatch]);

    if (appLoaded) {
        return (
            <div>
                <Header appName={appName} currentUser={currentUser} />
                <Switch>
                    <Route exact path={ROUTES.HOME} component={Home} />
                    <Route path={ROUTES.LOGIN} component={Login} />
                    <Route path={ROUTES.REGISTER} component={Register} />
                    <Route path="/editor/:slug" component={Editor} />
                    <Route path={ROUTES.EDITOR} component={Editor} />
                    <Route path="/article/:id" component={Article} />
                    <Route path={ROUTES.SETTINGS} component={Settings} />
                    <Route
                        path="/@:username/favorites"
                        component={ProfileFavorites}
                    />
                    <Route path="/@:username" component={Profile} />
                </Switch>
            </div>
        );
    } else {
        return (
            <div>
                <Header appName={appName} currentUser={currentUser} />
            </div>
        );
    }
};
