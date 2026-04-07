package repository

import (
	"be_latihan/config"
	"be_latihan/model"
)

func GetAllMahasiswa() ([]model.Mahasiswa, error) {
	var data []model.Mahasiswa
	result := config.GetDB().Find(&data)
	return data, result.Error
}

func InsertMahasiswa(mhs *model.Mahasiswa) (*model.Mahasiswa, error) {
	result := config.GetDB().Create(mhs)
	return mhs, result.Error
}

func GetMahasiswaByNPM(npm int64) (model.Mahasiswa, error) {
	var mhs model.Mahasiswa
	result := config.GetDB().First(&mhs, "npm = ?", npm)
	return mhs, result.Error
}

func UpdateMahasiswa(npm int64, newData *model.Mahasiswa) (*model.Mahasiswa, error) {
	var mhs model.Mahasiswa
	db := config.GetDB()

	if err := db.First(&mhs, "npm = ?", npm).Error; err != nil {
		return nil, err
	}

	db.Model(&mhs).Updates(newData)
	return &mhs, nil
}

func DeleteMahasiswa(npm int64) error {
	return config.GetDB().Where("npm = ?", npm).Delete(&model.Mahasiswa{}).Error
}