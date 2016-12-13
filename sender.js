let config=require('./config');
let libs=require('./lib');
let querystring=require('querystring');
let params=require('./params');
// 有几个参数必须设置以覆盖在params.js中定义的默认值，然后才能使用send函数发送短信
// AccessKeyId=false
// AccessKeySecret=false
// SignName='落尘科技'
// TemplateCode=template_codes.test='SMS_18290089'

// Format 不是必须参数，可以在调用createSender或send时指定，默认为JSON

function createSender(args)
{

    if(args.AccessKeyId&&args.AccessKeySecret&&args.SignName&&args.TemplateCode)
    {
        let sender=JSON.parse(JSON.stringify(params));
        sender=Object.assign(sender,args);
        sender.__AccessKeySecret=args.AccessKeySecret;
        delete sender.AccessKeySecret;
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
proto.__build_query=libs.build_query;
proto.__build_signature=libs.build_signature;
proto.__i_am_a_sender=true;

function send(args,method='get')
{
    method='get';
    // 展示不支持post方式发起请求，有时间再把这个功能加上

    if(args.RecNum&&args.ParamString&&this.__i_am_a_sender)
    {
        this.RecNum=args.RecNum;
        this.ParamString=JSON.stringify(args.ParamString);

        this.__build_query();

        this.__build_signature(method);

        // 生成最终的查询字符串
        let query=querystring.stringify(libs.sort_by_key(this));
        delete this.Signature;

        return require('./request').get(`${config.url}?${query}`);
    }
    else
    {
        return false;
    }
}

module.exports.createSender=createSender;