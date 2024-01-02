import React from 'react'
import Editor from 'react-simple-code-editor';
import JSConfetti from 'js-confetti'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-dark.css';
import Alert from './Alert';

const API_URL = 'https://mocker-api-production.up.railway.app/api'

const jsConfetti = new JSConfetti()

function JSONEditor() {
  const [code, setCode] = React.useState("");
  const [focus, setFocus] = React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false)
  const [savedSourceId, setSavedSourceId] = React.useState("")

  const saveInfo = async () => {
    try {
      const body = {
        source: {
          data: code
        }
      };

      const response = await fetch(
        `${API_URL}/sources`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(body)
        }
      )

      const jsonRes = await response.json();
      setSavedSourceId(jsonRes.id)
      setShowAlert(true)


      jsConfetti.addConfetti()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className={`rounded-lg overflow-y-scroll max-h-[400px] border ${focus ? 'border-purple-700' : 'border-purple-300'}`}>
        <Editor
          value={code}
          placeholder="Write your JSON here"
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.json)}
          padding={10}
          textareaClassName="outline-none"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace'
          }}
        />
      </div>
      <div className="flex justify-center py-8">
        <button
        onClick={saveInfo}
        type="button"
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Create API
        </button>
      </div>
      {showAlert && (
        <Alert title=""
        text={`Success! Your API is available at ${API_URL}/sources/${savedSourceId}`}
        onDismiss={() => setShowAlert(false)} />
      )}
    </>
  );
}

export default JSONEditor