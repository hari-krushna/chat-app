const { API_URL } = "./config/default.json";
const socket = io.connect(API_URL);

const user = document.querySelector("#user"),
  message = document.querySelector("#message"),
  send = document.querySelector("#send"),
  output = document.querySelector("#output"),
  feedback = document.querySelector("#feedback");

send.addEventListener("click", () => {
  socket.emit("chat_message", {
    user: user.value,
    message: message.value
  });
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", user.value);
});

socket.on("chat_message", data => {
  const { user, message } = data;
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${user}</strong>: ${message}</p>`;
});

socket.on("typing", user => {
  feedback.innerHTML = `<p><em>${user} is typing a message..</em></p>`;
});
