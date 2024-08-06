import { useState } from "react";
import { updateArticleById } from "../api";
import { useParams } from "react-router-dom";

function Vote({ article }) {
  const [increaseVotes, setIncreaseVotes] = useState(0);
  const { article_id } = useParams();

  const handleUpVote = () => {
    setIncreaseVotes((currVote) => {
      return currVote + 1;
    });
    const vote = 1;
    updateArticleById(article_id, vote)
      .then()
      .catch((err) => {
        setIncreaseVotes((currVote) => {
          return currVote - 1;
        });
      });
  };

  const handleDownVote = () => {
    setIncreaseVotes((currVote) => {
      return currVote - 1;
    });
    const vote = -1;
    updateArticleById(article_id, vote)
      .then()
      .catch((err) => {
        setIncreaseVotes((currVote) => {
          return currVote + 1;
        });
      });
  };

  return (
    <div>
      <div onClick={handleUpVote} className="badge badge-primary">
        👍
      </div>
      <div className="badge badge-outline">
        ❤️ {article.votes + increaseVotes}
      </div>
      <div onClick={handleDownVote} className="badge badge-primary">
        👎
      </div>
    </div>
  );
}

export default Vote;
