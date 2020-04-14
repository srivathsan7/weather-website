const request=require('request')
const forecast=(latitude,longitude,callback) =>{
	const url='http://api.weatherstack.com/current?access_key=6c583b4a3f5d90901f3c7bf6888320fa&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)
    request({ url,json:true },(error,{body}) => {
    if(error)
    {
    	callback('Unable to connect to weather service',undefined)
    }
    else if(body.error){
     callback('Unable to find location',undefined)
    }
    else{
    callback(undefined,body.current.weather_descriptions[0]+" throughout the day . The Temperature is "+body.current.temperature+" degrees out , but it feels like "+body.current.feelslike+" degrees . "+"The humidity is "+body.current.humidity+" %.")
    
    }
   })
 }
 module.exports=forecast