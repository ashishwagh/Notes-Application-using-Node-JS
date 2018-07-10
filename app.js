//Below are the constant variables for fs,lodash and yargs modules
const fs = require('fs');
const _= require('lodash');
const yargs = require('yargs');

//Constant variable for describing the title attribute in the command
const titleOption = {
					describe: 'Title of the note',
					demand:true,
					alias:'t'
				}
//Constant variable for describing the body attribute in the command
const bodyOption = {
					describe: 'Body of the note',
					demand:true,
					alias:'b'
				}
//Constant variable for more information about the help options				
const args = yargs
			.command('add','Adding a new note.',{
				title :  titleOption,
				body : bodyOption
			})
			.command('read','Reading a note.',{
				title :  titleOption
			})
			.command('list','Listing all the notes.')
			.command('remove','Removing the note.',{
				title :  titleOption
			})
			.help()
			.argv;
//Constant variable for importing the functions from notes.js file
const notes = require('./notes.js');

//Getting the command from yargs module constant variable
var command = args._[0];

//Checking the commands and calling the respective functions from notes.js file
if(command === 'add'){
	var note = notes.addNotes(args.title,args.body);
	if(note === undefined){
		console.log('Note with same title already exists.');
	}else{
		console.log('Note ',note.title,' added successfully.');
	}
}else if(command === 'list'){
	var allNotes = notes.getAll();
	console.log(`Listing ${allNotes.length} notes.`);
	allNotes.forEach((note) =>{
		notes.displayNote(note);
	});
}else if(command === 'read'){
	var note = notes.getNote(args.title);
	if(note){
		console.log('Note found.');
		notes.displayNote(note);
	}else{
		console.log('Note does not exists.');
	}
}else if(command === 'remove'){
	var isDeleted = notes.removeNote(args.title)
	var message = isDeleted ?'Note successfully deleted.' : 'Note does not exists.';
	console.log(message);
}else{
	console.log('Command not recognised.');
}