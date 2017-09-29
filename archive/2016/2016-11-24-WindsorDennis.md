---
layout: post
title: "Database Query-building Strategies as a Predictor of Student Success"
author: "Dennis Windsor"
supervisors: "Professors Diane Horton, Bogdan
Simion, and Andrew Petersen"
category: "Software Projects"
permalink: /software-projects/database-query-building-strategies
---

Introduction 
============

Online teaching tools are becoming increasingly common. The data that
they collect offers the potential to automatically identify struggling
students who may benefit from intervention.

A large body of CS education research has focused on the challenges that
students face with introductory programming. Structured Query Language
(SQL) was not, until recently, the subject of much rigorous
investigation. Student performance in SQL is interesting due to its
imperative nature and prevalence in industry. Starting in 2015, Ahadi et
al. published a series of papers on student performance in an
introductory database course using SQL. They examined the relative
difficulty of different query types [1], syntax errors made by
students and the effectiveness of using these to predict student success
[2]. Most recently, they reported that semantic errors were the
most difficult for students to correct and emphasized the need “to
explicitly teach students techniques for choosing the appropriate type
of query” [3].

In an attempt to find other performance indicators and to further our
understanding of techniques that improve student performance, this paper
presents an analysis of the relationship between students’
problem-solving behaviour and their success in an introductory databases
course. We believe the ability to break down a solution into
appropriate, smaller pieces is important and hypothesized that students
who built and submitted their query in a series of systematic steps
would have greater success in the course. Throughout this paper, the
strategy of incrementally building queries is referred to as
“query-building.” More information on how we defined query-building can
be found in Table 1. A separate strategy for decomposing
queries is the use of views. This allows students to build a query from
a number of discrete pieces of code while only making a single
submission.

|Strategy |<center>Definition</center> |
|:-------:|:-----------|
|using query-building techniques | - code used in a modular fashion <br/> - subquery added to previous code <br/> - previous code put into a subquery <br/> - previous code used in assignment or to be used later <br/> - conditions systematically added to query |
|not using query-building techniques | - large sections of code added or deleted between submissions <br/> - little reuse of code <br/> - many small edits made to code with no clear goal <br/> - repeated changing of join type or (in)equalities <br/> |
|unclear if query-building techniques were used | - only a single submission was made <br/> - solution was reached too quickly for query-building techniques to be observed <br/> - initial submission was essentially correct, but required minor edits <br/> |

<p style="text-align:center;font-size:0.95rem"><b>Table 1:</b> Categories used in query-building analysis</p>

Approach
========

Our data set consists of students’ responses to online exercises in SQL
and Relational Algebra (RA) in a third year databases course. Students
used an online tool that allows unlimited attempts for each question.
They received feedback on each submission, showing them whether it was
correct, incorrect or syntactically incorrect. If there were no syntax
errors, they also saw the results of their query.

In total, 21,134 RA and 25,601 SQL submissions were collected from 241
students completing 24 separate queries. Students who scored below 40%
for their course grade or who scored 0% on the final exam were excluded
from analysis as they did not appear to have made substantial effort in
the course.

To examine the effect of the use of query-building techniques, we chose
the RA and SQL questions that had the most submissions for analysis. As
the focus was on how students approached query-building, rather than how
they dealt with syntactic errors, only syntactically correct submissions
were analyzed.

All submissions after a student’s first passing submission were ignored
because some students came back to questions later for further practice;
analyzing these would not give further insight into how they built new
queries. Any submissions made after the deadline for receiving credit
were also ignored. This left 512 RA submissions from 208 students, and
2473 SQL submissions from 201 students.

We examined each student’s submissions in order of submission time and
then placed the student into one of the following three categories:
using query-building techniques, not using query-building techniques, or
unclear if query building techniques were used (see Table 1). Based on this, 152 students were omitted from RA
analysis and 74 students were omitted from SQL analysis because we could
not determine if they were using query-building techniques. Students
appear to have found the RA question easier; the number of students who
only needed a single syntactically correct submission to receive a
correct result for the RA question was 112 compared to 31 for the SQL
question. The question being easier accounts for more students answering
it correctly in very few submissions, and this made it impossible to
determine whether they were using query-building techniques. This likely
accounts for more students being omitted from the SQL analysis than from
the RA analysis.

To analyze the effect of use of views and assignment, the equivalent
operation to views in RA, students were categorized as using assignment
in RA or views in SQL if they made a single submission to any question
which used assignment or views respectively.

Analysis 
========

To determine the effect of using query-building techniques, a Welch two
sample t-test was run to compare the course grades of students who used
query-building techniques to the grades of those who did not. This
comparison was performed for both languages. We also compared the grades
of students who used query building in *both* languages to the grades of
students who did not use it in either. The analogous comparisons were
made based on use of assignments/views.

Although the groups that used query-building techniques achieved higher
mean grades in all three comparisons (Table 2), only one of the tests shows a
statistically significant ($ p<0.05$) result. In section 2 it is
noted that students likely found the SQL question more challenging than
the RA question and may have only needed to rely on query-building
techniques when doing this query. This could explain the negative
results on the other two tests.

In each comparison, the group that used assignment/views achieved a
significantly higher mean grade than the groups that did not use this
feature (Table 3). One possible issue with
these results is that views in SQL were not focused on as heavily in
this course as assignment was in RA. This could mean that instead of
identifying students who are using a technique taught in the course, we
have identified students who had previous knowledge of SQL.

|Strategy | N | Mean | Median | Difference in Mean | 
|:-------:|:-:|:----:|:------:|:-------------:|
|query-building in RA |(23, 26) | (78.5, 75.0) | (80.0, 80.0) | 0.5 (0.87) |
|query-building in SQL|(81, 40) | (80.8, 76.9)| (81.0, 79.5)| 3.9 (0.043) |
|query-building in RA and SQL|(12, 5)|(81.3, 70.8)| (79.0, 80.0)| 10.45 (0.16)|

<p style="text-align:center;font-size:0.95rem"><b>Table 2:</b> Influence of using query-building techniques on course grades (Welch two sample t-test). Each tuple is of the form <em>(value for strategy users, value for strategy non-users)</em>.</p>   


|Strategy | N | Mean | Median | Difference in Mean | 
|:-------:|:-:|:----:|:------:|:-------------:|
|assignment in RA |(171, 64) | (78.8, 74.0) | (81.0, 76.0) | 4.8 (0.0065) | 
|assignment in SQL|(52, 183) | (80.6, 76.7)| (82.0, 78.0)| 3.9 (0.043) |
|assignment in RA and SQL|(12, 5)|(80.1, 73.0)| (81.5, 74.0)| 7.1 (0.0012)|

<p style="text-align:center;font-size:0.95rem"><b>Table 3:</b> Influence of using assginment in a single query on course grades (Welch two sample t-test). Each tuple is of the form <em>(value for strategy users, value for strategy non-users)</em>.</p>


Conclusion
==========

Use of assignment and views appears to be associated with student
performance, but the underlying reasons for this are unclear. Although
use of query-building techniques, which is focused on heavily in the
course, seems like it should help students solve problems, the results
do not consistently show an effect on course grade. This could be in
part due to the relative simplicity of the queries being analyzed.

A focus for further research could be to implement a system that
identifies students who appear to be struggling on a query, and then
present them with an alternative question to practice the use of query
building techniques and/or use of views and assignment.


### Acknowledgements

I would to like to thank Diane Horton, Bogdan Simion, and Andrew
Petersen for their invaluable guidance. I would also like to thank
Alireza Ahadi of the University of Technology Sydney for his input on my
research.

### References

1. A. Ahadi, J. Prior, V. Behbood, and R. Lister, “A quantitative study of the relative difficulty for novices of writing seven different types of sql queries” in Proceedings of the 2015 ACM Conference on Innovationand Technology in Computer Science Education, pp. 201–206, 2015.

2. A. Ahadi, V. Behbood, A. Vihavainen, J. Prior, and R. Lister, “Students’ syntactic mistakes in writing seven different types of sql queries and its application to predicting students’ success” in Proceedingsof the 47th ACM Technical Symposium on Computing Science Education, pp. 401–406, 2016.

3.  A. Ahadi, J. Prior, V. Behbood, and R. Lister, “Students’ semantic mistakes in writing seven different types of sql queries,” in Proceedings of the 2016 ACM Conference on Innovation and Technology in Computer Science Education, pp. 272–277, 2016.
