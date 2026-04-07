package model

import "github.com/lib/pq"

type Mahasiswa struct {
	NPM    int64          `json:"npm" gorm:"primaryKey"`
	Nama   string         `json:"nama"`
	Prodi  string         `json:"prodi"`
	Alamat string         `json:"alamat"`
	Email  string         `json:"email"`
	NoHP   string         `json:"no_hp"`
	Hobi   pq.StringArray `json:"hobi" gorm:"type:text[]"`
}

func (Mahasiswa) TableName() string {
	return "mahasiswa"
}