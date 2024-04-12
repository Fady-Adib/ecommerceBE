export default class appErr extends Error  {
    constructor (msg,statusCode){
        super(msg)
        this.statusCode = statusCode
    }
}