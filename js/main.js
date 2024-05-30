

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";


   var mydate = new Date();
  var year = mydate.getYear();
  if (year < 1000){
    year +=1900
  }
  
  var day = mydate.getDay();
  var month = mydate.getMonth();
  var daym = mydate.getDate();
  var dayarray = new Array("Sunday","Monday","Tuesday","Wedsday","Thusday","Friday","Saturday");
  var montharray = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

    
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m 
    document.getElementById("hour").innerText = h;
    document.getElementById("colon").innerText = ":";
     document.getElementById("minute").innerText = m;

     var myYear = document.getElementById("date-main");
      myYear.textContent = "" +dayarray[day]+ ", " +daym+ " " +montharray[month];
      myYear.innerText = "" +dayarray[day]+ ", " +daym+ " " +montharray[month];
    
    setTimeout(showTime, 1000);
    
}

showTime();



const textview = document.querySelector('.text-view');
const ErroMsg = document.querySelector('.password_error_msg');

    function insert(num){
            textview.value = textview.value + num;
        }

           function back(){
            var exp = textview.value;
            textview.value = exp.substring(0,exp.length-1);
        }

        function validatePasword(){
        	if(textview.value == null || textview.value == ""){
        		ErroMsg.innerText = "enter password"
        		return false
        	}

        	if(textview.value == null || textview.value == "555"){
        		ErroMsg.innerText = "Welcome !!"
        		document.querySelector('.buttom_icons').classList.add('show_buttom_icons')
        		document.querySelector('.password_sec').classList.remove('show_const')
        		document.querySelector('.home_sec').classList.add('show_const')
                document.querySelector('.main_screen').classList.add('add_filter')

        		pTune.play();
        		return false
        	}

        	if(textview.value == null || textview.value !== "555"){
        		ErroMsg.innerText = "password is wrong"
        		textview.value = ""
        		return false
        	}
        }



    function unloackShowPass(){
        	document.querySelector('.date_time_sec').classList.add('hide_const');
        	document.querySelector('.password_sec').classList.add('show_const')

        }

        function powerPhone(){
             document.querySelector('.booting_screen').classList.add('show_const');

        setTimeout(function(){
         document.querySelector('.booting_screen').classList.add('show_booting_screen');
         document.querySelector('.main_screen').classList.add('show_main_screen');
        },3000);
        }




























        const audio = document.querySelector('#audio');
        const pTune = document.querySelector('#tune');
const playPauseBtn = document.querySelector('#play-pause');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#previous');
const songList = document.querySelector('.song-list');
const title = document.querySelector('#title');
const record = document.querySelector('.record');
const volSlider = document.querySelector('.slider');

const volUp = document.querySelector('.volume-up');

const volDown = document.querySelector('.volume-down');

const progress = document.querySelector('.progress');

const progressContainer = document.querySelector('.progress-container');



let songArray = [];
let songHeading = '';
let songIndex = 0;
let isPlaying = false;

function loadAudio(){
	audio.src = songArray[songIndex];

	let songListItems = songList.getElementsByTagName('li');

	songHeading = songListItems[songIndex].getAttribute('data-name');

	title.innerText = songHeading;


	//Highlight

	for(i=0; i<songListItems.length;i++){
		songListItems[i].classList.remove('active');
	}

	songList.getElementsByTagName('li')[songIndex].classList.add('active');
}

function loadSongs(){
	let songs = songList.getElementsByTagName('li');

	for(i=0;i<songs.length;i++){
		songArray.push(songs[i].getAttribute('data-src'));
	};

	loadAudio();


}

loadSongs();

function playAudio(){
	audio.play();

	playPauseBtn.querySelector('i.fa').classList.remove('fa-play');
	playPauseBtn.querySelector('i.fa').classList.add('fa-pause');

	isPlaying = true;
	record.classList.add('record-animation');

}

function pauseAudio(){
	audio.pause();

	playPauseBtn.querySelector('i.fa').classList.add('fa-play');
	playPauseBtn.querySelector('i.fa').classList.remove('fa-pause');

	isPlaying = false;
	record.classList.remove('record-animation');
}


function nextSong(){
	songIndex++;
	if(songIndex > songArray.length - 1){
		songIndex = 0;
	};
	loadAudio();
	playAudio();
}

function previousSong(){
	songIndex--;
	if(songIndex < 0){
		songIndex = songArray.length - 1;
	};

	loadAudio();
	playAudio();
}


function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}


function LoadDuration (){
      let finalTimeData = document.querySelector(".final");
     let currentTimeData = document.querySelector(".current");

    if(audio.duration){

    //Update finalDuration
    let AudioDuration = audio.duration;
    let finalMinutes = Math.floor(AudioDuration / 60);
    let finalSeconds = Math.floor(AudioDuration % 60);
    if(finalSeconds < 10){
      finalSeconds = "0"+finalSeconds;
    }
    finalTimeData.innerText = finalMinutes+":"+finalSeconds;


  //Update Current Duration
  let CurrentTime = audio.currentTime;
  let currentMinutes = Math.floor(CurrentTime / 60);
  let currentSeconds = Math.floor(CurrentTime % 60);
  if(currentSeconds < 10){
    currentSeconds = "0"+currentSeconds;
  }
  currentTimeData.innerText = currentMinutes+":"+currentSeconds;
}else{
    finalTimeData.innerText = "00"+":"+"00";
    currentTimeData.innerText = "00"+":"+"00";
}

}




playPauseBtn.addEventListener('click', function(){
	if(isPlaying){
		pauseAudio();
	}else{
		playAudio();
	}
}, false);


nextBtn.addEventListener('click', function(){
	nextSong();
},false);



prevBtn.addEventListener('click', function(){
	previousSong();
},false);



songList.addEventListener('click', function(e){
	songIndex = e.target.closest('li').getAttribute('data-index');

	loadAudio();
	playAudio();
},false);



audio.addEventListener('ended', function(){
	nextSong();
});

volSlider.addEventListener('input', function(){
	audio.volume = volSlider.value / 100;
},false);


volUp.addEventListener('click', function(){
	volSlider.setAttribute('value', volSlider.value + 20);
	audio.volume = volSlider.value / 100;

	document.querySelector('.slidecontainer').classList.add('slideDown_slidecontainer');

	  setTimeout(function(){
		document.querySelector('.slidecontainer').classList.remove('slideDown_slidecontainer');
		},1000);


},false);

volDown.addEventListener('click', function(){
	volSlider.setAttribute('value', volSlider.value - 20);
	audio.volume = volSlider.value / 100;

	document.querySelector('.slidecontainer').classList.add('slideDown_slidecontainer');

	setTimeout(function(){
		document.querySelector('.slidecontainer').classList.remove('slideDown_slidecontainer');
		},1000);


},false);

audio.addEventListener('timeupdate', updateProgress)


progressContainer.addEventListener('click', setProgress)

audio.addEventListener('timeupdate', LoadDuration)



























const btn = document.querySelector('.talk');

const content = document.querySelector('.content');


//
const greetings = [
'hi. my name is alexander. Im am a robot that is developed by Prince Godson using HTML. CSS. and Javascript. Do you want me to power on myself?'
];

const yesPower = [
    'Ok. am doing that already'
];

const rotate = [
    'am rotating'
];

const stayF = [
    'Ok. am on it'
];

const havefun = [
    'Alright. Have fun boss'
];

const pass = [
    'what is my password?'
];

const cpass = [
    'correct. welcome'
];

const lpass = [
    'ok boss'
];
const poff = [
    'alright.  have a nice day. Bye'
];


const chargePh = [
    'Ok. Im charging now'
];

const stpchargePh = [
    'Ok.'
];






const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;


const recognition =  new SpeechRecognition();

recognition.onstart = function(){
    console.log('voice is activated')
}

recognition.onresult = function(event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;

    content.textContent = transcript;

    readOutLoud(transcript);
}


//add the listener to the btn


btn.addEventListener('click', () => {
    var speech = true
    if (speech == true) {
        recognition.start();
        recognition.addEventListener('end', recognition.start);

        document.querySelector('.phone').classList.add('talking_shadow')
    }
})





function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();

    // speech.text = 'I dont know what you said';

    if(message.includes('hello')){
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];

        speech.text = finalText;
    }



  

    if(message.includes('yes you can')){
        const finalText = yesPower[Math.floor(Math.random() * yesPower.length)];

        speech.text = finalText;

           document.querySelector('.booting_screen').classList.add('show_const');

        setTimeout(function(){
         document.querySelector('.booting_screen').classList.add('show_booting_screen');
         document.querySelector('.main_screen').classList.add('show_main_screen');
        },3000);
    }

     if(message.includes('power on')){
        const finalText = yesPower[Math.floor(Math.random() * yesPower.length)];

        speech.text = finalText;

        document.querySelector('.booting_screen').classList.add('show_const');

        setTimeout(function(){
         document.querySelector('.booting_screen').classList.add('show_booting_screen');
         document.querySelector('.main_screen').classList.add('show_main_screen');
        },3000);
    }

     if(message.includes('rotate')){
        const finalText = rotate[Math.floor(Math.random() * rotate.length)];

        speech.text = finalText;

        setTimeout(function(){
		document.getElementById('phone').classList.add('query_phone');
		},1000);
    }

   if(message.includes('stay on the floor')){
        const finalText = stayF[Math.floor(Math.random() * stayF.length)];

        speech.text = finalText;

        setTimeout(function(){
		document.getElementById('phone').classList.remove('query_phone');
		},1000);
    }

       if(message.includes('play music')){
        const finalText = havefun[Math.floor(Math.random() * havefun.length)];

        speech.text = finalText;

        setTimeout(function(){
		playAudio();
		},1000);
    }

    if(message.includes('pause music')){
    	pauseAudio();
    }
    if(message.includes('next')){
    	nextSong();
    }
    if(message.includes('previous')){
    	previousSong();
    }


        if(message.includes('password')){
        const finalText = pass[Math.floor(Math.random() * pass.length)];

        speech.text = finalText;
    }

       if(message.includes('my password')){
        const finalText = cpass[Math.floor(Math.random() * cpass.length)];

        speech.text = finalText;

       setTimeout(function(){
        	document.querySelector('.buttom_icons').classList.add('show_buttom_icons')
        		document.querySelector('.password_sec').classList.remove('show_const')
        		document.querySelector('.home_sec').classList.add('show_const')
                document.querySelector('.main_screen').classList.add('add_filter')
                document.querySelector('.date_time_sec').classList.add('hide_const')
        		pTune.play();
       },1500);
    }

           if(message.includes('lock phone')){
        const finalText = lpass[Math.floor(Math.random() * lpass.length)];

        speech.text = finalText;

       setTimeout(function(){
        	document.querySelector('.buttom_icons').classList.remove('show_buttom_icons')
        		document.querySelector('.home_sec').classList.remove('show_const')
                document.querySelector('.main_screen').classList.remove('add_filter')
                document.querySelector('.date_time_sec').classList.remove('hide_const')
       },1000);
    }


    if(message.includes('change screensaver')){
        document.querySelector('.main_screen').classList.add('wallpaper1')
    }

    if(message.includes('power off')){
        const finalText = poff[Math.floor(Math.random() * poff.length)];

        speech.text = finalText;

        setTimeout(function(){
         document.querySelector('.booting_screen').classList.remove('show_booting_screen');
         document.querySelector('.main_screen').classList.remove('show_main_screen');
         document.querySelector('.powerOff_screen').classList.add('show_const');
        },1000);

         setTimeout(function(){
         document.querySelector('.powerOff_screen').classList.remove('show_const');
         document.querySelector('.booting_screen').classList.remove('show_const');
        },3000);
    }


        if(message.includes('charge')){
        const finalText = chargePh[Math.floor(Math.random() * chargePh.length)];

        speech.text = finalText;

        setTimeout(function(){
         document.querySelector('.charging-screen').classList.add('show_const');
        },1000);
    }
        if(message.includes('stop charging')){
        const finalText = stpchargePh[Math.floor(Math.random() * stpchargePh.length)];

        speech.text = finalText;

        setTimeout(function(){
         document.querySelector('.charging-screen').classList.remove('show_const');
        },100);
    }


      if(message.includes('dark mode')){
        setTimeout(function(){
         document.querySelector('body').classList.add('darkmode');
        },1000);
    }

     if(message.includes('light mode')){
        setTimeout(function(){
         document.querySelector('body').classList.remove('darkmode');
        },1000);
    }


    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    // speech.lang = "nl-NL";

    // speech.voiceURI = 'Google Nederlands';

    

    window.speechSynthesis.speak(speech);
}
