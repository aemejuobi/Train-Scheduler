$(document).ready(function(){
    var tableBody = $("tbody");
    var minutesAway = 0;
    var config = {
        apiKey: "AIzaSyD8tez5HCZ9uof3_x--ExN2t5lDwRlUz7E",
        authDomain: "train-scheduler-9693d.firebaseapp.com",
        databaseURL: "https://train-scheduler-9693d.firebaseio.com",
        projectId: "train-scheduler-9693d",
        storageBucket: "train-scheduler-9693d.appspot.com",
        messagingSenderId: "401309401350"
      };
    firebase.initializeApp(config);
    var database = firebase.database();
    

    database.ref().on("child_added", function(childSnapshot){
        
        function hours(){
            var hour = moment(childSnapshot.val().time, "HH:mm").format('hh:mm a');
            return hour;
        }
        
        // function timeAway(){
        //     var date = new Date();
        //     var minutes = date.getTime();
        //     console.log(minutes);
        // }
        // timeAway();

        tableBody.append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().trainDestination + "</td><td>" + childSnapshot.val().freq + "</td><td>" +
         minutesAway + "</td><td>" + hours() + "</td></tr>");
    });


    // 
    $("#submit").on("click", function(e){
        e.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#trainTime").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            name: trainName,
            trainDestination: destination,
            freq: parseInt(frequency),
            time: trainTime
        });

    });


});