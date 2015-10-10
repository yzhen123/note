#coding=utf-8
import sys
import os
import re
import time
import logging
import thread
import subprocess
from subprocess import Popen, PIPE
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

isSyncing=False
# start=time.time()

def rsync():
    global isSyncing
    # global start
    # end=time.time()
    # if isSyncing or end-start<3: 
    if isSyncing: 
        thread.exit_thread()
        return 
    isSyncing=True
    # start=end
    st=time.time()
    # out=os.popen(sys.path[0]+'/cwrsync.bat').readlines()
    # for line in out:
    #     print line
    p=Popen(sys.path[0]+'/cwrsync.bat '+sys.argv[1], stdout=PIPE, stderr=subprocess.STDOUT)
    while True:
        line = p.stdout.readline()
        if not line:
            break
        print line.strip()
    isSyncing=False
    print '''=====================
    rsync finished in %s seconds!''' % int(time.time()-st)
    thread.exit_thread()


class EventHandler(FileSystemEventHandler):

    def __init__(self):
        pass

    def on_any_event(self, event):
        if event.event_type == 'deleted': #modified, moved,created
            return
        r = re.search('\.git([\\\\/]|$)',event.src_path)
        if r != None:
            return  
        print '+++++++++++++++'
        print 'event:%s %s' % (event.event_type,event.src_path)
        thread.start_new_thread(rsync,())


if __name__ == "__main__":
    watchFolder=os.path.dirname(sys.argv[0])+'/../share/'+sys.argv[1]
    print 'start watching folder "'+watchFolder+'"...'
    event_handler = EventHandler()

    observer = Observer()
    observer.schedule(event_handler, watchFolder, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
