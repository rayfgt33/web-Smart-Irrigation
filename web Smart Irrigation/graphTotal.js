const ctx4 = document.getElementById('graphTotal');
const apiUrl4 = 'https://blynk.cloud/external/api/get?token=yuAzKSHfrCcg2w26dD9V5pCMb3QvojeL&v8';
let labels4 = [];
let dataValues4 = [];
let chart4; // Variabel untuk menyimpan objek grafik keempat

// Fungsi untuk mengambil data dari API dan memperbarui data pada grafik keempat
function updateFourthChart() {
  fetch(apiUrl4)
    .then(response => response.text())
    .then(data => {
      // Mengubah teks data menjadi array bilangan
      const dataArray = data.split(',').map(Number);

      // Menambah data baru ke dalam array dataValues4
      dataValues4.push(...dataArray);

      // Menghasilkan label waktu untuk sumbu x pada grafik keempat
      const currentTime = new Date();
      labels4.push(currentTime.toLocaleTimeString()); // Menambah waktu saat ini sebagai label

      // Batasi jumlah data menjadi 100 terbaru
      if (dataValues4.length > 100) {
        labels4.splice(0, dataValues4.length - 100);
        dataValues4.splice(0, dataValues4.length - 100);
      }

      // Jika grafik keempat belum ada, buat grafik baru
      if (!chart4) {
        chart4 = new Chart(ctx4, {
          type: 'line',
          data: {
            labels: labels4,
            datasets: [{
              label: 'Total Air (L)',
              data: dataValues4,
              borderColor: 'black' 
            }]
          },
          options: {
            scales: {
              x: {
                // Properti untuk sumbu x
                title: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna label sumbu x
                },
                ticks: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna label angka pada sumbu x
                }
              },
              y: {
                beginAtZero: true,
                // Properti untuk sumbu y
                title: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna label sumbu y
                },
                ticks: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna label angka pada sumbu y
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: 'rgba(0, 0, 0, 0.7)' // Warna teks pada legend
                }
              },
              tooltip: {
                titleFont: {
                  weight: 'bold', // Membuat teks judul tooltip menjadi tebal
                  color: 'white' // Warna teks judul tooltip
                },
                bodyFont: {
                  weight: 'bold', // Membuat teks pada body tooltip menjadi tebal
                  color: 'white' // Warna teks pada body tooltip
                }
              }
            }
          }
        });
      } else {
        // Jika grafik keempat sudah ada, perbarui dataset pada grafik
        chart4.data.labels = labels4;
        chart4.data.datasets[0].data = dataValues4;
        chart4.update(); // Perbarui grafik keempat
      }
    })
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
}

// Panggil fungsi untuk menginisialisasi grafik keempat pertama kali
updateFourthChart();

// Update grafik keempat setiap 5 detik
setInterval(updateFourthChart, 1000); // Ubah interval sesuai kebutuhan
