import React from "react";
import { Tag } from "ui-kit";
import agent from "../../agent";
import classes from "./Tags.module.scss";

const Tags = props => {
    const tags = props.tags;
        return (
            <div className="col-md-3">
                <div className={classes.Panel}>
                    <p className={classes.Heading}>Популярные теги</p>
                    {tags && <div className={classes.TagsList}>
                        {tags.map(tag => {
                            const handleClick = ev => {
                                ev.preventDefault();
                                props.onClickTag(
                                    tag,
                                    page => agent.Articles.byTag(tag, page),
                                    agent.Articles.byTag(tag)
                                );
                            };

                            return (
                                <Tag key={tag} onClick={handleClick}>
                                    {tag}    
                                </Tag>
                            );
                        })}
                    </div>}
                    {!tags && <div>Теги загружаются...</div>}
                </div>
            </div>

        );
};

export default Tags;
