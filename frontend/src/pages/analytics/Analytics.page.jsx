import { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid } from '@mui/material'
import AnalyticsHeader from 'components/analytics/AnalyticsHeader'
import AnalyticsStats from 'components/analytics/AnalyticsStats'
import OfficeVisits from 'components/analytics/OfficeVisits'
import VisitType from 'components/analytics/VisitType'
import { analyticsFilterOptions } from 'constants/analytics'

function Analytics() {
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    analyticsFilterOptions.THIS_WEEK
  )

  useEffect(() => {
    console.log(selectedFilterOption)
    // TODO -> get updated data based on option
  }, [selectedFilterOption])

  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box sx={{ m: -1 }}>
              <Typography sx={{ m: 1 }} variant='h4'>
                Analytics
              </Typography>
            </Box>
            {/* <Box
              sx={{
                mt: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
            

            
            </Box> */}
          </Box>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {/* <AnalyticsStats /> */}
              <Grid item md={12} xs={12}>
                <AnalyticsHeader
                  selectedFilterOption={selectedFilterOption}
                  setSelectedFilterOption={setSelectedFilterOption}
                />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <OfficeVisits selectedFilterOption={selectedFilterOption} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <VisitType
                  sx={{ height: '100%' }}
                  selectedFilterOption={selectedFilterOption}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Analytics
