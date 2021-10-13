# Java内存模型（JMM）

## 原子性（Atomicity)
原子性是指一个操作是不可中断的。即使在多线程一起执行的时候，一个操作一旦开始，就不会被其他线程干扰。

## 可见性（Visibility）
可见性是指当一个线程修改了某一个共享变量的值，其他线程是否能够立即知道这个修改。

在串行程序中，可见性问题不存在。因为在后续读到这个变量的时候，一定是修改后的新值。

在并行程序中，缓存优化、硬件优化、指令重排都可能导致一个线程的修改不会立即被其他线程察觉。

## 有序性（Ordering)
因为程序在执行时，可能会进行指令重排，重排后的指令与原指令的顺序未必一致。

# 线程的基本操作

## 启动线程
start()

## 终止线程
stop() `过时`，过于暴力，会引起数据不一致的问题。

## 线程中断
* `interrupt()` // 中断线程
* isInterrupted() // 判断是否被中断
* static interrupt() // 判断是否被中断，并清除中断状态

中断不会立即使线程退出，只是通知它退出，至于目标线程接到通知后如何处理，完全由目标线程自行决定。

## 等待（wait）和通知（notify）
如果一个线程调用了`wait()`，那么它就会进入对象的等待队列。当`notify()`被调用，就会从等待队列中，`随机`选择一个线程唤醒。

必须包含在对应的`synchronized`语句中，都需要首先获得目标对象的一个监视器。

`wait()`与`sleep()`的区别
1. 可以被唤醒
2. `wait()`会释放当前目标对象的锁。

## 等待线程结束（join）和谦让（yield）
`join()`操作好比开发人员需要等待产品经理分析完需求，才能进行开发。

`Thread.yield()`是一个静态方法，让出CPU，然后继续进行CPU资源的争夺。感觉像休息一下，先让他们线程去忙。

## volatile与JMM
就是告诉虚拟机，要注意了，不要随意优化目标指令。就是保证这个变量的可见性。
但是要注意的是，volatile不能代替锁，它无法保证一下复合操作的原子性，例如i++
```java
public class VolatileTest {
    static volatile int i = 0;
    public static class PlusTask implements Runnable {

        @Override
        public void run() {
            for (int j = 0; j < 10000; j++) {
                i++;
            }
        }
    }

    public void main(String[] args) throws InterruptedException {
        Thread[] threads = new Thread[10];
        for (int i = 0; i < 10; i++) {
            threads[i] = new Thread(new PlusTask());
            threads[i].start();
        }
        for (int i = 0; i < 10; i++) {
            threads[i].join();
        }

        System.out.println(i);
    }
}
```
> 最终值应该是100000，但是输出总会小于100000

## 线程组
```java
public class ThreadGroupTest implements Runnable {

    @Override
    public void run() {
        String groupName = Thread.currentThread().getThreadGroup().getName() + "-" + Thread.currentThread().getName();
        while(true) {
            System.out.println("I am " + groupName);

            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        ThreadGroup printGroup = new ThreadGroup("PrintGroup");
        Thread t1 = new Thread(printGroup, new ThreadGroupTest(), "T1");
        Thread t2 = new Thread(printGroup, new ThreadGroupTest(), "T2");
        t1.start();
        t2.start();
        System.out.println(printGroup.activeCount());

        // 打印出线程组中所有的线程信息
        printGroup.list();
    }
}
```

## 守护线程（Daemon）
 * 守护线程 守护的对象已经不存在了，那么应用就退出了。
 * 这里只有守护线程自然会退出
```java
public class DaemonTest extends Thread {
    @Override
    public void run() {
        while (true) {
            System.out.println("I am alive");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        DaemonTest daemonTest = new DaemonTest();
        daemonTest.setDaemon(true);
        daemonTest.start();

        Thread.sleep(2000);
    }
}
```

## 线程安全与 synchronized
并发程序一大重点就是线程安全，数据都不正确了再高效率有何用。
可以加在代码块也可以加在方法上，保证是同一个锁就行。

* 指定加锁对象：对给定对象加锁，进入同步代码前要获得给定对象的锁。
* 直接作用于实例方法：相当于对当前实例对象加锁。
* 直接作用于静态方法：相当于对当前类加锁。
