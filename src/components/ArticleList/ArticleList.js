import ArticlePreview from "../ArticlePreview";
import ListPagination from "../ListPagination";
import React from "react";

export const ArticleList = props => {
    if (!props.articles) {
        return <div className="article-preview">Loading...</div>;
    }

    if (props.articles.length === 0) {
        return (
            <div className="article-preview">Здесь ничего нет... пока.</div>
        );
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
