import { UserAside } from "components/layouts/UserAside";
import React from "react";
import { useSelector } from "react-redux";
import { ProfileBanner } from "../components/ProfileBanner";
import { ProfileForm } from "../components/ProfileForm";

import { AppContent, AppLayout } from "style/applayout";
import { UserTwittForm } from "components/UserTwittForm";
import { useGetTwitt, useLike, useComment, useDelete } from "hook";
import { Loader } from "style/loader";
import { SeoMeta } from "SeoMeta";

export const Profile = () => {
    const { user, isLogin } = useSelector((state) => state.auth);
    const { twitts } = useSelector((state) => state.auth.user);
    const { hasTwitts } = useSelector((state) => state.auth);

    const onDelete = useDelete();

    //  comment

    const [onComment, onCommentSubmit] = useComment();

    // like

    const [onLike] = useLike();

    useGetTwitt(isLogin, user);

    const data = {
        title: "유저 프로필 | Nwitter",
        description: "Nwitter, 트위터클론 유저프로필",
        canonical: `user/${user.id}`,
        type: "article",
    };

    return (
        <>
            <SeoMeta data={data} />
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
                <Loader />
            )}
        </>
    );
};
