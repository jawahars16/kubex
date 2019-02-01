package backend

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/jawahars16/kubex/infra"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// WebSocket ...
type WebSocket struct {
	connection *websocket.Conn
}

func (socket WebSocket) Write(msg interface{}) {
	byteSlice, _ := json.Marshal(msg)
	err := socket.connection.WriteMessage(websocket.TextMessage, byteSlice)
	if err != nil {
		println(err)
	}
}

// NewSocket ...
func NewSocket(w http.ResponseWriter, r *http.Request) infra.Socket {
	conn, _ := upgrader.Upgrade(w, r, nil)
	return WebSocket{
		connection: conn,
	}
}
