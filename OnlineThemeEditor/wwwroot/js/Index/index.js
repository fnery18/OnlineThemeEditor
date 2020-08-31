let boxClicada = null;

$(function () {
    $(document).on('keyup', '#txt-css', function () {
        processarCSS();
    });

    $(document).on('click', '.box-cor', function () {
        boxClicada = $(this);
        $('#modal-colorPicker').modal();
    });

    $(document).on('click', '.color-palette__item', function () {

        $('#modal-colorPicker .close').trigger('click');

        let corSelecionada = $(this).data('clipboard-text');

        let css = $('#txt-css').val();

        let regexRgbBoxClicada = new RegExp(ajustaEscapeRegExp(boxClicada.data('cor')), 'g');

        cssModificadoNovaCor = css.trim().replace(regexRgbBoxClicada, corSelecionada);

        $('#txt-css').val(cssModificadoNovaCor);

        processarCSS();
    });

    const processarCSS = function () {
        let codigoCSS = $('#txt-css').val();

        let cores = codigoCSS.replace(/\s/g, "").match(retornarRegexCores());

        renderizarCores(retornarArraySemDuplicatas(cores));
    }

    const retornarArraySemDuplicatas = function (a) {
        if (a !== null) {
            var seen = {};
            return a.filter(function (item) {
                return seen.hasOwnProperty(item) ? false : (seen[item] = true);
            });
        }
    }

    const rgbToHex = function (R, G, B) { return toHex(R) + toHex(G) + toHex(B) }

    const toHex = function (n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16)
            + "0123456789ABCDEF".charAt(n % 16);
    }

    const retornarRegexCores = function () {
        return new RegExp(/#(?:[a-f\d]{3}){1,2}\b|rgb\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){2}\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)|\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%(?:\s*,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%){2})\s*\)|hsl\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2}\)|(?:rgba\((?:(?:\s*0*(?:25[0-5]|2[0-4]\d|1?\d?\d)\s*,){3}|(?:\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*,){3})|hsla\(\s*0*(?:360|3[0-5]\d|[12]?\d?\d)\s*(?:,\s*0*(?:100(?:\.0+)?|\d?\d(?:\.\d+)?)%\s*){2},)\s*0*(?:1|0(?:\.\d+)?)\s*\)/ig);
    }
    const renderizarCores = function (cores) {
        $.post('/Home/RenderizarCores', { cores }, function (partial) {
            if (partial) {
                $('#cores').html(partial);

                if ($('.texto-cor').length > 0) {
                    $('#cores').fadeIn(1000);
                    $('#txt-cores-encontradas p').text($('#hidden-cores').val() + ' cores encontradas');
                    formatarCoresBox();

                }
                else {
                    $('#txt-cores-encontradas p').text('');
                    $('#cores').fadeOut(1000);
                }
            }
        })
    }

    const formatarCoresBox = function () {
        $('.box-cor').get().forEach(function (c) {
            if ($(c).find('span').text().trim().length === 0) {
                let rgb = $(c).data('cor').match(/rgb\x28(\d\d{0,2})(\s*?,\s*?)(\d\d{0,2})(\s*?,\s*?)(\d\d{0,2})\x29/);
                $(c).find('span').text('#' + rgbToHex(rgb[1], rgb[3], rgb[5]));
            }
        });
    }

    const ajustaEscapeRegExp = function(texto) {
        return texto.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
});