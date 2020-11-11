import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwittForm } from "../components/TwittForm";
import { TwittWritingForm } from "../components/TwittWritingForm";
import { UserAside } from "../components/UserAside";
import { AppContent, AppLayout } from "style/applayout";
import { addTwitt } from "modules/twit";
import { storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { useComment, useDelete, useLike } from "hook";

export const Main = () => {
    const [twitt, setTwitt] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { hasTwitts, twitts } = useSelector((state) => state.get);

    // image
    const [readImg, setReadImg] = useState("");
    const imgInput = useRef();
    const onInputClick = useCallback((e) => {
        imgInput.current.click();
    }, []);

    const onImage = useCallback((e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = (end) => {
            const {
                currentTarget: { result },
            } = end;
            setReadImg(result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }, []);

    const onImageDelete = useCallback(
        (e) => {
            setReadImg("");
        },
        [readImg]
    );

    // twitt

    const onTwittText = useCallback(
        (e) => {
            setTwitt(e.target.value);
        },
        [twitt]
    );

    const onTwittSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const fileRef = storageService
                .ref()
                .child(`${user.id}/${uuidv4()}`);

            if (readImg) {
                const putImg = await fileRef.putString(readImg, "data_url");
                const imgUrl = await putImg.ref.getDownloadURL();
                dispatch(
                    addTwitt({
                        twitt: twitt,
                        creator: user.username,
                        creatorId: user.id,
                        profile: user.profile,
                        createAt: Date.now(),
                        imgUrl,
                    })
                );
                setReadImg("");
            } else {
                dispatch(
                    addTwitt({
                        twitt: twitt,
                        creator: user.username,
                        creatorId: user.id,
                        profile: user.profile,
                        createAt: Date.now(),
                    })
                );
            }
            setTwitt("");
        },
        [twitt, readImg, dispatch]
    );

    // delete

    const onDelete = useDelete();

    //  comment

    const { onComment, onCommentSubmit } = useComment();

    // like

    const { onLike } = useLike();

    return (
        <>
            {hasTwitts && user ? (
                <AppLayout>
                    <UserAside />
                    <AppContent>
                        <>
                            <TwittWritingForm
                                onImageDelete={onImageDelete}
                                twitt={twitt}
                                onTwittText={onTwittText}
                                onTwittSubmit={onTwittSubmit}
                                imgInput={imgInput}
                                onInputClick={onInputClick}
                                onImage={onImage}
                                readImg={readImg}
                            />
                            <TwittForm
                                onLike={onLike}
                                hasTwitts={hasTwitts}
                                twitts={twitts}
                                onDelete={onDelete}
                                onComment={onComment}
                                onCommentSubmit={onCommentSubmit}
                            />
                        </>
                    </AppContent>
                </AppLayout>
            ) : (
                <div>로딩 중</div>
            )}
        </>
    );
};
