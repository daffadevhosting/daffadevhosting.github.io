const firebaseConfig = {
  apiKey: "AIzaSyA3ra4E7chQhRzERyKW2aFUTRULMb10vxM",
  authDomain: "blogdaffadev.firebaseapp.com",
  databaseURL: "https://blogdaffadev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "blogdaffadev",
  storageBucket: "blogdaffadev.firebasestorage.app",
  messagingSenderId: "489703180131",
  appId: "1:489703180131:web:4383f5ef04c1d414ce3556",
  measurementId: "G-ZWW4K4NVQ6"
};

// Inisialisasi Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const productForm = document.getElementById("productForm");

    loginBtn.addEventListener("click", async function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Cek apakah user adalah admin
            const idTokenResult = await user.getIdTokenResult();
            if (idTokenResult.claims.admin) {
                alert("Login berhasil sebagai admin");
                productForm.style.display = "block";
                loginBtn.style.display = "none";
                logoutBtn.style.display = "block";
            } else {
                alert("Anda bukan admin!");
                auth.signOut();
            }
        } catch (error) {
            alert("Login gagal: " + error.message);
        }
    });

    logoutBtn.addEventListener("click", function () {
        auth.signOut().then(() => {
            alert("Logout berhasil");
            productForm.style.display = "none";
            loginBtn.style.display = "block";
            logoutBtn.style.display = "none";
        });
    });

    // Cek status login saat halaman dimuat
    auth.onAuthStateChanged(user => {
        if (user) {
            user.getIdTokenResult().then(idTokenResult => {
                if (idTokenResult.claims.admin) {
                    productForm.style.display = "block";
                    loginBtn.style.display = "none";
                    logoutBtn.style.display = "block";
                } else {
                    productForm.style.display = "none";
                }
            });
        } else {
            productForm.style.display = "none";
            loginBtn.style.display = "block";
            logoutBtn.style.display = "none";
        }
    });
});