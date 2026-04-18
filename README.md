🌍 Ozone Research Analytics: O3 Impact Study
An interactive environmental data science dashboard analyzing tropospheric ozone (O₃) transport and the impact of the Leviathan gas rig.

🔗 Live Demo
View the Interactive Dashboard

## 📖 Project Background
The Leviathan gas platform, located offshore Israel, is a major industrial source. This project investigates whether its operations correlate with increased Ozone levels at coastal receptor sites. Ozone (O₃) is a secondary pollutant, making attribution challenging; this study uses meteorological filtering and machine learning to isolate the rig's specific contribution.

🔬 Research Highlights
Core Focus: Quantified O₃ transport under stable westerly wind regimes (240°–300°).

Data Pipeline: 6-year hourly dataset from the Sharon-Carmel Municipal Environmental Association, processed with KNN-Imputation.

Machine Learning: Comparative benchmarking of Linear Regression, Random Forest, Neural Networks, and XGBoost.

Key Insight: The XGBoost champion model identified a +12.6% attributable impact on coastal O₃ concentrations during rig operational periods.

## 📊 Dashboard Features

Spatial Sector Analysis: Explore how O₃ concentrations shift across 5 different monitoring stations based on wind direction.

Model Benchmarking: Interactive comparison of R² and RMSE metrics across 4 different architectures.

Feature Importance: A look into the "Black Box"—visualizing which variables (Solar Radiation, Temperature, Rig Status) most influence the model's predictions.

Forecast vs. Actual: Real-time visualization of model performance with 95% confidence bands.

🛠️ Tech Stack
Frontend: React, Tailwind CSS, Recharts (via Lovable)

Data Science: Python (XGBoost, Scikit-learn, Pandas)

Interpretability: Feature Importance Analysis

👩‍💻 Developed By
Michelle Shumilov CS Student @ Ruppin Academic Center | Excellence Scholarship | GPA 94

Research conducted alongside active combat reserve service, demonstrating resilience and rigorous analytical management.
