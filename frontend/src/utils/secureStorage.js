import CryptoJS from "crypto-js";

const SECRET_KEY = (import.meta?.env?.VITE_SECRET_KEY || "dev_fallback_secret_key_change_me").toString();

export const encryptData = (data) => {
    try {
        if (data === undefined) throw new Error("encryptData received undefined");
        const message = typeof data === "string" ? data : JSON.stringify(data);
        return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
    } catch (error) {
        console.error("Encryption error:", error);
        return null;
    }
};

export const decryptData = (ciphertext) => {
    try {
        if (!ciphertext || typeof ciphertext !== "string") return null;
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const utf8 = bytes.toString(CryptoJS.enc.Utf8);
        if (!utf8) return null;
        try {
            return JSON.parse(utf8);
        } catch {
            return utf8;
        }
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};
