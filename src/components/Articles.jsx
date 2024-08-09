import { useEffect, useState } from "react";
import { getArticles } from "../api";
import { useNavigate, useSearchParams, Link} from "react-router-dom";
import dateFormat from 'dateformat';
import Loading from "./Loading";
import Topics from "./Topics";


function Articles() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const [topicInput, setTopicInput] = useState("")
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery =searchParams.get("sort_by")
  const orderQuery=searchParams.get("order")

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
      topic: topicInput || null
    }).then((data) => {
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
    return <Loading/>
  }

  return (
    <>
    <Topics setTopicInput={setTopicInput}/>
    <section className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-primary">
        Sort By
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-30 p-2 shadow"
      >
        <li onClick={() => setSort("author")} key="sort_author">
          author
        </li>
        <li onClick={() => setSort("created_at")} key="sort_created_at">
          date posted
        </li>
        <li onClick={() => setSort("title")} key="sort_title">
          title
        </li>
        <li onClick={() => setSort("topic")} key="sort_topic">
          topic
        </li>
        <li onClick={() => setSort("votes")} key="sort_votes">
          votes
        </li>
        <Link to="/">
          <li onClick={() => setSort(null)} key="clear sort">
            clear
          </li>
        </Link>
      </ul>
      <button className="btn btn-primary">
        <label className="swap">
          <input type="checkbox" />
          <div className="swap-on" onClick={() => setOrder("DESC")}>⬇️ Descending</div>
          <div className="swap-off" onClick={() => setOrder("ASC")}>⬆️ Ascending</div>
        </label>
      </button>
      </section>
      {error ? (
          <div className="badge badge-error gap-2">⚠️ {error}</div>
        ) : null}
    <ul className="container mx-auto grid gap-[50px] grid-cols-1">
      {articleList.map((article) => {
        const date =dateFormat(article.created_at,"DDDD mmm dd yyyy h:MM TT")
        return (
              <li className="card bg-base-100 w-150 shadow-xl" key={article.article_id}>
                <article className="card-body">
                  <h2 className="card-title">{article.title}</h2>
                  <h3>{article.author}</h3>
                  <h3>{date}</h3>
                  <div className="card-actions justify-start">
                    <div className="badge badge-secondary">{article.topic}</div>
                  </div>
                  <section className="card-actions justify-start">
                  <div className="badge badge-outline">
                      🗨️ {article.comment_count}
                    </div>
                    <div className="badge badge-outline">
                      ❤️ {article.votes}
                    </div>
                  </section>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={()=>navigate(`/${article.article_id}`)}>Read More</button>
                  </div>
                </article>
              </li>
        );
      })}
    </ul>
    </>
  );
}

export default Articles;
