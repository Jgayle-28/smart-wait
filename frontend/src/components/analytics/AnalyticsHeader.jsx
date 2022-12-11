import { Box, Chip } from '@mui/material'
import { analyticsFilterOptions } from 'constants/analytics'

function AnalyticsHeader({ selectedFilterOption, setSelectedFilterOption }) {
  return (
    <>
      <Box>
        <Chip
          variant={
            selectedFilterOption === analyticsFilterOptions.THIS_WEEK
              ? 'contained'
              : 'outlined'
          }
          color={
            selectedFilterOption === analyticsFilterOptions.THIS_WEEK
              ? 'primary'
              : 'default'
          }
          label='This Week'
          onClick={() =>
            setSelectedFilterOption(analyticsFilterOptions.THIS_WEEK)
          }
          sx={{ marginRight: 1 }}
        />
        <Chip
          label='This Month'
          variant={
            selectedFilterOption === analyticsFilterOptions.THIS_MONTH
              ? 'contained'
              : 'outlined'
          }
          color={
            selectedFilterOption === analyticsFilterOptions.THIS_MONTH
              ? 'primary'
              : 'default'
          }
          onClick={() =>
            setSelectedFilterOption(analyticsFilterOptions.THIS_MONTH)
          }
          sx={{ marginRight: 1 }}
        />
        <Chip
          label='This Year'
          variant={
            selectedFilterOption === analyticsFilterOptions.THIS_YEAR
              ? 'contained'
              : 'outlined'
          }
          color={
            selectedFilterOption === analyticsFilterOptions.THIS_YEAR
              ? 'primary'
              : 'default'
          }
          onClick={() =>
            setSelectedFilterOption(analyticsFilterOptions.THIS_YEAR)
          }
        />
      </Box>
    </>
  )
}

export default AnalyticsHeader
