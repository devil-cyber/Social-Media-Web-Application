{                //Method to submit form data by ajax
  let createPost=function(){
      let newPostForm=$('#new-post-form');

      newPostForm.submit(function(e){
          e.preventDefault();
          $.ajax({
              type:'post',
              url:'/post/create',
              data:newPostForm.serialize(),
              success: function(data){
            let newPost=newPostDom(data.data.post);
            $('#post-list-container>ul').prepend(newPost);
            deletePost($('.delete-post',newPost));
              },error:function(error){
                  console.log(error.responseText);
              }
          });
});
  }

  let newPostDom=function(post){
      return $(`<li id="post-${post.id}"style="border-bottom:1px solid grey;background-color: whitesmoke;height:200px;width:250px;padding:4px;">
            <p>
                
                    
                   
                        <small style="color:blue;margin-bottom: 5px;text-align: left;font-size: 1.1rem;">${post.user.name}</small>
                        <small>
                            <a class="delete-post"style="color:red;" href="/post/destroy_post/${post._id}">X</a>
                        </small>
                        <br>
                        <span id="post-style">
                        ${post.content}
                        <hr>
                    </span>
    
            </p>
                <form id="comment-form" action="/comment/create" method="POST">
    
                    <input  style="width:130px;border-radius: 4px;padding:2px;"type="text" name="content" placeholder="comment" required >
                    <input type="hidden" name="post" value="${post._id}" />
                    <input style="border-radius: 2px;padding:2px;"type="submit" value="comment">
                </form>
    
        </li>
    
        `)
  }
let deletePost=function(deleteLink){
    console.log("HEllo");
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.post_id}`).remove();

            },error:function(error){
                console.log(error.responseText);
            }
        });
    });
}

  createPost()
}