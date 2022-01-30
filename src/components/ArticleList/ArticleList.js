import React from "react";
import { isEmpty } from 'lodash';
import ArticlePreview from "../ArticlePreview";
import ListPagination from "../ListPagination";
import { Spinner } from "ui-kit";
import styles from './Article.module.css';


export const ArticleList = props => {
    if (isEmpty(props.articles)) {
        return <div className={styles.articlePreview}><Spinner /></div>;
    }

    if (isEmpty(props.articles)) {
        return <div className={styles.articlePreview}>Здесь ничего нет... пока.</div>;
    }

    return (
        <div>
            {props.articles.map(article => {
                return <ArticlePreview id={article.slug} key={article.slug} />;
            })}

            <ListPagination
                pager={props.pager}
                articlesCount={props.articlesCount}
                currentPage={props.currentPage}
            />
        </div>
    );
};
