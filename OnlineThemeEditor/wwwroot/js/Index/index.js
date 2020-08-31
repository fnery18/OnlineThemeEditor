$(function () {
    $(document).on('keyup', '#txt-css', function () {
        processarCSS();
    });

    $(document).on('click', '.box-cor', function () {

        $('#modal-colorPicker').modal();
    });

    const processarCSS = function () {
        let codigoCSS = $('#txt-css').val();

        let cores = codigoCSS.split(' ').map(function (c) {
            return c.match(/#(?:[a-f\d]{3}){1,2}\b|rgb\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*\)|hsl\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}\)|(?:rgba\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){3}|(?:\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*,){3})|hsla\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2},)\s*0*(?:1|0(?:\.\d+)?)\s*\)/ig);
        }).filter(c => c !== null);

        renderizarCores(retornarArraySemDuplicatas(cores));
    }

    const retornarArraySemDuplicatas = function (a) {
        var seen = {};
        return a.filter(function (item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

    const renderizarCores = function (cores) {
        $.post('/Home/RenderizarCores', { cores }, function (partial) {
            if (partial) {
                $('#cores').html(partial);

                if ($('.texto-cor').length > 0) {
                    $('#cores').fadeIn(500);
                    $('#txt-cores-encontradas p').text($('#hidden-cores').val() + ' cores encontradas');
                }
                else {
                    $('#cores').fadeOut(500);
                }
            }
        })
    }
});