//Below are the constant variables for fs module
var fs = require('fs');

//Function for the fetching all the notes from notes-data.json file as JSON objects
var fetchNotes = () =>{
	try{
		//Reading all previously stored notes
		var noteString = fs.readFileSync('notes-data.json');
		return JSON.parse(noteString);
	}catch(e){
		return [];
	}
};

//Function for saving the note into notes-data.json file as  a string
var saveNotes = (notes) =>{
	fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

//Function for adding the note
var addNotes = (title,body)=>{
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	//Checking for the duplicate titles
	var duplicateNotes = notes.filter((note) => {
		return note.title === title;
	});
	if(duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;	
	}
};

//Function for getting all the notes
var getAll = () =>{
	return fetchNotes();
};

//Function for getting the note with specified title
var getNote = (title) =>{
	var notes = fetchNotes();
	//Getting the note with matching the title
	var filteredNotes = notes.filter((note) => {
		return note.title === title;
	});
	//Returning the first match result for the title
	return filteredNotes[0];
};

//Function for removing the note using the specified title
var removeNote = (title) =>{
	var notes = fetchNotes();
	//Getting the note to be removed
	var filteredNotes = notes.filter((note)=> {
		return note.title !== title;
	});
	saveNotes(filteredNotes);
	return notes.length != filteredNotes.length;
};

//Function for displaying the particular note
var displayNote = (note) =>{
	console.log('Note info');
	console.log('-----');
	console.log('Title:',note.title);
	console.log('Body:',note.body);
};

//Adding all the function to export 
module.exports={
	addNotes,
	getAll,
	getNote,
	removeNote,
	displayNote
};