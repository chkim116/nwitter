import { dbService } from "fbase";
import { getAuthTwitt } from "modules/auth";
import { getTwitt } from "modules/get";
import { addComment, addLikes, addUnLikes, delTwitt } from "modules/twit";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLike = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const onLike = useCallback(
        (e) => {
            const { id } = e.target.dataset;
            if (user) {
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
                getLikes();
            }
        },
        [user, dispatch]
    );
    return { onLike };
};

export const useGetTwitt = (isLogin, user = null) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getTwit = async () => {
            try {
                await dbService
                    .collection("nweets")
                    .orderBy("createAt", "desc")
                    .onSnapshot((snapshot) => {
                        const array = snapshot.docs.map((doc) => [
                            { ...doc.data(), id: doc.id },
                        ]);
                        dispatch(getTwitt(array));
                    });
            } catch (err) {
                console.log(err);
            }
        };

        const getAuthTwit = async () => {
            try {
                await dbService
                    .collection("nweets")
                    .where("creatorId", "==", user.id)
                    .orderBy("createAt", "desc")
                    .onSnapshot((snapshot) => {
                        const array = snapshot.docs.map((doc) => [
                            { id: doc.id, ...doc.data() },
                        ]);
                        dispatch(getAuthTwitt(array));
                    });
            } catch (err) {
                console.log(err);
            }
        };

        if (isLogin) {
            if (isLogin && user) {
                return getAuthTwit();
            }

            getTwit();
        }
    }, [isLogin, dispatch]);
};

export const useComment = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const [commentText, setCommentText] = useState("");

    const onComment = useCallback(
        (e) => {
            setCommentText(e.target.value);
        },
        // eslint-disable-next-line
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
                createAt: Date.now(),
            };
            dispatch(addComment(comment));
            setCommentText("");
        },
        [commentText, user, dispatch]
    );

    return { onComment, onCommentSubmit };
};

export const useDelete = () => {
    const dispatch = useDispatch();

    const onDelete = useCallback(
        (e) => {
            const { id } = e.target.dataset;
            dispatch(delTwitt(id));
        },
        [dispatch]
    );

    return onDelete;
};
