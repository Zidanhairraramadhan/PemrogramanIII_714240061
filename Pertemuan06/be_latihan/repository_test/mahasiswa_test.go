package repositorytest

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/repository"
	"fmt"
	"testing"
	"time"
)

func setupTest(t *testing.T) {
	config.InitDB()

	err := config.GetDB().AutoMigrate(&model.Mahasiswa{})
	if err != nil {
		t.Fatalf("Migration failed : %v", err)
	}
}

func TestInsertMahasiswa(t *testing.T) {
	setupTest(t)

	npm := time.Now().UnixNano()

	mhs := model.Mahasiswa {
		NPM : npm,
		Nama : "Test User",
		Prodi : "Teknik Informatika",
		Alamat: "Bandung",
		Email: "Baihaqisiregar09@ggmail.com",
		NoHP:   "081366299487",
		Hobi: []string{"Ngoding", "Main Game ML"},
	}

	_,err := repository.InsertMahasiswa(&mhs)
	if err != nil {
		t.Errorf("Insert failed : %v", err)
	}
	fmt.Printf("Berhasil, NPM yang ditambahkan: %d\n", npm)
}

func TestGetAllMahasiswa(t *testing.T) {
	setupTest(t)

	data,err := repository.GetAllMahasiswa()
	if err != nil {
		t.Errorf("GetAll failed : %v", err)
	}

	if len(data) == 0 {
		t.Error("Data kosong")
	}
	fmt.Printf("Data di table : %v\n", data)
}

func TestGetMahasiswaByNPM(t *testing.T) {
	setupTest(t)

	npm := int64(1)

	mhs, err := repository.GetMahasiswaByNPM(npm)
	if err != nil {
		t.Errorf("GetByNPM gagal : %v", err)
	}

	if mhs.NPM != npm {
		t.Errorf("Expected %d, got %d", npm, mhs.NPM)
	}
	fmt.Printf("Data ditemukan : %+v\n", mhs)
}

func TestUpdateMahasiswa(t *testing.T) {
	setupTest(t)

	npm := int64(1775410857780493700)

	_,err := repository.UpdateMahasiswa(npm, &model.Mahasiswa{
		NPM : npm,
		Nama : "Test Update",
		Prodi : "D4 Teknik Informatika",
		Alamat: "Bandung",
		Email: "Baihaqisiregar09@ggmail.com",
		Hobi: []string{"Membaca", "Tidur"},
	})

	if err!= nil {
		t.Errorf("Update failed : %v", err)
	}
	fmt.Printf("Berhasil, NPM yang diubah: %d\n", npm)
}

func TestDeleteMahasiswa(t *testing.T) {
	setupTest(t)

	npm := int64(1775410857780493700)

	err := repository.DeleteMahasiswa(npm)
	if err != nil {
		t.Errorf("Delete failed : %v", err)
	}
}