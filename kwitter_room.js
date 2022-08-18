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
document.getElementById("user_name").innerHTML = "Welcome" + user_name + "!"

function addRoom() {

    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("room_name", room_name);

    window.location = "kwitter_page.html"
}


function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log(Room_names);
            row = "<div class='room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)'> #" + Room_names + "</div> <hr>"
            document.getElementById("output").innerHTML += row
                //End code
        });
    });
}
getData();

function redirectToRoomName(name) {

    console.log(name);

    localStorage.setItem("room_name", name);

    window.location = "kwitter_page.html";


}

function logout() {

    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}