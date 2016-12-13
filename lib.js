let config=require('./config');
let querystring=require('querystring');
let date=new Date();

function build_query()
{
    if(!this.__i_am_a_sender)
    {
        return false;
    }
    let nonce=
        {
            Timestamp:get_timestamp(),
            SignatureNonce:get_nonce()
        };

    // 得到含有所有所需属性的对象
    let query=Object.assign(this,nonce);

    // 生成签名
    query=sort_by_key(query);
    this.__string_to_sign=encodeURIComponent(querystring.stringify(query));
}

function build_signature(method)
{
    if(!this.__i_am_a_sender)
    {
        return false;
    }
    let hmac=require('crypto').createHmac('sha1',this.__AccessKeySecret+'&');
    hmac.update(`${method.toUpperCase()}&%2F&${this.__string_to_sign}`);
    this.Signature=hmac.digest('base64');
}


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
        if(!ele.match(/^__/))
        {
            new_obj[ele]=obj[ele];
        }
    });
    return new_obj;
}

module.exports.build_query=build_query;
module.exports.build_signature=build_signature;
module.exports.sort_by_key=sort_by_key;