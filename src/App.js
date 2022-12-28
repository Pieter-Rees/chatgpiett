import React, {useState} from 'react'
import {
  Grommet,
  FormField,
  Header,
  Page,
  PageContent,
  PageHeader,
  TextArea,
  Form,
  Button,
  Box,
} from 'grommet'

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
}

function App() {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message}),
    })
        .then((res) => res.json())
        .then((data) => setResponse(data.message))
  }

  return (
    <Grommet theme={theme} full>
      <Page pad="medium">
        <Header>
          <PageHeader
            margin={{left: 'large'}}
            title="Ask anything to Chatgpiett"
          />
        </Header>
        <PageContent>
          <Form onSubmit={handleSubmit}>
            <FormField>
              <TextArea
                placeholder="type here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormField>
            <Box margin={{top: 'large'}} direction="row" gap="medium">
              <Button type="submit" primary label="Submit" />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>

          {response ? (
            <Box
              direction="row"
              border={{color: 'brand', size: 'large'}}
              pad="medium"
              margin={{top: 'large'}}
            >
              {response}
            </Box>
          ) : (
            ''
          )}
        </PageContent>
      </Page>
    </Grommet>
  )
}

export default App
