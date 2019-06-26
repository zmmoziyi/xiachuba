$(function () {
    //全局变量，存储步骤数
    var stepNum = 1;

    //删除用料
    $("input[title='删除用料']").click(function () {
        if($("table tr").length>1){
            $(this).closest("tr").remove();
        }else{
            layer.msg("到底了，不能再删喽！",{time:1000},function () {
            });
        }
    });

    //追加用料
    var $modelNode=$(".f-table table tr:eq(0)").detach();
    $("input[value='追加一行用料']").click(function () {
        var $cloneNode = $modelNode.clone(true);
        $("table").append($cloneNode);
    });

    //删除步骤
    $("input[title='删除步骤']").click(function () {
        if(stepNum>1){
            var $node=$(this).parent().parent();
            if($node.next() == null){
                $node.remove();
                stepNum-=1;
            }else{
                var $deNumber=$node.detach();
                //  //被删除的节点的编号
                var deleNumber=parseInt($deNumber.children().eq(0).children().eq(0).text());
                // //下一个节点的编号
                //  var nextNumber=deleNumber+1;
                //  //下一个节点的div
                //  var nextdiv=$("h1:contains("+nextNumber+")").parent().parent();
                //  //下一个节点的改变后的编号
                //  nextdiv.children().eq(0).children().eq(0).text(deleNumber);
                var a=stepNum-deleNumber;
                for(var i=1;i<=a;i++){
                    var nextdiv=$("h1:contains("+(deleNumber+1)+")").parent().parent();
                    //下一个节点的改变后的编号
                    // alert(deleNumber);
                    nextdiv.children().eq(0).children().eq(0).text(deleNumber);
                    deleNumber+=1;
                }
                stepNum=deleNumber-1;

            }
        }else{
            layer.msg("到底了，不能再删喽！",{time:1000},function () {
            });
        }
    });

    //追加步骤
    var $model=$(".c-foot-2");
    $("input[value='追加一个步骤']").click(function () {
        stepNum += 1;
        var $cloneNode = $model.clone(true);
        $cloneNode.find("h1").text(stepNum);
        $(".step").append($cloneNode);
    });

    //  文本框获得焦点文字消失
    $(".mean").focus(function(){
        $(this).val('');
    });
})
