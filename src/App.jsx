import React, { useState } from 'react'
import QRCode from 'qrcode'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'
import { IoIosWarning } from 'react-icons/io'
import gsap from 'gsap'

function App() {
  const [qrData, setQrData] = useState('')
  const [qrImageUrl, setQrImageUrl] = useState('')

  const generateQRCode = async () => {
    if (!qrData) {
      const alert = document.getElementById('alert')
      document.querySelector('img').src = ''
      setQrImageUrl('')
      gsap.to(alert, {
        bottom: '5%',
        duration: 0.5,
        ease: 'power3.out',
      })

      gsap.to(alert, {
        delay: 4,
        bottom: '-20%',
        duration: 0.5,
        ease: 'power3.out',
      })
      return
    }
    try {
      const qrCodeOptions = {
        errorCorrectionLevel: 'H',
        margin: 2,
        scale: 7,
        color: {
          dark: '#000000FF',
          light: '#FFFFFFFF',
        },
        type: 'image/png',
        quality: 0.8,
      }
      const imageUrl = await QRCode.toDataURL(qrData, qrCodeOptions)
      setQrImageUrl(imageUrl)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('https://images.unsplash.com/photo-1460355976672-71c3f0a4bdac?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat bg-center flex items-center justify-start relative flex-col gap-10 overflow-hidden">
      <div className="absolute text-white sm:top-24 text-2xl left-10 font-['gilroy'] tracking-wide top-32">
        <h1 className="border-b-[1px] border-zinc-600">Generate and Share</h1>
        <h1 className="ml-10 border-b-[1px] border-zinc-600">
          <span className="text-teal-400">QR Codes</span> Instantly
        </h1>
      </div>

      <div className="p-5 sm:gap-3 flex sm:pt-44 pt-56 flex-col sm:flex-row items-center px-10 gap-10">
        <Input
          type="text"
          placeholder="Enter your url"
          className="w-80"
          onChange={(e) => {
            setQrData(e.target.value)
          }}
        />
        <Button onClick={generateQRCode} variant="secondary">
          Generate
        </Button>
      </div>

      <div className="w-44 h-44 top-50 rounded-md overflow-hidden border-[0.08rem] backdrop-blur">
        <img src={qrImageUrl} alt="" className="w-full" />
      </div>

      <div>
        {qrImageUrl && (
          <a href={qrImageUrl} download={`${qrData}.png`}>
            <Button variant="outline">Download</Button>
          </a>
        )}
      </div>

      <Alert
        id="alert"
        className="w-72 absolute -bottom-50 shadow-xl bg-yellow-300 border-none"
      >
        <IoIosWarning className="text-xl" />
        <AlertTitle>Input field is empty!</AlertTitle>
        <AlertDescription>Please provide a string for QR Code</AlertDescription>
      </Alert>
    </div>
  )
}

export default App
