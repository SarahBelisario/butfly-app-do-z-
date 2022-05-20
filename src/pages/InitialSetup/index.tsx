import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ApiInstance } from '../../services/axios'
import { AppExtensions } from './AppExtensions'
import { CompanyName } from './CompanyName'
import { FieldOfWork } from './FieldOfWork'

export function InitialSetup() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const methods = useForm({ defaultValues: { name: '', fieldOfWork: '' } })

  function nextStep() {
    setStep(step + 1)
  }

  async function createCompany(data: { name: string; fieldOfWork: string }) {
    if (step !== 3) return
    const { name, fieldOfWork } = data
    setIsLoading(true)
    await ApiInstance.post('/companies', {
      name,
      fieldOfWork
    })
    navigate('/')
  }
  const { palette } = useTheme()
  return (
    <FormProvider {...methods}>
      <Box
        id="finishStep"
        component={'form'}
        onSubmit={methods.handleSubmit(createCompany)}
        bgcolor={palette.primary.main}
        height={'100vh'}
        display="flex"
        justifyContent={'flex-start'}
        alignItems={'center'}
        pl={8}
      >
        {step === 1 && <CompanyName nextStep={nextStep} />}

        {step === 2 && <FieldOfWork nextStep={nextStep} />}

        {step === 3 && <AppExtensions step={step} isLoading={isLoading} />}
      </Box>
    </FormProvider>
  )
}
