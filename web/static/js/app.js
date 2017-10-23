// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import { Socket, Presence } from "phoenix"

let user = document.getElementById("user").innerText
let socket = new Socket("/socket", { params: {user: user}} )
socket.connect()

let presences = {}

let formatedTimestamp = (Ts) => {
  let date = new Date(Ts)
  return date.toLocaleString()
}

let listBy = (user, {metas:metas}) => {
  return {
    user: user,
    onlineAt: formatedTimestamp(metas[0].online_at)
  }
}

let userList = document.getElementById("userList")

let render = (presences) => {
  userList.innerHTML = Presence.list(presences, listBy)
    .map(presences => `
      <li>
        ${presences.user}
        <br>
        <small>online since ${presences.onlineAt}</small>
      </li>
    `)
    .join("")
}


let room = socket.channel("room:lobby")

room.on("presence_state", state => {
  presences = Presence.syncState(presences, state)
  render(presences)
})

room.on("presence_diff", diff => {
  presences = Presence.syncDiff(presences, diff)
  render(presences)
})

room.join()

let messageInput = document.getElementById("newMessage")
messageInput.addEventListener("keypress", (e) => {
  if (e.keyCode == 13 && messageInput.value != "") {
    room.push("message:new", messageInput.value)
    messageInput.value = ""
  }
})


let messageList = document.getElementById("messageList")
let renderMessage = (message) => {
  let messageElement = document.createElement("li")
  messageElement.innerHTML = `
    <b>${message.user}</b>
    <i>${formatedTimestamp(message.timestamp)}</i>
    <p>${message.body}</p>
  `
  messageList.appendChild(messageElement)
}

room.on("message:new", message => renderMessage(message))

let gameCounter = document.getElementById("gameCounter")
let gameNotification = document.getElementById("gameNotification")
let timePerGame = 30
let payOutTime = 10

startGame()



function startGame() {
  var i = 10;
  setInterval(function() {
    if (i == 0)
      clearInterval(this)
    else {
      gameCounter.innerHTML =  String(i);
      if (i==1) {
        startGame()
      }
      console.log("Currently at " + i--)
    }
  }, 1000)
}



// function countdown(minutes) {
//     var seconds = 60;
//     var mins = minutes
//     function tick() {
//         //This script expects an element with an ID = "counter". You can change that to what ever you want.
//         var counter = document.getElementById("gameCounter")
//         var current_minutes = mins-1
//         seconds--;
//         counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
//         if( seconds > 0 ) {
//             setTimeout(tick, 1000);
//         } else {
//             if(mins > 1){
//                 countdown(mins-1);
//             }
//         }
//     }
//     tick();
// }
// //You can use this script with a call to onclick, onblur or any other attribute you would like to use.
// countdown(1);//where n is the number of minutes required.
