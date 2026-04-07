package main

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/repository"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	config.InitDB()
	config.GetDB().AutoMigrate(&model.Mahasiswa{})

	// 🔥 CREATE
	app.Post("/mahasiswa", func(c *fiber.Ctx) error {
		var mhs model.Mahasiswa
		if err := c.BodyParser(&mhs); err != nil {
			return err
		}
		data, err := repository.InsertMahasiswa(&mhs)
		if err != nil {
			return err
		}
		return c.JSON(data)
	})

	// 🔥 READ ALL
	app.Get("/mahasiswa", func(c *fiber.Ctx) error {
		data, _ := repository.GetAllMahasiswa()
		return c.JSON(data)
	})

	// 🔥 READ BY NPM
	app.Get("/mahasiswa/:npm", func(c *fiber.Ctx) error {
		npm, _ := strconv.ParseInt(c.Params("npm"), 10, 64)
		data, _ := repository.GetMahasiswaByNPM(npm)
		return c.JSON(data)
	})

	// 🔥 UPDATE
	app.Put("/mahasiswa/:npm", func(c *fiber.Ctx) error {
		npm, _ := strconv.ParseInt(c.Params("npm"), 10, 64)

		var mhs model.Mahasiswa
		c.BodyParser(&mhs)

		data, _ := repository.UpdateMahasiswa(npm, &mhs)
		return c.JSON(data)
	})

	// 🔥 DELETE
	app.Delete("/mahasiswa/:npm", func(c *fiber.Ctx) error {
		npm, _ := strconv.ParseInt(c.Params("npm"), 10, 64)
		repository.DeleteMahasiswa(npm)
		return c.SendString("Deleted")
	})

	app.Listen(":3000")
}