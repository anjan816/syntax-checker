// "use client"

// import { useState } from "react"
// import { Check, AlertCircle } from "lucide-react"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// export default function SyntaxValidator() {
//   const [language, setLanguage] = useState<string>("javascript")
//   const [code, setCode] = useState<string>("")
//   const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null)

//   const validateSyntax = () => {
//     if (!code.trim()) {
//       setResult({ valid: false, message: "Please enter some code to validate." })
//       return
//     }

//     try {
//       switch (language) {
//         case "javascript":
//           // For JavaScript, we can use Function constructor to check syntax
//           new Function(code)
//           setResult({ valid: true, message: "JavaScript syntax is valid!" })
//           break

//         case "json":
//           // For JSON, we can use JSON.parse
//           JSON.parse(code)
//           setResult({ valid: true, message: "JSON syntax is valid!" })
//           break

//         case "python":
//           // Basic Python syntax validation
//           validatePythonSyntax(code)
//           break

//         case "css":
//           // Basic CSS syntax validation
//           validateCssSyntax(code)
//           break

//         case "html":
//           // Basic HTML syntax validation
//           validateHtmlSyntax(code)
//           break

//         default:
//           setResult({ valid: false, message: "Please select a language." })
//       }
//     } catch (error) {
//       setResult({
//         valid: false,
//         message: `Invalid ${language.toUpperCase()} syntax: ${(error as Error).message}`,
//       })
//     }
//   }

//   const validatePythonSyntax = (pythonCode: string) => {
//     // Basic Python syntax validation
//     // This is a simplified check and won't catch all errors
//     const lines = pythonCode.split("\n")
//     const errors: string[] = []

//     // Check for basic syntax errors
//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim()

//       // Check for unmatched quotes
//       const singleQuotes = (line.match(/'/g) || []).length
//       const doubleQuotes = (line.match(/"/g) || []).length

//       if (singleQuotes % 2 !== 0) {
//         errors.push(`Line ${i + 1}: Unmatched single quotes`)
//       }

//       if (doubleQuotes % 2 !== 0) {
//         errors.push(`Line ${i + 1}: Unmatched double quotes`)
//       }

//       // Check for unmatched parentheses
//       const openParens = (line.match(/\(/g) || []).length
//       const closeParens = (line.match(/\)/g) || []).length

//       if (openParens !== closeParens) {
//         errors.push(`Line ${i + 1}: Unmatched parentheses`)
//       }

//       // Check for unmatched brackets
//       const openBrackets = (line.match(/\[/g) || []).length
//       const closeBrackets = (line.match(/\]/g) || []).length

//       if (openBrackets !== closeBrackets) {
//         errors.push(`Line ${i + 1}: Unmatched brackets`)
//       }

//       // Check for unmatched braces
//       const openBraces = (line.match(/\{/g) || []).length
//       const closeBraces = (line.match(/\}/g) || []).length

//       if (openBraces !== closeBraces) {
//         errors.push(`Line ${i + 1}: Unmatched braces`)
//       }
//     }

//     if (errors.length > 0) {
//       setResult({ valid: false, message: errors.join("\n") })
//     } else {
//       setResult({ valid: true, message: "Python syntax appears valid! (Note: This is a basic check)" })
//     }
//   }

//   const validateCssSyntax = (cssCode: string) => {
//     // Basic CSS syntax validation
//     const errors: string[] = []

//     // Check for unmatched braces
//     const openBraces = (cssCode.match(/\{/g) || []).length
//     const closeBraces = (cssCode.match(/\}/g) || []).length

//     if (openBraces !== closeBraces) {
//       errors.push("Unmatched braces in CSS")
//     }

//     // Check for missing semicolons in property declarations
//     const lines = cssCode.split("\n")
//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i].trim()

//       // If line contains a property (has a colon) but no semicolon and isn't a selector or comment
//       if (
//         line.includes(":") &&
//         !line.includes(";") &&
//         !line.includes("{") &&
//         !line.includes("}") &&
//         !line.startsWith("/*") &&
//         !line.endsWith("*/") &&
//         !line.startsWith("//")
//       ) {
//         errors.push(`Line ${i + 1}: Missing semicolon`)
//       }
//     }

//     if (errors.length > 0) {
//       setResult({ valid: false, message: errors.join("\n") })
//     } else {
//       setResult({ valid: true, message: "CSS syntax appears valid! (Note: This is a basic check)" })
//     }
//   }

//   const validateHtmlSyntax = (htmlCode: string) => {
//     // Basic HTML syntax validation
//     const errors: string[] = []

//     // Check for unmatched tags
//     const stack: string[] = []
//     const selfClosingTags = new Set([
//       "area",
//       "base",
//       "br",
//       "col",
//       "embed",
//       "hr",
//       "img",
//       "input",
//       "link",
//       "meta",
//       "param",
//       "source",
//       "track",
//       "wbr",
//     ])

//     // Extract tags using regex
//     const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
//     let match
//     let position = 0

//     while ((match = tagRegex.exec(htmlCode)) !== null) {
//       const fullTag = match[0]
//       const tagName = match[1].toLowerCase()
//       position = match.index

//       // Check if it's a closing tag
//       if (fullTag.startsWith("</")) {
//         // If stack is empty, we have an extra closing tag
//         if (stack.length === 0) {
//           errors.push(`Extra closing tag </${tagName}> at position ${position}`)
//         } else {
//           // Check if it matches the last opening tag
//           const lastTag = stack.pop()
//           if (lastTag !== tagName) {
//             errors.push(`Mismatched tag: expected </${lastTag}>, found </${tagName}> at position ${position}`)
//           }
//         }
//       }
//       // Check if it's a self-closing tag
//       else if (selfClosingTags.has(tagName) || fullTag.endsWith("/>")) {
//         // Self-closing tags don't need to be pushed to the stack
//         continue
//       }
//       // It's an opening tag
//       else {
//         stack.push(tagName)
//       }
//     }

//     // Check if there are any unclosed tags
//     if (stack.length > 0) {
//       errors.push(`Unclosed tags: ${stack.join(", ")}`)
//     }

//     // Check for malformed tags (< without >)
//     const openAngleBrackets = (htmlCode.match(/</g) || []).length
//     const closeAngleBrackets = (htmlCode.match(/>/g) || []).length

//     if (openAngleBrackets !== closeAngleBrackets) {
//       errors.push("Malformed HTML: unmatched angle brackets")
//     }

//     if (errors.length > 0) {
//       setResult({ valid: false, message: errors.join("\n") })
//     } else {
//       setResult({ valid: true, message: "HTML syntax appears valid! (Note: This is a basic check)" })
//     }
//   }

//   const getExampleCode = () => {
//     switch (language) {
//       case "javascript":
//         return `function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));`
//       case "json":
//         return `{\n  "name": "John Doe",\n  "age": 30,\n  "isActive": true,\n  "hobbies": ["reading", "coding", "hiking"]\n}`
//       case "python":
//         return `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))`
//       case "css":
//         return `body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background-color: #f5f5f5;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}`
//       case "html":
//         return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Sample Page</title>\n</head>\n<body>\n  <header>\n    <h1>Welcome to my website</h1>\n  </header>\n  <main>\n    <section>\n      <h2>About</h2>\n      <p>This is a sample HTML page.</p>\n    </section>\n  </main>\n  <footer>\n    <p>&copy; 2025 My Website</p>\n  </footer>\n</body>\n</html>`
//       default:
//         return ""
//     }
//   }

//   const loadExample = () => {
//     setCode(getExampleCode())
//     setResult(null)
//   }

//   return (
//     <div className="container mx-auto py-10 px-4">
//       <Card className="w-full max-w-4xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-2xl">Syntax Validator</CardTitle>
//           <CardDescription>Validate syntax for different programming languages</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="w-full sm:w-1/3"><br />
//               <label className="block text-sm font-medium mb-2">Select Language</label>
//               <Select value={language} onValueChange={setLanguage}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select language" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="javascript">JavaScript</SelectItem>
//                   <SelectItem value="python">Python</SelectItem>
//                   <SelectItem value="json">JSON</SelectItem>
//                   <SelectItem value="css">CSS</SelectItem>
//                   <SelectItem value="html">HTML</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="w-full sm:w-2/3"><br /><br />
//               <Button variant="outline" onClick={loadExample} className="w-full">
//                 Load Example
//               </Button>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Enter Code</label>
//             <Textarea
//               value={code}
//               onChange={(e) => {
//                 setCode(e.target.value)
//                 setResult(null)
//               }}
//               placeholder={`Enter ${language} code here...`}
//               className="font-mono h-64 resize-none"
//             />
//           </div>

//           {result && (
//             <Alert variant={result.valid ? "default" : "destructive"}>
//               {result.valid ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
//               <AlertTitle>{result.valid ? "Valid Syntax" : "Invalid Syntax"}</AlertTitle>
//               <AlertDescription className="whitespace-pre-line">{result.message}</AlertDescription>
//             </Alert>
//           )}
//         </CardContent>
//         <CardFooter>
//           <Button onClick={validateSyntax} className="w-full">
//             Validate Syntax
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }








"use client"

import { useState, useEffect, useRef } from "react"
import { Check, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SyntaxValidator() {
  /* ---------------- Page Usage Tracking ---------------- */
  const startTime = useRef(Date.now())

  useEffect(() => {
    return () => {
      const duration = Date.now() - startTime.current

      fetch("/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration }),
      })
    }
  }, [])

  /* ---------------- State ---------------- */
  const [language, setLanguage] = useState<string>("javascript")
  const [code, setCode] = useState<string>("")
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null)

  /* ---------------- Syntax Validation ---------------- */
  const validateSyntax = async () => {
    if (!code.trim()) {
      setResult({ valid: false, message: "Please enter some code to validate." })
      return
    }

    try {
      switch (language) {
        case "javascript":
          new Function(code)
          setResult({ valid: true, message: "JavaScript syntax is valid!" })
          break

        case "json":
          JSON.parse(code)
          setResult({ valid: true, message: "JSON syntax is valid!" })
          break

        case "python":
          validatePythonSyntax(code)
          return

        case "css":
          validateCssSyntax(code)
          return

        case "html":
          validateHtmlSyntax(code)
          return

        default:
          setResult({ valid: false, message: "Please select a language." })
          return
      }

      await sendSyntaxData(true)
    } catch (error) {
      setResult({
        valid: false,
        message: `Invalid ${language.toUpperCase()} syntax: ${(error as Error).message}`,
      })

      await sendSyntaxData(false)
    }
  }

  /* ---------------- API Call ---------------- */
  const sendSyntaxData = async (valid: boolean) => {
    await fetch("/api/syntax", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        code,
        valid,
      }),
    })
  }

  /* ---------------- Python Validation ---------------- */
  const validatePythonSyntax = (pythonCode: string) => {
    const lines = pythonCode.split("\n")
    const errors: string[] = []

    lines.forEach((line, i) => {
      const singleQuotes = (line.match(/'/g) || []).length
      const doubleQuotes = (line.match(/"/g) || []).length

      if (singleQuotes % 2 !== 0) errors.push(`Line ${i + 1}: Unmatched single quotes`)
      if (doubleQuotes % 2 !== 0) errors.push(`Line ${i + 1}: Unmatched double quotes`)
    })

    if (errors.length) {
      setResult({ valid: false, message: errors.join("\n") })
      sendSyntaxData(false)
    } else {
      setResult({ valid: true, message: "Python syntax appears valid! (Basic check)" })
      sendSyntaxData(true)
    }
  }

  /* ---------------- CSS Validation ---------------- */
  const validateCssSyntax = (cssCode: string) => {
    const open = (cssCode.match(/\{/g) || []).length
    const close = (cssCode.match(/\}/g) || []).length

    if (open !== close) {
      setResult({ valid: false, message: "Unmatched braces in CSS" })
      sendSyntaxData(false)
    } else {
      setResult({ valid: true, message: "CSS syntax appears valid! (Basic check)" })
      sendSyntaxData(true)
    }
  }

  /* ---------------- HTML Validation ---------------- */
  const validateHtmlSyntax = (htmlCode: string) => {
    const stack: string[] = []
    const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
    let match

    while ((match = tagRegex.exec(htmlCode))) {
      const tag = match[1]
      if (match[0].startsWith("</")) {
        if (stack.pop() !== tag) {
          setResult({ valid: false, message: `Mismatched closing tag </${tag}>` })
          sendSyntaxData(false)
          return
        }
      } else {
        stack.push(tag)
      }
    }

    if (stack.length) {
      setResult({ valid: false, message: `Unclosed tags: ${stack.join(", ")}` })
      sendSyntaxData(false)
    } else {
      setResult({ valid: true, message: "HTML syntax appears valid! (Basic check)" })
      sendSyntaxData(true)
    }
  }

  /* ---------------- Example Loader ---------------- */
  const getExampleCode = () => {
    switch (language) {
      case "javascript":
        return `console.log("Hello World")`
      case "json":
        return `{"name":"John","age":30}`
      case "python":
        return `print("Hello World")`
      case "css":
        return `body { margin: 0; }`
      case "html":
        return `<h1>Hello World</h1>`
      default:
        return ""
    }
  }

  const loadExample = () => {
    setCode(getExampleCode())
    setResult(null)
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Syntax Validator</CardTitle>
          <CardDescription>Validate syntax for multiple languages</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={loadExample}>
            Load Example
          </Button>

          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono h-64"
            placeholder={`Enter ${language} code`}
          />

          {result && (
            <Alert variant={result.valid ? "default" : "destructive"}>
              {result.valid ? <Check /> : <AlertCircle />}
              <AlertTitle>{result.valid ? "Valid" : "Invalid"}</AlertTitle>
              <AlertDescription className="whitespace-pre-line">
                {result.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter>
          <Button className="w-full" onClick={validateSyntax}>
            Validate Syntax
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
