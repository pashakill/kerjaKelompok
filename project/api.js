const API_URL = "http://localhost:3004";

// Fungsi untuk login ke API

export async function login(username, password) {
    try {
        const response = await fetch(API_URL + "/users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Jika respons gagal
        if (!response.ok) {
            throw new Error("Login failed");
        }
        // Mengembalikan data JSON dari API
        return await response.json();
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

export async function initIntro() {
   try {
        const response = await fetch(API_URL + "/intro", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Jika respons gagal
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        // Mengembalikan data JSON dari API
        return await response.json();
    } catch (error) {
        console.error("Error during fetch:", error);
        throw error;
    }
}


export async function initFeature() {
    try {
         const response = await fetch(API_URL + "/feature", {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         });
         
         // Jika respons gagal
         if (!response.ok) {
             throw new Error("Failed to fetch data");
         }
 
         // Mengembalikan data JSON dari API
         return await response.json();
     } catch (error) {
         console.error("Error during fetch:", error);
         throw error;
     }
 }

 export async function initLatestProduct() {
    try {
         const response = await fetch(API_URL + "/latestProduct", {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         });
         
         // Jika respons gagal
         if (!response.ok) {
             throw new Error("Failed to fetch data");
         }
 
         // Mengembalikan data JSON dari API
         return await response.json();
     } catch (error) {
         console.error("Error during fetch:", error);
         throw error;
     }
 }

 export async function getAdds() {
    try {
         const response = await fetch(API_URL + "/adds", {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json'
             }
         });
         
         // Jika respons gagal
         if (!response.ok) {
             throw new Error("Failed to fetch data");
         }
 
         // Mengembalikan data JSON dari API
         return await response.json();
     } catch (error) {
         console.error("Error during fetch:", error);
         throw error;
     }
 }
 