const serverUrl = "http://localhost:1225/gift";

async function checkName() {
  const name = document.getElementById("nameInput").value;

  try {
    const response = await axios.post(serverUrl, { name });
    document.getElementById("result").innerText = response.data;
  } catch (error) {
    console.error("Error checking name:", error);
    document.getElementById("result").innerText =
      "Error checking the list. Please try again.";
  }
}
