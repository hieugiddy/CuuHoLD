$(document).ready(function() {
    var fakeImage =
        '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';

    var initStep = 2;
    var interval = setInterval(function() {
        if (initStep > 4) initStep = 1;
        activeStepItem(initStep);
        activeImage(initStep);
        initStep++;
    }, 4000);

    $('.step-item-carousel').click(function() {
        if (!$(this).hasClass('active')) {
            $('.step-item-carousel').removeClass('active');
            $(this).addClass('active');
            activeImage($(this).attr('data-step'));
        }
    });

    function activeStepItem(no) {
        $('.step-item-carousel').removeClass('active');
        $('#step-' + no).addClass('active');
    }

    function activeImage(no) {
        initStep = no;
        $('.js-image-phone').removeClass('active');
        $('#js-step-carousel-' + no).addClass('active');

        $('.list-step-m li').removeClass('active');
        $('.js-step-m-' + no).addClass('active');
    }

    function urltoFile(url, filename, callback) {
        mimeType = (url.match(/^data:([^;]+);/) || '')[1];
        return fetch(url)
            .then(function(res) {
                return res.arrayBuffer();
            })
            .then(function(buf) {
                callback(new File([buf], filename, { type: mimeType }));
            });
    }

    function renderCity(val) {
        var city;
        switch (val) {
            case 'Hà Nội':
                city = 85;
                break;
            case 'Hồ Chí Minh':
                city = 83;
                break;
            case 'Đà Nẵng':
                city = 69;
                break;
            case 'Cần Thơ':
                city = 292;
                break;
        }
        return city;
    }

    var LINK_API = 'https://latte.lozi.vn/v1.2';
    $('#loship-form').submit(function(e) {
        e.preventDefault();

        formdata = new FormData();

        var data = {
            fullname: $('.js-lastname').val() + ' ' + $('.js-name').val(),
            comment: 'Sdt: ' +
                $('.js-phone').val() +
                '\n' +
                'Tp: ' +
                $('.js-city').val() +
                '\n' +
                'Người giới thiệu: ' +
                $('.js-ref').val(),
        };

        var careerId = renderCity($('.js-city').val());

        //console.log('data',data);

        $('.js-status-form').show();
        $('.js-pending').show();
        $('.js-btn-dang-ky').addClass('disabled');

        urltoFile('data:image/png;base64,' + fakeImage, 'a.png', function(file) {
            formdata.append('resume', file);
            formdata.append('fullname', data.fullname);
            formdata.append('comment', data.comment);

            $.ajax({
                type: 'POST',
                url: LINK_API + '/jobs/' + careerId,
                data: formdata,
                async: true,
                processData: false,
                contentType: false,
                success: function(res) {
                    $('.js-status-form .alert').hide();
                    $('.js-success').show();
                    $('.js-success').show();
                    $('.js-btn-dang-ky').removeClass('disabled');
                    $('.js-lastname').val('');
                    $('.js-name').val('');
                    $('.js-email').val('');
                    $('.js-phone').val('');
                    $('.js-city').val('');
                    $('.js-ref').val('');
                },
                error: function(err) {
                    $('.js-status-form .alert').hide();
                    $('.js-err').show();
                    $('.js-btn-dang-ky').removeClass('disabled');
                    console.error(err);
                },
            });
        });
    });
});