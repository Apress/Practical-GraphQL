import { Post, Prisma } from '@prisma/client';
import { Context } from '../index';
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JWT_SIGNATURE } from '../keys';
import { userUpdatePost } from '../utils/userUpdatePost';

interface PostArgs {
    post: { title?: string; content?: string; }
}

interface PostPayloadType {
    userErrors: { message: string }[];
    post: Post | Prisma.Prisma__PostClient<Post> | null;
}

interface SignupArgs {
    credentials: {
        email: string;
        password: string;
    }
    name: string;
    bio: string;
}

interface SigninArgs {
    credentials: {
        email: string;
        password: string;
    };
}

interface UserPayload {
    userErrors: { message: string }[];
    token: string | null;
}

export const Mutation = {
    postCreate: async (_: any, { post }: PostArgs, { prisma, userInfo }: Context): Promise<PostPayloadType> => {
        if (!userInfo) return { userErrors: [{ message: "Forbidden access (unauthenticated)"}], post: null };
        const { title, content } = post;
        if (!title || !content) {
            return { userErrors: [{message: "You must provide title and content"}], post: null };
        }
        return {userErrors: [], post: prisma.post.create({ data:{ title, content, authorId: userInfo.userId }})}
    },
    postUpdate: async (_: any, { post, postId }: {postId: string, post: PostArgs["post"]}, { prisma, userInfo }: Context): Promise<PostPayloadType> => {
        if (!userInfo) return { userErrors: [{ message: "Forbidden access (unauthenticated)"}], post: null };
        const error = await userUpdatePost({ userId: userInfo.userId, postId: Number(postId), prisma });
        if (error) return error;
        const { title, content } = post;
        if(!title && !content){
            return {
                userErrors: [{ message: "Atleast one field required"}],
                post: null
            }
        }
        const existingPost = await prisma.post.findUnique({
            where: { id: Number(postId)},
        });

        if (!existingPost) {
            return {
                userErrors: [{ message: "Post does not exist"}],
                post: null
            };
        }
        let payloadToUpdate = { title, content};
        if (!title) delete payloadToUpdate.title;
        if (!content) delete payloadToUpdate.content;

        return {
            userErrors: [],
            post: prisma.post.update({
                data: { ...payloadToUpdate },
                where: { id: Number(postId) },
            }),
        };
    },
    postDelete: async (_: any, { postId }: { postId: string }, { prisma, userInfo }: Context): Promise<PostPayloadType> => {
        if (!userInfo) return { userErrors: [{ message: "Forbidden access (unauthenticated)"}], post: null };
        const error = await userUpdatePost({ userId: userInfo.userId, postId: Number(postId), prisma });
        if (error) return error;
        const post = await prisma.post.findUnique({ where: { id: Number(postId)} });
        if (!post) {
            return { userErrors: [{ message: "Post does not exist" }], post: null };
        }
        await prisma.post.delete({
            where: {
                id: Number(postId),
            },
        });

        return { userErrors: [], post };
    },
    postPublish: async (_: any, { postId }: { postId: string }, { prisma, userInfo }: Context): Promise<PostPayloadType> => {
        if (!userInfo) return { userErrors: [{ message: "Forbidden access (unauthenticated)"}], post: null };
        const error = await userUpdatePost({ userId: userInfo.userId, postId: Number(postId), prisma });
        if (error) return error;
        return { userErrors: [], post: prisma.post.update({
            where: { id: Number(postId) },
            data: { published: true }
        })};
    },
    postUnPublish: async (_: any, { postId }: { postId: string }, { prisma, userInfo }: Context): Promise<PostPayloadType> => {
        if (!userInfo) return { userErrors: [{ message: "Forbidden access (unauthenticated)"}], post: null };
        const error = await userUpdatePost({ userId: userInfo.userId, postId: Number(postId), prisma });
        if (error) return error;
        return { userErrors: [], post: prisma.post.update({
            where: { id: Number(postId) },
            data: { published: false }
        })};
    },
    signup: async (_: any, { credentials, name, bio }: SignupArgs, { prisma }: Context): Promise<UserPayload> => {
        const { email, password } = credentials;
        const isEmail = validator.isEmail(email);
        if (!isEmail) return { userErrors: [{ message: "Email Invalid"}], token: null};
        const isValidPassword = validator.isLength(password, { min: 5 });
        if (!isValidPassword) return { userErrors: [{ message: "Minimum 5 length is required"}], token: null};
        if (!name || !bio) return { userErrors: [{ message: "Bio or name invalid"}], token: null};
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: { email, name, password: hashedPassword }} );
        await prisma.profile.create({ data: { bio, userId: user.id }});
        return {userErrors: [], token: JWT.sign({ userId: user.id }, JWT_SIGNATURE, { expiresIn: 3600 })}
    },
    signin: async (_: any, { credentials }: SigninArgs, { prisma }: Context): Promise<UserPayload> => {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return { userErrors: [{ message: "Invalid credentials" }], token: null };
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return { userErrors: [{ message: "Invalid credentials" }], token: null };
        return {userErrors: [], token: JWT.sign({ userId: user.id }, JWT_SIGNATURE, { expiresIn: 3600 })}
    }
}