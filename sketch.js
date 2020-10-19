/*
 * @name Oscillator Frequency
 * @description <p>Control an Oscillator and view the waveform using FFT.
 * MouseX is mapped to frequency, mouseY is mapped to amplitude.</p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a> and a
 * sound file.</span></em></p>
 */
let osc
let fft;
let sliderFrequenz1;
let valFrequenz1;
let sliderAmplitude1;
let valAmplitude1;
let buttonEin1;
let eingeschaltet1 = 1;
let freq1;
let amp1;
let sliderFrequenz;
let valFrequenz2;
let sliderAmplitude2;
let valAmplitude2;
let buttonEin2;
let eingeschaltet2 = 1;
let freq2;
let amp2;
let x, y;


function setup() {
  createCanvas(800, 600);
  smooth();
  fft = new p5.FFT();
  
  osc1 = new p5.Oscillator();
  osc1.setType('sine');
  osc1.start();
  //osc.freq(240);
  //osc.amp(0.2);  
  
  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  osc2.start();
  
  
  
  buttonEin1 = createButton('Frequenz 1');
  buttonEin1.position(15, 20);
  buttonEin1.mousePressed(knopf1);
  
  sliderFrequenz1 = createSlider(80, 1000, 440, 0.2);
  sliderFrequenz1.position(140, 10);
  sliderFrequenz1.style('width', '200px');
  
  sliderAmplitude1 = createSlider(0.0, 1.0, 0.20, 0.01);
  sliderAmplitude1.position(140, 35);
  sliderAmplitude1.style('width', '200px');
  
  buttonEin2 = createButton('Frequenz 2');
  buttonEin2.position(15, 85);
  buttonEin2.mousePressed(knopf2);
  
  sliderFrequenz2 = createSlider(80, 1000, 444, 0.2);
  sliderFrequenz2.position(140, 75);
  sliderFrequenz2.style('width', '200px');
  
  sliderAmplitude2 = createSlider(0.0, 1.0, 0.20, 0.01);
  sliderAmplitude2.position(140, 100);
  sliderAmplitude2.style('width', '200px');
  
  
  
}

function draw() {
  frameRate(1);
  smooth();
  background(200);
  push();
  color(200,30,200);
  rect(5,5,width-10,60);
  rect(5,70,width-10,60);
  rect(5,190,width-10,120);
  rect(5,320,width-10,250);
  pop();
  
  valFrequenz1 = sliderFrequenz1.value();
  valAmplitude1 = sliderAmplitude1.value();
  freq1 = valFrequenz1;
  osc1.freq(freq1);
  amp1 = valAmplitude1;
  osc1.amp(amp1);
  
  valFrequenz2 = sliderFrequenz2.value();
  valAmplitude2 = sliderAmplitude2.value();
  freq2 = valFrequenz2;
  osc2.freq(freq2);
  amp2 = valAmplitude2;
  osc2.amp(amp2);
  
  
  
  let spectrum = fft.analyze();
  
  /*
  push();
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, 10 * width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
  pop();
  */

  let waveform = fft.waveform();
  
  push();
  noFill();
  beginShape();
  strokeWeight(1);
  stroke(0, 0, 255, 150); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++) {
    let x = map(i, 0, waveform.length, 5, width-5);
    let y = map( waveform[i], -1, 1, -40/(amp1+amp2), 40/(amp1+amp2));
    vertex(x,y + 250);
  }
  endShape();
  pop();
  
  push();
  noFill();
  beginShape();
  strokeWeight(1);
  var welle1 = [];
  for (let ii = 0; ii < width; ii++) {
    let xx = ii;
    xx = map(xx, 0, width, 5, width - 5);
    stroke(100, 150);
    y1 = amp1 * 30 * sin(0.0002 * freq1 * ii) + 500;
    append(welle1, y1);
    vertex(xx ,welle1[ii]);
    }
  endShape();
  pop();
  
  push();
  noFill();
  beginShape();
  strokeWeight(1);
  var welle2 = [];
  for (let iii = 0; iii < width; iii++) {
    let xxx = iii;
    xxx = map(xxx, 0, width, 5, width - 5);
    stroke(0, 200, 50, 150);
    y2 = amp2 * 30 * sin(0.0002 * freq2 * iii) + 500;
    append(welle2, y2);
    vertex(xxx,welle2[iii]);
    }
  endShape();
  pop();
  
  push();
  noFill();
  beginShape();
  strokeWeight(1);
  for (let iiii = 0; iiii < width; iiii++) {
    let xxxx = iiii;
    xxxx = map(xxxx, 0, width, 5, width - 5);
    stroke(255, 0, 255, 150);
    var summe = welle1[iiii] + welle2[iiii] - 600;
    vertex(map(iiii,0,width,5,width-5), summe);
    }
  endShape();
  pop();
  
  push();
  noStroke();
  strokeWeight(1);
  fill(100);
  color(0, 0, 255);
  text('Frequenz 1: ' + sliderFrequenz1.value() + ' Hz', 360, 25);
  text('Amplitude 1: ' + sliderAmplitude1.value() * 100 + ' %', 360, 50);
  text('Frequenz 2: ' + sliderFrequenz2.value() + ' Hz', 360, 90);
  text('Amplitude 2: ' + sliderAmplitude2.value() * 100 + ' %', 360, 115);
  text('Aufnahme des Tones', 15, 210);
  text('Summe der Frequenzen 1 und 2', 15, 340);
  text('Frequenzen 1 und 2', 15, 460);
  pop();
   
}

function knopf1() {
  if(eingeschaltet1 === 1) {
    eingeschaltet1 = 0;
    osc1.stop();
  } else {
    eingeschaltet1 = 1;
    osc1.start();
    
  }
}

function knopf2() {
  if(eingeschaltet2 === 1) {
    eingeschaltet2 = 0;
    osc2.stop();
  } else {
    eingeschaltet2 = 1;
    osc2.start();
    
  }
}
