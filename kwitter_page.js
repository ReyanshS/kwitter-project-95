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
	room_name = localStorage.getItem("room_name");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/"+room_name).on('value', function(snapshot) {
      document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
       childKey  = childSnapshot.key;
       childData = childSnapshot.val();
       if(childKey != "purpose")
       {
         firebase_message_id = childKey;
         message_data = childData;

	       console.log(message_data);
	       name = message_data['name'];
	       message = message_data['message'];
	       like = message_data['like'];
         row = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";       
        document.getElementById("output").innerHTML += row;
       }
    });
  });
}

getData();

function updateLike(message_id)
{
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	likes_in_number = Number(likes) + 1;
	console.log(likes_in_number);

	firebase.database().ref(room_name).child(message_id).update({
		like : likes_in_number
	 });

}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}