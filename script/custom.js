import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, ref, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBzsUvbUIW6s8dl63rRQgLXiPuresytVaY",
    authDomain: "notesapp-679b9.firebaseapp.com",
    projectId: "notesapp-679b9",
    storageBucket: "notesapp-679b9.appspot.com",
    messagingSenderId: "133452904630",
    appId: "1:133452904630:web:bbf5b414ada74e72b08e17",
    measurementId: "G-WDLMGWZG8Y"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function showValues() {
    const dbref = ref(database);
    get(child(dbref, "notes/")).then((snapshot)=>{
        if(snapshot.exists()) {
            var records = snapshot.val();
            var records_arr = Object.values(records);
            $(".note").remove();
            for (let index = 0; index < records_arr.length; index++) {
                var text = records_arr[index].val;
                $('.notes').append("<div class='note'><h2>"+text+"</h2></div>");
            }
        } else {
            alert("Cannot load page");
        }
    });
}

$(document).ready(function() {
    showValues()
});

$('#sub-btn').click( function() {
    var note = $('#note-inp').val();
    addData(note);
    showValues()
});

function addData(note) {
    set(ref(database, 'notes/' + new Date().getTime().toString()), {
        val:note
  })
}