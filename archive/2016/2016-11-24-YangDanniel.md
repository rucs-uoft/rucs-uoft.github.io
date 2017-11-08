---
layout: post
title: "Improved Heuristics for Solving the Pancake Problem"
author: "Danniel Yang"
supervisors: "Dr. Rick Valenzano and Professor Sheila McIlraith"
category: "Artificial Intelligence"
permalink: /artificial-intelligence/heuristics-for-solving-the-pancake-problem
---

Introduction
============

The pancake problem is a well-known combinatorial optimization
problem first studied by Bill Gates and Christos Papadimitriou in 1979
[2]. The problem is described as follows: a chef has a stack of
pancakes, all of which have different sizes. Before serving the stack,
the chef must sort the pancakes so that they are in ascending order – in
size – from top to bottom. However, the chef can only reorder pancakes
by using a spatula to flip some number of pancakes on top of the stack.
Given an unsorted stack, the objective is to sort it using as few flips
as possible.

This problem, which has recently been shown to be NP-hard [1],
has seen continued interest due to its relation to a number of
applications. These include calculating genome similarity [3] and
physical stacking problems, such as using a forklift to stack a set of
differently sized boxes in a structurally sound way. The problem is also
a standard benchmark in the heuristic search community, as search
techniques have proven to be an effective way to optimally sort pancake
stacks. In this work, we increase our understanding of the behaviour of
such approaches on this problem by evaluating the accuracy of a
state-of-the-art heuristic function. We also propose three new heuristic
functions that greatly improve problem-solving time.

Background
==========

A stack of $n$ pancakes can be represented as a permutation of the
numbers from $1$ to $n + 1$, where the permutation maps each location in
the stack to the pancake at that location. In this representation, $n+1$
corresponds to the plate under the stack and can never be flipped. For
example, $(2~1~4~3~5)$ represents a stack of $4$ pancakes in which the
second smallest pancake is on top of the stack and is followed by the
smallest pancake.

Iterative Deepening A\ (IDA\*) [5] is a heuristic search
algorithm that is commonly used to solve state-space search
problems. This algorithm employs a heuristic function, which
estimates the optimal cost of reaching a goal from any given state.
In the pancake puzzle, this means that the heuristic function estimates
the minimum number of flips needed to sort a given stack. IDA\* is
guaranteed to only find optimal solutions if the heuristic function
never overestimates the cost of reaching the goal. Such heuristic
functions are said to be admissible.

The state-of-the-art heuristic function used for the pancake problem is
the gap heuristic function [4]. A gap occurs whenever two
adjacent pancakes in a stack are not adjacent in the sorted stack; this
computation includes the plate as a pancake. The gap heuristic function
then counts the number of gaps in the stack. For example, in stack
$(2~1~4~3~5)$, there is a gap between every pair of consecutive pancakes
except pancakes $4$ and $3$, and so the heuristic estimate for this
stack is $3$. Since each flip can remove at most one gap, this heuristic
function is admissible.

New Heuristic Functions
=======================

In this work, we introduce three new admissible heuristic functions for
this problem. All three functions use the inverse of a permutation,
which is a mapping from each pancake to its location in the stack. For
example, the inverse of $(2~4~1~3~5)$ is $(3~1~4~2~5)$.

The first new function uses the inverse to quickly identify stacks in
which no single flip will decrease the number of gaps. This top
heuristic function increases the gap heuristic estimate by one in such
cases. The top’ heuristic function is then given by the maximum of
the values returned by the top heuristic function when applied to both a
stack and its inverse. Top’ remains admissible since the number of flips
needed to sort a stack is the same number needed to sort its inverse
[6]. Finally, we have also developed a way to quickly look ahead
to the top heuristic estimates of all successors of a stack, and thereby
improve the estimate of the stack itself. The **L-top’** heuristic
function is then given by the maximum found using this lookahead on both
a stack and its inverse.

Experimental Analysis
=====================

To better understand the gap heuristic function, we analyzed its
accuracy on all $10!$ possible $10$-pancake stacks by calculating the
**heuristic error** on each. This metric is defined as the difference
between the heuristic estimate and the optimal cost of that problem. The
first column of Table 1 shows a count of the number of states
with each amount of heuristic error. The table shows that the gap
heuristic function is off by no more than one on the majority of
problems, though there are stacks where it is much more inaccurate.

These results suggest that it is highly likely that the gap heuristic
function will be very accurate on any randomly generated stack, and we
confirmed this holds on larger stacks by random sampling. This helps to
explain the success of IDA\*-based approaches seen in the literature, in
which random sampling is the standard way to generate test sets
[4, 6].

| Heuristic Error | Gap      | Top      | Top'     | L-Top'   |
|:---------------:|:--------:|:--------:|:--------:|:--------:|
|0                |1,717,763 |1,839,701 |1,924,425 |1,992,492 |
|1                |1,710,742 |1,644,853 |1,593,637 |1,547,761 |
|2                |194,280   |141,609   |109,304   |87,645    |
|3                |5,924     |2,620     |1,430     |898       |
|4                |91        |17        |4         |4         |

<p style="text-align:center;font-size:0.95rem"><b>Table 1:</b> Heuristic  accuracy  on  all  stacks  of  10  pancakes.   The  entries  are  thenumber of problems with the corresponding heuristic error.</p>

Table 1 also displays heuristic error information for our new
heuristic functions. It shows that these functions are increasingly
accurate, so we tested them as part of an IDA\*-based solver to see if
the improved accuracy translated into better performance. We
experimented on two different test sets. The first, “random $50$",
consists of $1000$ randomly generated stacks of $50$ pancakes. The
second, “constructed $32$", consists of $1000$ stacks of $32$ pancakes
with a higher average heuristic error for the gap heuristic function.

Table 2 shows the performance of each heuristic function on
both test sets. For each function, the table shows the improvement seen
relative to the gap heuristic function, where a larger value indicates a
greater speedup. Clearly, the new heuristics lead to substantial
speedups on both test sets.

| Problem       | Gap | Top | Top' | L-Top'|
|:-------------:|:---:|:---:|:----:|:-----:|
|random 50      |1.0  |1.28 |1.74  |2.51   |
|constructed 32 |1.0  |1.95 |4.31  |6.94   |

<p style="text-align:center;font-size:0.95rem"><b>Table 2:</b> The relative performance of IDA* when using different heuristic functions on two problem sets. The table shows the speedup seen relative to the gap heuristic function.</p>

Conclusion
==========

In this work, we identified that the gap heuristic function is very
accurate on randomly generated pancake problems, though there are stacks
for which it is inaccurate. We then introduced three new heuristic
functions that are more accurate and greatly improved search
performance. Our work both improves our ability to solve pancake
problems, and increases our understanding of this well-studied problem.

### References

1. Laurent Bulteau, Guillaume Fertin, and Irena Rusu.  Pancake flipping is hard.Journal of Computer and System Sciences, 81(8):1556–1574, 2015.

2. William Gates and Christos Papadimitriou. Bounds for sorting by prefix reversal.Discrete Math, 27:47–57, 1979

3. Brian Hayes. Sorting out the genome.American Scientist, 95:386–391, 2007.

4. Malte Helmert. Landmark heuristics for the pancake problem. InProceedings ofthe Third Annual Symposium on Combinatorial Search, SOCS 2010, in pages109-110, 2010, 2010.

5. Richard  E.  Korf.   Depth-first  iterative-deepening:  An  optimal  admissible  treesearch.Artificial Intelligence, 27(1):97–109, 1985.

6. Uzi Zahavi, Ariel Felner, Robert C. Holte, and Jonathan Schaeffer.  Duality inpermutation state spaces and the dual search algorithm.Artificial Intelligence,172(4-5):514–540, 2008.

