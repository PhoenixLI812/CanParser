
+++
title = 'Secure Boot'
date = 2024-07-05T16:33:51+08:00
draft = false
+++
<!--more-->
# SecureBoot测试流程:

### 1.刷写FactoryHex
使用Jflash 刷写SW5225_Debug_FactoryImageWithPubKey_Signed.hex
![](../../../images/factoryhex.png)
刷写完成后运行TransToSecure.BAT脚本
![](../../../images/image-6.png)
![](../../../images/image-7.png)
执行完成后运行ReadLifeState.bat脚本
![](../../../images/image-8.png)
![](../../../images/image-10.png)
读取结果应该是33，这里23是因为测试板子已经进入了DEBUG状态
### 2.刷写成功后，使用上位机刷写UPDATEHEX
![](../../../images/image-1.png)
![](../../../images/image-3.png)
刷写成功
<div style="page-break-after: always;"></div>

### 3. 修改灯的频率，编译后修改UpdateHex文件签名，再次进行刷写
![](../../../images/image-4.png)
将位于Hex文件末尾的签名中最后一个byte进行修改，图片中由CB改为CC
再次用上位机进行刷写。
![](../../../images/image-5.png)
刷写成功后，观察MCU的LED灯的频率，并没有发生变化。
原因是程序虽然通过了SecureFlash的签名验证，并且完成了刷写流程，但是复位后SecureBoot的签名验证未通过，SecureBoot认为新刷写的程序是未经授权的，所以继续执行刷写之前得程序，这样就保证了只有经过授权得程序才能由boot启动。
### 4. 将步骤3所用hex文件最后得签名改回去，再次进行刷写
刷写成功后，观察MCU得LED灯得频率，发现已经改变，说明程序更新成功。

### Secure Boot Diagram

![](../../../images/SecureBoot.png)


















