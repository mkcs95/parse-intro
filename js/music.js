// Initialize Parse app
Parse.initialize('WdLdlM8xOhaERo3V25TVdcNwAstmuE0xKLh10XUr','vA9RsaJnEwlHBGKi93me6AEJerwPCzrUXIJSwY4E')

// Create a new sub-class of the Parse.Object, with name "Review"
var Review = Parse.Object.extend('Review');

// Create a new instance of your Review class 
var sweetTune = new Review();

sweetTune.set('review', 'Check this out!');


sweetTune.set('description', 'This IPhone color is cool!');


sweetTune.save();


// Click event when form is submitted
$('form').submit(function() {

	// Create a new instance of Review class 
	var review = new Review();

	// For each input element, set a property of your new instance equal to the input's value
	$this.find('input').each(function(){
		review.set($(this).attr('id'), $(this).val());
			$(this).val('');

	})

	// After setting each property, save your new instance back to your database
	review.save(null, {
		success:getData
	})
	getData()
	return false
})



// Write a function to get data
var getData = function() {
	

	// Set up a new query for Review class
	var query = new Parse.Query(Review);

	// Set a parameter for your query -- where the website property isn't missing
	query.notEqualTo('description', '');

	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
	query.find({
		success:function(results){
			buildList(results);
		}
		// or I can write:
		// success: buildList; 
	})
}

// A function to build your list
var buildList = function(data) {
	// Empty out your unordered list
	$('ol').empty();
	// Loop through your data, and pass each element to the addItem function
	data.forEach(function(d) {
		addItem(d);
	})
}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters from the data item passed to the function
	var review = item.get('review');
	var description = item.get('description');
	// Append li that includes text from the data item
	var li = $('<li>' + review + description + '</li>');
	var button = $('<button class="btn-danger btn-xs"><span>Remove</span></button>');
	button.click(function() {
		item.destroy({
			success:getData
		})
	})

	li.append(button);
	$('ol').append(li);

	
}


getData();

// var stars = 3;
// $('#stars').raty({
// 	'score':stars
// })

