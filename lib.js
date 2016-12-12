let config=require('./config');
let querystring=require('querystring');
let date=new Date();

let params={};
// 请求参数
params.Action='SingleSendSms';
params.SignName=config.sign_name;
// 公共参数
params.Format='JSON';
params.Version='2016-09-27';
params.AccessKeyId=config.access_key_id;
params.SignatureMethod='HMAC-SHA1';
params.SignatureVersion='1.0';

function build_url(template_code,phone_numbers,args)
{
    let nonce=
        {
            Timestamp:get_timestamp(),
            SignatureNonce:get_nonce()
        };
    let template=
        {
            TemplateCode:config.template_code[template_code],
            RecNum:phone_numbers,
            ParamString:JSON.stringify(args)
        };

    // 得到含有所有所需属性的对象
    let query=Object.assign(params,nonce,template);
    // query={id:'fortest'};

    // 生成签名
    query=sort_by_key(query);
    let string_to_sign=querystring.stringify(query);
    query.Signature=build_signature(string_to_sign,'get');

    // 生成最终的查询字符串
    query=sort_by_key(query);
    console.log(query);
    query=querystring.stringify(query);

    return `${config.url}?${query}`;
}

console.log(build_url('test',18671038230,{customer:' twesix'}));

function get_timestamp()
{
    let timestamp='';
        timestamp+= date.getUTCFullYear();
        timestamp+='-';
        timestamp+=date.getUTCMonth()<10?'0'+date.getUTCMonth():date.getUTCMonth()+1;
        timestamp+='-';
        timestamp+=date.getUTCDate()<10?'0'+date.getUTCDate():date.getUTCDate();
        timestamp+='T';
        timestamp+=date.getUTCHours()<10?'0'+date.getUTCHours():date.getUTCHours();
        timestamp+=':';
        timestamp+=date.getUTCMinutes()<10?'0'+date.getUTCMinutes():date.getUTCMinutes();
        timestamp+=':';
        timestamp+=date.getUTCSeconds()<10?'0'+date.getUTCSeconds():date.getUTCSeconds();
        timestamp+="Z";
    return timestamp;
}

// console.log(get_timestamp());

function get_nonce()
{
    return (Math.random()+Math.random()+Math.random())*1e20;
}

function sort_by_key(obj)
{
    let keys=Object.keys(obj);
    keys.sort();
    let new_obj={};
    keys.forEach(function(ele)
    {
        new_obj[ele]=obj[ele];
    });
    return new_obj;
}

function build_signature(str='',method='get')
{
    str=encodeURIComponent(str);
    let key=config.access_key_secret+'&';
    // console.log(str);
    let hmac=require('crypto').createHmac('sha1',key);
    str=`${method.toUpperCase()}&%2F&${str}`;
    // console.log(str);
    hmac.update(str);
    let signature=hmac.digest('base64');
    // console.log(signature);
    return signature;
}

// let sign=build_signature('AccessKeyId%3Dtestid%26Action%3DSingleSendSms%26Format%3DXML%26ParamString%3D%257B%2522name%2522%253A%2522d%2522%252C%2522name1%2522%253A%2522d%2522%257D%26RecNum%3D13098765432%26RegionId%3Dcn-hangzhou%26SignName%3D%25E6%25A0%2587%25E7%25AD%25BE%25E6%25B5%258B%25E8%25AF%2595%26SignatureMethod%3DHMAC-SHA1%26SignatureNonce%3D9e030f6b-03a2-40f0-a6ba-157d44532fd0%26SignatureVersion%3D1.0%26TemplateCode%3DSMS_1650053%26Timestamp%3D2016-10-20T05%253A37%253A52Z%26Version%3D2016-09-27','post');
// console.log(sign);