let config=require('./config');
let params={};

// 参数设置成了false表明需要在后续初始化sender或者send过程中赋值

// 请求参数
params.Action='SingleSendSms';
params.SignName=false;  // 短信签名
params.TemplateCode=false; // 短信模板
params.RecNum='01234567890'; // 发送短信的号码列表，逗号分隔，发送时需要提供具体的值，否则发送会失败
params.ParamString=false;  // 短信模板需要的参数

// 公共参数
params.Format='JSON'; // 默认是JSON，也可以在构造函数中覆盖成XML
params.Version='2016-09-27';
params.AccessKeyId=false;
params.__AccessKeySecret=false;
params.__Signature=false; // 需要根据请求进行计算，不同的请求不一样
params.SignatureMethod='HMAC-SHA1';
params.Timestamp=false;  // 需要动态生成
params.SignatureVersion='1.0';
params.SignatureNonce=false; // 需要动态生成
// params.RegionId=''; // 这个参数不是必须的，不知道这个参数是干啥的，官方文档也没有给出例子和具体说明

module.exports=params;