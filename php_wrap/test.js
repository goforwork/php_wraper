var exec = require('child_process').exec;
exec('php.exe --help', function(e, date){
    if(e){
        console.log('执行错误:', e);
    }
    console.log(date);
});