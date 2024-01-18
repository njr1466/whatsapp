const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
const client = require('twilio')('ACd1a9dc3416229f353ede912b01e15554', '03982081fb4dd35a7d851e784653b8ed');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhook', (req, res) => {
  const incomingMsg = req.body.Body || '';
  const senderNumber = req.body.From || '';

  // Sua lógica do chatbot aqui
  const responseMsg = getResponse(incomingMsg);

  // Enviar a resposta de volta para o remetente
  sendWhatsAppMessage(senderNumber, responseMsg);

  res.sendStatus(204);
});

function getResponse(msg) {
  // Implemente sua lógica do chatbot aqui
  // Este é apenas um exemplo simples
  if (msg.includes('Olá')) {
    return 'Olá! Como posso ajudar você?';
  } else if (msg.includes('Ajuda')) {
    return 'Estou aqui para ajudar! Digite sua pergunta.';
  } else {
    return 'Desculpe, não entendi. Pode repetir, por favor?';
  }
}

function sendWhatsAppMessage(to, body) {

client.messages
    .create({
        body: 'Olá bem vindo',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+558183554240'
    })
    .then(message => console.log(message.sid))
    .done();
}

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
