$(document).ready(function(){
    eventos();
});

function eventos(){
    $("#btnTablas").on("click", function(){
        tablas();
    });
    $("#btnTenant").on("click", function(){
        variablesTenant();
    });
    $("#btnBureau").on("click", function(){
        variablesBureau();
    });
    $("#btnArboles").on("click", function(){
        arboles();
    });
    $("#btnFunciones").on("click", function(){
        funciones();
    });
}

function cargaArchivos(){
    $("form#data").submit();
}

function tablas(){
    $.ajax({
        method: "POST",
        url: "IndexServlet1",
        data: {accion: 1, 
               rutaXML: $("#rutaXML").val()},
        dataType: "json",
        success: function(d) {
            var a;
            $("#divVariables").html("");
            $("#divTablas").html("");
            $("#divArboles").html("");
            $("#divFunciones").html("");
            $.each(d, function(index, item) {
                $("#divTablas").append("<h1>" + item[0] + "</h1>");
                a = "<table class='display nowrap datatable'>";
                a += "<thead><tr>";
                for (i = 0; i < item[2]; i++) {
                    a += "<th>If</th>";
                }
                for (i = 0; i < item[3]; i++) {
                    a += "<th>Then</th>";
                }
                a += "</tr></thead><tbody>";
                $.each(item[1], function(index1, item1) {
                    a += "<tr>";
                    $.each(item1, function(index2, item2) {
                        a += "<td>" + item2 + "</td>";
                    });
                    a += "</tr>";
                });
                a += "</tbody></table></br>";
                $("#divTablas").append(a);
            });
            $('.datatable').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        },
        error: function(d) {
            alert("Error");
        }
    });
}

function variablesTenant(){
    $.ajax({
        method: "POST",
        url: "IndexServlet1",
        data: {accion: 2, 
               rutaXML: $("#rutaXML").val()},
        dataType: "json",
        success: function(d) {
            var a;
            $("#divVariables").html("");
            $("#divTablas").html("");
            $("#divArboles").html("");
            $("#divFunciones").html("");
            $("#divVariables").append("<h1>Variables de la estrategia</h1>");
            a = "<table class='display nowrap datatable'>";
            a += "<thead><tr>\
                    <th>Nombre comercial</th>\
                    <th>Alias</th>\
                    <th>Tipo de dato</th>\
                    <th>Repuesta personalizada</th>\
                  </tr></thead><tbody>";
            $.each(d[0], function(index, item) {
                a += "<tr>";
                $.each(item, function(index1, item1) {
                    a += "<td>" + item1 + "</td>";
                });
                a += "</tr>";
            });
            a += "</tbody></table></br>";
            a += "<h1>Variables de formulario</h1>";
            a += "<table class='display nowrap datatable'>";
            a += "<thead><tr>\
                    <th>Nombre comercial</th>\
                    <th>Código para este elemento</th>\
                    <th>Texto a mostrar</th>\
                    <th>Tipo de dato</th>\
                    <th>Longitud</th>\
                    <th>Display Name</th>\
                  </tr></thead><tbody>";
            $.each(d[1], function(index, item) {
                a += "<tr>";
                $.each(item, function(index1, item1) {
                    a += "<td>" + item1 + "</td>";
                });
                a += "</tr>";
            });
            a += "</tbody></table></br>";
            $("#divTablas").append(a);
            $('.datatable').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        },
        error: function(d) {
            alert("Error");
        }
    });
}

function variablesBureau(){
    $.ajax({
        method: "POST",
        url: "IndexServlet1",
        data: {accion: 3, 
               rutaXML: $("#rutaXML").val()},
        dataType: "json",
        success: function(d) {
            var a;
            $("#divVariables").html("");
            $("#divTablas").html("");
            $("#divArboles").html("");
            $("#divFunciones").html("");
            $("#divVariables").append("<h1>Variables bureau</h1>");
            a = "<table class='display nowrap datatable'>";
            a += "<thead><tr>\
                    <th>Display</th>\
                    <th>Nombre de característica</th>\
                    <th>Grupo</th>\
                    <th>Subgrupo</th>\
                  </tr></thead><tbody>";
            $.each(d[0], function(index, item) {
                a += "<tr>";
                $.each(item, function(index1, item1) {
                    a += "<td>" + item1 + "</td>";
                });
                a += "</tr>";
            });
            a += "</tbody></table></br>";
            a += "<h1>Score bureau</h1>";
            a += "<table class='display nowrap datatable'>";
            a += "<thead><tr>\
                    <th>Display</th>\
                    <th>Nombre de score</th>\
                    <th>Grupo</th>\
                    <th>Subgrupo</th>\
                  </tr></thead><tbody>";
            $.each(d[1], function(index, item) {
                a += "<tr>";
                $.each(item, function(index1, item1) {
                    a += "<td>" + item1 + "</td>";
                });
                a += "</tr>";
            });
            a += "</tbody></table></br>";
            $("#divTablas").append(a);
            $('.datatable').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        },
        error: function(d) {
            alert("Error");
        }
    });
}

function arboles(){
    $.ajax({
        method: "POST",
        url: "IndexServlet1",
        data: {accion: 4, 
               rutaXML: $("#rutaXML").val()},
        dataType: "json",
        success: function(d) {
            $("#divVariables").html("");
            $("#divTablas").html("");
            $("#divFunciones").html("");
            $("#divArboles").html("");
            var lista1;
            var lista2;
            var lista3;
            var lista4;
            var lista5;
            var lista6;
            var lista7;
            var lista8;
            var lista9;
            var lista10;
            var lista11;
            var lista12;
            var lista13;
            var lista14;
            var lista15;
            var lista16;
            var lista17;
            var lista18;
            var lista19;
            var lista20;
            var padre1;
            var padre2;
            var padre3;
            var padre4;
            var padre5;
            var padre6;
            var padre7;
            var padre8;
            var padre9;
            var padre10;
            var padre11;
            var padre12;
            var padre13;
            var padre14;
            var padre15;
            var padre16;
            var padre17;
            var padre18;
            var padre19;
            var padre20;
            $.each(d, function(index, item){
                //$("#divArboles").append("<h1>" + item[0] + "</h1>");
                $("#divArboles").append(item[0]);
                $("#divArboles").append("<ul></ul>");
                $("#divArboles").children().eq(index).append("<li></li>");
                $.each(item, function(index1, item1){
                    if(item[index1][1] === "true"){
                        lista1 = $("#divArboles").children().eq(index).children().eq(0);
                        lista1.append("<a href='#'>" + item[index1][2] + "</a>");
                        lista1.append("<ul></ul>");
                        $.each(item[index1][3], function(index2, item2){
                            lista1.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                        });
                        padre1 = item[index1][0];
                    }else{
                        if(item[index1][1] === padre1){
                            padre2 = item[index1][0];
                            lista1.children().eq(1).append("<li class='hijo1"+padre2+"'></li>");
                            lista2 = lista1.children().find("li.hijo1"+padre2);
                            lista2.append("<a href='#'>" + item[index1][2] + "</a>");
                            lista2.append("<ul></ul>");
                            $.each(item[index1][3], function(index2, item2){
                                lista2.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                            });
                        }else{
                            if(item[index1][1] === padre2){
                                padre3 = item[index1][0];
                                lista2.children().eq(1).append("<li class='hijo2"+padre3+"'></li>");
                                lista3 = lista2.find("li.hijo2"+padre3);
                                lista3.append("<a href='#'>" + item[index1][2] + "</a>");
                                lista3.append("<ul></ul>");
                                $.each(item[index1][3], function(index2, item2){
                                    lista3.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                });
                            }else{
                                if(item[index1][1] === padre3){
                                    padre4 = item[index1][0];
                                    lista3.children().eq(1).append("<li class='hijo3"+padre4+"'></li>");
                                    lista4 = lista3.find("li.hijo3"+padre4);
                                    lista4.append("<a href='#'>" + item[index1][2] + "</a>");
                                    lista4.append("<ul></ul>");
                                    $.each(item[index1][3], function(index2, item2){
                                        lista4.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                    });
                                }else{
                                    if(item[index1][1] === padre4){
                                        padre5 = item[index1][0];
                                        lista4.children().eq(1).append("<li class='hijo4"+padre5+"'></li>");
                                        lista5 = lista4.find("li.hijo4"+padre5);
                                        lista5.append("<a href='#'>" + item[index1][2] + "</a>");
                                        lista5.append("<ul></ul>");
                                        $.each(item[index1][3], function(index2, item2){
                                            lista5.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                        });
                                    }else{
                                        if(item[index1][1] === padre5){
                                            padre6 = item[index1][0];
                                            lista5.children().eq(1).append("<li class='hijo5"+padre6+"'></li>");
                                            lista6 = lista5.find("li.hijo5"+padre6);
                                            lista6.append("<a href='#'>" + item[index1][2] + "</a>");
                                            lista6.append("<ul></ul>");
                                            $.each(item[index1][3], function(index2, item2){
                                                lista6.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                            });
                                        }else{
                                            if(item[index1][1] === padre6){
                                                padre7 = item[index1][0];
                                                lista6.children().eq(1).append("<li class='hijo6"+padre7+"'></li>");
                                                lista7 = lista6.find("li.hijo6"+padre7);
                                                lista7.append("<a href='#'>" + item[index1][2] + "</a>");
                                                lista7.append("<ul></ul>");
                                                $.each(item[index1][3], function(index2, item2){
                                                    lista7.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                });
                                            }else{
                                                if(item[index1][1] === padre7){
                                                    padre8 = item[index1][0];
                                                    lista7.children().eq(1).append("<li class='hijo7"+padre8+"'></li>");
                                                    lista8 = lista7.find("li.hijo7"+padre8);
                                                    lista8.append("<a href='#'>" + item[index1][2] + "</a>");
                                                    lista8.append("<ul></ul>");
                                                    $.each(item[index1][3], function(index2, item2){
                                                        lista8.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                    });
                                                }else{
                                                    if(item[index1][1] === padre8){
                                                        padre9 = item[index1][0];
                                                        lista8.children().eq(1).append("<li class='hijo8"+padre9+"'></li>");
                                                        lista9 = lista8.find("li.hijo8"+padre9);
                                                        lista9.append("<a href='#'>" + item[index1][2] + "</a>");
                                                        lista9.append("<ul></ul>");
                                                        $.each(item[index1][3], function(index2, item2){
                                                            lista9.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                        });
                                                    }else{
                                                        if(item[index1][1] === padre9){
                                                            padre10 = item[index1][0];
                                                            lista9.children().eq(1).append("<li class='hijo9"+padre10+"'></li>");
                                                            lista10 = lista9.find("li.hijo9"+padre10);
                                                            lista10.append("<a href='#'>" + item[index1][2] + "</a>");
                                                            lista10.append("<ul></ul>");
                                                            $.each(item[index1][3], function(index2, item2){
                                                                lista10.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                            });
                                                        }else{
                                                            if(item[index1][1] === padre10){
                                                                padre11 = item[index1][0];
                                                                lista10.children().eq(1).append("<li class='hijo10"+padre11+"'></li>");
                                                                lista11 = lista10.find("li.hijo10"+padre11);
                                                                lista11.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                lista11.append("<ul></ul>");
                                                                $.each(item[index1][3], function(index2, item2){
                                                                    lista11.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                });
                                                            }else{
                                                                if(item[index1][1] === padre11){
                                                                    padre12 = item[index1][0];
                                                                    lista11.children().eq(1).append("<li class='hijo11"+padre12+"'></li>");
                                                                    lista12 = lista11.find("li.hijo11"+padre12);
                                                                    lista12.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                    lista12.append("<ul></ul>");
                                                                    $.each(item[index1][3], function(index2, item2){
                                                                        lista12.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                    });
                                                                }else{
                                                                    if(item[index1][1] === padre12){
                                                                        padre13 = item[index1][0];
                                                                        lista12.children().eq(1).append("<li class='hijo12"+padre13+"'></li>");
                                                                        lista13 = lista12.find("li.hijo12"+padre13);
                                                                        lista13.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                        lista13.append("<ul></ul>");
                                                                        $.each(item[index1][3], function(index2, item2){
                                                                            lista13.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                        });
                                                                    }else{
                                                                        if(item[index1][1] === padre13){
                                                                            padre14 = item[index1][0];
                                                                            lista13.children().eq(1).append("<li class='hijo13"+padre14+"'></li>");
                                                                            lista14 = lista13.find("li.hijo13"+padre14);
                                                                            lista14.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                            lista14.append("<ul></ul>");
                                                                            $.each(item[index1][3], function(index2, item2){
                                                                                lista14.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                            });
                                                                        }else{
                                                                            if(item[index1][1] === padre14){
                                                                                padre15 = item[index1][0];
                                                                                lista14.children().eq(1).append("<li class='hijo14"+padre15+"'></li>");
                                                                                lista15 = lista14.find("li.hijo14"+padre15);
                                                                                lista15.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                                lista15.append("<ul></ul>");
                                                                                $.each(item[index1][3], function(index2, item2){
                                                                                    lista15.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                                });
                                                                            }else{
                                                                                if(item[index1][1] === padre15){
                                                                                    padre16 = item[index1][0];
                                                                                    lista15.children().eq(1).append("<li class='hijo15"+padre16+"'></li>");
                                                                                    lista16 = lista15.find("li.hijo15"+padre16);
                                                                                    lista16.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                                    lista16.append("<ul></ul>");
                                                                                    $.each(item[index1][3], function(index2, item2){
                                                                                        lista16.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                                    });
                                                                                }else{
                                                                                    if(item[index1][1] === padre16){
                                                                                        padre17 = item[index1][0];
                                                                                        lista16.children().eq(1).append("<li class='hijo16"+padre17+"'></li>");
                                                                                        lista17 = lista16.find("li.hijo16"+padre17);
                                                                                        lista17.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                                        lista17.append("<ul></ul>");
                                                                                        $.each(item[index1][3], function(index2, item2){
                                                                                            lista17.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                                        });
                                                                                    }else{
                                                                                        if(item[index1][1] === padre17){
                                                                                            padre18 = item[index1][0];
                                                                                            lista17.children().eq(1).append("<li class='hijo17"+padre18+"'></li>");
                                                                                            lista18 = lista17.find("li.hijo17"+padre18);
                                                                                            lista18.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                                            lista18.append("<ul></ul>");
                                                                                            $.each(item[index1][3], function(index2, item2){
                                                                                                lista18.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                                            });
                                                                                        }else{
                                                                                            if(item[index1][1] === padre18){
                                                                                                padre19 = item[index1][0];
                                                                                                lista18.children().eq(1).append("<li class='hijo18"+padre19+"'></li>");
                                                                                                lista19 = lista18.find("li.hijo18"+padre19);
                                                                                                lista19.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                                                lista19.append("<ul></ul>");
                                                                                                $.each(item[index1][3], function(index2, item2){
                                                                                                    lista19.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                                                });
                                                                                            }else{
                                                                                                if(item[index1][1] === padre19){
                                                                                                    padre20 = item[index1][0];
                                                                                                    lista19.children().eq(1).append("<li class='hijo19"+padre20+"'></li>");
                                                                                                    lista20 = lista19.find("li.hijo19"+padre20);
                                                                                                    lista20.append("<a href='#'>" + item[index1][2] + "</a>");
                                                                                                    lista20.append("<ul></ul>");
                                                                                                    $.each(item[index1][3], function(index2, item2){
                                                                                                        lista20.children().eq(1).append("<li><a href='#'>" + item2 + "</a></li>");
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            });
            iniciaArboles();
        },
        error: function(d) {
            alert("Error");
        }
    });
}

function funciones(){
    $.ajax({
        method: "POST",
        url: "IndexServlet1",
        data: {accion: 5, 
               rutaXML: $("#rutaXML").val()},
        dataType: "json",
        success: function(d) {
            var temp;
            var flag;
            $("#divVariables").html("");
            $("#divTablas").html("");
            $("#divArboles").html("");
            $("#divFunciones").html("");
            $.each(d, function(i, itemi) {
                temp = "";
                flag = false;
                $("#divFunciones").append("<h1>" + itemi[0] + "</h1>");
                $("#divFunciones").append("<h3>Variables Calculadas</h3>");
                $.each(itemi[1], function(j, itemj) {
                    if(j === 0){
                        flag = true;
                        temp += "<table class='display nowrap datatable'><thead><tr>";
                        temp += "<th>Nombre</th>";
                        temp += "<th>Tipo</th>";
                        temp += "<th>Valor Defecto</th></tr></thead><tbody>";
                    }
                    temp += "<tr>";
                    temp += "<td>" + itemj[0] + "</td>";
                    temp += "<td>" + itemj[1] + "</td>";
                    temp += "<td>" + itemj[2] + "</td>";
                    temp += "</tr>";
                });
                $("#divFunciones").append(temp);
                temp = "";
                $.each(itemi[2], function(j, itemj) {
                    temp += "<br /><img src='img/check.png' alt='Check' height='20' width='20' />" + itemj[1];
                });
                $("#divFunciones").append(temp);
            });
            $('.datatable').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        },
        error: function(d) {
            alert("Error");
        }
    });
}