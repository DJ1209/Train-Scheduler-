// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBfk_8tKYr8jVPN905NzJxC1Nyoet4MZQc",
    authDomain: "a-unique-project-18ed9.firebaseapp.com",
    databaseURL: "https://a-unique-project-18ed9.firebaseio.com",
    projectId: "a-unique-project-18ed9",
    storageBucket: "a-unique-project-18ed9.appspot.com",
    messagingSenderId: "941925629772",
    appId: "1:941925629772:web:565b87150fa44c12d759e9",
    measurementId: "G-R4FKGZ351T"
};
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var trainTime = 0;
var frequency = "";

// Capture Button Click
$("#submitBtn").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainName").val().trim();
    destination = $("#destinationInput").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequencyInput").val().trim();

    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

    //Clears text box after user submits info
    $("#trainName").val("");
    $("#destinationInput").val("");
    $("#trainTime").val("");
    $("#frequencyInput").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    var timeConvert = moment(trainTime, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var difference = currentTime.diff(moment(timeConvert), "minutes");

    var remainder = difference % frequency;

    var minutesAway = frequency - remainder;

    var nextTrain = currentTime.add(minutesAway, "minutes");

    var nextArrival = moment(nextTrain).format("hh:mm");
    // to creat new row!

    $("#tableEntry").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});