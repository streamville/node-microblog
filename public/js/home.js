$(document).ready(()=> {
  $.get("/api/posts", results => {
    
    // .postContainer from home.pug
    outputPosts(results, $(".postContainer"));
    console.log(results);
  })
})

// outputting posts function
function outputPosts(results, container){
  container.html("");

  // loop over results and then output
  // container from common.js
  results.forEach(result => {
    var html = createPostHtml(result)
    container.append(html);
  });

  if(results.length == 0){
    container.append("<span class='noResults'>Nothing to show..</span>")
  }
}