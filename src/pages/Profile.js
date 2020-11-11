import { UserAside } from "components/UserAside";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfileBanner } from "../components/ProfileBanner";
import { ProfileForm } from "../components/ProfileForm";

import { AppContent, AppLayout } from "style/applayout";
import { UserTwittForm } from "components/UserTwittForm";
import { useGetTwitt, useLike, useComment, useDelete } from "hook";

export const Profile = () => {
    const dispatch = useDispatch();
    const { user, isLogin } = useSelector((state) => state.auth);

    const { twitts } = useSelector((state) => state.auth.user);
    const { hasTwitts } = useSelector((state) => state.auth);

    const onDelete = useDelete();

    //  comment

    const { onComment, onCommentSubmit } = useComment();
    // like

    const { onLike } = useLike();

    useGetTwitt(isLogin, user);

    return (
        <>
            {hasTwitts ? (
                <AppLayout>
                    <UserAside />
                    <AppContent>
                        <>
                            <ProfileBanner user={user} />
                            <ProfileForm user={user} />
                            <UserTwittForm
                                twitts={twitts}
                                hasTwitts={hasTwitts}
                                onComment={onComment}
                                onCommentSubmit={onCommentSubmit}
                                onLike={onLike}
                                onDelete={onDelete}
                            />
                        </>
                    </AppContent>
                </AppLayout>
            ) : (
                <div>로딩</div>
            )}
        </>
    );
};
