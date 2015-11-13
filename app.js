(function() {
    var download = function(options, cb, err) {

        var xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, true);
        xhr.responseType = 'arraybuffer';
        
        /*  Handling Post request.
         *  need jquery. 
         */
        if(options.params){
          var params = $.param(options.params);

          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.setRequestHeader("Content-length", params.length);
          xhr.setRequestHeader("Connection", "close");
        }

        /*  xhr.onload 
         *
         *  e: error message.
         *  this.response is an ArrayBuffer object. 
         *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
         *
         */

        xhr.onload = function(e) {

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
            method: 'GET',
            url: '/nebula.jpg',
            mime: 'image/jpeg',
          //  params: {a:'a',b:'b' },
        }, function(blob) {

           /* https://github.com/eligrey/FileSaver.js 
            *
            * saveAs(blob, 'nebula.jpg');  // work in all browser except IOS
            *
            */ 
         
            var fileURL = URL.createObjectURL(blob);
           
            /*  Open the file in the browser solution for IOS device. 
             *
             */

            //window.open(fileURL);  //open in a new tab. 


            window.location.href = fileURL  // open it in the same page.  
        });



    }, false);

}());
