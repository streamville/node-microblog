// when keyboard is released and how submitBtn reacts.
$("#postTextarea").keyup(event => {
  var textbox = $(event.target);
  var value = textbox.val().trim();
  
  var submitBtn = $("#submitPostBtn");

  if(submitBtn.length == 0) return alert("No submit button found");

  if(value == ""){
    submitBtn.prop("disabled", true);
    return;
  }
    submitBtn.prop("disabled", false);
})

// for the submit button
$("#submitPostBtn").click(() => {
  var button = $(event.target);
  var textbox = $("#postTextarea");

  var data = {
    content: textbox.val()
  }

  $.post("/api/posts", data, postData => {
    
    var html = createPostHtml(postData);
    $(".postContainer").prepend(html);
    textbox.val("");
    button.prop("disabled", true);
  })
})

// rendering posts container on the feed.
function createPostHtml(postData){
  var postedBy = postData.postedBy;
  var displayName = postedBy.firstName + " " + postedBy.lastName;
  var timeStamp = postData.createdAt;

  return `<div class="post">
    <div class="mainContentContainer">
      <div class="userImageContainer">
        <img src="${postedBy.profilePic}">
      </div>

        <div class="postContentContainer">
          <div class="header">
            <a href='/profile/${postedBy.username}' class="displayName">${displayName}</a>
            <span class="username">@${postedBy.username}</span>
            <span class="date">${timeStamp}</span>
          </div> 

          <div class="postBody">
            <span>${postData.content}</span>
          </div>

          <div class="postFooter">
            <div class="postBtnContainer">
              <button>
                <i class="far fa-comment"></i>
              </button>
            </div>
            <div class="postBtnContainer">
              <button>
                <i class="fas fa-retweet"></i>
              </button>
            </div>
            <div class="postBtnContainer">
              <button>
                <i class="far fa-heart"></i>
              </button>
            </div>
          </div>

        </div>
    </div>
  </div>`;
}