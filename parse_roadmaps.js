const fs = require('fs');

const rawText = `
### 1. 💻 Software Development (Web/Mobile/Desktop)
PHASE 1 — Foundations (2–3 months)
├── HTML, CSS, JavaScript basics
├── Git & GitHub
├── Terminal/Command Line basics
├── How the internet works (HTTP, DNS, APIs)
└── Responsive design principles

PHASE 2 — Pick Your Track (2–3 months)
├── WEB: React.js, Node.js, Express, REST APIs
├── MOBILE: React Native or Flutter + Dart
└── DESKTOP: Electron.js or Tauri

PHASE 3 — Backend & Databases (2–3 months)
├── SQL (PostgreSQL or MySQL)
├── NoSQL (MongoDB or Firebase)
├── Authentication (JWT, OAuth)
├── REST vs GraphQL
└── Deployment (Vercel, Railway, Render)

PHASE 4 — Advanced & Job Ready (2–3 months)
├── System Design basics
├── TypeScript
├── Testing (Jest, Cypress)
├── CI/CD pipelines
├── Docker basics
└── Building and deploying full-stack apps

FREE RESOURCES:
├── The Odin Project — full web dev curriculum (free)
│   → theodinproject.com
├── Traversy Media — YouTube (web dev crash courses)
│   → youtube.com/@TraversyMedia
├── Fireship — YouTube (quick modern web concepts)
│   → youtube.com/@Fireship
├── freeCodeCamp — full curriculum + projects
│   → freecodecamp.org
├── CS50W — Harvard's Web Programming course (free)
│   → cs50.harvard.edu/web
└── React Official Docs
    → react.dev

MINOR PROJECTS:
1. AI-powered personal finance tracker that categorizes 
   expenses using NLP and shows spending pattern charts
2. Real-time collaborative code editor with syntax 
   highlighting and live cursor sharing (like CodePen Live)
3. Job application tracker with Kanban board, deadline 
   reminders and email notifications

MAJOR PROJECT:
"CampusConnect" — A full-stack college social platform 
where students post opportunities, form study groups, 
share notes, and get AI-matched to peers with similar 
interests. Features: real-time chat, notification system, 
role-based auth (student/faculty), file uploads, and 
a recommendation engine.
Tech Stack: Next.js, Node.js, PostgreSQL, Socket.io, 
Redis, AWS S3, Docker

RISKS & CHALLENGES:
├── JavaScript fatigue — too many frameworks, easy to 
│   get lost choosing tools instead of building
├── Tutorial hell — watching courses without building 
│   real projects gives false confidence
├── Backend complexity spikes fast — auth, security, 
│   and scaling are harder than they look
├── Mobile development has steep device compatibility issues
└── Keeping up with rapidly changing frameworks 
    (what's popular changes every 2 years)

### 2. 🤖 AI/ML (Artificial Intelligence & Machine Learning)
PHASE 1 — Math & Python Foundations (2–3 months)
├── Python (NumPy, Pandas, Matplotlib)
├── Linear Algebra (vectors, matrices, eigenvalues)
├── Calculus (derivatives, chain rule, gradients)
├── Probability & Statistics
└── Data cleaning and preprocessing

PHASE 2 — Core ML (3–4 months)
├── Supervised Learning (Linear/Logistic Regression, 
│   Decision Trees, SVM, KNN)
├── Unsupervised Learning (K-Means, PCA, DBSCAN)
├── Model Evaluation (confusion matrix, ROC, F1)
├── Feature Engineering
└── Scikit-learn (hands-on)

PHASE 3 — Deep Learning (3–4 months)
├── Neural Networks from scratch
├── CNNs (image recognition)
├── RNNs & LSTMs (sequential data)
├── Transformers & Attention mechanism
├── PyTorch or TensorFlow
└── Transfer Learning & Fine-tuning

PHASE 4 — Specialization & Deployment (2–3 months)
├── NLP (BERT, GPT fine-tuning, LangChain)
├── Computer Vision
├── MLOps basics (MLflow, model versioning)
├── Deploying models (FastAPI + Docker)
└── Hugging Face ecosystem

FREE RESOURCES:
├── fast.ai — Practical Deep Learning (free, world class)
│   → fast.ai
├── Andrew Ng ML Specialization — Coursera (audit free)
│   → coursera.org/specializations/machine-learning
├── 3Blue1Brown — Neural Networks visual series
│   → youtube.com/@3blue1brown
├── Andrej Karpathy — YouTube (GPT from scratch)
│   → youtube.com/@AndrejKarpathy
├── Kaggle Learn — free micro-courses + datasets
│   → kaggle.com/learn
└── Hugging Face Course (free)
    → huggingface.co/learn

MINOR PROJECTS:
1. Deepfake detection tool that classifies images as 
   real or AI-generated using a CNN
2. Personalized news summarizer that clusters articles 
   by topic and generates 3-line summaries using NLP
3. Emotion-based music recommendation system that 
   detects facial expression via webcam and suggests songs

MAJOR PROJECT:
"MediScan AI" — A medical image analysis platform where 
doctors upload X-rays or MRI scans and the AI detects 
anomalies, highlights regions of concern, and generates 
a preliminary report. Features: CNN-based detection, 
confidence scoring, explainable AI heatmaps (Grad-CAM), 
patient history dashboard, and PDF report export.
Tech Stack: PyTorch, FastAPI, React, PostgreSQL, 
OpenCV, Docker, AWS

RISKS & CHALLENGES:
├── Heavy math barrier — Linear Algebra and Calculus 
│   are non-negotiable and take months to internalize
├── Compute costs — training real models requires GPUs, 
│   free tiers run out fast
├── Data quality problem — 80% of real ML work is 
│   boring data cleaning not glamorous model building
├── Hype vs reality gap — most AI jobs need strong 
│   software engineering skills first
└── Research papers are dense and hard to 
    implement without strong fundamentals

### 3. 📊 Data Science & Analytics
PHASE 1 — Data Foundations (2–3 months)
├── Python (Pandas, NumPy, Matplotlib, Seaborn)
├── SQL (joins, aggregations, window functions)
├── Statistics (distributions, hypothesis testing, 
│   p-values, confidence intervals)
└── Excel / Google Sheets for quick analysis

PHASE 2 — Data Analysis & Visualization (2–3 months)
├── Exploratory Data Analysis (EDA)
├── Tableau or Power BI (free for students)
├── Plotly & Dash for interactive dashboards
├── A/B testing methodology
└── Storytelling with data

PHASE 3 — Machine Learning for Data Science (2–3 months)
├── Regression and Classification models
├── Feature selection and engineering
├── Model validation and cross-validation
├── Scikit-learn pipelines
└── Time series analysis (ARIMA, Prophet)

PHASE 4 — Big Data & Cloud (2–3 months)
├── Apache Spark basics
├── Google BigQuery or AWS Redshift
├── dbt (data build tool)
├── Airflow for data pipelines
└── Building end-to-end data pipelines

FREE RESOURCES:
├── Kaggle Learn — Python, SQL, ML, Visualization
│   → kaggle.com/learn
├── Mode Analytics SQL Tutorial (free)
│   → mode.com/sql-tutorial
├── StatQuest with Josh Starmer — YouTube
│   → youtube.com/@statquest
├── Google Data Analytics Certificate — 
│   Coursera (audit free)
└── Towards Data Science — Medium publication
    → towardsdatascience.com

MINOR PROJECTS:
1. IPL cricket performance analytics dashboard 
   with interactive charts and player comparison tool
2. Stock market sentiment analyzer combining 
   Twitter/news sentiment with price movement data
3. Indian food nutrition analyzer that takes meal 
   inputs and generates health insight reports

MAJOR PROJECT:
"CityPulse Analytics" — A public data analytics 
platform that ingests Indian government open datasets 
(crime, weather, traffic, elections) and presents 
interactive district-level dashboards with trend 
prediction, anomaly detection, and downloadable reports.
Tech Stack: Python, Apache Spark, PostgreSQL, 
Airflow, Plotly Dash, Docker, GCP BigQuery

RISKS & CHALLENGES:
├── Statistics depth is often underestimated — 
│   surface knowledge leads to wrong conclusions
├── Real datasets are messy, incomplete and 
│   require enormous cleaning effort
├── Visualization without insight is just 
│   pretty charts — business context matters
├── SQL becomes complex fast at scale
└── Data Science roles in India often require 
    ML skills too, the pure analyst role is rare

### 4. ☁️ Cloud Computing
PHASE 1 — IT & Linux Fundamentals (1–2 months)
├── Linux command line (bash scripting)
├── Networking basics (TCP/IP, DNS, HTTP, firewalls)
├── Virtualization concepts
└── How data centers work

PHASE 2 — Core Cloud (AWS recommended) (3–4 months)
├── IAM (Identity & Access Management)
├── EC2, S3, RDS, VPC
├── Load Balancers & Auto Scaling
├── Lambda (serverless)
├── CloudFormation basics
└── AWS Free Tier hands-on practice

PHASE 3 — DevOps & Containers (2–3 months)
├── Docker (build, run, push images)
├── Kubernetes basics (pods, services, deployments)
├── Terraform (Infrastructure as Code)
├── CI/CD with GitHub Actions
└── Monitoring (CloudWatch, Grafana)

PHASE 4 — Certification & Specialization (2–3 months)
├── AWS Solutions Architect Associate exam prep
├── Multi-cloud (Azure or GCP basics)
├── Cloud security principles
├── Cost optimization strategies
└── Microservices architecture on cloud

FREE RESOURCES:
├── AWS Free Tier — hands-on labs (free)
│   → aws.amazon.com/free
├── FreeCodeCamp AWS Certification courses — YouTube
│   → youtube.com/@freecodecamp
├── TechWorld with Nana — Docker & K8s — YouTube
│   → youtube.com/@TechWorldwithNana
├── Cloud Resume Challenge (free project)
│   → cloudresumechallenge.dev
└── A Cloud Guru free tier
    → acloudguru.com

MINOR PROJECTS:
1. Serverless URL shortener deployed on AWS Lambda 
   + DynamoDB + API Gateway with analytics dashboard
2. Auto-scaling web app on EC2 with load balancer 
   that handles traffic spikes automatically
3. Multi-region static website on S3 with CloudFront 
   CDN, custom domain and SSL certificate

MAJOR PROJECT:
"CloudOps Dashboard" — A multi-cloud infrastructure 
management platform where teams can deploy, monitor 
and manage cloud resources across AWS and GCP from 
one UI. Features: cost tracking, auto-scaling rules, 
alert configuration, IaC template library, and 
resource usage reports.
Tech Stack: Terraform, AWS, React, Node.js, 
Grafana, Docker, Kubernetes, PostgreSQL

RISKS & CHALLENGES:
├── AWS costs can spiral unexpectedly if you forget 
│   to turn off resources during learning
├── Cloud certifications expire and require renewal
├── Too many services to learn — easy to get 
│   overwhelmed by the breadth of AWS alone
├── Security misconfigurations in cloud are 
│   the #1 cause of enterprise data breaches
└── Kubernetes has a notoriously steep learning curve

### 5. 🔐 Cybersecurity
PHASE 1 — Foundations (2–3 months)
├── Networking (OSI model, TCP/IP, Wireshark)
├── Linux & Windows administration
├── Basic scripting (Python + Bash)
├── How the web works (HTTP, HTTPS, cookies, sessions)
└── Cryptography basics (encryption, hashing, PKI)

PHASE 2 — Offensive Security (3–4 months)
├── OWASP Top 10 vulnerabilities
├── Web app pentesting (Burp Suite)
├── Network scanning (Nmap, Metasploit basics)
├── CTF challenges (TryHackMe, HackTheBox)
└── SQL Injection, XSS, CSRF in labs

PHASE 3 — Defensive Security (2–3 months)
├── SIEM tools (Splunk free tier)
├── Incident response process
├── Log analysis and threat detection
├── Firewall and IDS/IPS configuration
└── Vulnerability assessment and reporting

PHASE 4 — Specialization (2–3 months)
├── Cloud security (AWS Security Specialty)
├── Malware analysis basics
├── Digital forensics
├── Bug bounty hunting (HackerOne, Bugcrowd)
└── Security certifications (CompTIA Security+, 
    CEH prep)

FREE RESOURCES:
├── TryHackMe — beginner-friendly labs (free tier)
│   → tryhackme.com
├── HackTheBox — CTF challenges (free)
│   → hackthebox.com
├── TCM Security — YouTube (ethical hacking)
│   → youtube.com/@TCMSecurityAcademy
├── PortSwigger Web Security Academy (completely free)
│   → portswigger.net/web-security
└── OWASP Foundation resources (free)
    → owasp.org

MINOR PROJECTS:
1. Network packet analyzer that captures and 
   visualizes traffic patterns and flags suspicious 
   activity in real-time
2. Password strength analyzer and breach checker 
   that cross-references against known breach databases
3. Automated web vulnerability scanner that tests 
   URLs for common OWASP Top 10 issues

MAJOR PROJECT:
"SecureShield" — A full bug bounty management 
platform where security researchers can submit 
vulnerabilities, companies can manage their 
disclosure programs, and an AI triages reports 
by severity (CVSS scoring), tracks remediation 
status, and generates executive risk reports.
Tech Stack: Python, Django, PostgreSQL, 
React, Docker, Celery, Redis

RISKS & CHALLENGES:
├── Legal grey areas — testing without permission 
│   is illegal, even for learning purposes
├── Certification costs are high and knowledge 
│   expires quickly in this fast-moving field
├── Requires deep knowledge across many domains — 
│   networking, OS, web, cloud all at once
├── Burnout is high in SOC analyst roles due to 
│   constant alert monitoring
└── India has limited entry-level cybersecurity 
    roles compared to Western markets

### 6. ⚙️ DevOps & SRE
PHASE 1 — Foundations (2–3 months)
├── Linux deeply (systemd, cron, file permissions)
├── Bash scripting
├── Git & branching strategies (GitFlow)
├── Networking (DNS, load balancing, reverse proxy)
└── How software is deployed manually first

PHASE 2 — Containers & CI/CD (3–4 months)
├── Docker (Dockerfile, Compose, registries)
├── Kubernetes (pods, deployments, services, Helm)
├── GitHub Actions / GitLab CI
├── Jenkins basics
└── Artifact management (Nexus, JFrog)

PHASE 3 — Infrastructure as Code (2–3 months)
├── Terraform (AWS/GCP provisioning)
├── Ansible (configuration management)
├── Cloud platforms (AWS or GCP)
├── Serverless architectures
└── Secret management (HashiCorp Vault)

PHASE 4 — Observability & SRE (2–3 months)
├── Prometheus + Grafana (metrics)
├── ELK Stack (logging)
├── Distributed tracing (Jaeger)
├── SLOs, SLIs, error budgets
└── Chaos engineering basics (Chaos Monkey)

FREE RESOURCES:
├── TechWorld with Nana — DevOps full course — YouTube
│   → youtube.com/@TechWorldwithNana
├── KodeKloud free tier — hands-on labs
│   → kodekloud.com
├── Play with Kubernetes (free browser K8s lab)
│   → labs.play-with-k8s.com
├── Google SRE Book (completely free online)
│   → sre.google/sre-book/table-of-contents
└── Terraform official tutorials (free)
    → developer.hashicorp.com/terraform/tutorials

MINOR PROJECTS:
1. Automated deployment pipeline for a Node.js app 
   using GitHub Actions, Docker, and AWS EC2 with 
   rollback capability
2. Kubernetes cluster health monitoring dashboard 
   with Prometheus and Grafana showing real-time 
   pod and node metrics
3. Infrastructure-as-Code template library that 
   provisions a full production AWS environment 
   in one Terraform command

MAJOR PROJECT:
"DeployMate" — A self-hosted internal developer 
platform (like a mini Heroku) where teams push 
code and get automatic containerized deployments, 
environment management, secret injection, logs 
viewer, rollback system, and uptime monitoring.
Tech Stack: Go/Python, Kubernetes, Terraform, 
PostgreSQL, React, Prometheus, Grafana, 
GitHub Actions

RISKS & CHALLENGES:
├── Extremely broad — you need to know Dev AND Ops 
│   which takes years to master both
├── Production incidents are high pressure — 
│   on-call rotations affect work-life balance
├── Tool sprawl is real — new tools emerge 
│   constantly and the ecosystem is fragmented
├── Kubernetes has a steep learning curve that 
│   frustrates even experienced developers
└── Most DevOps roles require prior 
    development experience first

### 7. ⛓️ Blockchain & Web3
PHASE 1 — Foundations (2–3 months)
├── How blockchain works (consensus, hashing, blocks)
├── Bitcoin and Ethereum architecture
├── Cryptography in blockchain (public/private keys)
├── Wallets, transactions, gas fees
└── Web3 concepts (decentralization, DAOs, DeFi, NFTs)

PHASE 2 — Smart Contract Development (3–4 months)
├── Solidity programming language
├── Hardhat development environment
├── ERC-20 and ERC-721 token standards
├── Smart contract testing
└── OpenZeppelin library

PHASE 3 — DApp Development (2–3 months)
├── ethers.js or web3.js
├── React frontend connecting to contracts
├── IPFS for decentralized storage
├── MetaMask integration
└── The Graph (indexing blockchain data)

PHASE 4 — Advanced & Security (2–3 months)
├── Smart contract security & auditing
├── DeFi protocols (Uniswap, Aave mechanics)
├── Layer 2 solutions (Polygon, Arbitrum)
├── Cross-chain bridges
└── ZK proofs basics

FREE RESOURCES:
├── CryptoZombies — learn Solidity interactively
│   → cryptozombies.io
├── Patrick Collins — YouTube (best free Web3 course)
│   → youtube.com/@PatrickAlphaC
├── Ethereum official docs
│   → ethereum.org/developers
├── Buildspace (free Web3 projects)
│   → buildspace.so
└── Alchemy University (free)
    → university.alchemy.com

MINOR PROJECTS:
1. Decentralized voting system for college student 
   elections with tamper-proof results on-chain
2. NFT certificate generator for hackathon 
   participation that mints achievements as tokens
3. Multi-signature wallet where group transactions 
   require approval from multiple members

MAJOR PROJECT:
"ChainLance" — A decentralized freelance marketplace 
where clients escrow payments in smart contracts, 
funds release automatically on milestone approval, 
disputes go to a decentralized arbitration DAO, 
and freelancer reputation is stored immutably on-chain.
Tech Stack: Solidity, Hardhat, React, ethers.js, 
IPFS, The Graph, Polygon

RISKS & CHALLENGES:
├── Extreme market volatility affects job availability — 
│   Web3 hiring collapses during crypto winters
├── Smart contract bugs are permanent and 
│   can cause millions in losses (no undo)
├── Regulatory uncertainty globally and 
│   especially in India
├── Most Web3 projects are speculative — 
│   hard to find serious long-term work
└── The space has a lot of scams — 
    reputation building is difficult

### 8. 🎨 UI/UX Design
PHASE 1 — Design Foundations (2–3 months)
├── Design principles (hierarchy, contrast, 
│   alignment, proximity, whitespace)
├── Color theory and typography
├── Figma basics (frames, components, auto-layout)
├── Responsive design concepts
└── Accessibility (WCAG guidelines)

PHASE 2 — UX Research & Process (2–3 months)
├── User research methods (interviews, surveys)
├── User personas and journey mapping
├── Information architecture & sitemaps
├── Wireframing (low and high fidelity)
└── Usability testing methods

PHASE 3 — UI Design & Prototyping (2–3 months)
├── Design systems and component libraries
├── Micro-interactions and animations
├── High-fidelity mockups in Figma
├── Interactive prototyping
└── Handoff to developers (Figma Dev Mode)

PHASE 4 — Specialization (2–3 months)
├── Mobile app design (iOS & Android guidelines)
├── Motion design basics (After Effects or Figma)
├── No-code tools (Webflow, Framer)
├── Portfolio building (Behance, personal site)
└── Design for AI interfaces

FREE RESOURCES:
├── Google UX Design Certificate — 
│   Coursera (audit free)
├── Figma official tutorials (free)
│   → figma.com/resource-library
├── DesignCourse — YouTube
│   → youtube.com/@DesignCourse
├── Nielsen Norman Group articles (free)
│   → nngroup.com/articles
└── Refactoring UI book summary (free content)
    → refactoringui.com

MINOR PROJECTS:
1. Redesign of a popular Indian government 
   website (IRCTC or Aadhaar portal) with 
   full UX research documentation
2. Mental health app UI with calming design 
   system, accessibility-first components, 
   and animated onboarding flow
3. Dark mode design system with 30+ components 
   for a developer tools product

MAJOR PROJECT:
"DesignOS" — A comprehensive design system 
documentation website (like Material Design or 
Ant Design) built for Indian fintech apps. 
Includes: 50+ components, accessibility guidelines, 
motion principles, localization specs for Hindi/regional 
languages, and a Figma community file.

RISKS & CHALLENGES:
├── Portfolio matters more than any degree — 
│   bad portfolio = no job regardless of skills
├── Subjective feedback is hard — clients and 
│   stakeholders often override good design decisions
├── In India, UI/UX is often treated as 
│   a junior supporting role, not strategic
├── Keeping up with design trends 
│   requires constant re-learning
└── Requires both creative AND analytical thinking — 
    most people are strong in only one

### 9. 🌐 IoT (Internet of Things)
PHASE 1 — Electronics & Programming Foundations 
(2–3 months)
├── C/C++ programming basics
├── Python for hardware (MicroPython)
├── Basic electronics (resistors, sensors, 
│   circuits, breadboards)
├── Arduino basics
└── Raspberry Pi setup and usage

PHASE 2 — Connectivity & Protocols (2–3 months)
├── MQTT protocol (lightweight messaging for IoT)
├── HTTP and WebSockets for IoT
├── Bluetooth & BLE
├── WiFi and LoRaWAN
└── Zigbee and Z-Wave basics

PHASE 3 — Cloud IoT Platforms (2–3 months)
├── AWS IoT Core
├── Google Cloud IoT
├── Azure IoT Hub
├── Time-series databases (InfluxDB)
└── Real-time dashboards (Grafana)

PHASE 4 — Edge & Security (2–3 months)
├── Edge computing concepts
├── TensorFlow Lite for ML on edge devices
├── IoT security fundamentals
├── OTA (Over-the-Air) updates
└── Digital twins concept

FREE RESOURCES:
├── Arduino official tutorials (free)
│   → docs.arduino.cc/tutorials
├── Raspberry Pi Foundation projects (free)
│   → projects.raspberrypi.org
├── Last Mile Engineers — YouTube 
│   (Indian IoT tutorials)
├── AWS IoT workshops (free)
│   → workshops.aws
└── Coursera IoT Specialization (audit free)

MINOR PROJECTS:
1. Smart college attendance system using RFID 
   cards that auto-updates a Google Sheet and 
   sends absent student notifications
2. Air quality monitoring station using cheap 
   sensors that logs data to cloud and sends 
   WhatsApp alerts when AQI crosses threshold
3. Automated plant watering system with soil 
   moisture sensor, water pump and a mobile 
   dashboard to monitor remotely

MAJOR PROJECT:
"SmartCampus" — An IoT platform for college 
campuses that monitors energy consumption across 
buildings, controls smart lighting and AC 
remotely, tracks classroom occupancy with sensors, 
and generates monthly sustainability reports with 
cost-saving recommendations.
Tech Stack: Raspberry Pi, MQTT, AWS IoT Core, 
InfluxDB, Grafana, React, Node.js

RISKS & CHALLENGES:
├── Hardware costs money — sensors, boards, 
│   and components add up quickly
├── Debugging hardware issues is far harder 
│   than debugging software
├── IoT security is severely neglected — 
│   most deployed IoT devices are vulnerable
├── Limited pure IoT jobs in India — 
│   usually combined with embedded or cloud roles
└── Hardware failures mid-project can 
    completely derail timelines

### 10. 🥽 AR/VR (Augmented & Virtual Reality)
PHASE 1 — Foundations (2–3 months)
├── C# programming basics
├── Unity game engine fundamentals
├── 3D math (vectors, quaternions, transforms)
├── 3D modeling basics (Blender free)
└── Understanding AR vs VR vs MR differences

PHASE 2 — VR Development (2–3 months)
├── Unity XR Toolkit
├── OpenXR standard
├── VR interaction design (controllers, 
│   gaze, hand tracking)
├── Performance optimization for VR (90fps target)
└── Oculus/Meta SDK

PHASE 3 — AR Development (2–3 months)
├── ARCore (Android) and ARKit (iOS)
├── Vuforia for marker-based AR
├── WebAR with Three.js + AR.js
├── Plane detection, image tracking, 
│   and object occlusion
└── Spatial audio

PHASE 4 — Advanced & Industry (2–3 months)
├── Mixed Reality (HoloLens development)
├── Multiplayer in VR (Photon SDK)
├── WebXR for browser-based experiences
├── AI in AR/VR (gesture recognition)
└── Publishing to app stores

FREE RESOURCES:
├── Unity Learn (free official platform)
│   → learn.unity.com
├── Valem Tutorials — YouTube (Unity XR)
│   → youtube.com/@ValemTutorials
├── Blender Guru — YouTube (3D modeling free)
│   → youtube.com/@blenderguru
├── Google ARCore documentation (free)
│   → developers.google.com/ar
└── Mozilla WebXR docs (free)
    → developer.mozilla.org/en-US/docs/Web/API/WebXR

MINOR PROJECTS:
1. AR campus tour app where students point their 
   phone at buildings to see schedules, events 
   and department info overlaid in real-time
2. VR meditation environment with spatial audio, 
   guided breathing animations and biome selection
3. AR furniture placement app for Indian homes 
   that lets users visualize furniture before buying

MAJOR PROJECT:
"VRClassroom" — An immersive VR education platform 
where students attend virtual lectures, interact 
with 3D models of complex concepts (human anatomy, 
circuit diagrams, historical monuments), collaborate 
with classmates as avatars, and take assessments 
in virtual environments.
Tech Stack: Unity, OpenXR, Photon, C#, 
Node.js backend, AWS S3 for assets

RISKS & CHALLENGES:
├── Hardware barrier — quality VR headsets 
│   cost ₹30,000–₹3,00,000
├── VR causes motion sickness for many users — 
│   a fundamental design constraint
├── Extremely niche job market in India currently
├── High performance demands — bad optimization 
│   completely breaks immersion
└── 3D art pipeline is a separate skillset 
    that takes years to master

### 11. 🎮 Game Development
PHASE 1 — Foundations (2–3 months)
├── C# (for Unity) or C++ (for Unreal)
├── Unity or Unreal Engine basics
├── Game design fundamentals (game loops, 
│   mechanics, player psychology)
├── 2D vs 3D game concepts
└── Version control for game projects (Git LFS)

PHASE 2 — Core Game Systems (3–4 months)
├── Physics systems and collision detection
├── AI for games (pathfinding, A* algorithm, 
│   state machines for enemies)
├── UI systems (Health bars, menus, HUDs)
├── Audio integration (FMOD or Unity Audio)
└── Animation systems (Animator, blend trees)

PHASE 3 — Advanced Mechanics (2–3 months)
├── Shader programming (HLSL basics)
├── Multiplayer networking (Mirror or Photon)
├── Procedural generation
├── Optimization (batching, LODs, profiling)
└── Mobile game optimization

PHASE 4 — Publishing & Monetization (2–3 months)
├── Publishing to Google Play Store and 
│   Apple App Store
├── Steam direct publishing
├── Monetization strategies (ads, IAP, premium)
├── Analytics (GameAnalytics free tier)
└── Building a game portfolio (itch.io)

FREE RESOURCES:
├── Brackeys — YouTube (best Unity tutorials, archived)
│   → youtube.com/@Brackeys
├── GDQuest — Godot + game design (free)
│   → youtube.com/@GDQuest
├── Unity Learn official (free)
│   → learn.unity.com
├── Game Developer Conference talks — YouTube 
│   (free GDC Vault content)
└── CS50G — Harvard Game Dev course (free)
    → cs50.harvard.edu/games

MINOR PROJECTS:
1. Infinite runner mobile game set in Indian 
   mythology with procedural obstacle generation 
   and leaderboard system
2. 2D puzzle platformer with custom physics 
   engine built from scratch without Unity physics
3. Multiplayer quiz battle game where players 
   compete on CS trivia in real-time rooms

MAJOR PROJECT:
"AncientQuest" — A 3D action-RPG mobile game 
set in ancient India with AI-driven NPC dialogue 
(characters respond differently based on player 
choices), dynamic weather, crafting system, 
multiplayer raids, and a level editor for 
user-generated content.
Tech Stack: Unity, C#, Photon, Firebase, 
FMOD, Blender assets

RISKS & CHALLENGES:
├── Game development is 10x harder than it looks — 
│   most solo projects never get finished
├── Extremely competitive market — millions of 
│   games released annually
├── Game studios in India are limited — 
│   most serious studios are in US, Canada, UK
├── Crunch culture is severe in the games industry 
│   globally — poor work-life balance at studios
└── Art, audio, design AND coding all required — 
    solo dev requires wearing too many hats

### 12. 🗄️ Database & Data Engineering
PHASE 1 — SQL Mastery (2–3 months)
├── PostgreSQL deeply (advanced queries, 
│   window functions, CTEs)
├── Database design & normalization
├── Indexing strategies and query optimization
├── Transactions and ACID properties
└── Stored procedures and triggers

PHASE 2 — NoSQL & Big Data Foundations (2–3 months)
├── MongoDB (document store)
├── Redis (caching and pub/sub)
├── Apache Kafka (event streaming)
├── Apache Spark basics
└── Data warehouse concepts (OLAP vs OLTP)

PHASE 3 — Data Pipeline Engineering (2–3 months)
├── Apache Airflow (workflow orchestration)
├── dbt (data transformation)
├── ETL vs ELT pipelines
├── Data lake architectures
└── Delta Lake / Apache Iceberg

PHASE 4 — Cloud Data Platforms (2–3 months)
├── Google BigQuery
├── AWS Redshift and Glue
├── Snowflake basics
├── Real-time streaming pipelines
└── Data governance and lineage

FREE RESOURCES:
├── Mode SQL Tutorial (free)
│   → mode.com/sql-tutorial
├── DataTalks.Club Data Engineering Zoomcamp (free)
│   → github.com/DataTalksClub/data-engineering-zoomcamp
├── Kafka official documentation + tutorials
│   → kafka.apache.org/documentation
├── dbt Learn (free)
│   → courses.getdbt.com
└── Fundamentals of Data Engineering book 
    (check library or free summaries)

MINOR PROJECTS:
1. Real-time cricket score data pipeline that 
   ingests live scores via API, processes with 
   Kafka, stores in PostgreSQL and visualizes 
   on a live dashboard
2. Database query optimizer tool that analyzes 
   slow queries and suggests index improvements 
   with visual explain plans
3. Multi-source data integrator that pulls from 
   3 different APIs, normalizes schemas, 
   and loads into a unified warehouse

MAJOR PROJECT:
"DataForge" — A self-service data platform where 
business teams can connect data sources, build 
ETL pipelines visually (drag-and-drop), schedule 
jobs, monitor pipeline health, and query results 
without writing code. Engineers can also write 
custom transformations in SQL or Python.
Tech Stack: Python, Apache Airflow, dbt, 
PostgreSQL, Kafka, React, Docker, AWS S3

RISKS & CHALLENGES:
├── Data engineering requires both strong 
│   software AND data skills simultaneously
├── Production data pipelines failing silently 
│   is a nightmare — monitoring is critical
├── Data quality issues are endless and 
│   underestimated by most beginners
├── Tools change fast — Spark, Flink, Beam, 
│   Kafka all compete for the same problems
└── Debugging distributed data systems 
    is extremely complex

### 13. 📡 Networking & Telecom
PHASE 1 — Networking Fundamentals (2–3 months)
├── OSI and TCP/IP models deeply
├── IP addressing and subnetting (CIDR)
├── DNS, DHCP, ARP, NAT
├── Ethernet and switching (VLANs, STP)
└── Wireshark packet analysis

PHASE 2 — Routing & Advanced Networking (2–3 months)
├── Static and dynamic routing (OSPF, BGP, EIGRP)
├── Router and switch configuration (Cisco IOS)
├── Firewalls and ACLs
├── VPN technologies (IPSec, SSL VPN)
└── Network automation (Python + Netmiko)

PHASE 3 — Cloud & SDN (2–3 months)
├── Software Defined Networking (SDN)
├── Network Function Virtualization (NFV)
├── AWS/GCP networking (VPC, peering, 
│   Direct Connect)
├── Network monitoring (SNMP, Nagios, Zabbix)
└── Load balancers and CDN architecture

PHASE 4 — 5G & Telecom (2–3 months)
├── 5G architecture and use cases
├── Network slicing concepts
├── IoT communication protocols
├── Telecom protocols (SS7, SIP, VoIP)
└── CCNA certification prep

FREE RESOURCES:
├── Cisco Networking Academy (free courses)
│   → netacad.com
├── NetworkChuck — YouTube (networking made fun)
│   → youtube.com/@NetworkChuck
├── Professor Messer — CompTIA Network+ (free)
│   → professormesser.com
├── GNS3 network simulator (free)
│   → gns3.com
└── Packet Tracer by Cisco (free for students)

MINOR PROJECTS:
1. Network topology visualizer that scans a 
   local network and draws an interactive 
   map of all connected devices
2. Python-based network monitoring tool that 
   pings devices, tracks uptime history 
   and sends email alerts on failures
3. Custom DNS server with ad-blocking built 
   in (like Pi-hole) deployed on Raspberry Pi

MAJOR PROJECT:
"NetOpsCenter" — An automated network 
operations platform for college IT teams 
that discovers network topology, monitors 
device health, auto-remediates common issues 
via scripts, tracks bandwidth per device, 
flags anomalies, and generates compliance reports.
Tech Stack: Python, Netmiko, SNMP, 
InfluxDB, Grafana, React, Docker

RISKS & CHALLENGES:
├── Requires expensive physical hardware 
│   to practice — simulators help but 
│   don't fully replace real experience
├── Very specialized field — fewer software 
│   roles, more hardware/ops focused
├── 5G and telecom knowledge has a high 
│   learning curve with lots of dense standards
├── Job market in India mostly in ISPs, 
│   telecom companies and large IT firms
└── Field is being disrupted by cloud — 
    traditional networking skills becoming less valued

### 14. 🔧 Hardware & Embedded Systems
PHASE 1 — Electronics & C Programming (2–3 months)
├── C programming deeply (pointers, memory 
│   management, bit manipulation)
├── Digital electronics (logic gates, 
│   flip-flops, registers)
├── Microcontroller basics (Arduino, PIC, AVR)
├── Oscilloscope and multimeter usage
└── Embedded C basics

PHASE 2 — Microprocessors & RTOS (2–3 months)
├── ARM Cortex-M architecture (STM32)
├── Real-Time Operating Systems (FreeRTOS)
├── Interrupts, timers, and DMA
├── Communication protocols (UART, SPI, I2C, CAN)
└── Memory-mapped I/O

PHASE 3 — Advanced Embedded (2–3 months)
├── Linux on embedded (Yocto, Buildroot)
├── Device driver development
├── FPGA basics (VHDL or Verilog)
├── Bootloader development
└── Low power design and optimization

PHASE 4 — Industry & Automotive (2–3 months)
├── AUTOSAR basics (automotive software)
├── Functional safety (ISO 26262 concepts)
├── JTAG debugging
├── Embedded security basics
└── MISRA C standards

FREE RESOURCES:
├── Embedded.fm podcast (free)
├── EEVblog — YouTube (electronics deep dives)
│   → youtube.com/@EEVblog
├── Fastbit Embedded Brain Academy — YouTube
│   → youtube.com/@FastbitEmbeddedBrainAcademy
├── STM32 official tutorials and HAL library docs
│   → st.com
└── FreeRTOS official documentation (free)
    → freertos.org

MINOR PROJECTS:
1. Smart digital lock using fingerprint sensor 
   and STM32 with access logs sent to mobile 
   via Bluetooth
2. Custom USB HID device (custom keyboard/gamepad) 
   built from scratch with STM32 and 
   custom firmware
3. Real-time temperature and humidity logger 
   with OLED display, SD card storage and 
   low-power sleep modes

MAJOR PROJECT:
"AutoPilot Testbench" — An embedded control 
system for a small autonomous rover that uses 
ultrasonic and IR sensors for obstacle avoidance, 
PID controller for motor speed, RTOS for task 
scheduling, GPS for location logging, and a 
Bluetooth app for remote override.
Tech Stack: STM32, FreeRTOS, C, 
Bluetooth module, GPS module, React Native app

RISKS & CHALLENGES:
├── Hardware components fail — debugging 
│   is slow and frustrating
├── Very steep learning curve — 
│   requires simultaneous knowledge of 
│   electronics, C, and OS concepts
├── Tools and development boards cost money
├── Slow compile-flash-test cycle compared 
│   to software development
└── Field dominated by ECE students — 
    CS students often lack electronics fundamentals

### 15. 🤖 Robotics & Automation
PHASE 1 — Foundations (2–3 months)
├── Python and C++ basics
├── Linear Algebra and kinematics
├── Electronics basics (motors, sensors, actuators)
├── Robot Operating System (ROS2) setup
└── Coordinate frames and transforms (tf2)

PHASE 2 — Robot Perception (2–3 months)
├── Computer Vision (OpenCV)
├── LiDAR and depth cameras (Intel RealSense)
├── SLAM (Simultaneous Localization & Mapping)
├── Point cloud processing (PCL)
└── Sensor fusion basics

PHASE 3 — Robot Control & Planning (2–3 months)
├── PID control theory
├── Motion planning (MoveIt2)
├── Path planning algorithms (A*, RRT, Dijkstra)
├── Manipulation (robotic arm kinematics)
└── Simulation (Gazebo, Isaac Sim)

PHASE 4 — AI & Industrial Robotics (2–3 months)
├── Reinforcement Learning for robotics
├── Deep learning based perception
├── Industrial automation (PLCs basics)
├── Human-Robot Interaction
└── ROS2 Navigation Stack

FREE RESOURCES:
├── ROS2 official tutorials (free)
│   → docs.ros.org
├── Articulated Robotics — YouTube (ROS2 in depth)
│   → youtube.com/@ArticulatedRobotics
├── The Construct — ROS courses (free tier)
│   → theconstructsim.com
├── Gazebo simulation tutorials (free)
│   → gazebosim.org
└── MIT OpenCourseWare Robotics (free)
    → ocw.mit.edu

MINOR PROJECTS:
1. Line-following robot with PID control that 
   adjusts speed dynamically based on 
   curve sharpness
2. ROS2 robot that maps an unknown room 
   autonomously using SLAM and avoids obstacles
3. Robotic arm simulation in Gazebo that 
   sorts objects by color using 
   computer vision

MAJOR PROJECT:
"AgriBot" — An autonomous agricultural robot 
that navigates crop rows using GPS and computer 
vision, identifies diseased plants using a 
trained CNN, logs findings on a cloud dashboard, 
alerts farmers via mobile, and integrates with 
irrigation control systems.
Tech Stack: ROS2, Python, OpenCV, 
PyTorch, Raspberry Pi, GPS, React Native

RISKS & CHALLENGES:
├── Hardware is expensive — 
│   a decent robot setup costs ₹20,000–₹2,00,000
├── ROS has a notoriously complex 
│   ecosystem with poor documentation
├── Extremely interdisciplinary — 
│   requires ME, EE, and CS knowledge together
├── Very few dedicated robotics companies 
│   in India — mostly research labs and startups
└── Simulation to real-world transfer 
    (sim2real gap) is a major unsolved challenge

### 16. 🖥️ IT Support & SysAdmin
PHASE 1 — Fundamentals (2–3 months)
├── Windows and Linux administration
├── Active Directory and Group Policy
├── Networking basics (TCP/IP, DNS, DHCP)
├── Hardware troubleshooting
└── Help desk ticketing systems (ServiceNow basics)

PHASE 2 — Systems Administration (2–3 months)
├── Linux server management (Ubuntu Server)
├── Web server setup (Apache, Nginx)
├── Database administration basics
├── Backup and disaster recovery
└── Virtualization (VMware, Hyper-V, VirtualBox)

PHASE 3 — Automation & Cloud (2–3 months)
├── PowerShell scripting (Windows automation)
├── Bash scripting (Linux automation)
├── Ansible for configuration management
├── Azure AD and Microsoft 365 admin
└── Cloud fundamentals (AWS or Azure)

PHASE 4 — Security & Compliance (2–3 months)
├── IT security best practices
├── Patch management
├── ITIL framework basics
├── Compliance (ISO 27001 awareness)
└── CompTIA A+ / Network+ prep

FREE RESOURCES:
├── Professor Messer — CompTIA A+ free videos
│   → professormesser.com
├── NetworkChuck — YouTube (sysadmin topics)
│   → youtube.com/@NetworkChuck
├── Microsoft Learn — free Azure admin courses
│   → learn.microsoft.com
├── Linux Journey — free interactive Linux course
│   → linuxjourney.com
└── TryHackMe for security basics (free tier)
    → tryhackme.com

MINOR PROJECTS:
1. Automated server health monitoring script 
   that checks CPU, RAM, disk and sends 
   daily email reports with alerts
2. Active Directory user management tool 
   with a web UI for IT admins to 
   create, disable and audit user accounts
3. Automated backup system with versioning 
   that syncs critical folders to 
   cloud storage on schedule

MAJOR PROJECT:
"ITDeskPro" — An internal IT service management 
platform for colleges/companies where employees 
submit tickets, IT staff manage inventory, 
automate common fixes with scripts, track SLA 
compliance, manage software licenses, and 
get AI-suggested resolutions for common issues.
Tech Stack: Python, Django, React, 
PostgreSQL, Ansible, Docker

RISKS & CHALLENGES:
├── Often viewed as a low-prestige entry role — 
│   advancement requires additional certifications
├── Repetitive work can lead to career stagnation 
│   without continuous upskilling
├── On-call responsibilities and urgent 
│   user issues create constant pressure
├── Salary ceiling is lower than 
│   software development tracks
└── Role is being automated gradually by 
    AI-powered IT management tools

### 17. 🧪 QA & Testing
PHASE 1 — Testing Fundamentals (2–3 months)
├── Software testing types (unit, integration, 
│   E2E, regression, smoke, UAT)
├── Test case design techniques
├── Bug lifecycle and severity classification
├── Test planning and documentation
└── Agile testing in Scrum teams

PHASE 2 — Test Automation (3–4 months)
├── Selenium WebDriver (Python or Java)
├── Cypress (JavaScript E2E testing)
├── REST API testing (Postman + Newman)
├── TestNG or JUnit
└── Page Object Model design pattern

PHASE 3 — Advanced Automation (2–3 months)
├── Appium (mobile testing)
├── Performance testing (JMeter, k6)
├── Security testing basics (OWASP ZAP)
├── CI/CD integration (run tests in pipelines)
└── Test reporting (Allure, ExtentReports)

PHASE 4 — AI in Testing & Leadership (2–3 months)
├── AI-powered testing tools (Testim, Applitools)
├── Shift-left testing strategy
├── Test management tools (Jira, TestRail)
├── SRE and observability concepts
└── ISTQB Foundation certification prep

FREE RESOURCES:
├── Software Testing Help (free tutorials)
│   → softwaretestinghelp.com
├── Selenium official documentation (free)
│   → selenium.dev/documentation
├── Cypress official docs and tutorials (free)
│   → docs.cypress.io
├── freeCodeCamp QA curriculum (free)
│   → freecodecamp.org
└── ISTQB glossary and sample papers (free)
    → istqb.org

MINOR PROJECTS:
1. Automated test suite for an e-commerce website 
   (Flipkart/Amazon) using Selenium that tests 
   search, cart, and checkout flows
2. API testing framework for a public REST API 
   with 50+ test cases, CI integration 
   and HTML reports
3. Performance testing dashboard that runs 
   JMeter tests on schedule and tracks 
   response time trends over time

MAJOR PROJECT:
"QAForge" — A test management and automation 
platform where teams write and run test cases, 
track bugs with severity scoring, generate 
test coverage reports, integrate with GitHub 
for CI runs, get AI suggestions for missing 
test cases, and visualize quality trends 
per sprint.
Tech Stack: Python, Selenium, Cypress, 
FastAPI, React, PostgreSQL, Docker, GitHub Actions

RISKS & CHALLENGES:
├── Often treated as second-class in dev teams — 
│   QA engineers fight for respect and resources
├── Flaky tests are a constant frustration — 
│   maintaining automation suites is hard
├── Manual testing is being replaced by 
│   automation — pure manual QA has declining value
├── Keeping up with frameworks that change 
│   with every frontend framework update
└── Requires understanding the full product deeply — 
    high cognitive load

### 18. 📦 Tech Product Management
PHASE 1 — PM Foundations (2–3 months)
├── What does a PM actually do 
│   (strategy, roadmap, execution)
├── Product thinking and user empathy
├── Agile and Scrum methodology
├── Writing PRDs (Product Requirement Documents)
└── Competitive analysis frameworks

PHASE 2 — Discovery & Research (2–3 months)
├── User research methods (interviews, 
│   surveys, usability testing)
├── Jobs-to-be-done framework
├── Customer journey mapping
├── Data analysis for PMs (SQL basics, 
│   Google Analytics)
└── A/B testing design

PHASE 3 — Execution & Metrics (2–3 months)
├── Prioritization frameworks 
│   (RICE, MoSCoW, Kano model)
├── OKRs and KPI setting
├── North Star Metric concept
├── Working with engineering and design teams
└── Go-to-market strategy basics

PHASE 4 — Strategy & Leadership (2–3 months)
├── Product strategy (Porter's Five Forces, 
│   Blue Ocean, disruption theory)
├── Monetization and pricing strategy
├── Platform and ecosystem products
├── PM interviews preparation 
│   (product sense, estimation, metrics)
└── Building a product portfolio/case studies

FREE RESOURCES:
├── Lenny's Newsletter (free tier)
│   → lennysnewsletter.com
├── Shreyas Doshi on Twitter/X (free threads)
├── Product School free resources
│   → productschool.com/resources
├── Reforge blog (free articles)
│   → reforge.com/blog
└── "Inspired" by Marty Cagan 
    (check library or free summaries on YouTube)

MINOR PROJECTS:
1. Full PRD (Product Requirements Document) 
   for a new feature in Swiggy or Zomato — 
   with user research, metrics, and wireframes
2. Competitive teardown comparing 3 Indian 
   fintech apps (GPay, PhonePe, Paytm) 
   with strategic recommendations
3. Product case study: redesign IRCTC's 
   booking flow with problem statement, 
   user research insights, proposed solution 
   and success metrics

MAJOR PROJECT:
"ProductLab Portfolio" — A publicly accessible 
website showcasing 5 detailed product case studies 
covering different industries (edtech, fintech, 
healthtech, B2B SaaS, consumer app). Each case 
study includes: problem framing, user research 
artifacts, product strategy, PRD, metrics 
framework, and go-to-market plan.

RISKS & CHALLENGES:
├── Extremely competitive role — most companies 
│   hire PMs only from IITs/IIMs in India
├── No clear technical entry path — 
│   most PMs come from engineering or MBA backgrounds
├── Soft skills (communication, influence without 
│   authority) are hard to learn from courses
├── PMs take blame for failures but 
│   engineers get credit for successes
└── In India, APM programs are very limited — 
    Google, Microsoft, Uber are the only real ones
`;

// Parse script
const roadmaps = {};
const lines = rawText.split('\n');

let currentDomain = null;
let currentObj = null;
let currentPhase = null;
let section = null;

const cleanup = (str) => str.trim().replace(/^[│├───└]+/g, '').trim();

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    if (line.startsWith('### ')) {
        const match = line.match(/### \d+\. [^\w]*([\w\s/&()]+)/);
        if (match) {
            currentDomain = match[1].trim();
            currentObj = {
                status: "roadmap",
                domain: currentDomain,
                target_year: "Fallback",
                overview: "A comprehensive roadmap based on the master prompt.",
                roadmap_phases: [],
                free_resources: [],
                projects: {
                    minor: [],
                    major: { title: "", description: "", tech_stack: [], features: [] }
                },
                risks_and_challenges: [],
                internship_strategy: "Build a strong portfolio and practice interview skills regularly."
            };
            if (!roadmaps[currentDomain]) {
                roadmaps[currentDomain] = [];
            }
            roadmaps[currentDomain].push(currentObj);
            section = "phases";
        }
        continue;
    }

    if (!currentObj) continue;

    if (line.startsWith('PHASE ')) {
        section = "phases";
        const phaseMatch = line.match(/(PHASE \d+) — (.*?) \((.*?)\)/);
        if (phaseMatch) {
            currentPhase = {
                phase: phaseMatch[1],
                title: phaseMatch[2].trim(),
                timeframe: phaseMatch[3],
                topics: [],
                milestone: ""
            };
            currentObj.roadmap_phases.push(currentPhase);
        }
        continue;
    }

    if (line.startsWith('FREE RESOURCES:')) { section = 'resources'; continue; }
    if (line.startsWith('MINOR PROJECTS:')) { section = 'minor'; continue; }
    if (line.startsWith('MAJOR PROJECT:')) { section = 'major'; continue; }
    if (line.startsWith('RISKS & CHALLENGES:')) { section = 'risks'; continue; }

    if (section === 'phases' && currentPhase) {
        if (line.startsWith('├') || line.startsWith('└')) {
            currentPhase.topics.push(cleanup(line));
        }
    }

    if (section === 'resources') {
        if (line.startsWith('├') || line.startsWith('└')) {
            if (line.includes('—')) {
                const parts = cleanup(line).split('—');
                currentObj.free_resources.push({
                    name: parts[0].trim(),
                    type: "Resource",
                    url: parts[1] ? parts[1].trim() : ""
                });
            } else if (line.includes('→')) {
                const url = line.split('→')[1].trim();
                const lastRes = currentObj.free_resources[currentObj.free_resources.length - 1];
                if (lastRes) lastRes.url = url;
            } else {
                currentObj.free_resources.push({
                    name: cleanup(line),
                    type: "Resource",
                    url: ""
                });
            }
        } else if (line.includes('→')) {
            const url = line.split('→')[1].trim();
            const lastRes = currentObj.free_resources[currentObj.free_resources.length - 1];
            if (lastRes) lastRes.url = url;
        }
    }

    if (section === 'minor') {
        const numMatch = line.match(/^\d+\.\s(.*)/);
        if (numMatch) {
            currentObj.projects.minor.push({ title: numMatch[1], description: numMatch[1], tech_stack: [] });
        } else {
            const lastMinor = currentObj.projects.minor[currentObj.projects.minor.length - 1];
            if (lastMinor) {
                lastMinor.description += " " + line.trim();
            }
        }
    }

    if (section === 'major') {
        if (line.startsWith('"')) {
            const parts = line.split('—');
            currentObj.projects.major.title = parts[0].replace(/"/g, '').trim();
            currentObj.projects.major.description = parts[1] ? parts[1].trim() : "";
        } else if (line.startsWith('Tech Stack:')) {
            const stack = line.replace('Tech Stack:', '').split(',').map(s => s.trim());
            currentObj.projects.major.tech_stack = stack;
        } else if (!line.startsWith('Tech Stack:') && !line.includes('Features:')) {
            if (currentObj.projects.major.tech_stack.length > 0) {
                // it's a spill over of tech stack
                const stack = line.split(',').map(s => s.trim());
                currentObj.projects.major.tech_stack.push(...stack);
            } else {
                currentObj.projects.major.description += " " + line.trim();
            }
        }
    }

    if (section === 'risks') {
        if (line.startsWith('├') || line.startsWith('└')) {
            currentObj.risks_and_challenges.push(cleanup(line));
        } else if (currentObj.risks_and_challenges.length > 0) {
            currentObj.risks_and_challenges[currentObj.risks_and_challenges.length - 1] += " " + cleanup(line);
        }
    }
}

// Add the 'Not Sure' option exactly as the user specified
roadmaps["Not Sure"] = [
    {
        "status": "explore",
        "suggestions": [
            {
                "domain_name": "AI/ML",
                "pitch": "Build intelligent systems that learn from data. One of the highest paying fields in tech with applications in every industry.",
                "beginner_friendly": false,
                "avg_india_salary": "₹8L–₹25L/year",
                "time_to_job_ready": "12–18 months"
            },
            {
                "domain_name": "UI/UX Design",
                "pitch": "Shape how millions of people experience technology. Creative and analytical, with growing demand in every product company.",
                "beginner_friendly": true,
                "avg_india_salary": "₹5L–₹18L/year",
                "time_to_job_ready": "6–10 months"
            },
            {
                "domain_name": "Cybersecurity",
                "pitch": "Defend the digital world from attackers. Massive talent shortage globally means excellent job security and high salaries.",
                "beginner_friendly": false,
                "avg_india_salary": "₹6L–₹20L/year",
                "time_to_job_ready": "10–14 months"
            }
        ]
    }
];

const tsOutput = "// src/lib/hardcodedRoadmaps.ts\n\n" +
    "// This file serves as the strict fallback if the DeepSeek API goes down or hits limits\n" +
    "// It follows exactly the new JSON schema from the Master Prompt\n\n" +
    "export const hardcodedRoadmaps: Record<string, any[]> = " + JSON.stringify(roadmaps, null, 4) + ";\n";

fs.writeFileSync('src/lib/hardcodedRoadmaps.ts', tsOutput);
console.log("Successfully generated hardcodedRoadmaps.ts!");
