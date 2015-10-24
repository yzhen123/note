# vagrant in windows nfs方案

## nfs in windows
https://github.com/winnfsd/vagrant-winnfsd

## vagrant插件安装失败方法
cp -r gems/vagrant-winnfsd-1.1.0/ /d/HashiCorp/vagrant/embedded/gems/gems/
cp -r specifications/vagrant-winnfsd-1.1.0.gemspec /d/HashiCorp/vagrant/embedded/gems/specifications
cp -r doc/vagrant-winnfsd-1.1.0 /d/HashiCorp/vagrant/embedded/gems/doc
cp cache/vagrant-winnfsd-1.1.0.gem /d/HashiCorp/vagrant/embedded/gems/cache


sudo cp -r gems/vagrant-parallels-1.4.2/ /opt/vagrant/embedded/gems/gems/
sudo cp -r specifications/vagrant-parallels-1.4.2.gemspec /opt/vagrant/embedded/gems/specifications
sudo cp -r doc/vagrant-parallels-1.4.2 /opt/vagrant/embedded/gems/doc
sudo cp cache/vagrant-parallels-1.4.2.gem /opt/vagrant/embedded/gems/cache

## /vagrant is not a directory
https://github.com/mitchellh/vagrant/issues/5933

## windows provision大量报错
http://theoden.intra.douban.com:45068/siv/trouble-shooting.html#windows-autocrlf
