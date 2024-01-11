import React from 'react'
import Editor from 'react-simple-code-editor';
import JSConfetti from 'js-confetti'
import { highlight, languages } from 'prismjs';
import Alert from './Alert';
import { copy, errorStatusCodes } from '../utils'

import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-dark.css';
import Loading from './Loading';
import ErrorCodeDropdown from './ErrorCodeDropdown';

const jsConfetti = new JSConfetti()

function JSONEditor() {
  const [code, setCode] = React.useState("");
  const [focus, setFocus] = React.useState(false)
  const [alert, setAlert] = React.useState<React.ReactNode>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [statusCode, setStatusCode] = React.useState<number>(200)

  const isError = statusCode !== 200

  const copyAPIURL = async (apiUrl: string) => {
    try {
      copy(apiUrl)
        setAlert((
          <Alert title=""
              text="Copied!"
              onDismiss={() => setAlert(null)} />
        ))
    
        setTimeout(() => {
          setAlert(null)
        }, 2000);
    } catch {
      setAlert((
        <Alert title=""
            text="Error copying your API url. please check you granted permission to write on clipboard!"
            onDismiss={() => setAlert(null)} />
      ))
    }
  }

  const isValidJSON = () => {
    try {
      JSON.parse(code)
      return true
    } catch {
      return false
    }
  }

  const saveInfo = async () => {
    if (isLoading) return
    if (isValidJSON()) {
      setIsLoading(true)
      try {
        const body = {
          source: {
            data: code,
            statusCode,
            type: isError ? 'error' : 'success'
          }
        };
  
        const response = await fetch(
          '/api/save-api',
          {
            method: 'POST',
            body: JSON.stringify(body)
          }
        )
  
        const { id: API_ID } = await response.json();
        const apiUrl = `${import.meta.env.PUBLIC_FRONTEND_URL}api/${API_ID}`
  
        setAlert((
          <Alert title=""
          text={`Success! Your API is available at ${apiUrl}`}
          showCopy
          onDismiss={() => setAlert(null)}
          onCopy={() => copyAPIURL(apiUrl)} />
        ))
  
  
        jsConfetti.addConfetti()
      } catch {
        setAlert((
          <Alert title="Error"
          type="error"
          text={`Error saving your API, please try later`}
          onDismiss={() => setAlert(null)} />
        ))
      } finally {
        setIsLoading(false)
      }
    } else {
      setAlert((
        <Alert title="Error"
        type="error"
        text={`Please enter a valid JSON`}
        onDismiss={() => setAlert(null)} />
      ))
    }
  }
  return (
    <>
    <div className="flex justify-center mb-5">
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          onClick={() => setStatusCode(200)}
          type="button"
          className={`w-28 px-4 py-2 text-sm font-medium text-purple-100 bg-transparent border border-purple-100 rounded-s-lg hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white ${
          !isError ? 'bg-gradient-to-br from-purple-600 to-blue-500' : ''
        }`}>
          Success
        </button>
        <ErrorCodeDropdown
          options={errorStatusCodes}
          onSelect={selected => setStatusCode(selected.statusCode)}>
            <button
            type="button"
            className={`w-28 px-4 py-2 w- text-sm font-medium text-purple-100 bg-transparent border border-purple-100 rounded-e-lg hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500 hover:text-white ${
              isError ? 'bg-gradient-to-br from-purple-600 to-blue-500' : ''
            }`}>
              Error {isError ? `(${statusCode})` : ''}
            </button>
        </ErrorCodeDropdown>
      </div>
    </div>
      <div className={`rounded-lg overflow-y-scroll h-[300px] max-h-[300px] border ${focus ? 'border-purple-700' : 'border-purple-100'}`}>
        <Editor
          value={code}
          autoFocus
          placeholder="Type your JSON here"
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.json, 'json')}
          padding={10}
          textareaClassName="outline-none"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace'
          }}
        />
      </div>
      <div className="flex justify-center gap-2 pt-8">
        <button
        onClick={saveInfo}
        type="button"
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Create API
        </button>
      </div>
      <div className="h-[35px] text-center">
          {isLoading && <Loading />}
      </div>
      {alert}
    </>
  );
}

export default JSONEditor