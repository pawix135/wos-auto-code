import { Footer } from "./components/footer"
import { RedeemForm } from "./components/redeem-form"
import { ResultsPreview } from "./components/results-preview"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"

function App() {
  return (
    <div className="p-2 md:pt-0">
      <h1 className="text-lg font-bold text-center mt-2">Redeem WOS Gift Code</h1>
      <Card className="max-w-[600px] mx-auto mt-5 pt-5">
        <CardContent>
          <RedeemForm />
        </CardContent>
      </Card>
      <Card className="max-w-[600px] mx-auto mt-5">
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ResultsPreview />
        </CardContent>
      </Card>
      <Footer />
    </div>
  )
}

export default App
