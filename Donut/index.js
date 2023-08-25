(function (){
    var preTag = document.getElementById('donut');

     // angles, radius and constant
    var A = 1;
    var B = 1;
    var R1 = 1;
    var R2 = 2;
    var K1 = 150;
    var K2 = 5;

    // function to render ASCII frame
    function renderASCIIFrame() {
        var b = []; // array to stay ascii chars
        var z = []; // array to store depth values

        var width = 380; // width of frame
        var height = 160; // hieght of frame

        A += 0.07; // increment angle a
        B += 0.03; // increment angle b
        // sin and cosine of angles 
        var cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

        // initialize arrays with default angles
        for (var k = 0; k < width * height; k++) {
            // set defeault ascii char
            b[k] = k % width == width - 1 ? '\n' : ' ';
            // set default depth
            z[k] = 0;
        }

        // generate the ascii frame
        for (var j = 0; j < 6.28; j+=0.07) {
            var ct = Math.cos(j); // cosine of j
            var st = Math.sin(j); // sin of j

            for(var i = 0; i < 6.28; i += 0.02) {
                var sp = Math.sin(i); // sin of i
                var cp = Math.cos(i), // cosine of i
                    h = ct + 2, // height of calculation
                    // distance calculation
                    D = 1 / (sp * h * sA + st * cA + 5),
                    // temporary variable
                    t = sp * h * cA - st * sA;

                // calculate coordinates of ascii characters
                var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                var y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));
             
                // calculate the index in the array
                var o = x + width * y;
                // calculate the ascii char index
                var N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

                // update ascii char and deoth if conditions are met
                if(y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;
                    // update ascii char based on the index
                    b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
                }
                
            }

        }

        // update html element with the ascii frame
        preTag.innerHTML = b.join('');

    }

    // function to start the animation
    function startAsciiAnimation() {
        // start it by calling renderAsciiAnimation every 50ms
        window.asciiIntervalId = setInterval(renderASCIIFrame, 50);
    }

    renderASCIIFrame(); // render the initial ascii frame
    // add event listener to start animation when the page is loaaded
    if (document.all) {
        // for older versions of internet explorer
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        // for modern browsers
        window.addEventListener('load', startAsciiAnimation, false);
    }

    // add event listener yo update ascii frame when window resized
    window.addEventListener('resize', renderASCIIFrame);
})();