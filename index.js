// Express server wich will handle api Requests
const OpenAi = require('openai')
const {Configuration, OpenAIApi} = OpenAi

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3001

const configuration = new Configuration({
  apiKey: process.env.API,
})

const openai = new OpenAIApi(configuration)

app.use(bodyParser.json())
app.use(cors())

app.post('/', async (req, res) => {
  try {
    const {message} = req.body
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0,
    })
    if (response.data.choices[0].text) {
      res.json({
        message: response.data.choices[0].text,
      })
    }
  } catch (e) {
    res.status(401).json({
      status: false,
      error: e.message,
    })
  }
})

app.listen(port, () => {
  console.log(process.env)
  console.log(`example app listening on port ${port}`)
})
