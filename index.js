/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer'; // Use to get user input
import qr from 'qr-image';      // Use to change something into a qr-code
import fs from 'fs';            // native fs node module

inquirer
  .prompt([                             //.prompt takes an object
    {   
        name: "URL",                   
        message: "Enter a valid URL: ",
    },
  ])
  .then((answers) => {
    const url = answers.URL;        
    var qr_svg = qr.image(url);         // change the url to qr-code
    qr_svg.pipe(fs.createWriteStream('my.png')); //create a my.png

    fs.writeFile("URL.txt", url, (err) =>{      // write user input into URL.txt
        if(err) throw err;
        console.log("Saved in file!");
    });
  }) 
  .catch((error) => {
    console.log(error);
  });