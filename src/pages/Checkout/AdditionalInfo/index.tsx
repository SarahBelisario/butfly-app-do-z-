import { Box, Checkbox, Collapse, Grid, Typography, useTheme, Tooltip } from '@mui/material'
import { useState } from 'react'
import { Customer } from './Customer'
import { Shipping } from './Shipping'
import { motion, useAnimation } from 'framer-motion'
import { MdExpandMore } from 'react-icons/md'

export function AdditionalInfo(props) {
  const { palette } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [enableShipping, setEnableShipping] = useState(false)
  const [enableCustomer, setEnableCustomer] = useState(false)
  const controls = useAnimation()

  function handleSetCollapsed() {
    setIsCollapsed(!isCollapsed)
    controls.start({ rotate: isCollapsed ? 180 : 0 })
  }

  function handleEnableShipping(event) {
    event.stopPropagation()
    setEnableShipping(!enableShipping)
    if (!enableShipping) {
      setIsCollapsed(enableShipping)
      controls.start({ rotate: 180 })
    }
  }

  const collapseTitleStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
    alignItems: 'center',
    padding: 1,
    borderRadius: 2,
    background: palette.background.default
  }
  return (
    <Box {...props}>
      <Box mb={4}>
        <Typography onClick={handleSetCollapsed} fontWeight="light" fontSize="14px" color={palette.text.secondary}>
          Informações adicionais
        </Typography>

        <Grid container mt={2}>
          <Grid item xs={12}>
            <Box sx={collapseTitleStyle}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Incluir cliente">
                  <Checkbox size="small" defaultChecked={false} onChange={e => setEnableCustomer(e?.target?.checked)} />
                </Tooltip>
                <Typography ml={1} justifySelf="flex-start" textAlign="center" fontWeight="light" fontSize="14px" color={palette.text.secondary}>
                  Cliente
                </Typography>
              </Box>
            </Box>
            <Collapse in={enableCustomer} timeout="auto" sx={{ padding: 1 }}>
              <Customer />
            </Collapse>
          </Grid>

          <Grid item xs={12}>
            <Box onClick={handleSetCollapsed} sx={collapseTitleStyle}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Incluir transporte/frete">
                  <Checkbox size="small" defaultChecked={false} checked={enableShipping} onClick={handleEnableShipping} />
                </Tooltip>
                <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
                  Transporte/Frete
                </Typography>
              </Box>
              {enableShipping && (
                <motion.div animate={controls} initial={false} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <MdExpandMore color={palette.text.secondary} />
                </motion.div>
              )}
            </Box>
            <Collapse in={!isCollapsed && enableShipping} timeout="auto">
              <Shipping />
            </Collapse>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
