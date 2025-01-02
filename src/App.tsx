import { Footer } from "./components/footer"
import { RedeemForm } from "./components/redeem-form"
import { ResultsPreview } from "./components/results-preview"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"

function App() {
  return (
    <div className="p-2 md:pt-0">
      <Card className="max-w-[600px] mx-auto mt-5">
        <CardHeader>
          <CardTitle>Yay</CardTitle>
        </CardHeader>
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
