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
              },error:function(error){
                  console.log(error.responseText);
              }
          });
});
  }

  let newPostDom=function(posts){
      return $(`<li id="post-${posts.id}"style="border-bottom:1px solid grey;background-color: whitesmoke;height:200px;width:250px;padding:4px;">
            <p>
                
                    
                   
                        <small style="color:blue;margin-bottom: 5px;text-align: left;font-size: 1.1rem;">${posts.user.name}</small>
                        <small>
                            <a class="delete-post"style="color:red;" href="/post/destroy_post/${posts.id}">X</a>
                        </small>
                        <br>
                        <span id="post-style">
                        ${posts.content}
                        <hr>
                    </span>
    
            </p>
                <form id="comment-form" action="/comment/create" method="POST">
    
                    <input  style="width:130px;border-radius: 4px;padding:2px;"type="text" name="content" placeholder="comment" required >
                    <input type="hidden" name="post" value="${posts._id}" />
                    <input style="border-radius: 2px;padding:2px;"type="submit" value="comment">
                </form>
    
        </li>
    
        `)
  }


  createPost()
}