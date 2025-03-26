// Pastikan Firebase sudah diinisialisasi
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase Auth dan Firestore
const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    if (!form) {
        console.error("Form dengan ID 'productForm' tidak ditemukan!");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Pastikan semua elemen input ada
        const titleInput = document.getElementById("title");
        const hargaInput = document.getElementById("harga");
        const stokInput = document.getElementById("stok");
        const categoriesInput = document.getElementById("categories");
        const tagsInput = document.getElementById("tags");
        const ratingInput = document.getElementById("rating");
        const imageInput = document.getElementById("image");
        const deskripsiInput = document.getElementById("deskripsi");

        if (!titleInput || !hargaInput || !stokInput || !categoriesInput || !tagsInput || !ratingInput || !imageInput || !deskripsiInput) {
            console.error("Satu atau lebih elemen input tidak ditemukan!");
            return;
        }

        const images = imageInput.value.split(",").map(img => img.trim()).filter(img => img !== "");

        const product = {
            title: titleInput.value,
            harga: hargaInput.value,
            stok: stokInput.value,
            categories: categoriesInput.value,
            tags: tagsInput.value,
            rating: parseFloat(ratingInput.value) || 0,
            images: images,
            deskripsi: deskripsiInput.value
        };

        try {
            const user = auth.currentUser;
            if (!user) {
                showAlert("Anda harus login sebagai admin!");
                return;
            }

            // Refresh token untuk memastikan claims terbaru
            await user.getIdToken(true);
            const idTokenResult = await user.getIdTokenResult();

            console.log("User claims:", idTokenResult.claims);

            if (!idTokenResult.claims.admin) {
                showAlert("Anda bukan admin!");
                return;
            }

            await db.collection("products").add(product);
            showAlert("Produk berhasil ditambahkan!", "success");
            form.reset();
            loadProducts();
        } catch (error) {
            console.error("Error:", error);
            showAlert("Gagal menambahkan produk.");
        }
    });

    async function loadProducts() {
        if (!productList) {
            console.error("Elemen 'productList' tidak ditemukan!");
            return;
        }
        
        productList.innerHTML = "";

        try {
            const querySnapshot = await db.collection("products").get();
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const productElement = document.createElement("div");

                let imageSlides = data.images.map((img, index) => `
                    <div class="slide" ${index === 0 ? 'style="display:block;"' : 'style="display:none;"'}>
                        <img src="${img}" alt="Product Image">
                    </div>
                `).join("");

                productElement.innerHTML = `
                    <div class="carousel">
                        ${imageSlides}
                        <button class="prev" onclick="prevSlide(this)">&#10094;</button>
                        <button class="next" onclick="nextSlide(this)">&#10095;</button>
                    </div>
                    <h3>${data.title}</h3>
                    <p>Harga: ${data.harga}</p>
                    <p>${data.deskripsi}</p>
                `;
                productList.appendChild(productElement);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    loadProducts();
});

function showAlert(message, type = "danger") {
    // Buat elemen ion-toast
    const toast = document.createElement("ion-toast");
    toast.message = message;
    toast.duration = 5000;
    toast.color = type; // Bisa "danger" atau "success"
    toast.position = "top"; // Posisi toast

    // Tambahkan ke dalam body dan tampilkan
    document.body.appendChild(toast);
    toast.present();
}
