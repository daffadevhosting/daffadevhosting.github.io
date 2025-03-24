        // Inisialisasi Firebase
        const firebaseConfig = {
            apiKey: "{{site.apiKey}}",
            authDomain: "{{site.authDomain}}",
            databaseURL: "{{site.databaseURL}}",
            projectId: "{{site.projectId}}",
            storageBucket: "{{site.storageBucket}}",
            messagingSenderId: "{{site.senderId}}",
            appId: "{{site.appId}}"
        };

        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    // Fungsi untuk menambahkan produk ke Firestore
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const images = document.getElementById("images").value.split(",").map(img => img.trim()); // Ubah input menjadi array

        const product = {
            title: document.getElementById("title").value,
            harga: document.getElementById("harga").value,
            stok: document.getElementById("stok").value,
            categories: document.getElementById("categories").value,
            tags: document.getElementById("tags").value,
            rating: document.getElementById("rating").value,
            images: images, // Simpan sebagai array
            deskripsi: document.getElementById("deskripsi").value
        };

        try {
            await db.collection("products").add(product);
            alert("Produk berhasil ditambahkan!");
            form.reset();
            loadProducts(); // Refresh daftar produk
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menambahkan produk.");
        }
    });

    // Fungsi untuk mengambil dan menampilkan produk dari Firestore
    async function loadProducts() {
        productList.innerHTML = ""; // Kosongkan daftar sebelum memperbarui

        try {
            const querySnapshot = await db.collection("products").get();
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const productElement = document.createElement("div");
                productElement.classList.add("product-item");

                // Buat slide gambar (carousel)
                let imageSlides = "";
                data.images.forEach((img, index) => {
                    imageSlides += `<div class="slide" style="display:${index === 0 ? 'block' : 'none'};">
                        <img src="${img}" alt="Product Image" style="width:100%; max-height:200px;">
                    </div>`;
                });

                productElement.innerHTML = `
                    <div class="carousel">
                        ${imageSlides}
                        <button class="prev" onclick="prevSlide(this)">&#10094;</button>
                        <button class="next" onclick="nextSlide(this)">&#10095;</button>
                    </div>
                    <h3>${data.title}</h3>
                    <p>Harga: ${data.harga}</p>
                    <p>Stok: ${data.stok}</p>
                    <p>Kategori: ${data.categories}</p>
                    <p>Tag: ${data.tags}</p>
                    <p>Rating: ${data.rating}</p>
                    <p>${data.deskripsi}</p>
                    <hr>
                `;
                productList.appendChild(productElement);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Fungsi untuk navigasi slide
    window.nextSlide = function (btn) {
        const carousel = btn.closest(".carousel");
        const slides = carousel.querySelectorAll(".slide");
        let currentIndex = Array.from(slides).findIndex(slide => slide.style.display === "block");

        slides[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].style.display = "block";
    };

    window.prevSlide = function (btn) {
        const carousel = btn.closest(".carousel");
        const slides = carousel.querySelectorAll(".slide");
        let currentIndex = Array.from(slides).findIndex(slide => slide.style.display === "block");

        slides[currentIndex].style.display = "none";
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        slides[currentIndex].style.display = "block";
    };

    // Panggil fungsi untuk memuat produk saat halaman dimuat
    loadProducts();
});