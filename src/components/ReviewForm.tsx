// "use client"

// import { useState } from "react"
// import { Star, Upload, X, Check } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


// export default function ReviewForm() {
//   const [rating, setRating] = useState(0)
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null)
//   const [preBuiltRatings, setPreBuiltRatings] = useState({
//     quality: 0,
//     value: 0,
//     comfort: 0,
//   })
//   const [customQuestions, setCustomQuestions] = useState([
//     { question: "Would you recommend this product?", answer: null },
//     { question: "Is the size as expected?", answer: null },
//   ])

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPhotoPreview(reader.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handlePreBuiltRating = (category: keyof typeof preBuiltRatings, value: number) => {
//     setPreBuiltRatings((prev) => ({ ...prev, [category]: value }))
//   }

//   const handleCustomQuestionAnswer = (index: number, answer: boolean) => {
//     setCustomQuestions((prev:any) =>
//       prev.map((q:any, i:any) => (i === index ? { ...q, answer } : q))
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-6 text-center text-primary">Product Review</h1>

//       <div className="mb-6">
//         <Label htmlFor="photo-upload" className="block mb-2">Upload Photo</Label>
//         <div className="flex items-center space-x-4">
//           <Button variant="outline" className="w-full" onClick={() => document.getElementById('photo-upload')?.click()}>
//             <Upload className="mr-2 h-4 w-4" /> Upload Photo
//           </Button>
//           <Input
//             id="photo-upload"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handlePhotoUpload}
//           />
//           {photoPreview && (
//             <div className="relative w-20 h-20">
//               <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded" />
//               <Button
//                 variant="destructive"
//                 size="icon"
//                 className="absolute -top-2 -right-2 h-6 w-6"
//                 onClick={() => setPhotoPreview(null)}
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mb-6">
//         <Label className="block mb-2">Overall Rating</Label>
//         <div className="flex space-x-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <Star
//               key={star}
//               className={`h-8 w-8 cursor-pointer ${
//                 star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
//               }`}
//               onClick={() => setRating(star)}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="mb-6">
//         <Label htmlFor="review-text" className="block mb-2">Your Review</Label>
//         <Textarea id="review-text" placeholder="Write your review here..." className="min-h-[100px]" />
//       </div>

//       <div className="mb-6 space-y-4">
//         <h2 className="text-xl font-semibold">Product Aspects</h2>
//         {Object.entries(preBuiltRatings).map(([category, value]) => (
//           <div key={category}>
//             <Label className="block mb-2 capitalize">{category}</Label>
//             <div className="flex space-x-1">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className={`h-6 w-6 cursor-pointer ${
//                     star <= value ? "fill-primary text-primary" : "text-muted-foreground"
//                   }`}
//                   onClick={() => handlePreBuiltRating(category as keyof typeof preBuiltRatings, star)}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mb-6 space-y-4">
//         <h2 className="text-xl font-semibold">Additional Questions</h2>
//         {customQuestions.map((q, index) => (
//           <div key={index} className="space-y-2">
//             <p>{q.question}</p>
//             <RadioGroup className="flex space-x-4">
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem
//                   value="yes"
//                   id={`q${index}-yes`}
//                   checked={q.answer === true}
//                   onClick={() => handleCustomQuestionAnswer(index, true)}
//                 />
//                 <Label htmlFor={`q${index}-yes`} className="flex items-center">
//                   <Check className="h-4 w-4 mr-1 text-green-500" /> Yes
//                 </Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem
//                   value="no"
//                   id={`q${index}-no`}
//                   checked={q.answer === false}
//                   onClick={() => handleCustomQuestionAnswer(index, false)}
//                 />
//                 <Label htmlFor={`q${index}-no`} className="flex items-center">
//                   <X className="h-4 w-4 mr-1 text-red-500" /> No
//                 </Label>
//               </div>
//             </RadioGroup>
//           </div>
//         ))}
//       </div>

//       <Button className="w-full">Submit Review</Button>
//     </div>
//   )
// }