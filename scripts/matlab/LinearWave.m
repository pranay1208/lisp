% ? This file is a playground/sandbox for working with matched filter and highpass filters 

tiledlayout(5, 3);

Fs = 44.1e3;

sLFM = phased.LinearFMWaveform('SampleRate',Fs,'SweepBandwidth',12e3,'PulseWidth',0.1,'PRF',10,...
'FrequencyOffset',10e3,'SweepDirection','Up');

% Convert to step function
PCM = step(sLFM);

% Visualise the chirp
% stft(PCM, Fs,'Window',kaiser(48,5),'OverlapLength',24,'FFTLength',128);

% Download using DSP
afw = dsp.AudioFileWriter...
   ('emit_100.wav', ...
   'SampleRate', Fs);
afw(PCM)
% release(afw);

% Make matched filter
coeff = getMatchedFilter(sLFM);
user = "testing";

PlotClean("testing", "L1T2X(1).m4a", "L1.1", coeff)
PlotClean("checking", "L1T4X5.m4a", "L1.2", coeff)
%PlotClean(user, "L1T2X(3).m4a", "L1.3", coeff)
%PlotClean(user, "L1T2X(4).m4a", "L1.4", coeff)
% PlotClean("pranay/L1A5.m4a", "5", coeff)



function AmpVsTime(data, sample_rate, graph_title)
    sample_period = 1/sample_rate;
    t = (0:sample_period:(length(data)-1)/sample_rate);
   
    xlabel('Time (seconds)')
    ylabel('Amplitude')
    xlim([0 t(end)])
    nexttile
    plot(t,data)
    title(graph_title)
end

function PlotClean(user, filename, graph_title, filterCoeff)
    [y, Fs] = audioread(user + "/" + filename);

    %remove all frequencies below 10 kHz
    sig_origin = highpass(y, 10000, Fs);

    sig_filtered = filter(filterCoeff, 1, sig_origin);

    AmpVsTime(y, Fs, "Noisy Audio " + graph_title);
    AmpVsTime(sig_origin, Fs, "Cutoff Audio " + graph_title);
    AmpVsTime(sig_filtered, Fs, "Cleaned Audio " + graph_title); 
end