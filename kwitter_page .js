//YOUR FIRE BASE LINKS
var firebaseConfig = {
    apiKey: "AIzaSyCH1ARFNCB6n5dp-v3b7NjmW9mlaxKATDM",
    authDomain: "kwitter-bc38f.firebaseapp.com",
    databaseURL: "https://kwitter-bc38f-default-rtdb.firebaseio.com",
    projectId: "kwitter-bc38f",
    storageBucket: "kwitter-bc38f.appspot.com",
    messagingSenderId: "140536708628",
    appId: "1:140536708628:web:640c0980b080d5fb5e3101"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id)
{

    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementbyid(button_id).value;
    udate_likes = number(likes) + 1;
    console.log(update_likes);

    firebase.database().ref(room_nme).child(message_id).update({
        like : update_likes
    });
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("kwitter.html")
}