// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuUFQN6XXIj8NFRVxQ4xApomWJRcs9pog",
  authDomain: "kwitterapp-e1c96.firebaseapp.com",
  databaseURL: "https://kwitterapp-e1c96-default-rtdb.firebaseio.com",
  projectId: "kwitterapp-e1c96",
  storageBucket: "kwitterapp-e1c96.appspot.com",
  messagingSenderId: "312093822761",
  appId: "1:312093822761:web:4a649d31de50408107f138"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  

  user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
       childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}