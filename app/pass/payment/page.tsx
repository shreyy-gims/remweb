"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { QrCode, Copy, Check, Download, ExternalLink, IndianRupee, Shield, Info, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const PASS_PRICE_INR = 1100
const UPI_ID = "9340679336@ptsbi" // replace with your actual UPI ID
const GOOGLE_FORM_URL = "https://forms.gle/Dk34fo2A6Djg3W4q8" // replace with your Google Form link

export default function PaymentPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

const handleDownloadQR = () => {
  const link = document.createElement("a")
  link.href = "/qrcode.jpeg"   // public file path
  link.download = "qrcode.jpeg" // just filename, not path
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


  const shareInfo = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const text = `Pay for Farewell Pass (₹${PASS_PRICE_INR}) via UPI (${UPI_ID}) and then complete the Google Form to confirm your details.`
    if (navigator.share) {
      try {
        await navigator.share({ title: "Farewell Pass Payment", text, url })
      } catch {
        // no-op if canceled
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900 pt-20">
      {/* background decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute top-40 -right-16 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-3"
        >
          <Link href="/pass" className="inline-flex items-center text-gray-300 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pass
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-center mb-10"
        >
          <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600/80 p-3 shadow-lg shadow-purple-500/20">
            <QrCode className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Pay for Farewell Pass</h1>
          <p className="mt-2 text-gray-300">
            Scan the QR code or pay via UPI ID. After payment, fill the Google Form to confirm your pass.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* QR + Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border border-purple-500/30 bg-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Scan & Pay</CardTitle>
                <CardDescription className="text-gray-300">
                  Use any UPI app (GPay, PhonePe, Paytm, BHIM) to scan and pay.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative rounded-xl border border-purple-500/30 bg-black/30 p-4">
                  <Image
                    src="/qrcode.jpeg"
                    alt="Farewell Pass Payment QR code"
                    width={320}
                    height={320}
                    className="rounded-lg"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/5" />
                </div>

                <div className="mt-6 grid w-full gap-4 sm:grid-cols-2">
                  <Button onClick={handleDownloadQR} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR
                  </Button>
                  <Button
                    variant="outline"
                    onClick={shareInfo}
                    className="border-purple-500/40 text-purple-300 bg-transparent"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Instructions
                  </Button>
                </div>

                <Separator className="my-6 bg-purple-500/30" />

                <div className="grid w-full gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="upi" className="text-gray-300">
                      UPI ID
                    </Label>
                    <div className="flex gap-2">
                      <Input id="upi" value={UPI_ID} readOnly className="bg-gray-800 border-gray-700 text-white" />
                      <Button
                        aria-label="Copy UPI ID"
                        onClick={handleCopy}
                        variant="secondary"
                        className="shrink-0 bg-gray-700 text-white hover:bg-gray-600"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-gray-300">
                      Amount
                    </Label>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center rounded-md bg-gray-800 px-3 py-2 text-white border border-gray-700">
                        <IndianRupee className="mr-1 h-4 w-4 opacity-70" />
                        <span className="font-semibold">{PASS_PRICE_INR}</span>
                      </div>
                      <span className="text-sm text-purple-300/80">All-inclusive pass</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructions + Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Card className="border border-blue-500/30 bg-white/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">How to Complete Your Purchase</CardTitle>
                <CardDescription className="text-gray-300">
                  Follow these quick steps to secure your Farewell Pass.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-purple-600/20 text-purple-300 flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-white">Scan the QR or copy the UPI ID</p>
                      <p className="text-sm text-gray-300">Pay ₹{PASS_PRICE_INR} using any UPI app.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-purple-600/20 text-purple-300 flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-white">Add note: "Farewell Pass + Your Name + Class/Section"</p>
                      <p className="text-sm text-gray-300">Example: Farewell Pass - Riya Sharma - 12A</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-purple-600/20 text-purple-300 flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-white">After payment, fill the Google Form</p>
                      <p className="text-sm text-gray-300">
                        Use the button below to submit your details and confirm your pass.
                      </p>
                    </div>
                  </li>
                </ol>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open Google Form
                    </Button>
                  </a>
                  <Link href="/pass" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="w-full border-blue-500/40 text-blue-300 hover:bg-blue-900/20 bg-transparent"
                    >
                      Back to Pass Page
                    </Button>
                  </Link>
                </div>

                <Separator className="my-6 bg-blue-500/30" />

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="mt-0.5 h-5 w-5 text-green-400" />
                    <p className="text-sm text-gray-300">
                      Keep your payment reference. Your pass will be verified using the payment details.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-5 w-5 text-yellow-400" />
                    <p className="text-sm text-gray-300">
                      If the QR doesn’t work, manually pay to the UPI ID:{" "}
                      <span className="font-medium text-white">{UPI_ID}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* subtle footer note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-center text-gray-400 text-sm"
        >
          Need help? Contact the organizing team via WhatsApp or Email listed on the Pass page.
        </motion.div>
      </div>
    </div>
  )
}
