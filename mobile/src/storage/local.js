import AsyncStorage from "@react-native-async-storage/async-storage";

// Persistência offline: guarda e lê valores JSON no aparelho.

export async function loadJson(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Falha ao ler "${key}" do armazenamento local:`, error);
    return fallback;
  }
}

export async function saveJson(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Falha ao salvar "${key}" no armazenamento local:`, error);
  }
}
