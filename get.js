function get(url)
{
    return new Promise(function(resolve,reject)
    {
        require('http').get(url,function(res)
        {
            if(res.statusCode!==200)
            {
                reject('request failed !');
            }
            else
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
            }
        }).on('error',function(e)
        {
            reject(e.message);
        });
    });
}
// get('http://luoc.studio').then(console.log,console.log);