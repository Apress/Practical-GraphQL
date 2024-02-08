import "./Post.css";
import { gql, useMutation } from "@apollo/client";

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId){
      userErrors{
        message
      }
      post {
        title
      }
    }
  }
`

const UNPUBLISH_POST = gql`
  mutation UnPublishPost($postId: ID!) {
    postUnPublish(postId: $postId){
      userErrors{
        message
      }
      post {
        title
      }
    }
  }
`

const Post = ({ title, content, date, user, published, isMyProfile, id }) => {
  const [publishPost, { data, loading }] = useMutation(PUBLISH_POST);
  const [unPublishPost, { data: unData, loading: unLoading }] = useMutation(UNPUBLISH_POST);
  const formatedDate = new Date(Number(date));
  return (
    <div className="post" style={published === false ? { backgroundColor: 'yellow' }: {}}>
      {isMyProfile && published === false && <button onClick={() => publishPost({ variables: { postId: id }})} className="post__btn">Publish</button>}
      {isMyProfile && published && <button onClick={() => unPublishPost({ variables: { postId: id }})}className="post__btn">Unpublish</button>}
      <div className="post__header">
        <h3>{title}</h3>
        <h4>Created At {`${formatedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}{user}</h4>
      </div>
      <p>{content}</p>
    </div>
  );
}

export default Post