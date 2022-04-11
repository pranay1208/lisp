![Matlab](https://www.mathworks.com/matlabcentral/images/matlab-file-exchange.svg)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Jupyter Notebook](https://img.shields.io/badge/jupyter-%23FA0F00.svg?style=for-the-badge&logo=jupyter&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

# LISP

Location Interactive SmartPhones (LISP for short) is a reserach prototype for hardware-free, accurate indoor positioning using ambient wave reflections.

This project was developed as a final year project at The University of Hong Kong to research the feasability of using ambient wave reflections to perform indoor positioning using common smartphones.

## Setting up the Project

1. Run `npm install` in each of the directories (except ./scripts) to initialize the appropriate node modules

2. In `./mobile` add a folder in the root directory called `ip.js` and add the following line of code to it:

```
export const IP_ADDRESS = "http://<YOUR IP ADDR HERE>:8080/";
```

3. In `./server` create a directory called `audio`. This is where all the recorded audio files will be saved. Furthemore, inside the audio folder, create 2 more sub-directories - `testing`, `check`. Here, he labelled audio data will be stored.

4. Edit the variables at the top of `./scripts/AudioFingerprint.m` to point to the correct directory for training data and testing data. Additionally, specify the file prefix that is meant to be "correct" (i.e. the location to match against)

## Running the Project

Using the project comprises of 3 steps.

1. Run the server using `npm run start` inside that directory. Keep this running and collect audio data from the mobile application (detailed in step 2)

2. Run the mobile application using `npm run start` inside that directory and record training data and checking data using the two buttons. Edit the label via the input to annotate the audio files with the correct location prefix.

3. Edit the `./scripts/AudioFigerprint.m` script's variables at the top to contain the appropriate paths and file prefix. Then run this script to train the SVM and get prediction results. This SVM can then be exported and used for future audio recordings

## Directories

### [Mobile](./mobile/)

##### Audio-collecting mobile application

This module contains a bare mobile application that allows users to perform location registration by collecting 50 audio samples and uploading them to a server.

The audio chirp is generated via the [this matlab script](./scripts/matlab/LinearWave.m) and is 1 second in length, registering a location takes a user less than 1 minute. This number can be easily increased to create a larger testing base for the audio classifier.

### [Mobile-UI](./mobile-ui/)

##### UI/UX for commercial LISP app

This module contains the UI for the envisioned commercial mobile application that LISP would be implemented over. It is developed in ReactTS for added type-safety and easy extensibility.

### [Server](./server/)

##### Audio-collecting server

This module contains a NodeTS server that listens to API calls from mobile applications. It stores and auto-labels audio data uploaded via mobile application.

### [Scripts](./scripts/)

##### Audio-anaylsis scripts

This module contains the various scripts that were used in the research process to implement various forms of audio processing and classification.

**[AudioFingerprint.m](./scripts/matlab/AudioFingerprint.m)** - This script is the final executable that can be used to train an SVM classifier and get classification predictions for testing data. An audio file is first stripped of frequencies below the range of 10,000Hz to remove background noise, then run through a matching filter. Finally, 1000 samples are picked after the largest peak, which corresponds to reflection from objects up to 3.07m away from the phone. This edited audio is used to train the linear, binary SVM classifer and get predictions for testing data.

**[LinearWave.m](./scripts/matlab/LinearWave.m)** - This script is a playground for performing audio processing, enchancing and visualization. The following script was used to test the effects of performing frequency filters and implementing an effective matching filter. The results were then plotted and analyzed.

**[RawAudioSVM.m](./scripts/matlab/RawAudioSVM.m)** - This script is a precursor to `AudioFingerprint.m` because it naively utilises the entirety of the enhanced sound signal in training the SVM classifier. Due to this approach, the SVM was overfitted to the testing data and could not generate a satisfactory output with regards to the testing data.

**[Signal_Testing.ipynb](./scripts/python/Signal_Testing.ipynb)** - This Jupyter notebook was a playground for implementing chirp generation, frequency filtering and matching filtration using Python libraries. This method was unsuccesfull because the Python libraries could not correctly handle multi-channel data and thus filtering data resulted in incorrect data.

## Acknowledgements

- This project was inspired by the research work conducted by Yu-Chih Tung and Kang G. Shin on the Echo Tag project.
- This team would like to express their deepest gratitude to ZHANG, Yi for his input and assistance regarding all matters about Matlab and its audio-processing tooling
- This project would not be possible without our supervisor Dr. Chenshu WU and his unparalleled support and guidance.
