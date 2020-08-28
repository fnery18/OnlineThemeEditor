﻿$(function () {
    $(document).on('click', '.icone-processar', function () {
        $(this).addClass('fa-spin');

        if ($('#txt-css').val().length) {
            setTimeout(function () {
                processarCSS();
                $('.icone-processar').removeClass('fa-spin');
            }, 1500)
        }
        else {
            $('.icone-processar').removeClass('fa-spin');
        }
    });

    $(document).on('click', '.box-cor', function () {

        $('#modal-colorPicker').modal();
    });

    const processarCSS = function () {
        let codigoCSS = $('#txt-css').val();

        let cores = codigoCSS.replace(/\s/g, "X").split('X').filter((c) => c.match('^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((\d+%?(deg|rad|grad|turn)?[,\s]+){2,3}[\s\/]*[\d\.]+%?\))$'));

        let coresSemDuplicatas = Array.from(new Set(cores));

        renderizarCores(coresSemDuplicatas);
    }

    const renderizarCores = function (cores) {
        $.post('/Home/RenderizarCores', {cores}, function (partial) {
            if (partial) {
                $('#cores').html(partial);
                $('#cores').fadeIn(500);
            }
        })
    }
});