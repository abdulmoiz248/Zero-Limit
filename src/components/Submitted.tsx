import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Submitted() {
    const router=useRouter();
  return (
    <Card className="w-full pt-10 mb-10 max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold">Review Already Submitted</CardTitle>
        <CardDescription>Oh Fearless, you&apos;ve already shared your wisdom!</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          Your opinion has been recorded and is greatly appreciated. Each user is limited to one review per item to ensure fairness and diversity of feedback.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" onClick={()=>{
            router.push('/');
        }}>Shop More</Button>
      </CardFooter>
    </Card>
  )
}