$(document).ready(function(){
    dataTable();
    llenaDataTable();
    botones();
});

function botones(){
    $("#btnBuscaDirectorio").on("click",function(){
        llenaDataTable($("#directorioOrigen").val());
    });
    $("#btnCreaCarpeta").on("click",function(){
        $.ajax({
            method: "POST",
            url: "ArchivosServlet",
            data: {accion: 3, directorio: $("#directorioOrigen").val(), carpeta: $("#nombreCarpeta").val()},
            dataType: "json",
            beforeSend: function() {
                waitingDialog.show('Cargando...');
            },
            success: function(d) {
                $.notify(d, "success");
            llenaDataTable($("#directorioOrigen").val());
            waitingDialog.hide();
            },
            error: function(d) {
                waitingDialog.hide();
            }
        });
    });
}

function dataTable(){
    $('.dataTable').DataTable({
        "language": {
            "url": "plugins/datatable/js/externos/spanish.json"
        },
        "bFilter": true
    });
}

function llenaDataTable(ruta) {
    $.ajax({
        method: "POST",
        url: "ArchivosServlet",
        data: {accion: 1, ruta: ruta},
        dataType: "json",
        beforeSend: function() {
            waitingDialog.show('Cargando...');
        },
        success: function(d) {
            $("#tblDirectorios").DataTable().clear().draw();
            $.each(d, function(index, item) {
                $("#directorioOrigen").val(item.directorio);
                $("#tblDirectorios").DataTable().row.add([
                    item.archivo[0],
                    item.archivo[1],
                    item.archivo[2],
                    "<a href='#'><img src=\"img/eliminar.png\" width=\"25px\" onclick='eliminaArchivo(\"" + item.archivo[3] + "\")' /></a>"
                ]).draw(false);
            });
            estiloTabla($("#tblDirectorios"));
            waitingDialog.hide();
        },
        error: function(d) {
            console.log(d);
            waitingDialog.hide();
        }
    });
}

function eliminaArchivo(archivo){
    $.ajax({
        method: "POST",
        url: "ArchivosServlet",
        data: {accion: 2, archivo: archivo},
        dataType: "json",
        beforeSend: function() {
            waitingDialog.show('Cargando...');
        },
        success: function(d) {
            $.notify(d, "success");
            llenaDataTable($("#directorioOrigen").val());
            waitingDialog.hide();
        },
        error: function(d) {
            console.log(d);
            waitingDialog.hide();
        }
    });
}