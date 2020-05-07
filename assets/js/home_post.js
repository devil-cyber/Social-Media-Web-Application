{                //Method to submit form data by ajax
  let createPost=function(){
      let newPostForm=$('#new-post-form');

      newPostForm.submit(function(e){
          e.preventDefault();
          e.stopPropagation();
          $.ajax({
              type:'post',
              url:'/post/create',
              data:newPostForm.serialize(),
              success: function(data){
            let newPost=newPostDom(data.data.post);
            $('#post-list-container>ul').prepend(newPost);
            $('#user-name').text(data.data.user_data)
            console.log(data.data.user_data);
            new Noty({
                theme: 'relax',
                text: 'Post Created',
                type:"success",
                layout:'topRight',
                timeout:1500
            }).show();
            deletePost($('.delete-post',newPost));
              },error:function(error){
                  console.log(error.responseText);
              }
          });
});
  }

  let newPostDom=function(post){
      return $(`<li id="post-${post._id}">
      <small style="color:steelblue;font-size: 1.1rem;;" id="user-name">${post.user.name}</small>
                 <small>
                     <a class="delete-post"style="color:red;" href="/post/destroy_post/${post._id}">X</a>
                 </small>
                 <br>
                 <span style="color: lightsalmon;"id="post-style">
                 ${post.content}
                 
             </span>
         <form  action="/comment/create" id="new-comment-form" method="POST">

             <input  style="width:130px;border-radius: 4px;padding:2px;"type="text" name="content" placeholder="comment" required >
             <input type="hidden" name="post" value=${post._id}>
             <input style="border-radius: 2px;padding:2px;" type="submit" value="comment">
         </form>

 </li>`)
  }
let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.post_id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: 'Post Deleted',
                    type:"success",
                    layout:'topRight',
                    timeout:1500
                }).show();

            },error:function(error){
                console.log(error.responseText);
            }
        });
    });
}
let convertPostsToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post', self);
        deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1]
        new PostComments(postId);
    });
}

  createPost()
  convertPostsToAjax()
}