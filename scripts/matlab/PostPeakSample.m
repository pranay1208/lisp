% This script trains the models with only n samples after largest peak and
% loops to edit n accordingly

SAMPLE_RATE = 44.1e3;
testingDir = "anuj/testing";
checkingDir = "anuj/check";
CORRECT_FILE_PREFIX = "L2";


sLFM = phased.LinearFMWaveform('SampleRate',SAMPLE_RATE,'SweepBandwidth',12e3,'PulseWidth',0.1,'PRF',10,...
'FrequencyOffset',10e3,'SweepDirection','Up');

coeff = getMatchedFilter(sLFM);

% reading all testing data
testFiles = dir(fullfile(testingDir, "*.m4a"));

TOTAL_TEST_FILES = length(testFiles);

% Preallocate test data lavels
testLabels = zeros(TOTAL_TEST_FILES, 1);

sampleValues = [1000, 200, 100, 300, 400, 2000];

for j = 1:length(sampleValues) 
    testData = [];
    numSamplesAfterPeak = sampleValues(j);

    % Constructing testing data and labels
    for i = 1:TOTAL_TEST_FILES
        baseFileName = testFiles(i).name;
        fullFileName = fullfile(testingDir, baseFileName);
        
        % Read audio
        filteredAudio = cleanAudio(fullFileName, coeff);
        dataForSvm = makeSvmValidData(filteredAudio, numSamplesAfterPeak);
    
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
    
    disp("Done training SVM. Running checks with data from " + checkingDir);
    
    checkingFiles = dir(fullfile(checkingDir, "*.m4a"));
    disp("Samples from peak: " + numSamplesAfterPeak)
    for i = 1: length(checkingFiles)
        baseFileName = checkingFiles(i).name;
        fileName = fullfile(checkingDir, baseFileName);
        
        if(startsWith(baseFileName, CORRECT_FILE_PREFIX))
            expectedText = "Expected to be a match";
        else
            expectedText = "Expected to not match";
        end
    
        predictLocation(fileName, coeff, svmModelLinear, expectedText, numSamplesAfterPeak);
    end
    disp("-----------------------------------")
end


function text = predictLocation(filename, filterCoeff, svmModel, expectedText, n)
    filteredAudio = cleanAudio(filename, filterCoeff);
    dataForSvm = makeSvmValidData(filteredAudio, n);
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

function svmValid = makeSvmValidData(data, numSamplesAfterPeak)
    transformedData = transpose(realComponent(data(:, 1)));
    [~, ind] = max(transformedData);
    svmValid = transformedData(ind: numSamplesAfterPeak + ind);

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