import axios from "../modules/axios";
import {
  listenInactiveHeartEvent,
  listenActiveHeartEvent,
} from "../modules/handle_heart";

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $(".active-heart").removeClass("hidden");
  } else {
    $(".inactive-heart").removeClass("hidden");
  }
};

const handleCommentForm = () => {
  $(".show-comment-form").on("click", () => {
    $(".show-comment-form").addClass("hidden");
    $(".comment-text-area").removeClass("hidden");
  });
};

const appendNewComment = (comment) => {
  $(".comments-container").append(
    `<div class="article_comment"><p>${escape(comment.content)}</p></div>`
  );
};

document.addEventListener("turbo:load", () => {
  const dataset = $("#article-show").data();
  const articleId = dataset.articleId;

  axios.get(`/api/articles/${articleId}/comments`).then((response) => {
    const comments = response.data;

    comments.forEach((comment) => {
      appendNewComment(comment);
    });
  });

  handleCommentForm();

  $(".add-comment-button").on("click", () => {
    const content = $("#comment_content").val();

    if (!content) {
      window.alert("コメントを入力してください");
    } else {
      axios
        .post(`/api/articles/${articleId}/comments`, {
          comment: { content: content },
        })
        .then((response) => {
          const comment = response.data;

          appendNewComment(comment);
          $("#comment_content").val("");
        })
        .catch((e) => {
          window.alert("Error");
          console.log(e);
        });
    }
  });

  axios.get(`/api/articles/${articleId}/like`).then((response) => {
    const hasLiked = response.data.hasLiked;

    handleHeartDisplay(hasLiked);
  });

  listenInactiveHeartEvent(articleId);
  listenActiveHeartEvent(articleId);
});
