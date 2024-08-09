// src/common/components/elements/CodeBlock.tsx
import {FC, useEffect, useState} from 'react'
import {
  HiCheckCircle as CheckIcon,
  HiOutlineClipboardCopy as CopyIcon,
} from 'react-icons/hi'
import {CodeProps} from 'react-markdown/lib/ast-to-react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {a11yDark as themeColor} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {useCopyToClipboard} from 'usehooks-ts'

export interface CodeBlockProps extends CodeProps {
  inline?: boolean
}

const CodeBlock: FC<CodeBlockProps> = ({
  className = '',
  children,
  inline,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [, copy] = useCopyToClipboard()
  const match = /language-(\w+)/.exec(className || '')

  const handleCopy = (code: string) => {
    copy(code)
    setIsCopied(true)
  }

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isCopied])

  return (
    <>
      {!inline ? (
        <div className="relative">
          <button
            className="absolute right-3 top-3 rounded-lg border border-neutral-700 p-2 hover:bg-neutral-800"
            type="button"
            aria-label="Copy to Clipboard"
            onClick={() => handleCopy(children.toString())}
            data-umami-event="Click Copy Code"
          >
            {!isCopied ? (
              <CopyIcon
                size={18}
                className="text-neutral-400"
              />
            ) : (
              <CheckIcon
                size={18}
                className="text-green-600"
              />
            )}
          </button>
          <SyntaxHighlighter
            {...props}
            style={themeColor}
            customStyle={{
              padding: '20px',
              fontSize: '14px',
              borderRadius: '8px',
              paddingRight: '50px',
            }}
            language={match ? match[1] : 'javascript'}
            wrapLongLines={true}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="rounded-md bg-neutral-200 px-2 py-1 text-[14px] font-light text-sky-600 dark:bg-neutral-700 dark:text-sky-300">
          {children}
        </code>
      )}
    </>
  )
}

export default CodeBlock
