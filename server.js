/**
 * Created by lukeaskins on 6/19/14.
 */

//=============Set up =============
var express     =       require('express');
var fs          =       require('fs');
var request     =       require('request');
var cheerio     =       require('cheerio')
var app         =       express();

//=============Configure ===========

var port = 8000;
app.get('/scrape', function(req, res){
    //cheerio url to create dom object
    url = 'http://www.imdb.com/title/tt0944947/fullcredits';


//============Rock and Roll==========

    request(url, function(error, response, html){
        //confirm no errors
        if(!error){
            //inject the html into cheerio var and build the variables needed to store scraped data
            var $ = cheerio.load(html);
            var characters = [];


//Find the unique DOM elements to extract names of actors

            $('span[itemprop="name"]').each(function(){

                    //for each of the selected elements, instantiate into THIS
                    var data = $(this);
                    //Grab the text of the data object and place into the next spot in the array
                    actor = {"actor": data.text()};
                    characters.push(actor);
            });
        }

        //Use FS library to write to a file
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  outputactors.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function

        fs.writeFile('outputactors.json', JSON.stringify(characters, null, 4), function(err){
            console.log("file successfully written.  Check your project directory for outputactors.json")
        });

        res.send('Check your console!');

    });

});

app.listen(port);
console.log("Scraper is ready on port: " + port);

exports = module.exports = app;
