---

title: "Workers AI: Cara Menjalankan Model AI Secara Serverless di Cloudflare"
img: "https://placehold.co/600x400/18181b/ffffff/png?text=Workers+AI"
date: 2026-09-12 10:00:00 +0700
categories: [Teknologi]
tags: [AI, Workers AI, Cloudflare, Developer, Serverless]
read_time: "8 min read"
excerpt: "Pelajari apa itu Workers AI, cara menggunakan AI binding, menjalankan model AI dari Cloudflare Worker, hingga tips membangun aplikasi AI yang siap production."
---

Workers AI: Cara Menjalankan Model AI Secara Serverless di Cloudflare

Membangun aplikasi berbasis AI biasanya berarti kita harus berurusan dengan API provider, authentication, latency, scaling, dan infrastruktur untuk menjalankan model.

Workers AI menawarkan pendekatan yang berbeda.

Dengan Workers AI, developer dapat menjalankan model machine learning melalui infrastruktur serverless Cloudflare dan mengaksesnya langsung dari Cloudflare Workers. Cloudflare menyediakan model catalog yang berisi berbagai model untuk text generation, embeddings, image generation, speech, dan kebutuhan AI lainnya.

Bagi developer yang sudah menggunakan Cloudflare Workers, pendekatan ini menarik karena aplikasi dan inference AI dapat ditempatkan dalam ekosistem yang sama.

Apa Itu Workers AI?

Workers AI adalah layanan Cloudflare untuk menjalankan model AI menggunakan GPU serverless pada jaringan global Cloudflare.

Alih-alih menyiapkan server GPU sendiri, developer cukup memanggil model melalui API atau Workers AI binding dari sebuah Worker.

Arsitektur sederhananya terlihat seperti ini:
```text
User
  │
  ▼
Frontend
  │
  ▼
Cloudflare Worker
  │
  ▼
Workers AI
  │
  ▼
AI Model
  │
  ▼
Response
```
Pendekatan tersebut cocok untuk aplikasi seperti:

- AI chatbot
- coding assistant
- text summarizer
- content generator
- sentiment analysis
- recommendation system
- AI customer service
- document processing
- AI agent

Cloudflare juga terus memperbarui model catalog-nya. Dokumentasi model saat ini mencantumkan puluhan model dari berbagai provider dan untuk berbagai task.

Mengapa Developer Menggunakan Workers AI?

Ada beberapa alasan mengapa Workers AI menarik untuk developer yang sudah berada di ekosistem Cloudflare.

Serverless AI

Developer tidak perlu mengelola server GPU secara langsung.

Worker menerima request, menjalankan inference melalui binding, kemudian mengembalikan hasil kepada client.

Model serverless seperti ini membantu mengurangi pekerjaan infrastruktur dan memungkinkan developer fokus pada aplikasi.

Terintegrasi dengan Cloudflare Workers

Workers AI dapat digunakan langsung melalui binding.

Setelah binding dikonfigurasi, kode Worker dapat mengaksesnya melalui:
```bash
env.AI
```
Kemudian model dijalankan menggunakan:
```bash
env.AI.run()
```
Cloudflare mendokumentasikan AI binding sebagai cara utama untuk menghubungkan Worker dengan Workers AI.

Tidak Perlu API Key Model di Frontend

Salah satu keuntungan penting dari arsitektur ini adalah frontend tidak perlu berkomunikasi langsung dengan provider AI.

Client cukup memanggil endpoint Worker:
```
Browser → Worker → Workers AI
```
Secret dan logic AI tetap berada di sisi server.

Ini jauh lebih aman dibandingkan menaruh credential provider AI di JavaScript frontend.

Cara Memulai Workers AI

Cloudflare menyediakan beberapa cara untuk memulai project Workers AI, termasuk Workers binding, REST API, dan Cloudflare Dashboard. Untuk project development yang serius, pendekatan berbasis Worker dan Wrangler biasanya lebih fleksibel.

1. Buat Project Worker

Salah satu cara yang direkomendasikan adalah menggunakan Cloudflare CLI:

npm create cloudflare@latest -- my-ai-worker

Kemudian masuk ke directory project:

cd my-ai-worker

Cloudflare saat ini menggunakan "create-cloudflare" atau C3 untuk membantu membuat project Worker baru.

2. Tambahkan Workers AI Binding

Konfigurasi binding pada Wrangler dapat dibuat seperti berikut:
```json
{
  "ai": {
    "binding": "AI"
  }
}
```
Setelah itu, binding tersebut tersedia di dalam Worker sebagai:
```bash
env.AI
```
Jika menggunakan TypeScript, generate ulang type setelah mengubah konfigurasi Wrangler:
```bash
npx wrangler types
```
Cloudflare juga mendokumentasikan binding yang sama untuk konfigurasi TOML maupun JSON.

Membuat AI API Sederhana

Setelah binding tersedia, kita dapat menjalankan model menggunakan "env.AI.run()".

Contoh sederhana:
```ts
export default {
  async fetch(request, env) {
    const result = await env.AI.run(
      "@cf/meta/llama-3.1-8b-instruct",
      {
        prompt: "Jelaskan apa itu Cloudflare Workers dalam 3 kalimat."
      }
    );

    return Response.json(result);
  }
};
```
Konsepnya sederhana:
```text
HTTP Request
     ↓
Worker
     ↓
env.AI.run()
     ↓
Workers AI Model
     ↓
JSON Response
```
Cloudflare menyediakan "env.AI.run()" untuk menjalankan model dengan nama model sebagai parameter pertama dan input sebagai parameter kedua.

Menggunakan Chat Prompt

Untuk aplikasi chatbot, pendekatan berbasis messages biasanya lebih cocok daripada prompt tunggal.

Contohnya:
```ts
const result = await env.AI.run(
  "@cf/meta/llama-3.1-8b-instruct",
  {
    messages: [
      {
        role: "system",
        content: "You are a helpful programming assistant."
      },
      {
        role: "user",
        content: "Jelaskan apa itu Cloudflare Workers."
      }
    ]
  }
);
```
Format seperti ini membuat developer dapat memisahkan instruksi sistem dan input pengguna.

Cloudflare juga menyediakan mekanisme scoped prompts untuk membantu developer menggunakan format prompt yang sesuai dengan model tanpa harus menangani template chat masing-masing model secara manual.

Streaming Response

Untuk chatbot, menunggu seluruh jawaban selesai sebelum mengirim response dapat membuat aplikasi terasa lambat.

Workers AI mendukung streaming response untuk model yang mendukungnya.

Contoh:
```ts
const response = await env.AI.run(
  "@cf/meta/llama-3.1-8b-instruct",
  {
    prompt: "Jelaskan JavaScript untuk pemula.",
    stream: true
  }
);

return new Response(response, {
  headers: {
    "content-type": "text/event-stream"
  }
});
```
Dengan streaming, token hasil inference dapat dikirim ketika tersedia sehingga UI chatbot dapat mulai menampilkan jawaban lebih cepat.

Bagaimana Memilih Model Workers AI?

Jangan memilih model hanya berdasarkan ukuran parameter.

Developer sebaiknya mempertimbangkan:

- kemampuan reasoning
- coding performance
- context window
- latency
- multimodal support
- function calling
- biaya
- kebutuhan aplikasi

Model catalog Workers AI terus berubah. Karena itu, selalu periksa catalog resmi sebelum mengunci nama model di aplikasi production. Dokumentasi Cloudflare saat ini menyediakan daftar model dan filter berdasarkan task, capability, dan provider.

Untuk aplikasi sederhana, model yang lebih kecil dan cepat sering kali lebih masuk akal daripada model terbesar.

Sebaliknya, aplikasi coding assistant atau agent mungkin membutuhkan model dengan kemampuan reasoning dan context yang lebih besar.

Function Calling untuk AI Agent

Workers AI juga dapat digunakan untuk membangun aplikasi yang tidak hanya menghasilkan teks.

Dengan function calling, model dapat menentukan kapan sebuah function perlu dijalankan.

Contohnya:
```
User
 ↓
AI Model
 ↓
"User ingin melihat saldo"
 ↓
Function: getBalance()
 ↓
Database / API
 ↓
Result
 ↓
AI
 ↓
Jawaban ke User
```
Ini sangat berguna untuk membangun AI agent.

Misalnya sebuah chatbot e-commerce dapat memiliki tools:
```
const tools = {
  searchProduct,
  getProductDetail,
  checkStock,
  createOrder
};
```
Model kemudian dapat menentukan function yang relevan berdasarkan permintaan pengguna.

Cloudflare menyediakan embedded function calling dan "@cloudflare/ai-utils" untuk membantu implementasi workflow tersebut.

Workers AI untuk Project Production

Prototype AI dapat dibuat dalam beberapa menit.

Tetapi production membutuhkan perhatian lebih.

Validasi Input

Jangan langsung meneruskan semua input pengguna ke model.

Validasi ukuran request dan parameter terlebih dahulu.
```
if (prompt.length > 4000) {
  return new Response("Prompt too long", {
    status: 400
  });
}
```
Rate Limiting

Endpoint AI sebaiknya memiliki rate limiting.

Tanpa pembatasan, satu user dapat menghasilkan terlalu banyak inference request.

Rate limiting dapat ditempatkan pada layer aplikasi atau menggunakan layanan Cloudflare yang sesuai.

Jangan Expose Secret

Frontend seharusnya memanggil:
```
/api/chat
```
bukan menyimpan credential AI provider di:
```
const API_KEY = "secret...";
```
Semua credential dan logic sensitif harus tetap berada di server.

Gunakan AI Gateway Bila Diperlukan

Untuk aplikasi yang lebih kompleks, Cloudflare AI Gateway dapat digunakan sebagai control layer untuk aplikasi AI.

AI Gateway menyediakan fitur seperti analytics, logging, caching, security, rate limiting, retries, dan model routing.

Arsitekturnya dapat menjadi:
```
Frontend
   ↓
Cloudflare Worker
   ↓
AI Gateway
   ↓
Workers AI / Model Provider
```
Ini menjadi menarik ketika aplikasi mulai menggunakan banyak model atau membutuhkan observability yang lebih baik.

Workers AI vs API AI Eksternal

Apakah Workers AI selalu menjadi pilihan terbaik?

Tidak juga.

Jika aplikasi sudah sangat bergantung pada provider tertentu, menggunakan API provider tersebut mungkin lebih sederhana.

Namun Workers AI memiliki keunggulan ketika aplikasi sudah menggunakan:

- Cloudflare Workers
- Cloudflare Pages
- R2
- KV
- Durable Objects
- Vectorize
- AI Gateway

Dalam kondisi tersebut, developer dapat membangun sebagian besar stack AI di dalam ekosistem Cloudflare.

Cloudflare sendiri menyediakan produk AI lain seperti Vectorize, Agents, AI Search, dan AI Gateway sehingga Workers AI dapat menjadi salah satu bagian dari arsitektur AI yang lebih besar.

Contoh Arsitektur AI Modern di Cloudflare

Untuk aplikasi AI yang lebih kompleks, arsitekturnya dapat terlihat seperti ini:
```
                ┌──────────────┐
                │   Frontend   │
                └──────┬───────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Cloudflare      │
              │ Worker          │
              └────────┬────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Workers AI   AI Gateway   Vectorize
          │            │            │
          ▼            ▼            ▼
        Model       Routing       RAG
```
Dengan kombinasi tersebut, Worker dapat menjadi orchestration layer untuk aplikasi AI.

Kesimpulan

Workers AI memberikan cara praktis bagi developer untuk menambahkan kemampuan AI ke aplikasi serverless tanpa harus mengelola infrastruktur GPU sendiri.

Konsep dasarnya sederhana:
```
const result = await env.AI.run(
  "MODEL_NAME",
  input
);
```
Tetapi kemampuan yang dapat dibangun jauh lebih luas daripada sekadar chatbot.

Dengan streaming, function calling, AI Gateway, Vectorize, dan layanan Cloudflare lainnya, Workers AI dapat digunakan sebagai fondasi untuk membangun AI application, RAG system, chatbot, coding assistant, hingga AI agent.

Hal terpenting adalah jangan memulai dari pertanyaan:

«"Model AI apa yang paling besar?"»

Mulailah dari:

«"Masalah apa yang ingin diselesaikan aplikasi saya?"»

Kemudian pilih model, arsitektur, dan layanan Cloudflare berdasarkan kebutuhan tersebut.

Untuk developer yang sudah menggunakan Cloudflare Workers, Workers AI layak dipertimbangkan sebagai salah satu opsi utama ketika ingin membawa kemampuan AI langsung ke dalam aplikasi serverless.