import { patchArticle, patchComment } from "./ApiCalls";

export const Vote = (
  target,
  targetId,
  increment,
  permission,
  username,
  voteCounter,
  setVoteCounter,
  voteHistory,
  setVoteHistory
) => {
  let patchFunc;

  switch (target) {
    case "article":
      patchFunc = patchArticle;
      break;
    case "comment":
      patchFunc = patchComment;
      break;
    default:
      patchFunc = () => {};
  }

  if (permission) {
    if (voteHistory.includes(username)) {
      alert(`Sorry ${username} you have already voted on this comment`);
    } else {
      setVoteCounter(voteCounter + increment);
      setVoteHistory(...voteHistory, username);
      alert("Thank you for voting!");
      patchFunc(targetId, increment, username).catch((err) => {
        setVoteCounter(voteCounter);
        setVoteHistory(voteHistory);
        alert("Sorry we couldn't process your vote");
      });
    }
  } else {
    alert("Sorry you must be logged in to vote");
  }
};
