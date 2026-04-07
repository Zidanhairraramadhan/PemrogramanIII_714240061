package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("⚠️ .env tidak ditemukan")
	}

	dsn := os.Getenv("SUPABASE_DSN")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Gagal konek DB:", err)
	}

	DB = db
	fmt.Println("✅ DB Connected")
}

func GetDB() *gorm.DB {
	return DB
}