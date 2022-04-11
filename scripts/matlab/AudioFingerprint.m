% ? This script trains the models with only 1000 samples after largest peak

SAMPLE_RATE = 44.1e3;
TRAINING_DIR = "pranay/testing";
CHECKING_DIR = "pranay/check";
CORRECT_FILE_PREFIX = "L1";


sLFM = phased.LinearFMWaveform('SampleRate',SAMPLE_RATE,'SweepBandwidth',12e3,'PulseWidth',0.1,'PRF',10,...
'FrequencyOffset',10e3,'SweepDirection','Up');

coeff = getMatchedFilter(sLFM);

% reading all testing data
trainingFiles = dir(fullfile(TRAINING_DIR, "*.m4a"));
TOTAL_TRAINING_FILES = length(TRAINING_DIR)

% Preallocate test data lavels
testLabels = zeros(TOTAL_TRAINING_FILES, 1);
testData = [];

% Constructing testing data and labels
for i = 1:TOTAL_TRAINING_FILES
    baseFileName = trainingFiles(i).name;
    fullFileName = fullfile(TRAINING_DIR, baseFileName);
    
    % Read audio
    filteredAudio = cleanAudio(fullFileName, coeff);
    dataForSvm = makeSvmValidData(filteredAudio);

    testData = [testData; dataForSvm];

    % Assign Label
    if startsWith(baseFileName, CORRECT_FILE_PREFIX)
        testLabels(i) = 1;
    else
        testLabels(i) = 0;
    end

end

% Training the SVM
svmModelLinear = fitcsvm(testData, testLabels, "KernelFunction","linear",...
    "Standardize", true, 'ClassNames', [0, 1]);

disp("Done training SVM. Running checks with data from " + CHECKING_DIR);

checkingFiles = dir(fullfile(CHECKING_DIR, "*.m4a"));
for i = 1: length(checkingFiles)
    baseFileName = checkingFiles(i).name;
    fileName = fullfile(CHECKING_DIR, baseFileName);
    
    if(startsWith(baseFileName, CORRECT_FILE_PREFIX))
        expectedText = "Expected to be a match";
    else
        expectedText = "Expected to not match";
    end

    predictLocation(fileName, coeff, svmModelLinear, expectedText);
end


function text = predictLocation(filename, filterCoeff, svmModel, expectedText)
    filteredAudio = cleanAudio(filename, filterCoeff);
    dataForSvm = makeSvmValidData(filteredAudio);
    [label, score] = predict(svmModel, dataForSvm);
    if label == 1
        text = "Match";
        sc = score(2);
    else
        text = "No match";
        sc = score(1);
    end
    disp(filename + ": " + text + " with score of " + sc + ". " + expectedText);
end

function svmValid = makeSvmValidData(data)
    transformedData = transpose(realComponent(data(:, 1)));
    [~, ind] = max(transformedData);
    svmValid = transformedData(ind: 1000 + ind);

end

function sig_filtered = cleanAudio(filename, filterCoeff)
    [y, Fs] = audioread(filename);

    %remove all frequencies below 10 kHz
    sig_origin = highpass(y, 10000, Fs);

    sig_filtered = filter(filterCoeff, 1, sig_origin);
end

function real_component = realComponent(arr)
    real_component = zeros(length(arr), 1);
    for i=1:length(arr)
        real_component(i) = real(arr(i));
    end
end