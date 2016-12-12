let config={};

config.url='https://sms.aliyuncs.com/';

// 短信模板
let template_codes={};
config.template_codes=template_codes;

// 几个默认开通的短信模板
template_codes.test='SMS_18290089';                     // 短信测试
template_codes.idenfity_verification='SMS_18290090';    // 身份验证验证码
template_codes.login_confirmation='SMS_18290088';       // 登录确认验证码
template_codes.login_exception='SMS_18290087';          // 登录异常验证码
template_codes.user_register='SMS_18290086';            // 用户注册验证码
template_codes.activity_confirmation='SMS_18290085';    // 活动确认验证码
template_codes.change_password='SMS_18290084';          // 修改密码验证码
template_codes.information_modification='SMS_18290083'; // 信息变更验证码

// 在下面添加你的通过审核的短信模板


// OK,到此为止
module.exports=config;