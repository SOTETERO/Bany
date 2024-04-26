import axios from "axios";

const CreateMessage = async (channel_id, message) => {
  const TOKEN = process.env.TOKEN;
  const url = `https://discord.com/api/v10/channels/${channel_id}/messages`;

  const headers = {
    Authorization: `Bot ${TOKEN}`,
    "Content-Type": "application/json",
  };

  const data = {
    content: message,
  };

  axios
    .post(url, data, { headers })
    .then((response) => {
      console.log("Status Code:", response.status);
      console.log("Response Data:", response.data);
    })
    .catch((error) => {
      console.log("Error:", error.response.status);
      console.log("Error Data:", error.response.data);
    });
};

export default CreateMessage;
