export async function fetchDeezerRadio(): Promise<any> {
  try {
    const response = await fetch("https://api.deezer.com/radio");
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Deezer radio:", error);
    return null;
  }
}

// Example usage:
fetchDeezerRadio().then((data: any) => {
  if (data) {
    console.log("Deezer radio data:", data);
    // Do something with the data
  } else {
    console.log("Failed to fetch Deezer radio data.");
  }
});
