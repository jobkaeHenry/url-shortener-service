import dayjs from 'dayjs'

const getTimeData = () => {
  const now = new Date()
  const parsedDate = dayjs(now).format('YYYY-MM-DD')
  const parsedTime = dayjs(now).format('HH:mm')
  const parsedTimePlus =dayjs(now).add(1,'hour').format('HH:mm')
  return (
    {
      parsedDate,
      parsedTime,
      parsedTimePlus
    }
  )
}

export default getTimeData