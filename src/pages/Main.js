import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TwittForm } from "../components/TwittForm";
import { TwittWritingForm } from "../components/TwittWritingForm";
import { UserAside } from "../components/UserAside";
import { AppContent, AppLayout } from "style/applayout";
import {
    addComment,
    addLikes,
    addTwitt,
    addUnLikes,
    delTwitt,
} from "modules/twit";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

export const Main = () => {
    const [twitt, setTwitt] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { hasTwitts, twitts } = useSelector((state) => state.get);

    // image
    const [readImg, setReadImg] = useState("");
    const imgInput = useRef();
    const onInputClick = useCallback(
        (e) => {
            imgInput.current.click();
        },
        [imgInput]
    );

    const onImage = useCallback(
        (e) => {
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
                        createAt: new Date().toLocaleString("ko-KR"),
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
                        createAt: new Date().toLocaleString("ko-KR"),
                    })
                );
            }
            setTwitt("");
        },
        [twitt, readImg, dispatch]
    );

    // delete

    const onDelete = useCallback((e) => {
        const { id } = e.target.dataset;
        dispatch(delTwitt(id));
    }, []);

    //  comment

    const [commentText, setCommentText] = useState("");
    const onComment = useCallback(
        (e) => {
            setCommentText(e.target.value);
        },
        [commentText]
    );

    const onCommentSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const { id } = e.target.dataset;
            const comment = {
                comment: commentText,
                id,
                creator: user.username,
                creatorId: user.id,
                profile: user.profile,
                createAt: new Date().toLocaleString("ko-KR"),
            };
            dispatch(addComment(comment));
            setCommentText("");
        },
        [commentText, dispatch]
    );

    // like
    const isLike = useSelector((state) => state.twit.isLike);

    const onLike = useCallback(
        (e) => {
            const { id } = e.target.dataset;
            const addLike = {
                id,
                userId: user.id,
            };
            const getLikes = async () => {
                try {
                    await dbService
                        .doc(`nweets/${id}`)
                        .get()
                        .then((snapshot) => {
                            const likeArray = snapshot.data();
                            likeArray.likes &&
                            likeArray.likes.find((v) => v === user.id)
                                ? dispatch(addUnLikes(addLike))
                                : dispatch(addLikes(addLike));
                        });
                } catch (err) {
                    console.log(err);
                }
            };
            if (id) {
                getLikes();
            }
        },
        [dispatch]
    );

    return (
        <>
            {hasTwitts ? (
                <AppLayout>
                    <UserAside />
                    <AppContent>
                        <>
                            <TwittWritingForm
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
                                isLike={isLike}
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
