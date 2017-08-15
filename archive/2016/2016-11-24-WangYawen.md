---
layout: post
title: "Software-Based Power Monitoring for Smartphones in the Wild"
author: "Yawen Wang, K. Shankari and Jonathan Fürst"
supervisors: "Professor David Culler"
category: "Software Engineering"
permalink: /software-engineering/software-based-power-monitoring-for-smartphones
---

Introduction 
============

In the past decade, the rich set of sensors embedded in modern
smartphones has inspired much research into context-aware applications
through continuous mobile sensing. Given the strict power budget on
mobile phones, it has become a high priority for researchers to
implement energy efficient sensing algorithms. Our survey shows that
most researchers rely on external hardware power monitors to evaluate
the power drain of mobile sensing applications. External hardware power
monitors not only require direct access to the phone’s battery, but also
limit the mobility of testing and prohibit analysis on direct power
versus accuracy trade-off. To overcome these limitations, we propose a
software-based power monitoring technique that is easy to use and
enables power monitoring of smartphones in the wild. With extensive
testing, we show that this approach is a valid and effective way to
evaluate power usage on both Android phones and iPhones.

Literature Survey
=================

To gain a better understanding of approaches employed in academia for
power evaluation of mobile sensing applications, we looked at the papers
published at the two top conferences on mobile computing (MobiSys and
SenSys) for the past 5 years and studied papers that utilized continuous
sensing and reported power evaluation of their applications. The
different techniques are summarized in Table \[tab:summary-techniques\].

| Mobile Sensing Applications                                                                                     | Power Evaluation Technique                                    |
|----------------------------------------------------------------------------------------------------------------:|---------------------------------------------------------------|
| Caloric expenditure of bicyclists [1] <br/> Automatic labeling of transit stations semantics [2]                      | PowerTutor: model-based power estimation app                   |
| Indoor/outdoor detection [3] <br/> Bus arrival time estimation [4]                                                     | Exhaustive battery run-down tests                             |
| Transportation mode detection [5] <br/> Indoor/outdoor detection [6] <br/> Driving routes detection [7]                       | Simple power model: built offline fordifferent components     |
| Device interaction [8] <br/> Transportation mode detection [9] <br/> Hotword detection [10] <br/> Meeting membership detection [11] | External power monitor: power measurement of the whole design. |

PowerTutor [12] is a standalone power profiling
application that was developed at the University of Michigan back in
2009. This tool only gives accurate absolute power measurements on three
phone models and it has not been updated in three years. On the other
hand, exhaustive battery run-down tests give a good estimation of whole
system power consumption, but are time-consuming.

A majority of the papers we surveyed use a hardware power monitor on
Android phones with removable batteries. However, as of 2016, popular
smartphone manufacturers like Samsung and Lenovo have adopted
non-removable batteries for a sleeker and more robust design. Connecting
an external power monitor to such a phone is both challenging and risky
because it requires manually disassembling the back of the phone.

We also observed from the literature survey that data used for studying
accuracy is often collected in the wild, where phones are carried
throughout people’s daily activities, despite the fact that most power
measurements are gathered in well-controlled experimental settings. This
practice persists even for mobility-based detection such as
indoor/outdoor detection and transportation mode detection. The
segregation of accuracy and power analysis hinders a more thorough
understanding of the relationship between these two indispensable design
goals. We think the dearth of direct accuracy versus power trade-off
analysis can be largely attributed to limits on mobility imposed by
bulky external hardware monitors.

Proposed Methodology
====================

Both Android and iOS provide a software API that returns battery level
readings. The technical term for battery percentage is “State of Charge”
(SoC), denoting the percent of energy remaining in a phone battery
[13], and therefore should be proportional to power draw
from the battery. Our proposed software-based power monitoring tool
records the change in SoC and enables easy comparison of power drain on
different continuous sensing mobile applications. For example, to
compare power usage of two designs, we will use two phones of the same
model, same OS version and same baseline applications installed. Next,
each phone will run one of the designs and we can then compare the
change in their respective SoC over time. One big advantage of the
software-based power monitoring tool is that it does not require access
to phone battery, making it compatible with newer phones with
non-removable batteries. Furthermore, the fact that our methodology is
purely software based means that there is no limitation on phone
mobility during evaluation. Therefore, data related to power and various
sensors can be collected simultaneously, allowing for direct analysis on
the trade-off between accuracy and power.

Implementation
==============

The battery monitoring tool is currently implemented as part of a
location tracking app called E-mission [14] that is available for
download for both iOS and Android devices. It periodically reads battery
percentage (SoC) from the software battery API, stores it locally, and
pushes it to a remote server when connected to the Internet. Data saved
on the server can be easily pulled to a local machine for analysis.

Analysis
========

To evaluate the accuracy of SoC reported through software, we conducted
various experiments on four iPhone 6 and four Nexus 6 devices to examine
the behavior of software-based power monitoring on both platforms.

To emulate a constant workload, we turn on high accuracy location
tracking with GPS on all 8 phones while they are placed in stationary.
Figure \[fig:battery-drain\] depicts the battery drain for a full
discharge. The change in the SoC fits well to linear models with a low
root mean square error of 0.4285 (iPhone) and 0.343 (Android). The
average battery drain rate (percent drop/hr) also exhibits high
consistency across phones with a small standard deviation: 0.126 for
iPhones, and 0.136 for Android.


<p style="text-align: center;">
<img style="margin:50" src="{{ site.baseurl }}/assets/battery_drain.png"/>
</p>

<p style="text-align:center;font-size:0.95rem"><b>Figure 1:</b> Battery drain across phones (full discharge cycle)</p>


We also measured voltage and current naively for a Galaxy Nexus device
for a full discharge cycle using two multimeters while the phone was set
to play a video with a white screen on repeat. Figure \[fig:sw-hw\]
shows the comparison between hardware-based and software-based SoC. The
average battery drain rate from the sw-reported SoC was found to be
fairly accurate with a small % error of 4.27%.

<p style="text-align: center;">
<img style="margin:50" src="{{ site.baseurl }}/assets/wy-sw_hw.png"/>
</p>

<p style="text-align:center;font-size:0.95rem"><b>Figure 2:</b> SW vs HW Measured state of charge</p>

We ran battery monitoring at various frequencies on identical phones and
compared with a baseline phone. We observed that periods longer than 30m
have negligible battery drain overhead.

These results collectively demonstrate the accuracy and potential of
software-reported SoC. They justify software-based power monitoring as a
valid technique for studying power behavior of continuous sensing mobile
applications.

Conclusion
==========

Given the limitations of existing power monitoring techniques and the
shift towards non-removable battery in the mobile industry, our proposed
technique can help to simplify the power monitoring process and enable
researchers to evaluate their designs in the wild for a better
understanding of their power consumption. For future work, we would like
to build a standalone battery percentage monitoring app with
configurable settings allowing easier adoption of this technique.


### Acknowledgement

This work was funded by the NSF SUPERB Program. I would like to thank my
mentor K. Shankari, Jonathan F<span>ü</span>rst, and Professor David
Culler for the tremendous amount of support and guidance that went into
making this project possible.

### References

1. Andong Zhan, Marcus Chang, Yin Chen, and Andreas Terzis. Accurate caloricexpenditure  of  bicyclists  using  cellphones.   In Proceedings of the 10th ACMConference on Embedded Network Sensor Systems, pages 71–84. ACM, 2012.

2.  Moustafa   Elhamshary,    Moustafa   Youssef,    Akira   Uchiyama,    Hirozumi Yamaguchi,  and  Teruo  Higashino. Transitlabel:   A  crowd-sensing  systemfor  automatic  labeling  of  transit  stations  semantics.    In Proceedings of the 14th Annual International Conference on Mobile Systems, Applications, and Services, pages 193–206. ACM, 2016.

3. Pengfei  Zhou,  Yuanqing  Zheng,  Zhenjiang  Li,  Mo  Li,  and  Guobin  Shen. Iodetector:  a  generic  service  for  indoor  outdoor  detection.   In Proceedings of the 10th ACM Conference on Embedded Network Sensor Systems, pages 113–126. ACM, 2012

4.  Pengfei Zhou, Yuanqing Zheng, and Mo Li.  How long to wait?:  predicting bus arrival time with mobile phone based participatory sensing.  In Proceedings ofthe 10th international conference on Mobile systems, applications, and services, pages 379–392. ACM, 2012.

5.  Samuli  Hemminki,  Petteri  Nurmi,  and  Sasu  Tarkoma.   Accelerometer-based transportation mode detection on smartphones. In Proceedings of the 11th ACM Conference on Embedded Networked Sensor Systems, page 13. ACM, 2013.

6. Valentin Radu,  Panagiota Katsikouli,  Rik Sarkar,  and Mahesh K Marina.  Asemi-supervised  learning  approach  for  robust  indoor-outdoor  detection  with smartphones. In Proceedings of the 12th ACM Conference on Embedded NetworkSensor Systems, pages 280–294. ACM, 2014.

7. Sarfraz Nawaz and Cecilia Mascolo. Mining users’ significant driving routes withlow-power sensors.  In Proceedings of the 12th ACM Conference on Embedded Network Sensor Systems, pages 236–250. ACM, 2014

8. Zheng Sun, Aveek Purohit, Raja Bose, and Pei Zhang.  Spartacus:  spatially-aware  interaction  for  mobile  devices  through  energy-efficient  audio  sensing. In Proceeding of the 11th annual international conference on Mobile systems,applications, and services, pages 263–276. ACM, 2013.

9. Kartik   Sankaran,   Minhui   Zhu,   Xiang   Fa   Guo,   Akkihebbal   L   Ananda,Mun  Choon  Chan,  and  Li-Shiuan  Peh.   Using  mobile  phone  barometer  forlow-power transportation context detection.  In Proceedings of the 12th ACM Conference on Embedded Network Sensor Systems, pages 191–205. ACM, 2014.

10. Li Zhang, Parth H Pathak, Muchen Wu, Yixin Zhao, and Prasant Mohapatra. Accelword:   Energy  efficient  hotword  detection  through  accelerometer. In
 Proceedings of the 13th Annual International Conference on Mobile Systems, Applications, and Services, pages 301–315. ACM, 2015.
 
11. Wai-Tian Tan, Mary Baker, Bowon Lee, and Ramin Samadani.  The sound of silence.  In Proceedings of the 11th ACM Conference on Embedded Networked Sensor Systems, page 19. ACM, 2013

12. Z  Yang.    Powertutor-a  power  monitor  for  android-based  mobile  platforms. EECS, University of Michigan, retrieved September, 2:19, 2012

13. Mohammad Ashraful Hoque, Matti Siekkinen, Kashif Nizam Khan, Yu Xiao, and Sasu Tarkoma. Modeling, profiling, and debugging the energy consumption of mobile devices. ACM Computing Surveys (CSUR), 48(3):39, 2016.

14. K. Shankari.  E-mission:  https://e-mission.eecs.berkeley.edu, 2016.
