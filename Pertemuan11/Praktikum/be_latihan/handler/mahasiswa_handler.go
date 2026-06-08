package handler

import (
	"be_latihan/model"
	"be_latihan/repository"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func GetAllMahasiswa(c *fiber.Ctx) error {
	mahasiswas, err := repository.GetAllMahasiswa()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal mengambil data mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "berhasil mengambil data mahasiswa",
		Data:    mahasiswas,
	})
}

func GetMahasiswaByNPM(c *fiber.Ctx) error {
	npm := c.Params("npm")
	mahasiswa, err := repository.GetMahasiswaByNPM(npm)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(model.Response{
				Message: "mahasiswa tidak ditemukan",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal mengambil data mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "data mahasiswa ditemukan",
		Data:    mahasiswa,
	})
}

func InsertMahasiswa(c *fiber.Ctx) error {
	var mahasiswa model.Mahasiswa
	if err := c.BodyParser(&mahasiswa); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	if mahasiswa.NPM == "" || mahasiswa.Nama == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "npm dan nama wajib diisi",
		})
	}

	data, err := repository.InsertMahasiswa(&mahasiswa)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal menambahkan mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(model.Response{
		Message: "mahasiswa berhasil ditambahkan",
		Data:    data,
	})
}

func UpdateMahasiswa(c *fiber.Ctx) error {
	npm := c.Params("npm")
	var mahasiswa model.Mahasiswa
	if err := c.BodyParser(&mahasiswa); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	data, err := repository.UpdateMahasiswa(npm, &mahasiswa)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(model.Response{
				Message: "mahasiswa tidak ditemukan",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal mengupdate mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "mahasiswa berhasil diupdate",
		Data:    data,
	})
}

func DeleteMahasiswa(c *fiber.Ctx) error {
	npm := c.Params("npm")
	err := repository.DeleteMahasiswa(npm)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal menghapus mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "mahasiswa berhasil dihapus",
	})
}
