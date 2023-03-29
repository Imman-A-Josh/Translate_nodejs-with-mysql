module.exports=app=>{

    const User=require('../controller/translate');

    app.get('/',User.getall);

    app.post('/',User.newuser)
}