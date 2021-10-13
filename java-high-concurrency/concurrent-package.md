# 并发包

## 重入锁

**ReentrantLock**重入锁可以完全替代synchronized

lock() 获得锁
unlock() 释放锁

### 中断响应

对于synchronized来说，如果一个线程在等待锁，那么结果只有两种情况，要么它获得锁，要么等待。而是用重入锁，则提供体外一种可能，线程可以被中断。

lockInterruptibly() + interrupt()

### 限时等待

要避免死锁还有一个方法，就是限时等待。 tryLock()