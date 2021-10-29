function getMessageInfo(){
    $.ajax({
        url:"http://129.151.103.52:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(ans){
            console.log(ans);
            $("#resultado").empty();
            showMessageAns(ans);
        }
        });

}

function showMessageAns(ans){
    let mytable="<table>";
    mytable+="<td>"+" ID "+"</td>"
    mytable+="<td>"+" MENSAJE "+"</td>"
    for(i=0;i<ans.length;i++){
        mytable+="<tr>";
        mytable+="<td>"+ans[i].id+"</td>";
        mytable+="<td>"+ans[i].messageText+"</td>";
        mytable+="<td> <button onclick='messageDelete("+ans[i].id+")'>Borrar</button></td>";
        mytable+="</tr>";
    }
    mytable+="</table>";
    $("#resultado").html(mytable);

}

function saveMessageInfo(){
    let myData={
        id:$("#id").val(),
        messageText:$("#messageText").val(),
    };

    $.ajax({
        url:"http://129.151.103.52:8080/api/Message/save",
        type:"POST",
        contentType: "application/json; charset=utf-8",
        datatype:"JSON",
        data: JSON.stringify(myData),
        success:function(ans){
            console.log(ans);
            console.log("Se Guardó Correctamente");
            alert("Se Guardó Correctamente")
            $("#resultado").empty();
            $("#id").val("");
            $("#messageText").val("");
        },

        error: function(jqXHR, textStatus, errorThrown){
            window.location.reload()
            alert("No Se Guardó Correctamente");
        }
        });
}

function editMessage(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#messagetext").val(),
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            getMessageInfo();
            alert("Se Actualizó Correctamente")
        }
        });
}

function messageDelete(idElemento){
    let myData={
        id:idElemento
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.103.52:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(ans){
            $("#resultado").empty();
            getMessageInfo();
            alert("Se Eliminó Correctamente")
        }
        });
}
