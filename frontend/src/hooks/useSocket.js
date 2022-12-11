import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const END_POINT = 'http://localhost:8000/'

function useSocket(userData) {
  const [connected, setConnected] = useState(false)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const tempSocket = io.connect(END_POINT)
    if (userData !== null) {
      tempSocket.emit('SET_UP', userData)
      tempSocket.on('CONNECTED', () => {
        console.log(`CONNECTED ::::>>>>>`)
        setConnected(true)
        setSocket(tempSocket)
      })
    }
    return () => {
      tempSocket.off('connect')
      tempSocket.off('disconnect')
      tempSocket.off('pong')
    }
  }, [userData])
  return { socket, connected }
}

export default useSocket
