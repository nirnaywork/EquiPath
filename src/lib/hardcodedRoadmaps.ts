// src/lib/hardcodedRoadmaps.ts

export const hardcodedRoadmaps: Record<string, any[]> = {
    "Software Development (Web/Mobile/Desktop)": [
        {
            status: "roadmap",
            overview: "Focus on Web Development using the MERN stack (MongoDB, Express, React, Node.js). Build strong full-stack foundations.",
            roadmap_phases: [
                { phase_name: "Frontend Basics", topics_to_learn: ["HTML/CSS", "JavaScript (ES6+)", "React.js"], estimated_timeframe: "2-3 months" },
                { phase_name: "Backend & Databases", topics_to_learn: ["Node.js", "Express", "MongoDB", "REST APIs"], estimated_timeframe: "2 months" },
                { phase_name: "Advanced Concepts", topics_to_learn: ["Authentication (JWT)", "State Management", "Deployment (Vercel/Render)"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "FreeCodeCamp", type: "Course", url_or_search_term: "freecodecamp.org" },
                { name: "MDN Web Docs", type: "Documentation", url_or_search_term: "developer.mozilla.org" }
            ],
            projects: {
                minor_projects: [{ title: "Personal Portfolio", description: "A static portfolio website to showcase your skills." }],
                major_project: { title: "E-Commerce Platform", description: "A full-stack store with cart functionality and payment simulation.", key_technologies: ["React", "Node", "MongoDB"] }
            },
            risks_and_challenges: ["Fast-paced ecosystem changes", "High competition for entry-level roles"],
            internship_strategy: "Build a strong GitHub portfolio and contribute to open source to stand out."
        },
        {
            status: "roadmap",
            overview: "Focus on Mobile Development using Flutter and Firebase. Enable cross-platform app creation from a single codebase.",
            roadmap_phases: [
                { phase_name: "Dart Basics", topics_to_learn: ["Dart Syntax", "Variables & Functions", "OOP in Dart"], estimated_timeframe: "1 month" },
                { phase_name: "Flutter UI", topics_to_learn: ["Widgets", "Stateful/Stateless", "Layouts"], estimated_timeframe: "2 months" },
                { phase_name: "Backend Integration", topics_to_learn: ["Firebase Auth", "Cloud Firestore", "API Integration"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Flutter Official Docs", type: "Documentation", url_or_search_term: "flutter.dev/docs" }
            ],
            projects: {
                minor_projects: [{ title: "Task Manager App", description: "A simple to-do app with local storage." }],
                major_project: { title: "Social Media Clone", description: "An app with user authentication, feed, and real-time messaging.", key_technologies: ["Flutter", "Firebase", "Dart"] }
            },
            risks_and_challenges: ["App store approval processes", "Platform-specific bugs"],
            internship_strategy: "Publish small apps to Google Play or App Store to prove production capability."
        }
    ],
    "AI/ML": [
        {
            status: "roadmap",
            overview: "Deep dive into Natural Language Processing (NLP) and Deep Learning using PyTorch.",
            roadmap_phases: [
                { phase_name: "Python & Math Foundations", topics_to_learn: ["Python", "Linear Algebra", "Calculus Basics"], estimated_timeframe: "2 months" },
                { phase_name: "Machine Learning Basics", topics_to_learn: ["Scikit-Learn", "Regression", "Classification"], estimated_timeframe: "2 months" },
                { phase_name: "Deep Learning & NLP", topics_to_learn: ["PyTorch", "Neural Networks", "Transformers"], estimated_timeframe: "3 months" }
            ],
            free_resources: [
                { name: "Fast.ai", type: "Course", url_or_search_term: "course.fast.ai" },
                { name: "Kaggle", type: "Platform", url_or_search_term: "kaggle.com/learn" }
            ],
            projects: {
                minor_projects: [{ title: "Sentiment Analyzer", description: "A simple classical ML model that classifies movie reviews." }],
                major_project: { title: "Custom LLM Fine-Tuner", description: "Fine-tune a small HuggingFace model on a specific dataset.", key_technologies: ["PyTorch", "HuggingFace", "Python"] }
            },
            risks_and_challenges: ["Heavy compute requirements", "Math-intensive learning curve"],
            internship_strategy: "Participate in Kaggle competitions and publish Jupyter notebooks explaining your thought process."
        },
        {
            status: "roadmap",
            overview: "Focus on Computer Vision and Traditional Machine Learning using TensorFlow.",
            roadmap_phases: [
                { phase_name: "Data Manipulation", topics_to_learn: ["Pandas", "NumPy", "Matplotlib"], estimated_timeframe: "1-2 months" },
                { phase_name: "Traditional ML", topics_to_learn: ["Decision Trees", "SVMs", "Clustering"], estimated_timeframe: "2 months" },
                { phase_name: "Computer Vision", topics_to_learn: ["OpenCV", "CNNs", "TensorFlow/Keras"], estimated_timeframe: "3 months" }
            ],
            free_resources: [
                { name: "TensorFlow Tutorials", type: "Tutorial", url_or_search_term: "tensorflow.org/tutorials" }
            ],
            projects: {
                minor_projects: [{ title: "Digit Recognizer", description: "MNIST dataset digit classification using basic CNN." }],
                major_project: { title: "Real-time Object Detection", description: "Use YOLO or SSD algorithms to detect objects via webcam.", key_technologies: ["TensorFlow", "OpenCV", "Python"] }
            },
            risks_and_challenges: ["High barrier to entry without degree", "Rapidly changing SOTA models"],
            internship_strategy: "Build end-to-end deployed ML models rather than just notebooks to show software engineering skills."
        }
    ],
    "Data Science & Analytics": [
        {
            status: "roadmap",
            overview: "A Python and SQL-heavy path focusing on data manipulation, insights, and predictive modeling.",
            roadmap_phases: [
                { phase_name: "Data Wrangling", topics_to_learn: ["Python", "Pandas", "SQL"], estimated_timeframe: "2 months" },
                { phase_name: "Data Visualization", topics_to_learn: ["Matplotlib", "Seaborn", "Tableau basics"], estimated_timeframe: "1 month" },
                { phase_name: "Predictive Analytics", topics_to_learn: ["Scikit-learn", "Statistical Modeling", "A/B Testing"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Kaggle", type: "Platform", url_or_search_term: "kaggle.com" },
                { name: "Mode Analytics SQL", type: "Tutorial", url_or_search_term: "mode.com/sql-tutorial" }
            ],
            projects: {
                minor_projects: [{ title: "Exploratory Data Analysis (EDA)", description: "Analyze a public dataset and extract key business insights." }],
                major_project: { title: "Customer Churn Predictor", description: "End-to-end pipeline to ingest data, clean it, and predict user churn.", key_technologies: ["Python", "SQL", "Scikit-Learn"] }
            },
            risks_and_challenges: ["Role ambiguity across companies", "Requires strong communication skills"],
            internship_strategy: "Create a portfolio analyzing interesting, non-standard datasets (e.g., sports, gaming)."
        },
        {
            status: "roadmap",
            overview: "A Business Intelligence (BI) focused path utilizing R, SQL, and PowerBI.",
            roadmap_phases: [
                { phase_name: "Data Foundations", topics_to_learn: ["Advanced SQL", "R Programming", "Tidyverse"], estimated_timeframe: "2 months" },
                { phase_name: "Business Intelligence", topics_to_learn: ["PowerBI", "DAX", "Data Storytelling"], estimated_timeframe: "2 months" },
                { phase_name: "Advanced Reporting", topics_to_learn: ["Automated Dashboards", "Data Warehousing Basics"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "Microsoft PowerBI Learn", type: "Documentation", url_or_search_term: "learn.microsoft.com/en-us/power-bi/" }
            ],
            projects: {
                minor_projects: [{ title: "Sales Dashboard", description: "Interactive PowerBI dashboard for a mock retail company." }],
                major_project: { title: "Comprehensive BI Solution", description: "ETL from mock API to SQL database, connected to live PowerBI dashboards.", key_technologies: ["R", "SQL Server", "PowerBI"] }
            },
            risks_and_challenges: ["Over-reliance on proprietary tools", "Heavy focus on business metrics over coding"],
            internship_strategy: "Focus on translating technical data into actionable business recommendations during interviews."
        }
    ],
    "Cloud Computing": [
        {
            status: "roadmap",
            overview: "AWS-centric roadmap focusing on core infrastructure, serverless computing, and scalable architectures.",
            roadmap_phases: [
                { phase_name: "Networking & OS Fundamentals", topics_to_learn: ["Linux Basics", "Bash Scripting", "TCP/IP"], estimated_timeframe: "1 month" },
                { phase_name: "Core AWS Services", topics_to_learn: ["EC2", "S3", "VPC", "IAM"], estimated_timeframe: "2 months" },
                { phase_name: "Serverless & IaC", topics_to_learn: ["Lambda", "API Gateway", "Terraform / CloudFormation"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "AWS Skill Builder", type: "Platform", url_or_search_term: "skillbuilder.aws" }
            ],
            projects: {
                minor_projects: [{ title: "Static Website Hosting", description: "Host a website using S3, CloudFront, and Route 53." }],
                major_project: { title: "Serverless Image Processor", description: "An AWS Lambda function that processes images upon S3 upload.", key_technologies: ["AWS Lambda", "S3", "Python"] }
            },
            risks_and_challenges: ["Unexpected cloud billing costs", "Vendor lock-in"],
            internship_strategy: "Aim for AWS Solutions Architect Associate certification to validate your knowledge."
        },
        {
            status: "roadmap",
            overview: "Azure and GCP focused roadmap targeting enterprise environments and container orchestration.",
            roadmap_phases: [
                { phase_name: "Cloud Fundamentals", topics_to_learn: ["Virtual Machines", "Storage Accounts", "Active Directory"], estimated_timeframe: "1 month" },
                { phase_name: "Containerization", topics_to_learn: ["Docker", "Google Kubernetes Engine (GKE) / AKS"], estimated_timeframe: "2 months" },
                { phase_name: "App Services & CI/CD", topics_to_learn: ["Azure DevOps", "GCP Cloud Run", "GitHub Actions"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Google Cloud Skills Boost", type: "Platform", url_or_search_term: "cloudskillsboost.google" }
            ],
            projects: {
                minor_projects: [{ title: "Dockerized Web App", description: "Deploy a containerized application to Azure App Service or Cloud Run." }],
                major_project: { title: "Multi-Tier K8s Deployment", description: "Deploy a microservices architecture on a managed Kubernetes cluster.", key_technologies: ["Kubernetes", "Docker", "GCP/Azure"] }
            },
            risks_and_challenges: ["Steep learning curve for Kubernetes", "Managing complex IAM roles"],
            internship_strategy: "Understand the 'why' behind cloud services rather than just how to click through the console."
        }
    ],
    "Cybersecurity": [
        {
            status: "roadmap",
            overview: "An offensive security path focusing on Penetration Testing, Ethical Hacking, and red teaming.",
            roadmap_phases: [
                { phase_name: "IT Fundamentals", topics_to_learn: ["Linux", "Networking (OSI Model)", "Basic Scripting (Python)"], estimated_timeframe: "2 months" },
                { phase_name: "Vulnerability Scanning", topics_to_learn: ["Nmap", "Wireshark", "Burp Suite Basics"], estimated_timeframe: "2 months" },
                { phase_name: "Exploitation Techniques", topics_to_learn: ["Web App Hacking (OWASP Top 10)", "Privilege Escalation"], estimated_timeframe: "2-3 months" }
            ],
            free_resources: [
                { name: "TryHackMe", type: "Platform", url_or_search_term: "tryhackme.com" },
                { name: "PortSwigger Web Security Academy", type: "Platform", url_or_search_term: "portswigger.net/web-security" }
            ],
            projects: {
                minor_projects: [{ title: "Vulnerability Scanner", description: "Write a simple Python script to scan for open ports." }],
                major_project: { title: "Mock Penetration Test Report", description: "Complete a HackTheBox machine and write a professional pentest report.", key_technologies: ["Kali Linux", "Burp Suite", "Metasploit"] }
            },
            risks_and_challenges: ["Legal/ethical boundaries must be strictly observed", "Mentally exhausting troubleshooting"],
            internship_strategy: "Build a strong foundation in networking before jumping straight into hacking tools."
        },
        {
            status: "roadmap",
            overview: "A defensive security (Blue Team) path focusing on Security Operations Center (SOC) analysis and incident response.",
            roadmap_phases: [
                { phase_name: "Systems & Networks", topics_to_learn: ["Windows Server", "Firewalls", "Network Topology"], estimated_timeframe: "2 months" },
                { phase_name: "Monitoring & Logging", topics_to_learn: ["Splunk / ELK Stack", "Intrusion Detection Systems (Snort)", "SIEM"], estimated_timeframe: "2 months" },
                { phase_name: "Incident Response", topics_to_learn: ["Malware Analysis Basics", "Threat Hunting", "Forensics"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "CyberDefenders", type: "Platform", url_or_search_term: "cyberdefenders.org" }
            ],
            projects: {
                minor_projects: [{ title: "Log Analysis Script", description: "Extract failed login attempts from a Linux syslog." }],
                major_project: { title: "Home Network SIEM", description: "Deploy an ELK stack to ingest and monitor logs from home devices.", key_technologies: ["ELK", "Suricata", "Linux"] }
            },
            risks_and_challenges: ["High stress during active incidents", "Shift work in SOC roles"],
            internship_strategy: "Demonstrate analytical thinking and the ability to distinguish false positives from true threats."
        }
    ],
    "DevOps & SRE": [
        {
            status: "roadmap",
            overview: "Focus on Infrastructure as Code (IaC) and comprehensive CI/CD pipeline automation.",
            roadmap_phases: [
                { phase_name: "OS & Scripting", topics_to_learn: ["Linux Internals", "Bash", "Python for Automation"], estimated_timeframe: "1-2 months" },
                { phase_name: "Version Control & CI/CD", topics_to_learn: ["Git Advanced", "GitHub Actions", "Jenkins / GitLab CI"], estimated_timeframe: "2 months" },
                { phase_name: "Infrastructure as Code", topics_to_learn: ["Terraform", "Ansible", "AWS/GCP Basics"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "DevOps Roadmap", type: "Guide", url_or_search_term: "roadmap.sh/devops" }
            ],
            projects: {
                minor_projects: [{ title: "Automated Linting Pipeline", description: "A CI pipeline that lints and tests code on every pull request." }],
                major_project: { title: "End-to-End Automated Infrastructure", description: "Use Terraform to provision AWS resources and GitHub Actions to deploy a Node app.", key_technologies: ["Terraform", "GitHub Actions", "AWS"] }
            },
            risks_and_challenges: ["Requires broad knowledge across dev and ops", "High responsibility for uptime"],
            internship_strategy: "Start integrating DevOps practices into typical software development projects."
        },
        {
            status: "roadmap",
            overview: "Site Reliability Engineering (SRE) focus with containerization, orchestration, and observability.",
            roadmap_phases: [
                { phase_name: "Containers", topics_to_learn: ["Docker", "Container Security", "Docker Compose"], estimated_timeframe: "1-2 months" },
                { phase_name: "Orchestration", topics_to_learn: ["Kubernetes (K8s)", "Helm", "Service Meshes"], estimated_timeframe: "2-3 months" },
                { phase_name: "Observability", topics_to_learn: ["Prometheus", "Grafana", "Distributed Tracing"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Kubernetes The Hard Way", type: "Tutorial", url_or_search_term: "github.com/kelseyhightower/kubernetes-the-hard-way" }
            ],
            projects: {
                minor_projects: [{ title: "Dockerized Microservice", description: "Package a small web API into a minimal Docker container." }],
                major_project: { title: "Highly Available K8s App", description: "Deploy an app to Kubernetes with auto-scaling and Prometheus monitoring.", key_technologies: ["Kubernetes", "Prometheus", "Docker"] }
            },
            risks_and_challenges: ["Extreme complexity of K8s ecosystem", "On-call rotations and burnout"],
            internship_strategy: "Emphasize understanding system architecture, SLIs, SLOs, and incident post-mortems."
        }
    ],
    "Blockchain & Web3": [
        {
            status: "roadmap",
            overview: "Ethereum-focused path learning Solidity and decentralized application (dApp) development.",
            roadmap_phases: [
                { phase_name: "Blockchain Basics", topics_to_learn: ["Cryptography", "Consensus Mechanisms", "EVM"], estimated_timeframe: "1 month" },
                { phase_name: "Smart Contracts", topics_to_learn: ["Solidity", "Hardhat/Truffle", "Security Patterns"], estimated_timeframe: "2-3 months" },
                { phase_name: "dApp Frontend", topics_to_learn: ["React", "Ethers.js / Web3.js", "IPFS"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "CryptoZombies", type: "Interactive Course", url_or_search_term: "cryptozombies.io" }
            ],
            projects: {
                minor_projects: [{ title: "ERC-20 Token", description: "Create and deploy your own basic cryptocurrency on a testnet." }],
                major_project: { title: "Decentralized Voting App", description: "A secure voting system with a React frontend interacting with a Solidity smart contract.", key_technologies: ["Solidity", "React", "Ethers.js"] }
            },
            risks_and_challenges: ["Highly volatile industry", "Security flaws in contracts are immutable"],
            internship_strategy: "Security is paramount; focus heavily on smart contract auditing and testing."
        },
        {
            status: "roadmap",
            overview: "Solana and high-performance blockchain path emphasizing Rust and Anchor framework.",
            roadmap_phases: [
                { phase_name: "Rust Fundamentals", topics_to_learn: ["Ownership model", "Borrow Checker", "Concurrency"], estimated_timeframe: "2 months" },
                { phase_name: "Solana Ecosystem", topics_to_learn: ["Accounts Model", "Anchor Framework", "Solana CLI"], estimated_timeframe: "2 months" },
                { phase_name: "High-Performance dApps", topics_to_learn: ["RPC Nodes", "Frontend Integration", "Performance Tuning"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "Rust Book", type: "Documentation", url_or_search_term: "doc.rust-lang.org/book" },
                { name: "Solana Developers", type: "Documentation", url_or_search_term: "solana.com/developers" }
            ],
            projects: {
                minor_projects: [{ title: "Solana Faucet", description: "A simple UI to request testnet SOL tokens." }],
                major_project: { title: "NFT Marketplace on Solana", description: "A platform to mint and trade NFTs using the Anchor framework.", key_technologies: ["Rust", "Anchor", "Next.js"] }
            },
            risks_and_challenges: ["Steep learning curve for Rust", "Ecosystem changes frequently"],
            internship_strategy: "Participate in Web3 hackathons to build a network and gain practical experience."
        }
    ],
    "UI/UX Design": [
        {
            status: "roadmap",
            overview: "A product design path focusing on user interfaces, design systems, and visual fidelity using Figma.",
            roadmap_phases: [
                { phase_name: "Design Fundamentals", topics_to_learn: ["Color Theory", "Typography", "Layout & Grid Systems"], estimated_timeframe: "1 month" },
                { phase_name: "Tooling & Prototyping", topics_to_learn: ["Figma Mastery", "Auto Layout", "Interactive Prototypes"], estimated_timeframe: "2 months" },
                { phase_name: "Design Systems", topics_to_learn: ["Component Libraries", "Tokens", "Handoff to Devs"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "Figma Community Resources", type: "Platform", url_or_search_term: "figma.com/community" }
            ],
            projects: {
                minor_projects: [{ title: "App Redesign", description: "Redesign a popular ugly app to improve its aesthetics and usability." }],
                major_project: { title: "Comprehensive Design System", description: "Create a fully documented design system for a mock SaaS product.", key_technologies: ["Figma", "Design Tokens", "Prototyping"] }
            },
            risks_and_challenges: ["Subjectivity in design feedback", "Oversaturation of entry-level UI designers"],
            internship_strategy: "Build a highly polished Dribbble/Behance portfolio and explain your design decisions."
        },
        {
            status: "roadmap",
            overview: "A User Experience (UX) Research path focusing on user psychology, journey mapping, and usability testing.",
            roadmap_phases: [
                { phase_name: "UX Psychology", topics_to_learn: ["Heuristics", "Cognitive Load", "Accessibility"], estimated_timeframe: "1-2 months" },
                { phase_name: "User Research", topics_to_learn: ["User Interviews", "Surveys", "Persona Creation"], estimated_timeframe: "2 months" },
                { phase_name: "Journey Mapping & Testing", topics_to_learn: ["Wireframing", "Usability Testing", "Information Architecture"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Nielsen Norman Group", type: "Articles", url_or_search_term: "nngroup.com" }
            ],
            projects: {
                minor_projects: [{ title: "User Persona creation", description: "Conduct mock interviews and create 3 distinct user personas." }],
                major_project: { title: "End-to-End UX Case Study", description: "Research a problem, build wireframes, test them with users, and present findings.", key_technologies: ["Miro", "Figma", "Usability Testing"] }
            },
            risks_and_challenges: ["Convincing stakeholders of UX value", "Heavy documentation requirement"],
            internship_strategy: "Document your entire process in case studies; the final visual is less important than the research behind it."
        }
    ],
    "IoT": [
        {
            status: "roadmap",
            overview: "Consumer IoT and Smart Home focused path, integrating embedded devices with cloud services.",
            roadmap_phases: [
                { phase_name: "Embedded Basics", topics_to_learn: ["C/C++ Basics", "Arduino Platform", "Basic Electronics"], estimated_timeframe: "2 months" },
                { phase_name: "Connectivity", topics_to_learn: ["Wi-Fi/Bluetooth", "MQTT Protcol", "REST APIs on Microcontrollers"], estimated_timeframe: "1-2 months" },
                { phase_name: "Cloud Integration", topics_to_learn: ["AWS / Google Cloud IoT", "Data Dashboards", "Voice Assistants"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Random Nerd Tutorials", type: "Tutorials", url_or_search_term: "randomnerdtutorials.com" }
            ],
            projects: {
                minor_projects: [{ title: "Temperature Monitor", description: "Read a sensor and display the temperature on an LCD." }],
                major_project: { title: "Smart Home Dashboard", description: "Connect multiple ESP32 devices via MQTT to a custom web dashboard.", key_technologies: ["ESP32", "MQTT", "Node.js"] }
            },
            risks_and_challenges: ["Hardware debugging can be frustrating", "Security vulnerabilities in cheap devices"],
            internship_strategy: "Focus on the software-hardware integration rather than purely circuit design."
        },
        {
            status: "roadmap",
            overview: "Industrial IoT (IIoT) path focusing on robust sensors, edge computing, and large-scale data ingestion.",
            roadmap_phases: [
                { phase_name: "Advanced Embedded Systems", topics_to_learn: ["Raspberry Pi", "Linux edge systems", "Sensors & Actuators"], estimated_timeframe: "2 months" },
                { phase_name: "Edge Computing", topics_to_learn: ["Python on Edge", "Local Data Processing", "Docker on Edge"], estimated_timeframe: "2 months" },
                { phase_name: "Industrial Protocols", topics_to_learn: ["Modbus", "Time-Series Databases (InfluxDB)", "Grafana"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Eclipse IoT", type: "Platform", url_or_search_term: "iot.eclipse.org" }
            ],
            projects: {
                minor_projects: [{ title: "Edge Data Aggregator", description: "A Python script on a Raspberry Pi collecting simulated sensor data." }],
                major_project: { title: "Predictive Maintenance Simulator", description: "Ingest vibrations data locally, detect anomalies, and sync to a central InfluxDB.", key_technologies: ["Python", "InfluxDB", "Raspberry Pi"] }
            },
            risks_and_challenges: ["Requires knowledge of industrial standards", "Expensive hardware for real-world projects"],
            internship_strategy: "Emphasize reliability, latency, and data security in your projects."
        }
    ],
    "AR/VR": [
        {
            status: "roadmap",
            overview: "Unity-based AR/VR development path focusing on C# and cross-platform mobile/headset deployment.",
            roadmap_phases: [
                { phase_name: "Unity & C# Basics", topics_to_learn: ["Unity Interface", "C# Scripting", "3D Math basics"], estimated_timeframe: "2 months" },
                { phase_name: "AR Development", topics_to_learn: ["ARKit / ARCore", "Image Tracking", "Plane Detection"], estimated_timeframe: "1-2 months" },
                { phase_name: "VR Interactions", topics_to_learn: ["Meta Quest SDK", "Locomotion", "Grabbing & Physics"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Unity Learn", type: "Platform", url_or_search_term: "learn.unity.com" }
            ],
            projects: {
                minor_projects: [{ title: "AR Furniture Placer", description: "Mobile app to place a 3D chair using plane detection." }],
                major_project: { title: "VR Escape Room", description: "A fully immersive VR room with physical puzzles and object interaction.", key_technologies: ["Unity", "C#", "Oculus Integration"] }
            },
            risks_and_challenges: ["Performance optimization is extremely difficult", "Niche job market"],
            internship_strategy: "Performance is key in VR; showcase your ability to maintain 90fps via optimization."
        },
        {
            status: "roadmap",
            overview: "Unreal Engine XR path focusing on high-fidelity graphics and Blueprints/C++.",
            roadmap_phases: [
                { phase_name: "Unreal Engine Basics", topics_to_learn: ["Unreal UI", "Blueprints Visual Scripting", "Level Design"], estimated_timeframe: "2 months" },
                { phase_name: "Graphics & Materials", topics_to_learn: ["Lighting", "PBR Materials", "Post-Processing"], estimated_timeframe: "1-2 months" },
                { phase_name: "XR specific development", topics_to_learn: ["OpenXR", "C++ for Unreal", "Performance Profiling"], estimated_timeframe: "2-3 months" }
            ],
            free_resources: [
                { name: "Epic Games Developer Community", type: "Platform", url_or_search_term: "dev.epicgames.com/community" }
            ],
            projects: {
                minor_projects: [{ title: "Interactive ArchViz", description: "A high-fidelity architectural visualization walkthrough in VR." }],
                major_project: { title: "Multiplayer VR Sandbox", description: "A networked VR environment where users can spawn and interact with items.", key_technologies: ["Unreal Engine", "Blueprints", "C++"] }
            },
            risks_and_challenges: ["High system requirements", "Steep learning curve for C++ in Unreal"],
            internship_strategy: "Focus on visual fidelity and realistic interactions to stand out."
        }
    ],
    "Game Development": [
        {
            status: "roadmap",
            overview: "Indie game development focus using Unity and C# for 2D and 3D games.",
            roadmap_phases: [
                { phase_name: "Core Programming", topics_to_learn: ["C# Fundamentals", "Object-Oriented Programming", "Design Patterns"], estimated_timeframe: "1-2 months" },
                { phase_name: "Unity Engine", topics_to_learn: ["Physics", "Animation State Machines", "UI Design (UGUI)"], estimated_timeframe: "2 months" },
                { phase_name: "Game Architecture", topics_to_learn: ["Save Systems", "Audio Management", "Optimization"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Brackeys (YouTube)", type: "Tutorials", url_or_search_term: "youtube.com/user/Brackeys" }
            ],
            projects: {
                minor_projects: [{ title: "Simple Platformer", description: "A 2D platformer with basic jumping and enemy mechanics." }],
                major_project: { title: "Polished Metroidvania Slice", description: "A 15-minute playable demo with combat, upgrades, and a boss fight.", key_technologies: ["Unity", "C#", "2D Physics"] }
            },
            risks_and_challenges: ["Extremely competitive industry", "Crunch culture in game studios"],
            internship_strategy: "Participate in game jams (like Ludum Dare) and actually publish completed games to Itch.io."
        },
        {
            status: "roadmap",
            overview: "AAA game development focus using Unreal Engine and C++.",
            roadmap_phases: [
                { phase_name: "C++ Foundations", topics_to_learn: ["Memory Management", "Pointers", "Modern C++ features"], estimated_timeframe: "2 months" },
                { phase_name: "Unreal Engine & Blueprints", topics_to_learn: ["Actor Lifecycle", "Blueprints", "Unreal C++ Macros"], estimated_timeframe: "2 months" },
                { phase_name: "Advanced Game Systems", topics_to_learn: ["Behavior Trees (AI)", "Multiplayer Replication", "Custom Editor Tools"], estimated_timeframe: "2-3 months" }
            ],
            free_resources: [
                { name: "Unreal Engine Docs", type: "Documentation", url_or_search_term: "docs.unrealengine.com" }
            ],
            projects: {
                minor_projects: [{ title: "FPS Character Controller", description: "Implement a smooth character controller entirely in C++." }],
                major_project: { title: "Multiplayer Shooter Prototype", description: "A networked arena shooter with client-side prediction and server authority.", key_technologies: ["Unreal Engine", "C++", "Networking"] }
            },
            risks_and_challenges: ["Steepest learning curve in game dev", "Long compilation times"],
            internship_strategy: "Show deep understanding of memory management, performance, and engine architecture."
        }
    ],
    "Database & Data Engineering": [
        {
            status: "roadmap",
            overview: "A Data Engineering path focused on building robust ETL pipelines and relational data modeling.",
            roadmap_phases: [
                { phase_name: "SQL & Relational Databases", topics_to_learn: ["Advanced SQL", "PostgreSQL", "Database Normalization"], estimated_timeframe: "2 months" },
                { phase_name: "Data Processing Pipelines", topics_to_learn: ["Python", "Apache Airflow", "ETL design"], estimated_timeframe: "2 months" },
                { phase_name: "Data Warehousing", topics_to_learn: ["Snowflake / BigQuery", "dbt (data build tool)", "Star Schema"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "Data Engineering Zoomcamp", type: "Course", url_or_search_term: "github.com/DataTalksClub/data-engineering-zoomcamp" }
            ],
            projects: {
                minor_projects: [{ title: "Automated Data Scraper", description: "A script that scrapes data daily and loads it into Postgres." }],
                major_project: { title: "End-to-End Analytics Pipeline", description: "Extract data from an API, transform using dbt, load into BigQuery, orchestrate via Airflow.", key_technologies: ["Python", "Airflow", "dbt", "BigQuery"] }
            },
            risks_and_challenges: ["Less 'glamorous' than Data Science", "High responsibility for data integrity"],
            internship_strategy: "Focus tightly on reliable, automated, and scalable systems rather than complex analytics."
        },
        {
            status: "roadmap",
            overview: "A modern Big Data path focused on distributed computing, NoSQL, and stream processing.",
            roadmap_phases: [
                { phase_name: "NoSQL & Document Stores", topics_to_learn: ["MongoDB", "Cassandra / DynamoDB", "CAP Theorem"], estimated_timeframe: "1-2 months" },
                { phase_name: "Distributed Processing", topics_to_learn: ["Apache Spark", "Hadoop Basics", "PySpark / Scala"], estimated_timeframe: "2 months" },
                { phase_name: "Real-time Streaming", topics_to_learn: ["Apache Kafka", "Stream Processing", "Event-Driven Arch"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Confluent Developer", type: "Documentation", url_or_search_term: "developer.confluent.io" }
            ],
            projects: {
                minor_projects: [{ title: "Kafka Producer/Consumer", description: "A simple microservice pair communicating via Kafka topics." }],
                major_project: { title: "Real-time Fraud Detection Pipeline", description: "Streaming transaction data through Kafka and analyzing with Spark Streaming to flag fraud.", key_technologies: ["Kafka", "Spark", "Python"] }
            },
            risks_and_challenges: ["Infrastructure is hard to run locally", "Complex debugging in distributed systems"],
            internship_strategy: "Highlight your understanding of exactly-once vs at-least-once delivery and distributed consensus."
        }
    ],
    "Networking & Telecom": [
        {
            status: "roadmap",
            overview: "Enterprise networking track focusing on routing, switching, and traditional network administration (Cisco ecosystem).",
            roadmap_phases: [
                { phase_name: "Network Fundamentals", topics_to_learn: ["OSI Model", "Subnetting", "TCP/UDP protocols"], estimated_timeframe: "1-2 months" },
                { phase_name: "Routing & Switching", topics_to_learn: ["VLANs", "OSPF/BGP", "Cisco CLI"], estimated_timeframe: "2 months" },
                { phase_name: "Network Security & Wireless", topics_to_learn: ["Firewalls", "VPNs", "WLAN Architecture"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "Jeremy's IT Lab (CCNA)", type: "YouTube Course", url_or_search_term: "youtube.com/c/JeremysITLab" }
            ],
            projects: {
                minor_projects: [{ title: "Packet Tracer Network Design", description: "Design a multi-branch corporate network in Cisco Packet Tracer." }],
                major_project: { title: "Enterprise Campus Network", description: "A comprehensive virtual network setup with routing protocols, VLANs, and firewall rules.", key_technologies: ["Cisco IOS", "OSPF", "Packet Tracer"] }
            },
            risks_and_challenges: ["Hardware-centric learning is less accessible", "Cloud networking is reducing data center jobs"],
            internship_strategy: "Obtain the CCNA certification as an anchor for your resume."
        },
        {
            status: "roadmap",
            overview: "Modern Cloud Networking and Software-Defined Networking (SDN) path.",
            roadmap_phases: [
                { phase_name: "Cloud Fundamentals", topics_to_learn: ["VPCs", "Cloud Load Balancing", "Direct Connect / ExpressRoute"], estimated_timeframe: "1-2 months" },
                { phase_name: "Network Automation", topics_to_learn: ["Python (Netmiko)", "Ansible for Networking", "REST APIs for Network gear"], estimated_timeframe: "2 months" },
                { phase_name: "SDN & SD-WAN", topics_to_learn: ["Software-Defined Access", "SD-WAN Architectures", "Network Virtualization (NSX)"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "DevNet Associate Tutorials", type: "Platform", url_or_search_term: "developer.cisco.com/learning" }
            ],
            projects: {
                minor_projects: [{ title: "Python Config Backup", description: "A script that logs into multiple routers and backs up configurations automatically." }],
                major_project: { title: "Automated Network Provisioning", description: "Use Ansible to automatically provision VLANs and BGP routing across a virtualized network.", key_technologies: ["Python", "Ansible", "Linux"] }
            },
            risks_and_challenges: ["Requires bridging the gap between traditional IT and software dev", "Complex troubleshooting"],
            internship_strategy: "Position yourself as a hybrid engineer (NetDevOps) capable of coding and understanding deep networking."
        }
    ],
    "Hardware & Embedded Systems": [
        {
            status: "roadmap",
            overview: "Microcontroller and firmware development path focusing on C/C++.",
            roadmap_phases: [
                { phase_name: "Hardware Fundamentals", topics_to_learn: ["Digital Logic", "Circuit Analysis", "Oscilloscope Basics"], estimated_timeframe: "1-2 months" },
                { phase_name: "Embedded C", topics_to_learn: ["Bit manipulation", "Interrupts", "Timers/Counters"], estimated_timeframe: "2 months" },
                { phase_name: "Communication Protocols", topics_to_learn: ["I2C", "SPI", "UART"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "FastBit Embedded Brain Academy", type: "Resources", url_or_search_term: "fastbitlab.com" }
            ],
            projects: {
                minor_projects: [{ title: "Custom I2C Driver", description: "Write an I2C driver from scratch for a temperature sensor." }],
                major_project: { title: "Weather Station Firmware", description: "A bare-metal C project reading multiple sensors via SPI/I2C and displaying to an OLED.", key_technologies: ["C", "ARM Cortex-M", "SPI/I2C"] }
            },
            risks_and_challenges: ["Debugging hardware is notoriously painful", "Steep learning curve compared to web dev"],
            internship_strategy: "Showcase code that interacts directly with hardware registers to prove deep understanding."
        },
        {
            status: "roadmap",
            overview: "Advanced Embedded Path focusing on Real-Time Operating Systems (RTOS) and FPGAs.",
            roadmap_phases: [
                { phase_name: "RTOS Fundamentals", topics_to_learn: ["FreeRTOS", "Task Scheduling", "Mutexes/Semaphores"], estimated_timeframe: "2 months" },
                { phase_name: "Embedded Linux", topics_to_learn: ["Yocto / Buildroot", "Device Trees", "Kernel Modules"], estimated_timeframe: "2 months" },
                { phase_name: "Hardware Description (Optional)", topics_to_learn: ["Verilog/VHDL", "FPGA basics", "Timing Constraints"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "FreeRTOS Tutorial", type: "Documentation", url_or_search_term: "freertos.org/tutorial" }
            ],
            projects: {
                minor_projects: [{ title: "Multi-threaded LED Controller", description: "Use FreeRTOS tasks to independently control blinking LEDs of varying frequencies." }],
                major_project: { title: "Custom Embedded Linux Image", description: "Use Yocto to build a minimal Linux image for a Raspberry Pi featuring a custom kernel module.", key_technologies: ["C", "Yocto", "Linux"] }
            },
            risks_and_challenges: ["Very niche, high barrier to entry job market", "Hardware costs can be high"],
            internship_strategy: "Contribute to open-source embedded projects or RTOS communities."
        }
    ],
    "Robotics & Automation": [
        {
            status: "roadmap",
            overview: "Software-centric robotics path utilizing the Robot Operating System (ROS) and computer vision.",
            roadmap_phases: [
                { phase_name: "C++ & Python", topics_to_learn: ["Modern C++", "Python Scripting", "Kinematics Math"], estimated_timeframe: "1-2 months" },
                { phase_name: "ROS Basics", topics_to_learn: ["ROS Nodes/Topics", "Catkin / Colcon workspaces", "URDF"], estimated_timeframe: "2 months" },
                { phase_name: "Navigation & Perception", topics_to_learn: ["SLAM", "OpenCV integration", "Path Planning"], estimated_timeframe: "2-3 months" }
            ],
            free_resources: [
                { name: "ROS Tutorials", type: "Documentation", url_or_search_term: "wiki.ros.org/ROS/Tutorials" }
            ],
            projects: {
                minor_projects: [{ title: "Simulated Robot Mover", description: "A simple ROS node package to move a robot in Gazebo simulator." }],
                major_project: { title: "Autonomous Navigation Robot", description: "Implement SLAM in a simulation (or physical robot) to map a room and navigate obstacles.", key_technologies: ["ROS", "C++", "Gazebo"] }
            },
            risks_and_challenges: ["Simulations often don't match real-world physics exactly", "Heavy reliance on complex math"],
            internship_strategy: "Use simulators extensively to demonstrate competence without needing expensive physical hardware."
        },
        {
            status: "roadmap",
            overview: "Industrial Automation path focusing on PLCs (Programmable Logic Controllers) and manufacturing systems.",
            roadmap_phases: [
                { phase_name: "Electrical Fundamentals", topics_to_learn: ["Schematics Reading", "Sensors & Actuators", "Relay Logic"], estimated_timeframe: "1-2 months" },
                { phase_name: "PLC Programming", topics_to_learn: ["Ladder Logic", "Function Block Diagram", "Siemens / Allen Bradley basics"], estimated_timeframe: "2 months" },
                { phase_name: "SCADA & HMI", topics_to_learn: ["HMI Design", "SCADA Integration", "Industrial Protocols (Modbus)"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "PLC Fiddle", type: "Interactive Simulator", url_or_search_term: "plcfiddle.com" }
            ],
            projects: {
                minor_projects: [{ title: "Traffic Light Sequencer", description: "Simulate a 4-way traffic light intersection using Ladder Logic." }],
                major_project: { title: "Automated Sorting Conveyor Simulation", description: "A ladder logic program that sorts virtual boxes by size using simulated sensor inputs.", key_technologies: ["Ladder Logic", "PLC Simulator", "HMI"] }
            },
            risks_and_challenges: ["Hard to practice physically without a job", "Slower-moving, conservative industry"],
            internship_strategy: "Emphasize safety, reliability, and troubleshooting logical faults."
        }
    ],
    "IT Support & SysAdmin": [
        {
            status: "roadmap",
            overview: "Windows Enterprise Administration track focusing on Active Directory, Group Policy, and PowerShell.",
            roadmap_phases: [
                { phase_name: "Help Desk Fundamentals", topics_to_learn: ["Troubleshooting Methodologies", "Ticketing Systems", "Hardware Repair basics"], estimated_timeframe: "1 month" },
                { phase_name: "Windows Server Administration", topics_to_learn: ["Active Directory (AD)", "Group Policy Objects (GPO)", "DNS/DHCP"], estimated_timeframe: "2 months" },
                { phase_name: "Automation", topics_to_learn: ["PowerShell Scripting", "Bulk User Creation", "Automated patching"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "Professor Messer (A+ / Net+)", type: "YouTube", url_or_search_term: "professormesser.com" }
            ],
            projects: {
                minor_projects: [{ title: "PowerShell Onboarding Script", description: "A script that reads a CSV and creates AD user accounts automatically." }],
                major_project: { title: "Mock Enterprise AD Environment", description: "Set up a virtualized Windows Server domain controller, configure GPOs, and join client machines.", key_technologies: ["Windows Server", "Active Directory", "PowerShell"] }
            },
            risks_and_challenges: ["Can get stuck in level-1 helpdesk roles", "High burnout from end-user interactions"],
            internship_strategy: "Automate everything you can using PowerShell to prove you are ready for sysadmin engineering."
        },
        {
            status: "roadmap",
            overview: "Linux System Administration track focusing on open-source server management and bash scripting.",
            roadmap_phases: [
                { phase_name: "Linux Fundamentals", topics_to_learn: ["Command Line Essentials", "File Permissions", "Package Management"], estimated_timeframe: "1-2 months" },
                { phase_name: "Server Configuration", topics_to_learn: ["SSH", "Web Servers (Apache/Nginx)", "Cron Jobs"], estimated_timeframe: "2 months" },
                { phase_name: "Security & Monitoring", topics_to_learn: ["Firewalls (iptables/UFW)", "Log Management", "System Health Monitoring"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "Linux Journey", type: "Interactive Platform", url_or_search_term: "linuxjourney.com" }
            ],
            projects: {
                minor_projects: [{ title: "LAMP Stack Deployment", description: "Manually configure a Linux server with Apache, MySQL, and PHP to host WordPress." }],
                major_project: { title: "Automated Server Hardening Script", description: "A complex bash script that applies security best practices to a fresh Ubuntu installation.", key_technologies: ["Linux", "Bash", "Security"] }
            },
            risks_and_challenges: ["Command line only can be intimidating", "Requires memorization of many utilities"],
            internship_strategy: "Consider pursuing the CompTIA Linux+ or Red Hat Certified System Administrator (RHCSA)."
        }
    ],
    "QA & Testing": [
        {
            status: "roadmap",
            overview: "SDET (Software Development Engineer in Test) path focusing on automated testing frameworks.",
            roadmap_phases: [
                { phase_name: "Programming Fundamentals", topics_to_learn: ["Java or JavaScript/TypeScript", "OOP Basics", "Git"], estimated_timeframe: "1-2 months" },
                { phase_name: "Frontend Automation", topics_to_learn: ["Selenium / Cypress / Playwright", "Page Object Model", "DOM Interactions"], estimated_timeframe: "2 months" },
                { phase_name: "API & CI/CD Testing", topics_to_learn: ["Postman / REST Assured", "Jenkins / GitHub Actions", "Mocking"], estimated_timeframe: "2 months" }
            ],
            free_resources: [
                { name: "Test Automation University", type: "Platform", url_or_search_term: "testautomationu.applitools.com" }
            ],
            projects: {
                minor_projects: [{ title: "API Test Suite", description: "A comprehensive Postman collection testing a public REST API." }],
                major_project: { title: "End-to-End Web Automation Framework", description: "A Cypress or Playwright framework that tests user login, checkout flow, and handles test reporting via CI.", key_technologies: ["Cypress/Playwright", "JavaScript", "GitHub Actions"] }
            },
            risks_and_challenges: ["Often seen as secondary to feature development", "Flaky tests cause frustration"],
            internship_strategy: "Treat test code with the exact same rigor as production code (patterns, linting, etc)."
        },
        {
            status: "roadmap",
            overview: "Manual Testing and QA Management path focusing on methodologies, test planning, and defect tracking.",
            roadmap_phases: [
                { phase_name: "Software Testing Life Cycle (STLC)", topics_to_learn: ["Agile/Scrum basics", "Test Cases vs Scenarios", "Bug Life Cycle"], estimated_timeframe: "1 month" },
                { phase_name: "Testing Types & Techniques", topics_to_learn: ["Regression Testing", "Exploratory Testing", "Boundary Value Analysis"], estimated_timeframe: "1-2 months" },
                { phase_name: "Reporting & Management Tools", topics_to_learn: ["Jira", "TestRail / Zephyr", "Writing Effective Bug Reports"], estimated_timeframe: "1 month" }
            ],
            free_resources: [
                { name: "Guru99 Testing Tutorials", type: "Tutorials", url_or_search_term: "guru99.com/software-testing.html" }
            ],
            projects: {
                minor_projects: [{ title: "Bug Report Portfolio", description: "Find 5 unique bugs in popular live websites and write professional, reproducible reports." }],
                major_project: { title: "Comprehensive Test Plan", description: "Write a complete test plan, including 50+ test cases, for a mock e-commerce mobile application.", key_technologies: ["TestRail", "Jira", "STLC"] }
            },
            risks_and_challenges: ["Manual QA roles are slowly decreasing", "Can be repetitive work"],
            internship_strategy: "Develop a keen eye for edge cases and focus on excellent communication skills."
        }
    ],
    "Tech Product Management": [
        {
            status: "roadmap",
            overview: "Agile Product Management path focusing on Scrum, user stories, and execution.",
            roadmap_phases: [
                { phase_name: "Agile Methodologies", topics_to_learn: ["Scrum Framework", "Kanban", "Sprint Planning & Retrospectives"], estimated_timeframe: "1 month" },
                { phase_name: "Requirements Gathering", topics_to_learn: ["User Stories", "Acceptance Criteria", "Backlog Grooming"], estimated_timeframe: "1-2 months" },
                { phase_name: "Cross-Functional Collaboration", topics_to_learn: ["Working with Engineering", "Stakeholder Management", "Jira Mastery"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "Scrum Guide", type: "Documentation", url_or_search_term: "scrumguides.org" }
            ],
            projects: {
                minor_projects: [{ title: "Product Backlog Creation", description: "Write 20 detailed user stories with acceptance criteria for a new app idea." }],
                major_project: { title: "Mock Sprint Simulation", description: "Plan a two-week sprint, allocating story points, identifying risks, and generating burndown charts.", key_technologies: ["Jira", "Agile", "Product Owner"] }
            },
            risks_and_challenges: ["High responsibility with zero formal authority", "Meetings take up 80% of the day"],
            internship_strategy: "Demonstrate empathy for both users and the engineering team."
        },
        {
            status: "roadmap",
            overview: "Data-Driven PM and Strategy path focusing on product-market fit, metrics, and roadmapping.",
            roadmap_phases: [
                { phase_name: "Product Strategy", topics_to_learn: ["Product/Market Fit", "Competitive Analysis", "Value Proposition Canvas"], estimated_timeframe: "1-2 months" },
                { phase_name: "Data Analytics for PMs", topics_to_learn: ["A/B Testing", "SQL Basics", "KPIs (Churn, LTV, CAC)"], estimated_timeframe: "2 months" },
                { phase_name: "Roadmapping & Vision", topics_to_learn: ["PRDs (Product Requirement Docs)", "Go-to-Market Strategy", "Wireframing/Balsamiq"], estimated_timeframe: "1-2 months" }
            ],
            free_resources: [
                { name: "Lenny's Newsletter", type: "Newsletter", url_or_search_term: "lennysnewsletter.com" }
            ],
            projects: {
                minor_projects: [{ title: "Product Metrics Dashboard Draft", description: "Identify 5 key metrics for a music streaming app and explain how to track them." }],
                major_project: { title: "Comprehensive PRD", description: "Write a professional Product Requirements Document for a hypothetical AI feature integration.", key_technologies: ["Notion/Confluence", "Data Analysis", "Figma"] }
            },
            risks_and_challenges: ["Difficult to break into without prior technical or business experience", "Easy to fall into analysis paralysis"],
            internship_strategy: "Build a side project (even no-code) to prove you can take a product from 0 to 1."
        }
    ],
    // Specialized format for "Not Sure" explore mode
    "Not Sure": [
        {
            status: "explore",
            suggestions: [
                {
                    domain_name: "Web Development",
                    pitch: "Build the visual interfaces and backend logic for websites. Extremely accessible, massive job market, and you can see your results instantly.",
                    beginner_friendly: true
                },
                {
                    domain_name: "Data Analytics",
                    pitch: "Dive into Python and SQL to find hidden patterns in data. Perfect if you like problem-solving, statistics, and business strategy without writing complex application logic.",
                    beginner_friendly: true
                },
                {
                    domain_name: "Cybersecurity",
                    pitch: "Learn how to break into systems (ethically) or defend them. A highly dynamic, puzzle-solving career for those who enjoy outsmarting malicious actors.",
                    beginner_friendly: true
                }
            ]
        },
        {
            status: "explore",
            suggestions: [
                {
                    domain_name: "Mobile App Development",
                    pitch: "Create apps for iOS and Android. It's incredibly rewarding to build software that you and your friends can use daily on your personal devices.",
                    beginner_friendly: true
                },
                {
                    domain_name: "Cloud Computing",
                    pitch: "Design the infrastructure that powers modern tech companies using AWS or Azure. High demand, great pay, and crucial to almost every tech business.",
                    beginner_friendly: true
                },
                {
                    domain_name: "UI/UX Design",
                    pitch: "Blend creativity with psychology to design intuitive digital products. Ideal if you are visually oriented and care deeply about how users feel using software.",
                    beginner_friendly: true
                }
            ]
        }
    ]
};
