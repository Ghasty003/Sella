import * as SecureStore from "expo-secure-store";

export async function saveToken(token) {
  // token expires in 6hrs, this is the expiration time in milliseconds
  const expirationTime = 6 * 60 * 60 * 1000 + Date.now();

  try {
    await SecureStore.setItemAsync(
      "auth_token",
      JSON.stringify({ token, expirationTime })
    );
  } catch (error) {
    return error;
  }
}

export async function getToken() {
  try {
    const storedValue = await SecureStore.getItemAsync("auth_token");

    if (!storedValue) return;

    const { token, expirationTime } = JSON.parse(storedValue);

    // current time
    const currentTime = Date.now();

    if (currentTime < expirationTime && token) {
      return token;
    }

    return null;
  } catch (error) {
    throw error;
  }
}
