let express = require('express');
let app = express();

app.post('/getCapture',(req,res)=>{
    let phone = req.body.phone;
    console.log('res,,,,',phone)
    res.end('hello')
})

let sendSMS = (phone)=>{
    const accessKeyId = '';
    const secreAccessKeyId = '';
    let smsClient = new SMSClient({accessKeyId,secreAccessKeyId});
    let code = Math.floor(Math.randow(0,1)*99999+100000);
    smsClient.sendSMS({
        PhoneNumbers:phone,
        SignName:'云通信产品',
        TemplateCode:'SMS_1000000',
        TemplateParam:'{"code":"12345"}',

    }).then(function(res){
        let {Code} = res;
        
    })
}

app.listen(8080);
