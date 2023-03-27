import { patchComment } from "./ApiCalls";

export const VoteComment = (
  comment_id,
  increment,
  username,
  permission,
  voteCounter,
  setVoteCounter,
  voteHistory,
  setVoteHistory
) => {
  if (permission) {
    if (voteHistory.includes(username)) {
      alert(`Sorry ${username} you have already votes on this article`);
    } else {
      setVoteCounter(voteCounter + increment);
      setVoteHistory(...voteHistory, username);
      alert("Thank you for voting!");
      patchComment(comment_id, increment, username).catch((err) => {
        console.log(err);
        setVoteCounter(voteCounter);
        setVoteHistory(voteHistory);
        alert("Sorry we couldn't process your vote");
      });
    }
  } else {
    alert("Sorry you must be logged in to vote");
  }
};
