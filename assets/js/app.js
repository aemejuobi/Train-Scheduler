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
        
        // Set up current date
        var date = new Date();
        // Convert date into current hour:minutes format using moment
        var currentTime = moment(date, "HH:mm").format("HH:mm");
        // Define a variable and set it equal to currentTime as an array
        var currentTimeArray = currentTime.split("");
        // Define an empty string as a placeholder
        var militaryTimeTime = "";

        // Create for loop to loop through currentTimeArray
        for(var i=0; i<currentTimeArray.length; i++){
            // if the element at currentArrayTime[i] === ":", remove that element
            if(currentTimeArray[i] === ":"){
                currentTimeArray.splice(i, 1);
            }
            // Set militaryTimeTime equal to currentTimeArray joined as a string
            militaryTimeTime = currentTimeArray.join("");
        }
        
        console.log(militaryTimeTime);
        var timeAhead = moment().add(childSnapshot.val().freq, "m");
        var nextArrival = moment(timeAhead).format("h:mma");
        console.log(nextArrival);
        
        // Append the values to the table
        tableBody.append(
            "<tr><td>" + childSnapshot.val().name + 
            "</td><td>" + childSnapshot.val().trainDestination + 
            "</td><td>" + childSnapshot.val().time + 
            "</td><td>" + childSnapshot.val().freq + 
            "</td><td>" +
            minutesAway + 
            "</td><td>" + nextArrival + "</td></tr>"
            );

         
    });
    // var minutesAway = currentTime - freq 
    // var nextArrival = militaryTimeTime + minutesAway


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
            time: moment(trainTime, "HH:mm").format("h:mma"),
            freq: parseInt(frequency)
        });

    });


});