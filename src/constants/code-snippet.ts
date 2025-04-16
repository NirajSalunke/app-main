export const codeInit: string = `// First Create a Vault, using API-key
import vault from "vaultbase-sdk";

const vault = new vault(process.env.VAULT_API_KEY); 

// Storage and Cache are secured in Vault.
const storage = vault.storageService;
const cache = vault.cacheService;`;

export const fileUpload: string = `async function uploadFile(uid: string, filePath: string) {
  try {
    const result = await storage.uploadFile(uid, filePath);
    console.log("✅ File uploaded successfully:", result);
  } catch (error) {
    console.error("❌ Error uploading file:", error.message);
  }
}

uploadFile("123456", "./path-to-your-file/file.ext");
`;

export const getFile: string = `async function getFile(uid: string, key: string) {
  try {
    const fileData = await storage.getFile(uid, key);
    console.log("✅ File retrieved successfully:", fileData.fileUrl);
  } catch (error) {
    console.error("❌ Error retrieving file:", error.message);
  }
}
getFile("12345uid", "sfnagsfh1");
`;

export const setCache: string = `
async function setCacheKey(uid:string, key:string, value:string,ttl:number) {
  try {
    const result = await cache.setKey(uid, key, value, ttl);
    console.log("✅ Key set successfully:", result);
  } catch (error) {
    console.error("❌ Error setting key:", error.message);
  }
}

setCacheKey("user123","mykey","myvalue",3600);
`;

export const getCache: string = `
async function getCacheKey(uid:string, key:string) {
  try {
    const result = await cache.getKey(uid, key);
    console.log("✅ Key retrieved successfully:", result);
  } catch (error) {
    console.error("❌ Error retrieving key:", error.message);
  }
}

getCacheKey("user123","myKey");
`;
