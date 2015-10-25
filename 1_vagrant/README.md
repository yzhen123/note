# vagrant bug记录

## vagrant in windows

请看这个文档:[vagrqant-in-windows.md](vagrqant-in-windows.md)

## 升级ubuntu内核造成的nfs无法挂载bug
体现为mount连接超时,解决办法参照：<https://github.com/mitchellh/vagrant/issues/6423>

具体操作就是在vagrantfile中配置同步选项为tcp
```rb
  config.vm.synced_folder "../share/", "/home/vagrant/share/", type: "nfs",  nfs_udp: false
```
