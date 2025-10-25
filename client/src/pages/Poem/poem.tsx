import { useLocation, useParams } from "react-router-dom";
import { GET_POEM } from "./poem.graphql";
import { useQuery } from "@apollo/client/react";
import PoemDetail from "../../components/PoemDetail/poem-detail";
import { Layout } from "../../components";
import QueryResult from "../../components/query-result";
import ScrollContainer from "../../components/ScrollContainer/scroll-container";
import CommentsSection from "../../components/CommentsSection/comments-section";
import ComposeCommentForm from "../../containers/ComposeCommentForm/compose-comment-form";
import type { GetPoemQuery, GetPoemQueryVariables } from "../../__generated__/graphql";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/use-auth";
import { NetworkStatus } from "@apollo/client";


const Poem = () => {
  const { poemId = "" } = useParams();
  const [displayCommentForm, setDisplayCommentForm] = useState<boolean>(true);
  const { loading, error, data, fetchMore, networkStatus } = useQuery<GetPoemQuery, GetPoemQueryVariables>(GET_POEM, {
    variables: { poemId, commentsLimit: 5 },
  });
  const { user } = useAuth();

  const composeCommentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#composeComment" && composeCommentRef.current && !loading) {
      composeCommentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location, loading])

  const handleIntersect = () => {
    if (data?.poem?.comments?.pageInfo?.hasNextPage) {
      fetchMore({ variables: { commentsLimit: data.poem.comments.pageInfo.pageSize, commentsCursor: data.poem.comments.pageInfo.endCursor}})
    }
  };

  const handleDisplayCommentForm = () => {
    setDisplayCommentForm(!displayCommentForm);
  }

  const isLoading = networkStatus === NetworkStatus.fetchMore;

  return (
    <Layout>
      <ScrollContainer onIntersect={handleIntersect}>
        <QueryResult loading={loading} error={error} data={data}>
          <PoemDetail poem={data?.poem} onCommentButtonClick={handleDisplayCommentForm} />
          {user && displayCommentForm && poemId ? <ComposeCommentForm ref={composeCommentRef} poemId={poemId} /> : null}
          <CommentsSection comments={data?.poem?.comments} isLoading={isLoading} pageSize={data?.poem?.comments?.pageInfo?.pageSize} />
        </QueryResult>
      </ScrollContainer>
    </Layout>
  );
};

export default Poem;
