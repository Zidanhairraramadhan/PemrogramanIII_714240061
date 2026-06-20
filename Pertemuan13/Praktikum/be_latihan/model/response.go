package model

type Response struct {
	Message string      `json:"message" example:"detail pesan"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty" example:"detail error"`
}
