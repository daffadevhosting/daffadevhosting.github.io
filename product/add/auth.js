document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const productForm = document.getElementById("productForm");

    // 🔹 Cek apakah elemen ada sebelum menambahkan event listener
    if (loginBtn && logoutBtn && productForm) {
        
        loginBtn.addEventListener("click", async function () {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Cek apakah user adalah admin
                const idTokenResult = await user.getIdTokenResult();
                if (idTokenResult.claims.admin) {
                    showAlert("Login berhasil sebagai admin");
                    updateUI(true);
                } else {
                    showAlert("Anda bukan admin!");
                    auth.signOut();
                }
            } catch (error) {
                showAlert("Login gagal: " + error.message);
            }
        });

        logoutBtn.addEventListener("click", function () {
            auth.signOut().then(() => {
                showAlert("Logout berhasil");
                updateUI(false);
            });
        });

        // 🔹 Fungsi untuk memperbarui UI sesuai status login
        function updateUI(isAdmin) {
            if (isAdmin) {
                productForm.style.display = "block";
                loginBtn.style.display = "none";
                logoutBtn.style.display = "block";
            } else {
                productForm.style.display = "none";
                loginBtn.style.display = "block";
                logoutBtn.style.display = "none";
            }
        }

        // 🔹 Cek status login saat halaman dimuat
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                updateUI(idTokenResult.claims.admin);
            } else {
                updateUI(false);
            }
        });

    } else {
        console.error("Elemen yang diperlukan tidak ditemukan di halaman!");
    }
});

function showAlert(message) {
    // Buat elemen ion-toast
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = 5000;
    toast.color = "danger"; // Bisa diubah sesuai kebutuhan
    toast.position = "top"; // Posisi toast

    // Tambahkan ke dalam body dan tampilkan
    document.body.appendChild(toast);
    toast.present();
}