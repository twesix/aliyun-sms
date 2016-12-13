# aliyun-sms-sdk
阿里云的SMS（短信服务）的SDK，官方没有给，自己写了一个.

## 使用方法

```
let sms=require('path/to/this/sdk');

let args=
    {
        AccessKeyId:'你的秘钥id',
        AccessKeySecret:'你的秘钥secret',
        SignName:'你的审批通过的短信签名',
        TemplateCode:config.template_codes.test
        // 短信模板，config.js里面给了几个阿里云默认审批通过的模板
    };
let test_sender=sender.createSender(args);

let res=test_sender.send
(
    {
        RecNum:'电话号码，多个使用逗号分隔',
        
        // 短信模板里面定义的参数
        ParamString:
            {
                customer:'twesix'
            }
    },
    method // 注意，这里的method是调用API的方法，默认是get，也可以是post
);
// 调用send之后返回的是一个Promise对象
res.then(console.log,console.log);
```

## 注意事项
1. 阿里云的API接口支持get和post方法调用，但我写这个sdk的时候正好是期末，冒着挂科危险写的，将send函数的method参数锁定为了get，
post方法以后有时间再补上 
2. 本人现在大三考研狗一个，事情很多，不一定会有时间完善这个sdk，希望有兴趣的同学能够多多帮忙，感激不尽。
3. 在程序里面的生成签名部分有几个坑，阿里云的文档也貌似有小的错误，有兴趣的同学可以自己先看看源码，在lib.js里面，如果有任何疑问，欢迎与我联系。
4. 程序中sender生成之后，它的属性会在build_query()和build_signature()的过程中有小的变化，如果你想看源码，可以注意一下这个。
