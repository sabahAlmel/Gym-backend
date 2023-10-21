import validator from 'validator'

export function isStrong(password){
    console.log("IS STRONG")
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/
    return validator.matches(password, regex)
}
export function isUsernameOk(username){
    console.log("username")
    const userRegex = /^(?=.*\d)[A-Za-z0-9]{6,}$/
    return validator.matches(username, userRegex)
}