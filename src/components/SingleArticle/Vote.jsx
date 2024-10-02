import { useState } from "react";
import { updateArticleById } from "../../api";
import { useParams } from "react-router-dom";

function Vote({ article }) {
  const [increaseVotes, setIncreaseVotes] = useState(0);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const [disabled, setDisabled] = useState(false);

  const handleVote = (change) => {
    setIncreaseVotes((currVote) => currVote + change);
    setError(null);
    setDisabled(true);
    updateArticleById(article_id, change).catch((error) => {
      setIncreaseVotes((currVote) => currVote - change);
      setDisabled(false);
      setError("Your like was not successful. Please try again!");
    });
  };

  return (
    <div className="space-x-2">
      <button
        onClick={() => handleVote(1)}
        className="badge badge-lg badge-primary"
        disabled={disabled}
      >
        👍
      </button>
      <div className="badge badge-lg badge-outline gap-2">
        ❤️ {article.votes + increaseVotes}
      </div>
      <button
        onClick={() => handleVote(-1)}
        className="badge badge-lg badge-primary gap-2"
        disabled={disabled}
      >
        👎
      </button>
      <div>
        {error ? (
          <div className="text-red-500 text-sm text-center">⚠️ {error}</div>
        ) : null}
      </div>
    </div>
  );
}

export default Vote;
