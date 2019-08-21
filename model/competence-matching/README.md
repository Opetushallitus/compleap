# Matching study units to ESCO competences

This folder contains a script for matching qualifications to the ESCO competences. The code assumes the preprocessing has been performed beforehand, and that the data is available in the `../data`-directory.
Additionally the code requires a [fastText](https://fasttext.cc/)-model for comparing the units to competencies. Our model is not included in the repository (because of size-limits) and one needs to use or train their own.

Our best results were achieved using model trained on ePerusteet, ESCOs and Wikipedia.

### Running the script

Python is required for running the script.

Install dependencies for the script by running:

```
pip install -r requirements.txt
```

Run the scipt:

```
python units_to_competences.py PATH-TO-FASTTEXT-MODEL.bin
```
