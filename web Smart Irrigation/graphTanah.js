const ctx = document.getElementById('graphTanah');
const graphTanahurl = 'https://blynk.cloud/external/api/get?token=yuAzKSHfrCcg2w26dD9V5pCMb3QvojeL&v6';
let labels = [];
let dataValues = [];
let chart; // Variabel untuk menyimpan objek grafik

// Fungsi untuk mengambil data dari API dan memperbarui data pada grafik
function updateChart() {
  fetch(graphTanahurl)
    .then(response => response.text())
    .then(data => {
      // Mengubah teks data menjadi array bilangan
      const dataArray = data.split(',').map(Number);

      // Menambah data baru ke dalam array dataValues
      dataValues.push(...dataArray);

      // Menghasilkan label waktu untuk sumbu x
      const currentTime = new Date();
      labels.push(currentTime.toLocaleTimeString()); // Menambah waktu saat ini sebagai label

    // Batasi jumlah data menjadi 100 terbaru
    if (dataValues.length > 100) {
        labels.splice(0, dataValues.length - 100);
        dataValues.splice(0, dataValues.length - 100);
      }

      // Jika grafik belum ada, buat grafik baru
      if (!chart) {
        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Kelembapan Tanah (%)',
              data: dataValues,
              borderColor: 'black' 
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        // Jika grafik sudah ada, perbarui dataset pada grafik
        chart.data.labels = labels;
        chart.data.datasets[0].data = dataValues;
        chart.update(); // Perbarui grafik
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

// Panggil fungsi untuk menginisialisasi grafik pertama kali
updateChart();

// Update grafik setiap 5 detik
setInterval(updateChart, 1000); // Ubah interval sesuai kebutuhan
