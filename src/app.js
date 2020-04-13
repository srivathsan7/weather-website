const express=require('express')
const path=require('path')
const app=express()
const port=process.env.PORT || 3000
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'../public')))
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{
	res.render('index',{
		title:'Weather App',
		name:'Srivathsan'
	})
})
app.get('/help',(req,res)=>{
  res.render('help',{
  	helpText:'This is some helpful text',
  	title:'help',
  	name:'Srivathsan'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
		title:'About Me',
		name:'Srivathsan'
	})
})

app.get('/weather',(req,res)=>{
   if (!req.query.address){
    return res.send({
      error:'you must provide a address term'
    })
  }
  geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{

        if(error){
           return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData) =>{
          if(error){
            return res.send({error})
        }
        res.send({
        forecast:forecastData,
        location,
        address:req.query.address
        })
     })
    })

})
app.get('/products',(req,res) =>{
  if (!req.query.search){
    return res.send({
      error:'you must provide a search term'
    })
  }
    console.log(req.query.search)
  res.send({
    product:[]
  })
})
app.get('/help/*',(req,res)=>{
   res.render('404',{
   	errorMessage:'Help Article Not Found',
   	name:'Srivathsan'
   })
})
app.get('*',(req,res)=>{
   res.render('404',{
   	errorMessage:'Page Not Found',
   	name:'Srivathsan'
   })
})
app.listen(port,() =>{
	console.log('Server is up on port'+port)
})