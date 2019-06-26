$(function () {
    $.ajax({
        url:"/GetUserInfoServlet",
        type:"post",
        async:false,
        dataType:"json",
        success:function (result) {
            $("#img1").attr("src", result[0].u_image)
        }
    })
})