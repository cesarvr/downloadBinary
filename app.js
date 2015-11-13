(function() {
    var download = function(options, cb, err) {
        var xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, true);
        xhr.responseType = 'arraybuffer';
        
        var params = $.param(options.params);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-length", params.length);
        xhr.setRequestHeader("Connection", "close");






        xhr.onload = function(e) {
            // response is unsigned 8 bit integer




            if (this.status === 200) {
                var responseArray = new Uint8Array(this.response);
                cb(new Blob([responseArray], {
                    type: options.mime
                }));
            } else {
                err(this);
            }
        };

        xhr.send(params);
    };


    document.getElementById('download').addEventListener('click', function() {

        download({
            method: 'POST',
            url: '/nebula.jpg',
            mime: 'image/jpeg',
            params: {file: 'scientology the best of the beast' },
        }, function(blob) {
            //saveAs(blob, 'nebula.jpg');  // work in all browser except IOS
            var fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
            //window.location.href = fileURL   //detect IOS  

        });



    }, false);

}());
