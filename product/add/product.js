document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    // Fungsi untuk menambahkan produk ke Firestore
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const images = document.getElementById("images").value
            .split(",")
            .map(img => img.trim())
            .filter(img => img !== ""); // Hapus URL kosong

        const product = {
            title: document.getElementById("title").value,
            harga: document.getElementById("harga").value,
            stok: document.getElementById("stok").value,
            categories: document.getElementById("categories").value,
            tags: document.getElementById("tags").value,
            rating: parseFloat(document.getElementById("rating").value),
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
                    imageSlides += `<div class="slide" ${index === 0 ? 'style="display:block;"' : 'style="display:none;"'}>
                        <img src="${img}" alt="Product Image">
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
        let current = carousel.querySelector(".slide[style*='display: block']");
        let index = Array.from(slides).indexOf(current);

        slides[index].style.display = "none";
        let nextIndex = (index + 1) % slides.length;
        slides[nextIndex].style.display = "block";
    };

    window.prevSlide = function (btn) {
        const carousel = btn.closest(".carousel");
        const slides = carousel.querySelectorAll(".slide");
        let current = carousel.querySelector(".slide[style*='display: block']");
        let index = Array.from(slides).indexOf(current);

        slides[index].style.display = "none";
        let prevIndex = (index - 1 + slides.length) % slides.length;
        slides[prevIndex].style.display = "block";
    };

    // Panggil fungsi untuk memuat produk saat halaman dimuat
    loadProducts();
});