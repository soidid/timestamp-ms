'use strict'
import express from 'express'
let app = express();
let port = process.env.port || 3000;
app.get('*',(req,res)=>{
	console.log(req.path)
	let p = decodeURI(req.path.split('/')[1]);
    if(!p){
    	res.json({
			unix: null,
			natural: null
		})
		res.end()
    }else{

		if( /^[0-9]+$/.test(p) ){
			p = +p * 1000;
		}else{
			p = p +' 00:00:00 GMT+0000'
		}
		let date = new Date(p);
	
		res.json({
			unix: date.getTime()/1000,
			natural: date.toLocaleString('en-us', {month: "long"}) + ' ' + date.getDate() + ', ' + date.getFullYear()
		})
		res.end();
	}

})
app.listen(port,(err)=>{
	if(err){ console.log('Error') }
	console.log('Servering running at port: '+port)
})
