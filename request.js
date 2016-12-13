function get(url)
{
    return new Promise(function(resolve,reject)
    {
        require('https').get(url,function(res)
        {
            res.setEncoding('utf8');
            let raw_data='';
            res.on('data',function(chunk)
            {
                raw_data+=chunk;
            });
            res.on('end',function()
            {
                resolve(raw_data);
            })
        }).on('error',function(e)
        {
            reject(e.message);
        });
    });
}

function post()
{

}

module.exports.get=get;
module.exports.post=post;