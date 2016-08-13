const fs = require('fs');
const readLine = require('readline');
const inputFile = process.argv[2];
var splitRegex = /(?:"?([^"]*)"?\s*)?(?:<([-\w.]+@[-\w.]+)>)/g;
var emailValidationRegex = /(^[\w-]+(\.[\w-]+)*@([\w-]+(\.[\w-]+)*?\.[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$)/g;
var now = new Date();
var lineReader = readLine.createInterface({
    input: fs.createReadStream(inputFile)
});

lineReader.on('line', function (email) {
    if (email != ''){

        var match = splitRegex.exec(email);
        var name = '';
        if(match){
            name = match[1];
            email = match[2];
        }
        var isValidEmail = email.match(emailValidationRegex);
        if(!isValidEmail){
            //console.error('Not a valid email');
        }else{
            if ( name === '' ){
                name = email.substr(0, email.indexOf('@'));
                name = name.replace(/[^a-zA-Z ]/g, ' ');
                var newname = [];
                name.split(' ').forEach(function(part){
                    newname.push(capitalizeFirstLetter(part));
                });
                name = newname.join(' ');
            }
            //console.log(name + ' <' + email + '>');
        }
    }

}).on('close', function() {
    console.log(new Date() - now);
});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
