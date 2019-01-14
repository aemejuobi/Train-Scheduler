$(document).ready(function(){
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
    var tableBody = $("tbody");
    var minutesAway = 0;

    database.ref().on("child_added", function(childSnapshot){
        function hours(){
            var hour = moment(childSnapshot.val().time).format('hh:mm');
            console.log(hour);
        }
         hours();
        tableBody.append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().trainDestination + "</td><td>" + childSnapshot.val().freq + "</td><td>" +
         minutesAway + "</td><td>" + childSnapshot.val().time + "</td></tr>");
    });

    $("#submit").on("click", function(e){
        e.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#trainTime").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            name: trainName,
            trainDestination: destination,
            freq: frequency,
            time: trainTime
        });

        

    });
});




// database.ref().push({
//     employeeName: name,
//     employeeRole: role,
//     employeeStartDate: startDate,
//     employeeMonthlyRate: monthlyRate
// });

// //Total billed is months worked multiplied by monthly rate



// database.ref().on("child_added", function(childSnapshot){
//     console.log(childSnapshot.val().employeeName);
//     console.log(childSnapshot.val().employeeRole);
//     console.log(childSnapshot.val().employeeStartDate);
//     console.log(childSnapshot.val().employeeMonthlyRate);
    
//     $("#tableBody").append("<tr><td>" + childSnapshot.val().employeeName + "</td><td>" +  childSnapshot.val().employeeRole + "</td><td>" + childSnapshot.val().employeeStartDate + "</td><td class='something>" + "</td><td>" + childSnapshot.val().employeeMonthlyRate + "</td><td class='totalBilled'>" + "</td></tr>");
//     
// function monthsWorked(){
//         var months = moment(childSnapshot.val().employeeStartDate).format("MM");
//         console.log(months);
//     }
//     monthsWorked();
// });