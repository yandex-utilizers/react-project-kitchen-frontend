import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import isEmpty from "lodash/isEmpty";
import agent from "agent";
import {
    ADD_TAG,
    EDITOR_PAGE_LOADED,
    REMOVE_TAG,
    ARTICLE_SUBMITTED,
    EDITOR_PAGE_UNLOADED,
} from "constants/actionTypes";
import { ROUTES } from "routes";
import { Button, Input, TextArea } from "ui-kit";
import { handleRemoveAllSpaces } from "utils/string";
import classes from "./Editor.module.scss";

export const Editor = ({ className }) => {
    const [isCreatePage, setIsCreatePage] = useState(false);
    const [state, setState] = useState({
        articleSlug: "",
        body: "",
        description: "",
        tagInput: "",
        tagList: [],
        title: "",
    });
    const editor = useSelector(state => state.editor);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleWatchForEnter = event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            dispatch({ type: ADD_TAG });
        }
    };

    const handleSubmitForm = event => {
        event.preventDefault();
        const tags = handleRemoveAllSpaces(state.tagInput)
            .split(",")
            .filter(tag => tag.trim() !== "");
        const article = {
            title: state.title,
            description: state.description,
            body: state.body,
            tagList: tags,
        };
        const slug = { slug: state.articleSlug };
        const promise = state.articleSlug
            ? agent.Articles.update(Object.assign(article, slug))
            : agent.Articles.create(article);
        dispatch({
            type: ARTICLE_SUBMITTED,
            payload: promise,
        });
        if (isCreatePage) {
            history.push(ROUTES.HOME);
        } else {
            history.push(`${ROUTES.ARTICLE}/${state.articleSlug}`);
        }
    };

    useEffect(() => {
        if (location.pathname === ROUTES.EDITOR) {
            setIsCreatePage(true);
            dispatch({ type: EDITOR_PAGE_LOADED, payload: null });
        } else {
            setIsCreatePage(false);
            const payload = agent.Articles.get(match.params.slug);
            dispatch({ type: EDITOR_PAGE_LOADED, payload: payload });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isCreatePage && !isEmpty(editor)) {
            const tags = editor.tagList ? editor.tagList.join(",") : "";
            setState(prevState => ({
                ...prevState,
                articleSlug: editor.articleSlug,
                body: editor.body,
                description: editor.description,
                tagInput: tags,
                title: editor.title,
            }));
        }
    }, [isCreatePage, editor]);

    useEffect(() => {
        return () => dispatch({ type: EDITOR_PAGE_UNLOADED });
    }, [dispatch]);

    const handleRemoveTag = tag => {
        dispatch({ type: REMOVE_TAG, tag });
    };

    const validate = state => {
        if (!state.title || !state.description) {
            return true;
        }
    };

    return (
        <div className={classnames(classes.Editor, className)}>
            <div className={classes.Container}>
                <h1 className={classes.Title}>
                    {isCreatePage ? "Новая запись" : "Редактирование записи"}
                </h1>
                <form onSubmit={handleSubmitForm}>
                    <fieldset>
                        <fieldset className={classes.FormGroup}>
                            <Input
                                errors={editor.errors}
                                id="title"
                                label="Заголовок"
                                name="title"
                                type="text"
                                placeholder="Название статьи"
                                value={state.title}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className={classes.FormGroup}>
                            <Input
                                errors={editor.errors}
                                id="description"
                                label="Описание"
                                name="description"
                                type="text"
                                placeholder="О чем статья"
                                value={state.description}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className={classes.FormGroup}>
                            <TextArea
                                label="Содержание"
                                name="body"
                                placeholder="Текст статьи"
                                rows="8"
                                type="text"
                                value={state.body}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className={classes.FormGroup}>
                            <Input
                                errors={editor.errors}
                                id="tagInput"
                                label="Тэги"
                                name="tagInput"
                                type="text"
                                placeholder="Теги (через запятую)"
                                value={state.tagInput}
                                onChange={handleChange}
                                onKeyUp={handleWatchForEnter}
                            />
                            <div className="tag-list">
                                {(state.tagList && state.tagList).map(tag => {
                                    return (
                                        <span
                                            className="tag-default tag-pill"
                                            key={tag}
                                        >
                                            <i
                                                className="ion-close-round"
                                                onClick={handleRemoveTag(tag)}
                                            />
                                            {tag}
                                        </span>
                                    );
                                })}
                            </div>
                        </fieldset>
                        <div className={classes.Control}>
                            <Button
                                type="submit"
                                isDisabled={
                                    editor.inProgress || validate(state)
                                }
                            >
                                {isCreatePage ? "Опубликовать" : "Сохранить"}
                            </Button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};
