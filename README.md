# 🔥 AgniShakti: Fire & Smoke Detection System  

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Object%20Detection-red.svg)
![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-green.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> **Real-time intelligent fire and smoke detection system using YOLOv8, OpenCV, and Python.**

---

## 🚀 Overview  

**AgniShakti** is an AI-driven real-time **Fire & Smoke Detection System** built using **YOLOv8**.  
It detects potential fire or smoke hazards in video streams or live webcam feeds and alerts users visually.  
This project is designed to enhance **disaster management** and **safety automation** using advanced computer vision techniques.

The system dynamically balances **accuracy** and **speed** with its adaptive inference engine, ensuring consistent frame rates across devices.

---

## 🧠 Features  

- ⚙️ **YOLOv8-powered Detection** — High accuracy in detecting fire and smoke.  
- 🎥 **Dual Testing Modes** — Supports *video file input* and *live webcam feed*.  
- ⚡ **Adaptive Frame Control** — Adjusts frame skip and resolution to maintain FPS.  
- 💾 **Automatic Logging** — Saves inference data per frame and summary CSV reports.  
- 🧩 **Model Evaluation Mode** — Compare performance of multiple YOLO models.  
- 🖥️ **Real-time Visualization** — Bounding boxes with labels and confidence scores.  

---

## 🏗️ Project Structure  

AgniShakti/
├── fire_detect.py # Main script with detection logic
├── best.pt # YOLOv8 trained model
├── logs/ # Inference result logs (auto-generated)
├── requirements.txt # Project dependencies
└── README.md # Project documentation


---

## 🧰 Technologies Used  

| Component | Technology |
|------------|-------------|
| **Programming Language** | Python 3 |
| **Libraries & Frameworks** | Ultralytics YOLOv8, OpenCV, PyTorch, NumPy, Pandas |
| **Model Type** | Object Detection (Fire & Smoke) |
| **Visualization** | OpenCV with bounding boxes and labels |
| **Performance Optimization** | Adaptive inference scaling |

---

## ⚙️ Setup & Installation  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/laksh0777/AgniShakti-Fire-and-Smoke-Detection.git
cd AgniShakti-Fire-and-Smoke-Detection

