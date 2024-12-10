import React, { useState } from 'react'
import { CContainer, CRow, CCol, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChatBubble } from '@coreui/icons'
import axios from 'axios'

const Estela = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isWelcomeScreenVisible, setIsWelcomeScreenVisible] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Olá! Como posso ajudar?' }])
  const [userInput, setUserInput] = useState('')

  const handleStartChat = () => {
    setIsWelcomeScreenVisible(false)
    setIsChatOpen(true)
  }

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setMessages([...messages, { from: 'user', text: userInput }])
      setUserInput('')

      try {
        const response = await axios.post('http://54.91.243.106:5000/chatbot', {
          query: userInput,
        })

        setMessages((prevMessages) => [
          ...prevMessages,
          { from: 'bot', text: response.data.response },
        ])
      } catch (error) {
        console.error('Erro ao comunicar com o backend:', error)
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: 'bot', text: 'Desculpe, houve um erro. Tente novamente.' },
        ])
      }
    }
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-start">
      <CContainer>
        <div
          className="chat-icon"
          onClick={() => setIsWelcomeScreenVisible(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '70px',
            height: '70px',
            backgroundColor: '#1e90ff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          <CIcon icon={cilChatBubble} style={{ width: '35px', height: '35px' }} />
        </div>

        {isWelcomeScreenVisible && (
          <div
            className="welcome-screen"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '350px',
              height: '450px',
              padding: '40px',
              textAlign: 'center',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              fontFamily: 'Arial, sans-serif',
              backgroundColor: '#fff',
              zIndex: 2000,
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2335/2335114.png"
              alt="Estela"
              style={{ width: '120px', borderRadius: '50%' }}
            />
            <h2 style={{ color: 'black' }}>FATEC</h2>
            <p style={{ color: 'black' }}>
              Olá, seja bem-vindo(a)! Sou a Estela, seu contato inteligente da FATEC 🐝
            </p>
            <button
              onClick={handleStartChat}
              style={{
                padding: '15px 30px',
                marginTop: '30px',
                fontSize: '18px',
                backgroundColor: '#1e90ff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Falar com Estela
            </button>
          </div>
        )}

        {isChatOpen && (
          <div
            className="chat-screen"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '400px',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              fontFamily: 'Arial, sans-serif',
              backgroundColor: '#f9f9f9',
              zIndex: 1000,
            }}
          >
            <div
              className="chat-header"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: '#1e90ff',
                color: '#fff',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                position: 'relative',
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2335/2335114.png"
                alt="Estela"
                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
              />
              <h3>Estela</h3>
              <button
                onClick={handleCloseChat}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                }}
              >
                X
              </button>
            </div>
            <div
              className="chat-messages"
              style={{
                flex: 1,
                padding: '15px',
                overflowY: 'auto',
                backgroundColor: '#e0e0e0',
                maxHeight: '320px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={message.from === 'bot' ? 'bot-message' : 'user-message'}
                  style={{
                    padding: '12px',
                    margin: '12px 0',
                    borderRadius: '8px',
                    width: 'fit-content',
                    maxWidth: '80%',
                    fontSize: '16px',
                    backgroundColor: message.from === 'bot' ? '#fff' : '#1e90ff',
                    color: message.from === 'bot' ? '#333' : '#fff',
                    alignSelf: message.from === 'bot' ? 'flex-start' : 'flex-end',
                    textAlign: message.from === 'bot' ? 'left' : 'right',
                    display: 'flex',
                    justifyContent: message.from === 'bot' ? 'flex-start' : 'flex-end',
                  }}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div
              className="chat-input"
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '100%',
                padding: '15px',
                backgroundColor: '#fff',
                borderTop: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                type="text"
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Escreva uma mensagem..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginRight: '10px',
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  padding: '12px 20px',
                  fontSize: '16px',
                  backgroundColor: '#1e90ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </CContainer>
    </div>
  )
}

export default Estela
