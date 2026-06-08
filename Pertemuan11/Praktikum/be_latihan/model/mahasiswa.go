package model

type Mahasiswa struct {
	NPM    string `json:"npm" gorm:"column:npm;primaryKey;type:varchar(20)"`
	Nama   string `json:"nama" gorm:"column:nama;type:varchar(100);not null"`
	Prodi  string `json:"prodi" gorm:"column:prodi;type:varchar(100)"`
	Alamat string `json:"alamat" gorm:"column:alamat;type:varchar(255)"`
	Email  string `json:"email" gorm:"column:email;type:varchar(100)"`
	NoHP   string `json:"no_hp" gorm:"column:no_hp;type:varchar(20)"`
}

func (Mahasiswa) TableName() string { return "mahasiswa" }
