import React from "react";
import isEmpty from "lodash/isEmpty";
import { Spinner } from "ui-kit";
import ArticlePreview from "../ArticlePreview";
import ListPagination from "../ListPagination";
import styles from "./Article.module.css";

export const ArticleList = ({
    articles,
    articlesCount,
    currentPage,
    loading,
    pager,
}) => {
    if (loading) return <Spinner />;

    if (isEmpty(articles)) {
        return (
            <div className={styles.articlePreview}>
                Здесь пусто... пока что.
            </div>
        );
    }

    return (
        <div>
            {articles &&
                articles.map(article => {
                    return (
                        <ArticlePreview id={article.slug} key={article.slug} />
                    );
                })}
            <ListPagination
                pager={pager}
                articlesCount={articlesCount}
                currentPage={currentPage}
            />
        </div>
    );
};
