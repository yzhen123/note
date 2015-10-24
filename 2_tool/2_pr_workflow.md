# pull request 工作流笔记

## 1.fork代码

点击项目主页的fork按钮，你懂的

## 2.在本地创建dev分支进行开发

```sh
git branch dev #新建分支dev
git checkout dev #切换分支为dev
```

## 3.写代码和提交

### 1. 假如自上一次合并很长一段时间都没有写代码了

假如自上一次合并很长一段时间都没有写代码了，你希望将上游版本库中别人提交的代码同步到本地和远程的，在最新的代码的基础上进行开发，需要先用`git pull upstream master`同步到本地的master分支（还要同步到本地的dev），然后再`git push origin master`到fork的版本库。

简化的开发流程就是：
```sh
git checkout dev #切换到dev分支
git pull upstream master #同步上游版本库的master分支
git push origin dev #更新到fork版本库的master分支
git rebase -i <commit> #合并commit
git push origin dev -f #强制更新到fork版本库的master分支
git fetch upstream master
git rebase upstream/master #重置提交顺序，并检查是否有冲突
# 最后提一个pull request将自己fork的版本库的dev分支提交给主项目的master分支，自己的master分支只有在别人给你贡献代码时才有用,别人fork了你fork的项目，然后往你的master分支提pull request，然后再将你的dev分支和别人的分支合并到你fork的版本库的master分支
```

写好代码后，最好先用`git status`查看当前项目的状态,
然后将需要同步的文件用`git add`添加到版本库中
然后再运行`git commit -m <message>`进行提交

## 4.同步上游版本库

fork相当于在服务器上clone整个项目，如果要保持fork的代码最新，需要先clone到本地，然后添加上游项目的地址，再进行更新。

比如一个项目的地址是：http://code.dapps.douban.com/market.git
我fork后的地址为：http://code.dapps.douban.com/yangzhen/market.git

然后需要运行的命令行：
```sh
# clone到本地
git clone http://code.dapps.douban.com/yangzhen/market.git  
# 添加上游版本库的源
git remote add upstream http://code.dapps.douban.com/market.git
```

之后就可以写代码和在本地commit了。
git commit 有用的参数
-m --message (必选) 同步的备注
-a --all 同步前add所有改动的代码
-i --include 在同步前add特定的文件
-o --only 只同步特定的某个文件
--short 简洁显示
--amend 只更新上次的同步（相当于将本次提交合并到上次提交）

在每次pull request前做如下操作，即可实现和上游版本库同步

```bat
git remote update upstream
git checkout {branch name} #切换分支，这一步必不可少!

git rebase upstream/{branch name}
```
其中rebase的作用是合并分支代码,
checkout和rebase 会把你的分支里的每个提交(commit)取消掉，并且把它们临时 保存为补丁(patch)(这些补丁放到".git/rebase"目录中),然后把"mywork"分支更新 为最新的"origin"分支，最后把保存的这些补丁应用到"mywork"分支上。（具体可见http://blog.csdn.net/hudashi/article/details/7664631）


## 5.修正rebase冲突

请看这个博客：http://www.cnblogs.com/sinojelly/archive/2011/08/07/2130172.html


## 6.撤销上次rebase的修改
实际上，在rebase之前的提交会以ORIG_HEAD之名存留。如果rebase之后无法复原到原先的状态，可以用git reset --hard ORIG_HEAD复原到rebase之前的状态
```sh
git reset --hard ORIG_HEAD
```

# 更多的git内容
git.md
