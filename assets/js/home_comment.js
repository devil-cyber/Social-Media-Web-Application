{
    let createComment=function(){
        let commentForm=$("#new-comment-form");
        commentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/comment/create',
                data:commentForm.serialize(),
                success:function(data){
                    let commentForm=commentFormDom(data.data.comment);
                    console.log(data.data.comment);
                    $('#comment>ul').prepend(commentForm);
                    new Noty({
                        theme: 'relax',
                        text: 'Comment Created',
                        type:"success",
                        layout:'topRight',
                        timeout:1500
                    }).show();
                    // deletePost($('.delete-comment',commentForm));
                    // console.log(data);
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    let commentFormDom=function(comments){
        return $(`<li style="text-align:left;">
                            <small>
                        <a style="color: red;" href="/comment/destroy_comment/${comment.id}">X</a>
                    </small>
                                <small style="color:blue;text-decoration: underline;font-size: 1.1rem;">
                        ${comments.user.name}
                     </small>
                                ${comments.content}<br>
    
                </li>
        `)
    }
  
    createComment();
}
