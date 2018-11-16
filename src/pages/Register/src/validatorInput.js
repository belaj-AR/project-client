const validator = (objVal) => {
  return new Promise ((resolve,reject) => {
    let { inputFname, inputLname, inputEmail, inputPassword } = objVal

    if (inputFname === '' || inputLname === '' || inputEmail === '' || inputPassword === '') {
      reject('you need to fill all form')
    }
    else if (inputFname.length < 2) {
      reject('First name length must be greater than 2')
    }
    else if (inputLname.length !== 0) {

      let patt = new RegExp(/\d/)

      if (patt.test(inputLname)) {
        reject('Last name must be contained with characther only')
      }
      if (inputLname.length < 3) {
        reject('Last name length must be greater than 2')
      }
    }

    let patt = new RegExp(/\d/)
    if (patt.test(inputFname)) {

      reject('First name must be contained with characther only')
    }

    patt = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
    if (!patt.test(inputEmail)) {

      reject('Email is invalid')
    }

    resolve('input valid')
  })
}

export default validator
