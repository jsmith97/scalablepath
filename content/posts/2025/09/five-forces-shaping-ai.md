---
date: '2025-09-15'
publishDate: '2025-09-15'
draft: false
title: 'The Five Forces Shaping AI'
tags:
  - Strategy
  - AI
  - AIAdoption
  - EnterpriseAI
  - TechTrends
summary: "Five structural forces are shaping AI’s trajectory: concentrated training, barbell inference, scale economics, adoption shifts, and incumbent-controlled distribution."
---
The AI narrative is full of hype. I believe there are five forces that will shape its trajectory in the near to mid term.

- Training is concentrated
- Inference splits
- Scale economics bite
- Adoption shifts from assistants to agents
- Distribution is controlled by incumbents

# **1. Training = concentration not collusion**

Training the largest AI models takes huge amounts of computing power. That power is concentrated in the hands of a few companies.

Nvidia designs the chips that dominate the market and locks developers into its software ecosystem. As of 2023 Nvidia supplied nearly all data centre GPUs, around 95 to 98 percent and it remains overwhelmingly dominant in 2024 and 2025.

TSMC, the Taiwanese chipmaker, produces most of the world’s leading-edge chips, with about 60 to 70 percent foundry share and control of sub-5nm nodes. It also dominates advanced packaging, the process of combining GPUs with high-bandwidth memory and that capacity remains scarce. Even with new data centres and big orders the bottleneck is not removed. If you want the latest chips you need to talk to TSMC.

The big cloud providers buy those chips in bulk, secure the electricity and land and then rent out training capacity on their own terms.

Governments add another layer, deciding who can buy what through export bans and security reviews.

## **In-house chips and national plays**

Amazon has Trainium, its in-house chip. It works for some training jobs but not all. Google’s TPUs (v5e, v5p, with Trillium incoming) are publicly available on Google Cloud and used by external customers. Google also runs them internally at massive scale. Countries in the Gulf and Asia are investing in national data centres, buying chips in bulk and securing long-term power contracts to reduce reliance on US supply chains.

## **Open models as strategy**

Open models do not add new compute. They make past work available for reuse. Meta’s Llama 3, Mistral’s *mixture of experts* models (a design that activates only part of a network at once to cut cost) and China’s DeepSeek are not charity projects. They are strategic. Meta uses Llama to undercut closed platforms and pull developers into its orbit. Mistral and DeepSeek release capable smaller models to gain attention while charging for reliable hosted versions.

## **Strategic choke points**

A few operators set the price and terms. Everyone else works around them.

# **2. Inference = a barbell market**

Training is the high-energy, high-cost process that creates a model. Inference is the lighter, everyday running of that model to answer questions, write text or generate images.

A *barbell market* means concentration at two extremes, with little room in the middle. That is what we see in inference.

At one end are APIs from hyperscalers like OpenAI, Anthropic and Google. They offer reliability, compliance and service guarantees.

At the other end are open models like Llama 3, Mistral and DeepSeek. Anyone can download them and the smaller versions will run on consumer hardware. The largest models still need data-centre GPUs, so most people use them through community tools or cloud services.

## **Why the middle collapses**

The companies in between get squeezed. They carry the cost of hardware without bulk discounts. They face the same rules as the giants but without the reach to make it pay off. They build features only to be undercut by free models below and better APIs above.

The pattern is visible. Stability AI cut staff, changed leadership and published Stable Diffusion 3. Runway has leaned further into creative workflow tools and integrations. These moves appear to reflect pressure from improving open models and cheaper cloud APIs, even though few companies state those pressures explicitly.

Google straddles both poles. Its models power APIs and its tools are the automatic option inside Gmail, Docs, Search and Android. Being the default matters until regulators force choice. Buyers still follow where the work already happens.

## **Market squeeze**

Inference products without a clear advantage or loyal customers don’t last.

# **3. Economics of scale and demand**

Compute for training has jumped orders of magnitude from GPT-3 to GPT-5. The exact numbers are estimates, but the trend is clear. Chips get faster, data centres more efficient, energy sourcing smarter. Demand grows even faster and eats the savings.

## **Diminishing returns on benchmarks**

Standard tests like MMLU for knowledge and HumanEval for coding show diminishing headroom for many models since GPT-4. Some scores still rise, but gains are smaller and more expensive. The real progress now shows up in harder areas such as reasoning, long-form planning, tool use and robustness.

## **Non-compute costs stay fixed**

Some barriers never move. Latency cannot be eliminated. Electricity always has a price. Compliance keeps people in the loop. Safety reviews and audits add fixed overhead. Each large training run crowds out other priorities like evaluation or product design. In 2024 and 2025 **some** labs reduced safety or interpretability teams to free up resources for scaling. It shows the trade-offs that come with chasing the frontier.

## **Cost reality**

Small gains are possible, but the major costs remain locked in.

# **4. Adoption: assistants now, agents next**

Today assistants are everywhere: Copilot in Office, Gmail autocomplete, copilots in Salesforce and ServiceNow. They make small, steady gains, task by task.

The hype now is around agents, AI systems that can act across tools on their own. They are appearing in production, especially in developer tools and customer support. GitHub’s Copilot X is one example, combining code generation with task automation across developer workflows.

Adoption is uneven, but the direction is clear. Assistants are the baseline. Agents are the next stage.

## **Clearance vs use**

Approval is not the same as adoption. Radiology shows this clearly. Many AI tools won FDA clearance but failed in practice because they did not connect into hospital records, did not assign clear accountability or did not deliver measurable results. The ones that stuck did all three. The same will hold in finance. AI models that land inside audited workflows and move money or risk will outlast demos.

## **Institutional lock-in**

Once an AI pipeline is written into rules, trained staff, insurance cover and audits, it is costly to remove. It usually takes a scandal to unwind it.

## **Why this matters**

Assistants are here already. Agents are arriving fast. The systems that matter will be the ones regulators and institutions lock in.

# **5. Distribution = monopoly terrain**

The fight is not in the models. The fight is in the workflows that run expense reports, patient records and compliance filings.

Incumbents own the pipes. Epic in health records. Microsoft 365 in knowledge work. Salesforce in customer systems. Antitrust scrutiny of Microsoft, Google and Epic is active in both the US and Europe yet buyers still prefer tools that live where the work is.

## **How challengers wedge in**

- **Win approval first.** In health or finance, securing regulatory approval before the platform vendor ships is slow and costly, but once you have it, it is hard to dislodge.
- **Own a vertical workflow.** Focus on one process end to end. For example, clinical trial monitoring with audit trails, Basel stress testing with clear reporting or cross-border trade compliance with regulator-ready logs.
- **Be the primitive, not the pane.** A primitive is the core function everything else plugs into. The pane is just the interface on top. Do one thing so well that others must build on you.

These wedges are narrow and unforgiving. They are also durable. They build trust first, then scale.

## **Workflow control**

Control of workflows beats control of models.

## **Claude Code as a win**

Anthropic’s Claude Code found traction by embedding directly into developer workflows. It did not try to replace the coding environment or the repository. Instead it became a primitive, the underlying function. Developers still write code in their editor, but Claude Code can orchestrate larger tasks like agentic coding, refactoring, multi-file changes and documentation. Through the Model Context Protocol it connects into an ecosystem of external tools, for example community servers for Atlassian products and GitHub actions, without replacing the developer’s editor.

# **Where is China in all this**

China is inside the same system but operates under different constraints.

## **Training**

Export controls block access to the latest Nvidia chips, yet the gap is closing. Huawei’s Ascend 910C clusters and Biren’s BR104 chips are approaching A100-class performance on select benchmarks, while still behind H100 and B-series parts overall and generally trailing in power efficiency.

## **Inference**

The same barbell split is visible. On one side are domestic APIs. On the other are open releases like DeepSeek, Qwen and Baichuan. Many teams run smaller, optimised versions on local Chinese hardware. This lowers cost and shifts where inference is run in the stack.

## **Economics**

The treadmill is steeper in China but starting to shift. Labs have pushed efficiency methods such as model compression, speculative decoding and sparse routing. Many of these ideas are now being adopted by Western teams.

## **Adoption**

Super apps such as WeChat and Alipay embed assistants at national scale. Institutions follow government policy. Registration and compliance rules decide when and how “prepared by AI” appears. State procurement accelerates uptake once rules are in place.

## **Distribution**

Tencent, Alibaba, Baidu and Huawei control the main channels. To reach scale in China you must go through them, just as in the West you must go through Microsoft or Epic.

## **Different constraints**

The same forces apply in China, but under different constraints. The country is catching up quickly in some workloads and efficiency tricks developed there are already influencing the wider industry.

# **Where the winners emerge**

For most players, the race to build ever-larger models is a dead end. Outside frontier labs, scale alone is no longer the path to advantage. What matters now is control of capacity and control of workflows.

Capacity means chips, data centres and power contracts. Workflows mean the regulated, sticky processes where money and risk actually move: audits, patient records, developer pipelines. These are the places where buyers commit, regulators lock in and rivals struggle to displace incumbents.

**The lessons are clear:**

- Workflows beat models. Institutions adopt what embeds directly into their daily systems.
- Chips and clouds hold the monopolies. Anyone without secure access is a tenant, not an owner.
- Regulators are part of the stack. Clearance, compliance and audits now shape markets as much as benchmarks.
- Open models keep eroding exclusivity. The value is in the channel, not the raw API.

For most players, chasing ever-bigger models is already a dead end. The winners will be the primitives everything else plugs into.