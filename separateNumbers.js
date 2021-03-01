const separateNumbers = (event) => {
        return event?.target?.value
        ?.split(',')
        ?.map(value => parseInt(value))
        ?.filter((number) => !isNaN(number))
 }