function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/css-colours.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var createFieldEl = function(parentEl, field) {
    var el = document.createElement('p');
    el.innerText = field;
    parentEl.appendChild(el);
};

function init() {
    loadJSON(function(response) {
        // Parse JSON string into object
        var actual_JSON = JSON.parse(response);
        console.log(actual_JSON);

        for (i=0; i<actual_JSON.length; i++) {
            var record = actual_JSON[i];
            var colorSwatch = document.createElement('div');
            colorSwatch.className = 'c-colour ' + record.name;

            ['name', 'hex', 'rgba'].forEach(function(field) {
                createFieldEl(colorSwatch, record[field]);
            });

            // add the newly created element and its content into the DOM 
            var currentDiv = document.getElementById('wrapper'); 
            currentDiv.appendChild(colorSwatch); 
        }
    });
}

init();

