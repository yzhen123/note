@echo off
D:
cd D:\cwRsync\bin
SET HOME=%HOMEDRIVE%%HOMEPATH%
SET BASE_DIR=/cygdrive/e/versioncontrol/doubangit/code
SET SYNC_DIR=%1
@echo on
rsync -avc --exclude-from=%BASE_DIR%/.scripts/exclude.txt --chmod Du=rwx,Dog=rx,Fu=rwx,Fgo=rx --chown vagrant:vagrant --rsync-path "sudo rsync" -e "./ssh -p 2222 -l vagrant -i %BASE_DIR%/.scripts/devkey" %BASE_DIR%/share/%SYNC_DIR%/* vagrant@127.0.0.1:/home/vagrant/share/%SYNC_DIR%/
