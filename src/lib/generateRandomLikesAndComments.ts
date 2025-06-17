export function generateRandomLikesAndComments(
    likeMin: number = 5000,
    likeMax: number = 250000,
    commentMin: number = 10,
    commentMax: number = 10000
) {
    const rawLikes = Math.floor(Math.random() * (likeMax - likeMin + 1)) + likeMin;
    const rawComments = Math.floor(Math.random() * (commentMax - commentMin + 1)) + commentMin;
    return {
        likes: rawLikes.toLocaleString("de-DE"),
        comments: rawComments.toLocaleString("de-DE")};
}