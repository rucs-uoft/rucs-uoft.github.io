---
layout: post
title: "Integrating Machine Learning into a Contributional Implementation
Framework"
author: "Ian Berlot-Attwell"
supervisors: "Dr. Rick Salay"
category: "Artificial Intelligence"
permalink: /artificial-intelligence/integrating-ml-into-contributional-implementation
year: "2016"
---

Introduction
====

For an event such as the Carnival in Rio, who would be a good speaker to
introduce it to Canadians? Given a sports event such as a baseball game,
what's the best day in August to hold it? Knowing a list of songs I
enjoy, what other songs would I like? These are functions that programs
have difficulty implementing. Such functions have unbounded requirements
due to subjective data, impractically large quantities of information,
inherent unreliability and such.

This is a critical problem to solve because the world is analog and
fuzzy yet ultimately we must make critical decisions. To solve this
problem a solution called Contributional Implementation (CI) has been
proposed which makes use of various Internet sources such as systems
(e.g. algorithms running on servers), people (e.g. task outsourcing) and
information (e.g. online databases and text) \[1\].

In the CI model the opinion of each source is aggregated with others
generating a final answer. Much like human decision-making, consulting
multiple sources compensates for the weaknesses in specific opinions.
However, the satisfaction achieved is heavily dependent upon the
aggregation. One must know which sources to value more highly and how to
combine the different opinions to arrive at a meaningful answer. This
task becomes particularly difficult as the Internet is dynamic and
sources increase and decrease in reliability over time.

Although difficult, this type of problem is ideally suited for machine
learning (ML). Firstly, we require known examples and the sources’
opinions on them. Given this information, a ML algorithm can be trained
to aggregate these opinions, implicitly determining how much to trust
each source. Should the reliability of a source change then the ML
algorithm can be retrained, thus adjusting its confidence in the source
as needed.

In line with this idea the research work was mainly directed at
improving the existing CI Java library (CI Framework). Improvement was
done by incorporating ML algorithms into the aggregation stage, and
implementing new features. Specifically, ML was incorporated into the CI
Framework, a new type of source was added to the framework, and access
to search engines was standardized. Finally, an existing function of the
EventPlanner program was re-implemented, and a new function was added.
The EventPlanner was a pre-existing program that used the CI framework
to implement functions with unbounded requirements dealing with the
organization and planning of events.

Approach
===

ML was introduced into the CI Framework by incorporating ML algorithms
from the WEKA project \[2\]. A standardized mechanism to manipulate
these algorithms within the CI Framework was implemented. Additionally,
data management tools such as specialized file creators and loaders, a
training data generator and an interface into WEKA's cross-validation
testing functions were created.

Also, a standard source was added to the CI Framework. This source is a
simpler version of the OpenEval algorithm \[3\] (SOE) used to answer
predicates. This source must be trained before evaluation. During the
training stage a user selects a predicate with a binary answer, e.g. "Is
event X real" and provides positive and negative examples. The source
then uses a search engine to determine word frequencies in related
website contents for these examples. A ML classifier is trained on these
so that future frequencies can be classified as true or false. Once
trained, the source can then be used to answer the initial predicate for
new and unknown inputs, e.g. "Is the event Comicon real"?

Additionally, standardized means to access Internet search engines were
incorporated into the CI Framework, allowing code to be independent from
the underlying search engine used. Furthermore, search engine output can
be cached and reused if desired. Also, a pre-existing EventPlanner
function was re-implemented with the improved version of the CI
Framework. This function dubbed "FakeEvent" determines whether a given
event is real or not. In addition, a new EventPlanner function dubbed
“MonthSuggestion” recommending the best month to hold a specific event
in a specific country is in development.

The "MonthSuggestion" function will answer the question "What is the
best month to hold event X in?” It will work by aggregating the opinions
of fifteen sources; each of these sources answering the same question
with either a recommended month or "unknown" (the source is unable to
recommend a month). Of these 15 sources, 3 sources recommend a month
based on temperature, precipitation and relation to national holidays
respectively. The remaining sources each represent a month. Consider the
source that deals with January, it returns either January (if the event
X is a good event to hold in January), or "unknown" (the event X is not
a good event to hold in January). It does this by first extracting the
keywords of event X (e.g. keywords Z~1~,Z~2~,Z~3~…). Each of these
keywords is then passed to a previously trained SOE which answers the
predicate "Is the keyword Z~n~ related to January?” If most of the
keywords are related then the source recommends January, otherwise it
returns "unknown". The other eleven sources have the same behaviour, but
for a different month.

Once all fifteen sources are implemented, the aggregator that will
combine the 15 unique opinions into a single opinion will be trained
using a list of known events with optimum months, and the implemented
sources. After training, the “MonthSuggestion” function will be able to
suggest the best month for a given event, ZZ. The function does so by
asking each of the fifteen sources about ZZ, and then using the trained
aggregator to produce a single final result.

Analysis
====

All improvements to the CI Framework were tested and operate
satisfactorily. The re-implemented "FakeEvent" function operates
equivalently to its original performance, with the added advantage that
the ML algorithm and search engine used can be easily changed. Regarding
the "MonthSuggestion" function, three sources recommending month based
on temperature, precipitation and relation to national holidays have
been implemented. The twelve remaining sources have been implemented,
but their underlying SOE has not yet been trained.

Conclusion
====

The work performed in this research highlights the viability and
desirability of the CI approach to implement functions with unbound
requirements. The CI Framework in its current state is fully operational
and allows for a modular approach while providing a simple interface
that conceals the underlying complexity.

### Acknowledgement

I would like to acknowledge the support and encouragement received by
Professor Dr. M. Chechik and Dr. R. Salay in this project.


### References

1. Chechik M, Dalpiaz F, Salay R "Integrating Crowd Intelligence into
Sofware" Proceeding CSI-SE '15 Proceedings of the Second International Workshop
on CrowdSourcing in Software Engineering, IEEE Press Piscataway, NJ,
2015

2. Frank E, Hall M, Holmes G, Pfahringer B, Reutemann P, Witten I "The
WEKA Data Mining Software: An Update" in SIGKDD Explorations, Volume 11, Issue 1, 2009.

3. Blum M, Samadi M, Veloso M "OpenEval: Web Information Query
Evaluation" in AAAI'13 Proceedings of the Twenty-Seventh AAAI Conference on Artificial Intelligence, Palo Alto, California, 2009.
