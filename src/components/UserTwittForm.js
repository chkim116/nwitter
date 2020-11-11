import React from "react";
import { TwittForm } from "./TwittForm";

export const UserTwittForm = ({
    twitts,
    hasTwitts,
    onComment,
    onCommentSubmit,
    onLike,
    isLike,
    onDelete,
}) => {
    return (
        <TwittForm
            onDelete={onDelete}
            twitts={twitts}
            hasTwitts={hasTwitts}
            onComment={onComment}
            onCommentSubmit={onCommentSubmit}
            onLike={onLike}
            isLike={isLike}
        />
    );
};
