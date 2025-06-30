const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/send-template', async (req, res) => {
  const { to, templateName, variables } = req.body;

  const payload = {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: templateName,
      language: { code: "pt_BR" },
      components: [
        {
          type: "body",
          parameters: variables.map(text => ({ type: "text", text }))
        }
      ]
    }
  };

  try {
    const response = await axios.post(
      "https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages",
      payload,
      {
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json"
        }
      }
    );
    res.json({ status: "enviado", response: response.data });
  } catch (error) {
    res.status(500).json({ error: error.response.data });
  }
});

app.listen(3000, () => console.log('Servidor de envio de templates ativo!'));