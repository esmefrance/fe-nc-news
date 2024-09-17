import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import { useSearchParams } from "react-router-dom";
import Loading from "../Loading";
import Topics from "./Topics";
import ArticleCard from "./ArticleCard";
import SortDropdown from "./SortDropdown";
import OrderDropdown from "./OrderDropdown";


function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topicInput, setTopicInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const topicQuery = searchParams.get("topic");

  const setOrder = (direction) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", direction);
    setSearchParams(newParams);
  };

  const setSort = (sort) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sort);
    setSearchParams(newParams);
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles({
      sort_by: sortByQuery || null,
      order: orderQuery || null,
      topic: topicInput || topicQuery || null,

    })
      .then((data) => {
        setError(null);
        setArticleList(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Your article query was incorrect. Please try again.");
        setIsLoading(false);
      });
  }, [sortByQuery, orderQuery, topicInput]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section
        id="filter and sort buttons"
        className="space-x-4 p-2 flex justify-center"
      >
        <Topics setTopicInput={setTopicInput} topicQuery={topicQuery} />
        <SortDropdown setSort={setSort} />
        <OrderDropdown setOrder={setOrder} />
      </section>

      {error && (
        <div className="badge badge-lg badge-error gap-2">⚠️ {error}</div>
      )}

      <ul className="container mx-auto grid gap-[50px] grid-cols-1">
        {articleList.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </>
  );
}

export default Articles;
