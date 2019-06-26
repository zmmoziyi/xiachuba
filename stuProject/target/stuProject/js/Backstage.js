
var CurrentUserNum=1;
var CurrentCaipuNum=1;
var CurrentDynamic=1;


var pageSumUser=0;
var pageSumCai=0;
var pageSumDynamic=0;
$(function () {
    // 获取session的值
    $.ajax({
        url:"/GetSessionServlet",
        data:{"userBean":"sessionkey"},
        dataType:"json",
        success:function (ret) {
            if(ret==null){
            }else{
                var picurl = ret.u_image;
                var username = ret.u_name;
                $(".layui-nav-img").attr("src",picurl)
                $(".layui-nav-img").next().html(username);
            }
        }
    });
    // 设置打开默认为User表页面
    $("#User").show();
    showUser();
    showFenYe();
    // 点击用户管理，菜谱管理，和动态管理进行切换
    $(".user").click(function () {
        $("tbody").empty();
        showFenYe();
        $("#a").attr("style","display:block");
        $("#b").attr("style","display:none");
        $("#c").attr("style","display:none");
        $("#Dynamic").hide();
        $("#Caipu").hide();
        $("#User").show();
        showUser();
    });
    $(".caipu").click(function () {
        $("tbody").empty();

        $("a[name='UserNext']").hide();
        $("a[name='DynamicNext']").hide();
        $("a[name='Userprev']").hide();
        $("a[name='Dynamicprev']").hide();

        $("a[name='CaipuNext']").show();
        $("a[name='Caipuprev']").show();
        $("#a").attr("style","display:none");
        $("#b").attr("style","display:block");
        $("#c").attr("style","display:none");
        $("#User").hide();
        $("#Dynamic").hide();
        $("#Caipu").show();
        showCaipu();
    });
    $(".dynamic").click(function () {
        $("tbody").empty();
        $("a[name='UserNext']").hide();
        $("a[name='Userprev']").hide();
        $("a[name='CaipuNext']").hide();
        $("a[name='Caipuprev']").hide();

        $("a[name='Dynamicprev']").show();
        $("a[name='DynamicNext']").show();
        $("#a").attr("style","display:none");
        $("#b").attr("style","display:none");
        $("#c").attr("style","display:block");
        $("#User").hide();
        $("#Caipu").hide();
        $("#Dynamic").show();
        showDynamic();
    });
    // 查询功能实现
    findUserById();
    findCaiPuById();
    findDynamicByid()
    // 添加用户
    insertUser();
    // 删除功能
    deleteUser();
    deleteCaipu();
    deleteDynamic();
    // 下一页
    $("a[name='UserNext']").click(function () {
        var maxUserpage = Math.ceil(pageSumUser/10);
        if(CurrentUserNum<maxUserpage){
            ++CurrentUserNum;
        }else{
            CurrentUserNum=maxUserpage;
            layer.msg("已经是最后一页了",{time:3000});
        }
        $("tbody").empty();
        showUser();

    });
    $("a[name='CaipuNext']").click(function () {
        var maxCaipupage = Math.ceil(pageSumCai/10);
        if(CurrentCaipuNum<maxCaipupage){
            ++CurrentCaipuNum;
        }else{
            CurrentCaipuNum=maxCaipupage;
            layer.msg("已经是最后一页了",{time:3000});
        }
        $("tbody").empty();
        showCaipu();
    })
    $("a[name='DynamicNext']").click(function () {
        var maxDynamicpage = Math.ceil(pageSumDynamic/10);
        if(CurrentDynamic<maxDynamicpage){
            ++CurrentDynamic;
        }else{
            CurrentDynamic=maxDynamicpage;
            layer.msg("已经是最后一页了",{time:3000});
        }
        $("tbody").empty();
        showDynamic();

    })
    // 上一页
    $("a[name='Userprev']").click(function () {
        if(CurrentUserNum==1){
            CurrentUserNum=CurrentUserNum;
            layer.msg("已经是第一页了",{time:3000});
        }else {
            CurrentUserNum--;
        }
        $("tbody").empty();
        showUser();
    });
    $("a[name='Caipuprev']").click(function () {

        if(CurrentCaipuNum==1){
            CurrentCaipuNum=CurrentCaipuNum;
            layer.msg("已经是第一页了",{time:3000});
        }else {
            CurrentCaipuNum--;
        }
        $("tbody").empty();
        showCaipu();
    });
    $("a[name='Dynamicprev']").click(function () {
        if(CurrentDynamic==1){
            CurrentDynamic=CurrentDynamic;
            layer.msg("已经是第一页了",{time:3000});
        }else {
            CurrentDynamic--;
        }
        $("tbody").empty();
        showDynamic();
    });

});

function findDynamicByid() {
    $("button[name='搜索动态']").click(function () {
        $.ajax({
            url:"/findDynamicByIdServlet",
            data:{"id":$("input[name='dynamic']").val()},
            dataType:"json",
            success:function (ret) {
                if(ret.length==0){
                }else{
                    $("#Caipu").hide();
                    $("#User").hide();
                    $("#Dynamic").show();
                    $("tbody").empty();
                    showDynamicx(ret);
                }
            }
        });
    })
}
// 查询菜谱 By id
function findCaiPuById() {
    $("button[name='搜索菜谱']").click(function () {
        $.ajax({
            url:"/findCaipuByIdServlet",
            data:{"id":$("input[name='caipu']").val()},
            dataType:"json",
            success:function (ret) {
                if(ret.length==0){
                }else{
                    $("#Dynamic").hide();
                    $("#User").hide();
                    $("#Caipu").show();
                    $("tbody").empty();
                   showCaipux(ret);
                }
            }
        });
    })
}
// 查询用户 By id
function  findUserById() {
    $("button[name='搜索用户']").click(function () {
        $.ajax({
            url:"/findUserByIdServlet",
            data:{"id":$("input[name='user']").val()},
            dataType:"json",
            success:function (ret) {
                if(ret.length==0){
                }else{
                    $("#Dynamic").hide();
                    $("#Caipu").hide();
                    $("#User").show();
                    $("tbody").empty();
                    showUserx(ret);
                }
            }
        });
    })
}
// 删除动态
function deleteDynamic() {
    $("tbody").on("click","a[name='删除动态']",function (event) {
        var $id = $(this).closest("tr").children().children().val();
        $.ajax({
            url:"/deleteDynamicServlet",
            data:{"did":$id},
            dataType:"text",
            success:function (ret) {
                if(ret==1){
                    layer.msg("删除成功",{time:3000});
                    window.parent.location.reload();
                }else {
                    layer.msg("删除失败",{time:3000});
                }
            }

        })
    });
}
// 删除菜谱
function deleteCaipu() {
    $("tbody").on("click","a[name='删除菜谱']",function (event) {
        var $id = $(this).closest("tr").children().children().val();
        $.ajax({
            url:"/deleteCaipuServlet",
            data:{"cid":$id},
            dataType:"text",
            success:function (ret) {
                if(ret==1){
                    layer.msg("删除成功",{time:3000});
                    window.parent.location.reload();
                }else {
                    layer.msg("删除失败",{time:3000});
                }
            }

        })
    });

}
// 显示菜谱的信息
function showCaipu() {
    $.ajax({
        url: "/showCaipuServlet",
        type: "post",
        data: {"num": CurrentCaipuNum},
        dataType: "json",
        success: function (ret) {
            pageSumCai = ret[ret.length-1];
            for (var i = 0; i < ret.length-1; i++) {
                var $node = $('<tr>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_id + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_name + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_made + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_image + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_step + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_createtime + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_count + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_step_image + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_id + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_introduce + '" style="border: 0px;"></td>\n' +
                    '                        <td>\n' +
                    '                            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" name="添加菜谱">添加</a>\n' +
                    '                            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" name="删除菜谱">删除</a>\n' +
                    '                        </td>\n' +
                    '                    </tr>');
                $("tbody").append($node);
            };
        }
    });
}
function showCaipux(ret) {
    for (var i = 0; i < ret.length; i++) {
        var $node = $('<tr>\n' +
            '                        <td><input type="text" value="' + ret[i].c_id + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].c_name + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].c_made + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].c_image + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].c_step + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].c_createtime + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].c_count + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].c_step_image + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_id + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].c_introduce + '" style="border: 0px;"></td>\n' +
            '                        <td>\n' +
            '                            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" name="添加菜谱">添加</a>\n' +
            '                            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" name="删除菜谱">删除</a>\n' +
            '                        </td>\n' +
            '                    </tr>');
        $("tbody").append($node);
    };
}
// 显示用户的动态
function showDynamic() {
    $.ajax({
        url: "/showDynamicServlet",
        type: "post",
        data: {"num": CurrentDynamic},
        dataType: "json",
        success: function (ret) {
            pageSumDynamic = ret[ret.length-1];
            for (var i = 0; i < ret.length-1; i++) {
                var $node = $('<tr>\n' +
                    '                        <td><input type="text" value="' + ret[i].d_id + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].d_image + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].d_xinde + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].d_createtime + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_id + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].c_id + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].d_id + '" style="border: 0px;"></td>\n' +
                    '                        <td>\n' +
                    '                            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" name="删除动态">删除</a>\n' +
                    '                        </td>\n' +
                    '                    </tr>');
                $("tbody").append($node);
            }
            ;
        }
    });
}
function showDynamicx(ret) {
    for (var i = 0; i < ret.length; i++) {
        var $node = $('<tr>\n' +
            '                        <td><input type="text" value="' + ret[i].d_id + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].d_image + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].d_xinde + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].d_createtime + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_id + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].c_id + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].d_id + '" style="border: 0px;"></td>\n' +
            '                        <td>\n' +
            '                            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" name="删除动态">删除</a>\n' +
            '                        </td>\n' +
            '                    </tr>');
        $("tbody").append($node);
    }
    ;
}
// 修改用户信息  未完成
// function updateUser() {
//     $("tbody").on("click","td a:nth-child(1)",function (event) {
//         var $name= $(this).closest("tr").children().children().eq(1).val();
//         var $password= $(this).closest("tr").children().children().eq(2).val();
//         var $sex= $(this).closest("tr").children().children().eq(3).val();
//         var $birthday= $(this).closest("tr").children().children().eq(4).val();
//         var $hometown= $(this).closest("tr").children().children().eq(5).val();
//         var $newlive= $(this).closest("tr").children().children().eq(6).val();
//         var $job= $(this).closest("tr").children().children().eq(7).val();
//         var $email= $(this).closest("tr").children().children().eq(8).val();
//         var $image= $(this).closest("tr").children().children().eq(9).val();
//         var $phone= $(this).closest("tr").children().children().eq(10).val();
//         var $introduce= $(this).closest("tr").children().children().eq(11).val();
//         $.ajax({
//             url:"/updateUserServlet",
//             data:{"name":$name,"password":$password,"sex":$sex,"birthday":$birthday,
//                 "hometown":$hometown,"newlive":$newlive,"job":$job,"email":$email,"image":$image,"phone":$phone
//                 ,"introduce":$introduce},
//             dataType:"text",
//             success:function (ret) {
//                 if(ret==1){
//                     alert("修改完成");
//                 }else{
//                     alert("修改失败");
//                 }
//
//             }
//         })
//     });
// }
// 增加用户
function insertUser() {
    $("tbody").on("click","a[name='添加用户']",function (event) {
        layer.open({
            title: false,
            type: 2,
            closeBtn: 1, //不显示关闭按钮
            shade: [0],
            area: ['260px','425px'],
            // offset: 'auto',
            anim: 1,
            content: ['BackinsertUser.html', 'no'],
        });
    });
}
// 删除用户信息
function deleteUser() {
    $("tbody").on("click","a[name='删除用户']",function (event) {
        var $id = $(this).closest("tr").children().children().val();
        $.ajax({
            url: "/deleteUserInfoServlet",
            type: "post",
            data: {"userid": $id},
            dataType: "text",
            success: function (ret) {
                if (ret == 1) {
                    layer.msg("删除成功",{time:3000});
                    location.reload();
                } else {
                    layer.msg("删除失败",{time:3000});
                }
            }
        });
    });
}
// 显示用户的信息
function showUser() {
    $.ajax({
        url: "/showAllUserInfoServlet",
        type: "post",
        data: {"num": CurrentUserNum},
        dataType: "json",
        success: function (ret) {
            pageSumUser=ret[ret.length-1];
            for (var i = 0; i < ret.length-1; i++) {
                var $node = $('<tr>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_id + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_name + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_password + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_sex + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_birthday + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_hometown + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_nowlive + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_job + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_email + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_image + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_phone + '" style="border: 0px;"></td>\n' +
                    '                        <td><input type="text" value="' + ret[i].u_introduce + '" style="border: 0px;"></td>\n' +
                    '                        <td>\n' +
                    '                            <a class="layui-btn layui-btn-xs" lay-event="del" name="修改用户">修改</a>\n' +
                    '                            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" name="删除用户">删除</a>\n' +
                    '                            <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="del" name="添加用户">添加</a>\n' +
                    '                        </td>\n' +
                    '                    </tr>');
                $("tbody").append($node);
            };
        }
    });
}
function showUserx(ret) {
    for (var i = 0; i < ret.length; i++) {
        var $node = $('<tr>\n' +
            '                        <td><input type="text" value="' + ret[i].u_id + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_name + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_password + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_sex + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_birthday + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_hometown + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_nowlive + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_job + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_email + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_image + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_phone + '" style="border: 0px;"></td>\n' +
            '                        <td><input type="text" value="' + ret[i].u_introduce + '" style="border: 0px;"></td>\n' +
            '                        <td>\n' +
            '                            <a class="layui-btn layui-btn-xs" lay-event="del" name="修改用户">修改</a>\n' +
            '                            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" name="删除用户">删除</a>\n' +
            '                            <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="del" name="添加用户">添加</a>\n' +
            '                        </td>\n' +
            '                    </tr>');
        $("tbody").append($node);
    };
}
// 分页控制
function showFenYe(){
    $("a[name='DynamicNext']").hide();
    $("a[name='CaipuNext']").hide();
    $("a[name='Caipuprev']").hide();
    $("a[name='DynamicNext']").hide();
    // 显示上下页
    $("a[name='Userprev']").show();
    $("a[name='UserNext']").show();
}




