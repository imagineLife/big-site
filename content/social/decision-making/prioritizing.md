---
title: Prioritizing
author: Jake Laursen
excerpt: Some Tasks Are More Important Than Others
tags: ["the social world", "decisions"]  
parentDir: the-social-world
slug: the-social-world/decision-making/prioritizing
order: 4
---

# Prioritization

- [Prioritization](#prioritization)
  - [Prioritizing Work is Complicated](#prioritizing-work-is-complicated)
  - [Prioritizing Can Be Playful And Revealing](#prioritizing-can-be-playful-and-revealing)
  - [Consider Pre-Built Prioritizing Frameworks](#consider-pre-built-prioritizing-frameworks)
    - [Evaluate Reach, Impact, Confidene, and Effort Wite RICE](#evaluate-reach-impact-confidene-and-effort-wite-rice)
      - [Rice In an Engineering Org](#rice-in-an-engineering-org)
  - [Frameworks are available](#frameworks-are-available)
  - [A More Abstract Approach: Identify Meaningul Weight Attributes](#a-more-abstract-approach-identify-meaningul-weight-attributes)
    - [Maybe The Categories Aren't Best For You](#maybe-the-categories-arent-best-for-you)
    - [A Personalized Framework Could Be Best](#a-personalized-framework-could-be-best)
  - [References](#references)

## Prioritizing Work is Complicated

- How much profit will a feature earn?
- Which clients voices are the loudest?
- Which clients voices are the most reasonable?
- How much 'technical debt' do we need to address?
- What promises have we made?
- How far-reaching are the items that we have planned?

## Prioritizing Can Be Playful And Revealing
**The GAP**  
Prioritizing can feel overwhelming when there is too much to think about, too much to do, and definitely too much to figure out what to do when.  
People who tend to focus on executing tasks, "do-ers", might not "naturally" pick their heads up enough to think about the priorities of the work at their hands.  
People who tend to focus on influencing teams both inside and outside an org might not "naturally" give a "fair" weighting to effort involved in work.  

**The HOPE**  
We can spend our time, money, and energy on the things that matter the most to us and to those around us.  
We can begin by leveraging some pre-built prioritization frameworks. We are not the first people to ponder the complexities of prioritizing.  

## Consider Pre-Built Prioritizing Frameworks

[Several Frameworks](#frameworks-are-available) offer pre-conceived attributes to inform priority.  
These attributes, in and of themselves, are only as meaningful as the org values them.  
Adopting prioritization frameworks that offer attributes that are not important to the folks in the org might not help prioritize work.  
These frameworks might instead reveal a misalignment between the org and the prioritization framework, and might even prove the prioritization tool useless.  

### Evaluate Reach, Impact, Confidene, and Effort Wite RICE
The [RICE scoring model](https://www.productplan.com/glossary/rice-scoring-model/) involves ranking each of 4 factors:
- **Reach**: How broad will this reach? 1 person? a dozen? a hunderd? a thousand?
- **Impact**: For those who will be impacted here, _despite the number of people reached_, how meaningful is this to them? Will this only be a small difference that could be ignored? Will this change, fundamentally, how someone experiences something?
- **Confidence**: How sure is the estimation on the previous 2 factors, reach and impact? Are we 100% sure of our understanding of both reach and impact? Are we only 50% sure on impact but 100% sure on reach?  
- **Effort**: Despite the reach, despite the impact, despite how sure we are of those things, how difficult is this?  

The math equation of the rice model is:
```bash
( Reach * Impact * Confidence) / Effort = Priority
```

That result is the priority score provided by rice.  
Comparing several objectives can reveal a practical "ranking" of items.  


#### Rice In an Engineering Org
I currently earn my living as a software engineer. Despite our best efforts and intentions, engineers might not be the best folks to complete the entire prioritization model. Product owners and other major stakeholders are probably better suited to build comparative metrics around reach, Impact, and Confidence. Engineers may only be best at presenting an estimation on effort required to _do the technical work behind the objective_.  

## Frameworks are available

Several frameworks exist for prioriting work -

- RICE
  - (Reach _x_ Impact _x_ Confidence) / Effort (_[see above](#rice-in-an-engineering-org)_)
- Kano
- MoSCoW
  - MoSCoW rates to-do list items into 1 of four categories: **Must-Have, Should-Have, Could-Have, Will Not Have**
- Opportunity Scoring
  - Customer-Facing
    - ask customers to rate the importance of features in the product
    - ask customers how satisfied they are with each
    - high importance && low-satisfaction = priority
  - Product-Backlog Facing
    - I.D the Currenet-State of the product
    - I.D the desired state of the product
    - I.D the gaps in the product
    - I.D the steps needed to fill each gap
    - weight the cost/benefit of each set of steps
- Buy A Feature
  - With the team(s) responsible for the work at hand, estimate the "cost" of each product backlog item
  - Get feedback from a team of _stakeholders and/or customers_ on what they value in the product
    - Give each member a budget of play money (_poker chips, monopoly money, etc._)
    - Outline the list of backlog items to the team

## A More Abstract Approach: Identify Meaningul Weight Attributes
### Maybe The Categories Aren't Best For You
Prioritization Frameworks come with pre-planned attributes built-in: Reach, Impact, must-have, could-have, cost per objective, etc.  

To those new to the prioritization game, once you use a prioritization framework for some time, _(a critical detail here!)_ you may realize the "categories" of the framework might not "fit" your real-world needs.  

Perhaps "reach" is not relevant when prioritzing work for an apartment-building complex - the work affects everyone the same.  
Perhaps "cost per feature" is just not relevant, as you have an abundance of $$$.  
Perhaps separating "Must-Have" and "Should-Have" feels like the wrong categories for the renovation efforts of an automotive mechanic shop.  
Perhaps your confidence is so low in your understanding of the work at hand that you need to consult experts.  
Perhaps clients you cater to really matter. Some clients are the the company bill-payers. Some clients barely pay for an entry-level version of your product. Some clients are a pain-in-the-neck to deal with, despite the categories in a framework.  
These real-world miscategorizations can potentially render a framework useless.  
### A Personalized Framework Could Be Best
Rendering a Framework useless does not mean prioritizing is useless - it just means that the prioritizing _attributes_ are not important to the org. 
You could make your own prioritization framework!  
Perhaps some key details when considering a build-your-own framework:
- **Keep-It-Simple Categories**: all the pre-packaged frameworks have simple categories by name and by understanding. To build-your-own framework might be to mix-and-match categories from a pre-packaged env, add some more, remove some more, etc.
- **Scaling Categories Alike**: within each framework "category" is a choice that can be applied to each item in your work queue. Each item gets a score, or each item gets put in 1 of the "boxes".... there are no exceptions. There is no room for items that "dont fit" in the pre-packaged framework. If you're trying to re-build a framework and you're making categories that leave some work items out due to a lack-of-fit, you're going in the wrong direction.

## References
- [_roadmunk.com_](https://roadmunk.com/guides/product-prioritization-techniques-product-managers/)
- [_productplan.com_](https://www.productplan.com/glossary/buy-a-feature/)