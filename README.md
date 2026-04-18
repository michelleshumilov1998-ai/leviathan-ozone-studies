# 🌍 Ozone Research Analytics: $O_3$ Impact Study

**An interactive environmental data science dashboard analyzing tropospheric ozone ($O_3$) transport and the atmospheric impact of the Leviathan gas rig.**

---

## 🔗 Live Demo
[🚀 Launch the Interactive Dashboard](https://leviathan-ozone-studies.lovable.app)

---

## 📖 Project Background

The Leviathan gas platform, located offshore Israel, is a major industrial source. This project investigates whether its operations correlate with increased $O_3$ levels at coastal receptor sites. 

Given that Ozone is a secondary pollutant with complex non-linear formation, this study employs advanced meteorological filtering and machine learning to isolate the rig's specific contribution.

---

## 🔬 Research Highlights & Methodology

*   **Spatial-Temporal Filtering:** Isolation of stable westerly wind regimes ($240^\circ$–$300^\circ$) to identify direct transport pathways.
*   **Data Integrity:** Processing of a 6-year hourly dataset from the Sharon-Carmel Municipal Environmental Association using **KNN-Imputation**.
*   **Model Benchmarking:** Comparative evaluation of Linear Regression, Random Forest, Neural Networks, and **XGBoost**.
*   **Key Finding:** The XGBoost model identified a **+12.6% attributable impact** during rig operational periods.

---

## 📊 Dashboard Features

*   **Sector Analysis:** Interactive visualization of $O_3$ concentration shifts across 5 coastal monitoring stations.
*   **Performance Metrics:** Real-time comparison of $R^2$ and RMSE across all trained model architectures.
*   **Feature Attribution:** Visualizing variables like Solar Radiation and Temperature using **Feature Importance analysis**.
*   **Confidence Intervals:** Forecast vs. Actual plots featuring 95% confidence bands.

---

## 🛠️ Tech Stack

*   **Frontend:** React, Tailwind CSS, Recharts
*   **Data Science:** Python (XGBoost, Scikit-learn, Pandas)
*   **Infrastructure:** GitHub Actions & Lovable

---

## 👩‍💻 Developed By

**Michelle Shumilov**  
*Computer Science Student @ Ruppin Academic Center*  
**Excellence Scholarship Recipient | GPA: 94**

> **Note:** This research and the accompanying analytical platform were finalized alongside active combat reserve service, demonstrating high-level analytical management and academic resilience under pressure.
