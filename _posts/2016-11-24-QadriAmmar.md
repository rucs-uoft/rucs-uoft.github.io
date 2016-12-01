---
layout: post
title: "m-Consensus Objects Are Pretty Powerful"
author: "Ammar Qadri"
supervisors: "Professor Faith Ellen"
category: "Theory of Computation"
permalink: /theory-of-computation/ammar-qadri
---

Introduction
============

The consensus problem is a fundamental problem in distributed computing
that is used to categorize the computational powers of shared objects.
Given any set of input values $x_1, x_2,  \ldots , x_n$ assigned to
processes $p_1,p_2, \ldots ,p_n$, respectively, a consensus algorithm
ensures that every process which takes sufficiently many steps decides a
value satisfying:

-   *Validity*: Every decision is the input to some process, and

-   *Agreement*: All decisions are the same.

Herlihy [1] defined the *consensus number* of
an object, which is the largest number of processes for which consensus
can be achieved using only instances of the object and registers. The
*consensus hierarchy* classifies objects by their consensus numbers.
Herlihy also proved that any object can be implemented by $n$-consensus
objects and registers (and, hence, by every object with consensus number
at least $n$) in a system with $n$ processes. However, the relative
computational powers of objects with the same consensus number in
systems with more processes is not entirely understood.

It has been shown [2, 3] that several well-known objects of
consensus number 2 can be implemented from 2-consensus objects and
registers in any system with finitely many processes. The *Common2
Conjecture* asserts that this is true for any object with consensus
number 2. More generally, the *Consensus Hierarchy Conjecture* asserts
that, for $n \geq 2$, every shared object of consensus number
$n' \leq n$ has an implementation from $n$-consensus objects and
registers in every system with finitely many processes.

Rachman [4] constructed a family of
nondeterministic objects that disprove this conjecture for all
$n \geq 2$. Afek, Ellen, and Gafni [5] proved
that the Consensus Hierarchy Conjecture does not even hold for
deterministic objects. They introduced the $O_{m,k}$ object, for
$m, k \geq 2$, and showed that each $O_{m,k}$ object has consensus
number $m$, but cannot be implemented from $m$-consensus objects in any
system with at least $km+k-1$ processes. More surprisingly, they showed
that an $O_{m, k+1}$ object cannot be implemented from $O_{m,k}$ objects
in any system with at least $mk+m+k$ processes. Thus,
$O_{m,2}, O_{m,3},  \ldots $ is an infinite sequence of objects with
increasing computational power, all with consensus number $m$.

The primary result of our work is that $O_{m,k}$ can be implemented
among finitely many processes from $(m+1)$-consensus objects and
registers. This implementation provides additional understanding of the
consensus hierarchy for deterministic objects and is a step towards a
characterization of their computational power. For our implementation,
we introduce a new family of deterministic objects, $Q_r$, for
$r \geq 0$.

The $Q_r$ object
================

The $Q_r$ object has two operations, <span><span><span
style="font-variant:small-caps;"><span>compete</span></span></span></span>and
<span><span><span
style="font-variant:small-caps;"><span>query</span></span></span></span>,
with the following sequential specifications:

-   The first <span><span><span
    style="font-variant:small-caps;"><span>compete</span></span></span></span> operation
    returns *true*, and the process that performs it is called the
    *winner* of the object. All subsequent <span><span><span
    style="font-variant:small-caps;"><span>compete</span></span></span></span> operations
    return *false*.

-   The first $r$ <span><span><span
    style="font-variant:small-caps;"><span>query</span></span></span></span> operations
    after the first <span><span><span
    style="font-variant:small-caps;"><span>compete</span></span></span></span> operation
    return the *id* of the winner. All other <span><span><span
    style="font-variant:small-caps;"><span>query</span></span></span></span> operations
    return $\bot$.

$Q_0$ is equivalent to a test-and-set object and, thus, has consensus
number 2. In general, the $Q_r$ object has consensus number $r+2$. The
additional power of the $Q_r$ object for $r>0$ is due to its
<span><span><span
style="font-variant:small-caps;"><span>query</span></span></span></span>operation,
which allows $r$ other processes to learn the identity of the winner.

**Theorem 2.1** *There is an implementation of the $Q_r$ object from
$(r+2)$-consensus objects and registers in every system with finitely
many processes.*

To implement a $Q_r$ object shared by $n$ processes, we use an array
*CONS* \[$1 \ldots n$\] of $(r+2)$-consensus objects, a register *gate*
which is initialized to $\bot$, and a fetch-and-increment object
*count*.

A process $p_i$ performing <span><span><span
style="font-variant:small-caps;"><span>compete</span></span></span></span>begins
by reading *gate*. If $\textit{gate} \neq \bot$, it returns *false*.
Otherwise, $p_i$ writes $i$ to *gate*. This ensures that all processes
that write to *gate* are concurrent. Process $p_i$ continues by entering
a tournament: it proposes $i$ to *CONS* \[$i$\] through *CONS*\[$n$\] in
order, returning *false* as soon as it is not the decision of one of
these consensus objects. Otherwise, it returns *true*.

To perform <span><span><span
style="font-variant:small-caps;"><span>query</span></span></span></span>,
a process $p_i$ first reads the value $i'$ of *gate*. If $i' = \bot$, it
returns $\bot$. Otherwise, it calls <span><span
style="font-variant:small-caps;">f&i</span></span> on *count* and, if it
has been accessed more than $r$ times, returns $\bot$. Otherwise, $p_i$
proposes $i'$ to *CONS* \[$i'$\]. Then it proposes the decision of
*CONS* \[$j-1$\] to *CONS* \[$j$\] for $i' < j \leq n$, in order. Finally,
$p_i$ returns the decision of *CONS* \[$n$\], which is the *id* of the
winner.

Implementing the $O_{m,k}$ object 
=================================

The $O_{m,k}$ object, for $m, k \geq 2$, has a single operation,
<span><span><span
style="font-variant:small-caps;"><span>suggest</span></span></span></span>,
which takes a non-negative argument. Its sequential specification can be
described by the string:
$$S_{m,k} = A_1^mA_2^m \ldots A_k^mA_{k-1}A_{k-2} \ldots A_1$$ Let $a_j$
denote the argument of the $(j-1)m + 1^{st}$ <span><span><span
style="font-variant:small-caps;"><span>suggest</span></span></span></span>operation.
If $A_g$ is the $j^{th}$ character in $S_{m,k}$, then, for
$1 \leq j \leq km+k-1$, the $j^{th}$ <span><span><span
style="font-variant:small-caps;"><span>suggest </span></span></span></span>operation
returns $a_g$, and we say it *belongs to group $g$*. If $j > km+k-1$, it
returns $\bot$. The first $km$ <span><span><span
style="font-variant:small-caps;"><span>suggest</span></span></span></span> operations
performed on the object are called *prefix operations*, and the next
$k-1$ <span><span><span
style="font-variant:small-caps;"><span>suggest</span></span></span></span> operations
are called *suffix operations*.

**Therorem 3.1** *There is an implementation of $O_{m,k}$ from $(m+1)$-consensus objects
and registers in every system with finitely many processes.*

To implement the $O_{m,k}$ object among $n$ processes, we use an array
*CONS* \[$1 \ldots k$\] of $(m+1)$-consensus objects and an array
*position* \[$1 \ldots km$\] of $Q_1$ objects (which, by Theorem \[Qr\],
can be implemented from registers and 3-consensus objects and, thus,
$(m+1)$-consensus objects). For $j \in \{1,\ldots,km\}$, there is an
array $\textit{announce}_j[1 \ldots n]$ of registers that is used by
processes to announce their values. When process $p_i$ performs
<span><span style="font-variant:small-caps;">suggest$(v)$</span></span>,
it performs <span><span><span
style="font-variant:small-caps;"><span>compete</span></span></span></span>on
the first $Q_1$ object that it has not previously accessed and
continues, in order, until it wins one. Prior to performing
<span><span><span
style="font-variant:small-caps;"><span>compete</span></span></span></span>on
*position*\[$j$\], $p_i$ announces $v$ in $\textit{announce}_j[i]$. If
$p_i$ wins *position*\[$j$\], then it is performing a prefix operation
belonging to group $\lceil \frac{j}{m} \rceil$, so it proposes $v$ to
$\textit{CONS}[\lceil \frac{j}{m} \rceil]$ and returns the decision. If
$p_i$ has accessed, but failed to win *position*\[$km$\], it calls
<span><span style="font-variant:small-caps;">f&i</span></span> on a
fetch-and-increment object *count*. Suppose *count* has been accessed
$x$ times. If $x \geq k$, $p_i$ returns $\bot$. Otherwise, $p_i$ is
performing a suffix operation belonging to group $k - x$. It performs
<span><span><span
style="font-variant:small-caps;"><span>query</span></span></span></span>on
$\textit{position}[(k-x)m]$ to get the identity $i'$ of a prefix
operation belonging to this group. It reads $\textit{announce}_j[i']$,
proposes this announced value to $\textit{CONS}[k-x]$, and returns the
decision.

Acknowledgement
----

I would like to thank my supervisor Faith Ellen for her constant support
and encouragement and the Natural Sciences and Engineering Research
Council of Canada (NSERC) for funding this research.


References
---------

1. Maurice Herlihy. Wait-free Synchronization. In ACM Trans Program Language Systems, pages 124-149, 1991.

2. Yehuda Afek, Eli Gafni, John Tromp, and Paul M. B. Vit ́anyi. Wait-free test-and-set (extended abstract).  In Proceedings of the 6th International Workshop on Distributed Algorithms (WDAG), pages 85–94, 1992.

3. Yehuda  Afek,  Eytan  Weisberger,  and  Hanan  Weisman. A  completeness theorem for a class of synchronization objects.  In Proceedings of the Twelfth Annual ACM  Symposium  on  Principles  of  Distributed  Computing  (PODC), pages 159–170, 1993

4. Ophir Rachman.  Anomalies in the wait-free hierarchy.  In Proceedings of the 8th International Workshop on Distributed Algorithms (WDAG), pages 156–163,1994

5. Yehuda  Afek,  Faith  Ellen,  and  Eli  Gafni.   Deterministic  objects:  Life  beyondconsensus.   In Proceedings  of  the  2016  ACM  Symposium  on  Principles  of Distributed Computing (PODC), pages 97–106, 2016

