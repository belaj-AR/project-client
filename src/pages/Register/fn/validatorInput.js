const validator = (objVal) => {
  return new Promise ((resolve,reject) => {
    let { inputFname, inputLname, inputEmail, inputPassword } = objVal

    if (inputFname === '' || inputLname === '' || inputEmail === '' || inputPassword === '') {
      reject('you need to fill all form')
    } else {
      resolve('input valid')
    }
  })
}

export default validator
