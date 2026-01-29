import { useState } from 'react'
import { Button } from "@/components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Vite + React + Tailwind + shadcn/ui</h1>
        <p className="text-muted-foreground">
          Setup complete! You can now start building your application.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </Button>
          <p className="text-sm">
            Edit <code className="bg-muted px-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
