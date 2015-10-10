var watch=require('watch');
var chokidar=require('chokidar');
var fs=require('fs');
var child_process = require('child_process');
var start=new Date().getTime()+3000;
var watchFolders=[
    './share/market',
];

watchFolders.forEach(function(path){
    // watch.watchTree(path,sync);
    chokidar.watch(path, {
      ignored: /[\/\\]\./,
    }).on('change', sync).on('add',sync);

    // fs.watch(path, { recursive: false },sync);
});
 


function sync(path,event){
     /*if (typeof f == "object" && prev === null && curr === null) {      // Finished walking the tree
    } else if (prev === null) {      // f is a new file
    } else if (curr.nlink === 0) {      // f was removed
    } else {      // f was changed
    }*/
    var end=new Date().getTime();
    if(end-start>3000){//10s同步
        start=end;
        /*var exec = require('child_process').exec;
      exec('call "'+process.cwd()+'/cwrsync.bat',
        function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          }else{
                console.log(stdout);
          }
      });*/

        var child = child_process.spawn(process.cwd()+'/cwrsync.bat');
        //'scp -P 2222 /home/lnmp0.4.tar.gz root@www.vpser.net:/root/lnmp0.4.tar.gz';
        //pscp -P 2222 -i E:\versioncontrol\doubangit\code\devkey_putty.ppk e:/versioncontrol/doubangit/code/share/rsync-3.1.1.rpm vagrant@127.0.0.1:/home/vagrant/share/rsync-3.1.1.rpm
        // var child = child_process.spawn("D:/Program Files (x86)/Git/bin/scp",["-P","2222",process.cwd()+'/'+f,"vagrant:vagrant@127.0.0.1:~/"+f]);
        //打印子进程的输出数据
        child.stdout.on('data', function (data) {
          console.log('stdout: ' + data);
        });

        //监听子进程的错误流数据
        child.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });

        //监听子进程的退出事件
        child.on('close', function (code) {
          console.log('child_process quit，code：' + code);
        });
    }
}

/*fs.watch('./testmount', function (event, filename) {
  console.log('event is: ' + event);  

  if (filename) {
    console.log('filename provided: ' + filename);
  } else {
    console.log('filename not provided');
  }


  var exec = require('child_process').exec;
  exec('call "'+process.cwd()+'/cwrsync.bat',
    function (error, stdout, stderr) {
    	console.log(stdout);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
});*/
/*

var watcher = chokidar.watch('file, dir, or glob', {
  ignored: /[\/\\]\./,
  persistent: true
});
 
var log = console.log.bind(console);
 
watcher
  .on('add', function(path) { log('File', path, 'has been added'); })
  .on('change', function(path) { log('File', path, 'has been changed'); })
  .on('unlink', function(path) { log('File', path, 'has been removed'); })
  // More events. 
  .on('addDir', function(path) { log('Directory', path, 'has been added'); })
  .on('unlinkDir', function(path) { log('Directory', path, 'has been removed'); })
  .on('error', function(error) { log('Error happened', error); })
  .on('ready', function() { log('Initial scan complete. Ready for changes.'); })
  .on('raw', function(event, path, details) { log('Raw event info:', event, path, details); })*/