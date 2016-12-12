let config=require('./config');
let params=require('./params');
// 有几个参数必须设置以覆盖在params.js中定义的默认值，然后才能使用send函数发送短信
// access_key_id=false
// access_key_secret=false
// sign_name='落尘科技'
// template_code=template_codes.test='SMS_18290089'
// 写的时候要用pascal格式

function createSender(args)
{
    let params=JSON.parse(JSON.stringify(params));

    params=Object.assign(params,args);

    if(params.AccessKeyId&&params.AccessKeySecret&&params.SignName&&params.TemplateCode)
    {
        let sender=params;
        sender.__proto__=proto;
        return sender;
    }
    else
    {
        return false;
    }
}

let proto={};
proto.send=send;

function send(args)
{

}

let test=0;
console.log(process.test);
console.log(module.test);