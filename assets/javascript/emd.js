var config = {
	apiKey: "AIzaSyBom24CJ78x2uN80RnF118O9CO48qYbxYI",
	authDomain: "kelly-costner-db1.firebaseapp.com",
	databaseURL: "https://kelly-costner-db1.firebaseio.com",
	projectId: "kelly-costner-db1",
	storageBucket: "",
	messagingSenderId: "405239297739"
};

firebase.initializeApp(config);


var database = firebase.database();

var name = '';
var role = '';
var startDate = '';
var months = 0;
var rate = 0;
var total = 0;

$("#submitInfo").on("click", function (event) {
	// Prevent form from submitting
	event.preventDefault();

	// Get the input values
	name = $("#empName").val().trim();
	role = $("#empRole").val().trim();;
	startDate = $("#empStDt").val().trim();;
	rate = parseInt($("#empRate").val().trim());


		// Save the new data in Firebase
		database.ref().push({
			name: name,
			role: role,
			startDate: startDate,
			rate: rate,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});
		// console.log(database.ref());




});

database.ref().on("child_added", function(snapshot){
	console.log("I had a child!");
	var tdName = snapshot.val().name;
	var tdRole = snapshot.val().role;
	var tdStDt = snapshot.val().startDate;
	var tdRate = snapshot.val().rate;
	var dateFormat = ("MM/DD/YYYY");
	var convertedDate = moment(tdStDt).format(dateFormat);

	var tdMonths = moment().diff(moment(convertedDate), "months");
	var tdTotal = tdMonths * tdRate;
	if (tdMonths <=0) {
		tdTotal = 0;
	}
	var now = moment().format(dateFormat);

	$("#empTable").append("<tr><td>" + tdName +"</td><td>" + tdRole + "</td><td>" + convertedDate + "</td><td>" + tdMonths + "</td><td>$" + tdRate + "</td><td>$" + tdTotal + "</td></tr>");
});