import React, { type FunctionComponent } from 'react'

type AlertProps = {
    title: string
    text: string
    onCopy?: (copyContent: string) => void
    onDismiss?: () => void,
    type?: 'success' | 'error'
    showCopy?: boolean
}

const Alert: FunctionComponent<AlertProps> = ({
    text,
    onCopy = () => {},
    onDismiss,
    type = 'success',
    showCopy = false
}) => {
    return (
        <div id="alert-additional-content-1" className="p-4 mb-4 text-purple-800rounded-lg bg-gray-900" role="alert">
            <div className="mt-2 mb-4 text-sm">
                {text}
            </div>
            <div className="flex">
                {showCopy && (
                    <button type="button"
                    className="text-white bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
                    onClick={() => onCopy(text)}>
                Copy
            </button>
                )}
                <button type="button"
                        className="text-white bg-transparent border border-purple-800 hover:bg-purple-900 hover:text-white focus:ring-0 focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 text-center"
                        data-dismiss-target="#alert-additional-content-1"
                        aria-label="Close"
                        onClick={onDismiss}>
                    Dismiss
                </button>
            </div>
        </div>
    )
}

export default Alert