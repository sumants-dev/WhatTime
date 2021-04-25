import moment from 'moment'

const time = moment(0)
useEffect(() => {
    const intervalID = setInterval(async () => {
      const { data } = await axios.post('/user/avalibility', 
      {calendar})
      const { times } = data[0]
      
      if (times.includes(changed_time_format)) {
        setIsClick(true)
      }
    }, 5000)
    return () => clearInterval(intervalID)
  }, [])
