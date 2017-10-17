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
  presences = Presence.syncDiff(presencs, diff)
  render(presences)
})

room.join()
