document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const images = document.getElementById("image").value.split(",").map(img => img.trim()).filter(img => img !== "");

        const product = {
            title: document.getElementById("title").value,
            harga: document.getElementById("harga").value,
            stok: document.getElementById("stok").value,
            categories: document.getElementById("categories").value,
            tags: document.getElementById("tags").value,
            rating: parseFloat(document.getElementById("rating").value),
            images: images,
            deskripsi: document.getElementById("deskripsi").value
        };

        try {
            const user = auth.currentUser;
            if (!user) {
                alert("Anda harus login sebagai admin!");
                return;
            }

            const idTokenResult = await user.getIdTokenResult();
            if (!idTokenResult.claims.admin) {
                alert("Anda bukan admin!");
                return;
            }

            await db.collection("products").add(product);
            alert("Produk berhasil ditambahkan!");
            form.reset();
            loadProducts();
        } catch (error) {
            console.error("Error:", error);
            alert("Gagal menambahkan produk.");
        }
    });

    async function loadProducts() {
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