const separateNumbers = (inputText) => {
        return inputText
        ?.split(',')
        ?.map(value => parseInt(value))
        ?.filter((number) => !isNaN(number))
}
