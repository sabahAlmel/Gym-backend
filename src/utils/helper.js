import validator from 'validator'

export function isStrong(password){
    console.log("IS STRONG")
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
    return validator.matches(password, regex)
}