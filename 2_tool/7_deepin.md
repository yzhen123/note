# deepin 问题和技巧记录


## 不能挂载ntfs盘
由于快速启动缓存文件的存在导致的,可以运行以下命令
```sh
sudo ntfsfix /dev/sdXY
```
后面sdXY是不能挂载的磁盘名
