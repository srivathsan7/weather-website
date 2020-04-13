const request=require('request')
const forecast=(latitude,longitude,callback) =>{
	const url='http://api.weatherstack.com/current?access_key=6c583b4a3f5d90901f3c7bf6888320fa&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=f'
    request({ url,json:true },(error,{body}) => {
    if(error)
    {
    	callback('Unable to connect to weather service',undefined)
    }
    else if(body.error){
     callback('Unable to find location',undefined)
    }
    else{
    callback(undefined,"The temperature is "+body.current.temperature+" degrees And "+body.current.weather_descriptions[0])
    
    }
   })
 }
 module.exports=forecast