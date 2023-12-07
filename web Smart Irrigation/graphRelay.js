const ctx2 = document.getElementById('graphRelay');
const apiUrl2 = 'https://blynk.cloud/external/api/get?token=yuAzKSHfrCcg2w26dD9V5pCMb3QvojeL&v3';
let labels2 = [];
let dataValues2 = [];
let chart2; // Variabel untuk menyimpan objek grafik kedua

// Fungsi untuk mengambil data dari API dan memperbarui data pada grafik kedua
function updateSecondChart() {
  fetch(apiUrl2)
    .then(response => response.text())
    .then(data => {
      // Mengubah teks data menjadi array bilangan
      const dataArray = data.split(',').map(Number);

      // Menambah data baru ke dalam array dataValues2
      dataValues2.push(...dataArray);

      // Menghasilkan label waktu untuk sumbu x pada grafik kedua
      const currentTime = new Date();
      labels2.push(currentTime.toLocaleTimeString()); // Menambah waktu saat ini sebagai label

      // Batasi jumlah data menjadi 100 terbaru
      if (dataValues2.length > 100) {
        labels2.splice(0, dataValues2.length - 100);
        dataValues2.splice(0, dataValues2.length - 100);
      }

      // Jika grafik kedua belum ada, buat grafik baru
      if (!chart2) {
        chart2 = new Chart(ctx2, {
          type: 'line',
          data: {
            labels: labels2,
            datasets: [{
              label: 'Nilai Relay',
              data: dataValues2,
              borderColor: 'black' 
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
                    labels: {
                        fontColor :'rgba(0, 0, 255, 1)'
                    }
              }
            }
          });
      } else {
        // Jika grafik kedua sudah ada, perbarui dataset pada grafik
        chart2.data.labels = labels2;
        chart2.data.datasets[0].data = dataValues2;
        chart2.update(); // Perbarui grafik kedua
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

// Panggil fungsi untuk menginisialisasi grafik kedua pertama kali
updateSecondChart();

// Update grafik kedua setiap 5 detik
setInterval(updateSecondChart, 1000); // Ubah interval sesuai kebutuhan
