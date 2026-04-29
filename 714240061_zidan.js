const fs = require('fs');

const data = fs.readFileSync('714240061_zidan.json', 'utf-8');

let mahasiswa = JSON.parse(data);

mahasiswa.forEach(mhs => {
    mhs.umur += 1;
    mhs.status = mhs.aktif ? "Aktif" : "Tidak Aktif";
});

const hasil = JSON.stringify(mahasiswa, null, 2);

console.log(hasil);

fs.writeFileSync('hasil.json', hasil);