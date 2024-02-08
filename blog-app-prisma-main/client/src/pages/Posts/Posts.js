import React from "react";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user{
        name
      }
    }
  }
`

export default function Posts() {
  const { data, error, loading } = useQuery(GET_POSTS);
  if(error) return <h1>Error Page</h1>
  if(loading) return <h1>Loading...</h1>
  const { posts } = data;
  
  return <div>
    {posts.map(post => (
      <Post key={post.id} title={post.title} content={post.content} date={post.createdAt} id={post.id} user={post.user.name}
      />))}
  </div>;
}
