'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const { data: session } = useSession()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    domain: '',
    yearOfStudy: '',
    careerTransition: '',
    careerGoal: '',
    skills: '',
    wantDailyTips: false,
    wantTrendingJobs: false,
  })
  const router = useRouter()

  useEffect(() => {
    if (session) {
      toast('Already logged in')
      router.push('/dashboard')
    }
  }, [session, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Career Guidance Logo" width={32} height={32} />
          <span className="font-bold text-xl">CareerGuide</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Personalize Your Experience</CardTitle>
            <CardDescription className="text-center">Step {step} of 4</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <Select onValueChange={(value: string) => handleSelectChange('domain', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Domain of Study" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value: string) => handleSelectChange('yearOfStudy', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year of Study" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={(value: string) => handleSelectChange('careerTransition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Preferred Career Transition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staying">Staying in Branch</SelectItem>
                    <SelectItem value="switching">Switching Fields</SelectItem>
                    <SelectItem value="industry">Industry Shift</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-lg font-semibold">Based on your previous answers, we'd like to know more:</p>
                {formData.careerTransition === 'switching' && (
                  <Input
                    name="switchingField"
                    placeholder="Which field are you most interested in exploring?"
                    onChange={handleInputChange}
                  />
                )}
                {formData.careerTransition === 'industry' && (
                  <Select onValueChange={(value: string) => handleSelectChange('industryRole', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred role in the new industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Role</SelectItem>
                      <SelectItem value="managerial">Managerial Role</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <Textarea
                  name="careerGoal"
                  placeholder="What is your ultimate career goal?"
                  onChange={handleInputChange}
                />
                <Select onValueChange={(value: string) => handleSelectChange('skills', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Skills or resources to achieve your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Skills</SelectItem>
                    <SelectItem value="soft">Soft Skills</SelectItem>
                    <SelectItem value="network">Professional Network</SelectItem>
                    <SelectItem value="education">Further Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dailyTips"
                    checked={formData.wantDailyTips}
                    onCheckedChange={(checked) => handleCheckboxChange('wantDailyTips', checked as boolean)}
                  />
                  <label htmlFor="dailyTips">Would you like daily tips on resume building?</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trendingJobs"
                    checked={formData.wantTrendingJobs}
                    onCheckedChange={(checked) => handleCheckboxChange('wantTrendingJobs', checked as boolean)}
                  />
                  <label htmlFor="trendingJobs">Would you like updates on trending jobs in your field?</label>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
            )}
            <Button onClick={step < 4 ? handleNext : () => console.log('Finish onboarding', formData)}>
              {step < 4 ? 'Next' : 'Finish'}
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="h-16 border-t border-gray-200 flex items-center justify-center">
        <p className="text-sm text-gray-600">© 2023 CareerGuide. All rights reserved.</p>
      </footer>
    </div>
  )
}

