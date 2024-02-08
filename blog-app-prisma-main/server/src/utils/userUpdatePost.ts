import { Context } from "..";

interface UserUpdatePostParams {
    userId: number;
    postId: number;
    prisma: Context["prisma"];
}
export const userUpdatePost = async ({ userId, postId, prisma }: UserUpdatePostParams) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if(!user) return { userErrors: [{ message: "User not found" }], post: null };
    const post = await prisma.post.findUnique({ where: { id: postId }});
    if(post?.authorId !== user.id) return { userErrors: [{ message: "Post not owned" }], post: null };
}