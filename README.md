# Hadoop Architecture — Big Data Seminar Presentation

A comprehensive academic seminar presentation website on **Hadoop Architecture** with interactive 3D visualizations, live MapReduce simulation, and HDFS rack awareness modeling.

---

## 📁 Project Structure

```text
HADOOP/
├── index.html                   # Seminar Presentation Single-Page Application (Runs in any browser)
├── start_preview.bat            # 1-Click launcher to open in browser
├── style.css                    # 3D transforms, holographic glare, and layout styling
└── src/                         # Modular Component Source Code
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Main Application Component with Presentation Controller
    ├── index.css                # Academic serif typography & styling
    ├── utils/
    │   └── audio.js             # Web Audio API sound synthesizer
    └── components/
        ├── Navbar.jsx           # Responsive navigation & presentation triggers
        ├── PresentationBar.jsx  # Fullscreen seminar slide toolbar (Next/Prev/Exit)
        ├── Hero.jsx             # Headline, cluster metrics, 3D Canvas integration
        ├── ThreeCluster.jsx     # Gyroscopic 3D Big Data distributed node cluster
        ├── Introduction.jsx     # The 5 Vs of Big Data & RDBMS vs Hadoop comparison
        ├── HdfsArchitecture.jsx # NameNode, DataNode, Secondary NameNode architecture
        ├── RackSimulator.jsx    # Interactive HDFS rack awareness & auto-healing simulator
        ├── YarnArchitecture.jsx # YARN resource layer & core components
        ├── YarnStepper.jsx      # Interactive 7-step YARN job lifecycle stepper
        ├── MapReduce.jsx        # Map, Combiner, Partitioner, Shuffle & Reduce phases
        ├── WordCountSimulator.jsx # Interactive live Word Count MapReduce engine
        ├── CompleteArchitecture.jsx # Full stack & Hadoop 1.x vs 2.x vs 3.x comparison
        ├── ExplodedStack.jsx    # 3D isometric exploded layer architecture stack
        └── Conclusion.jsx       # Seminar takeaways, viva Q&A accordion & podium
```

---

## 🖥️ How to Run / Open

- Double-click [`start_preview.bat`](file:///c:/Users/pandeeswaran%20p/Desktop/HADOOP/start_preview.bat) or [`index.html`](file:///c:/Users/pandeeswaran%20p/Desktop/HADOOP/index.html).
- The presentation will launch immediately in your default web browser with all 3D animations and simulators active.
