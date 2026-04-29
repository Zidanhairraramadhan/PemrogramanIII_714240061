package main

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/router"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	// Basic CORS
	app.Use(cors.New(cors.Config{
	AllowOrigins: "*",
	AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
	AllowHeaders: "*",
}))


	// Inisialisasi database
	config.InitDB()

	//automigrate
	config.GetDB().AutoMigrate(&model.Mahasiswa{})
	router.SetupRoutes(app)

	app.Listen(":3000")
}