/**
 * Initialization of the timer. 
 * This class handles setting up, starting, ending timer, and adding extra time.
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 */
class Timer {

    timerIntervalId = null;
    countDownTime = null;

    errorMessage = 'Something went wrong';

    //Whether timer is animated or red
    isAnimated = false;
    isRed = false;

    //Initially passed time
    hours = null;
    minutes = null;
    seconds = null;

    constructor(hours=0, minutes=15, seconds=0){

        //Cache
        this.$timer = $('#video-chat-timer');

        //Bind the context
        this.setUpTimer = this.setUpTimer.bind(this);
        this.setUpTime = this.setUpTime.bind(this);
        this.completeTimer = this.completeTimer.bind(this);
        this.showTime = this.showTime.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.addTime = this.addTime.bind(this);
        this.updateTimer = this.updateTimer.bind(this);

        //Save passed time

        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;

        //Initialize the timer
        this.showTime(hours, minutes, seconds);
    }

    /**
     * Setup timer
     * Set the final time when the timer expires
     * Display the remaining time
     * @param {number} minutes 
     * @param {number} seconds 
     * @param {number} hours
     */
    setUpTimer(hours, minutes, seconds){

        //Set up the final timestamp
        this.countDownTime = this.setUpTime(hours, minutes, seconds);

        //Calculate remaining time and show it
        this.updateTimer();
    
    }

    /**
     * Set up interval to start counting the time
     */
    startTimer(){

        this.setUpTimer(this.hours, this.minutes, this.seconds);
        this.timerIntervalId = setInterval(this.updateTimer, 1000);
    }

    /**
     * Calculate distance between the final time and the current time
     * Show the remaining time
     * If there is no time left, call the function to handle ending of the timer
     */
    updateTimer(){
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = this.countDownTime - now + 2;

        // Time calculations for days, hours, minutes and seconds
        let overallHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let overallMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let overallSeconds = Math.floor((distance % (1000 * 60)) / 1000);

        //Check whether animation need to be added

        if (!(this.isAnimated)){
            
            if (((overallMinutes === 5) && (overallSeconds === 0))||(overallMinutes < 5)){

                this.isAnimated = true;
                this.$timer.addClass('heartbeat-animation');
            }
        }

        //Check whether timer should be red

        if(!(this.isRed)){

            if (((overallMinutes === 3) && (overallSeconds === 0))||(overallMinutes < 3)){

                this.isRed = true;
                this.$timer.css({
                    color           : 'rgb(255, 58, 58)',
                    'font-weight'   : 'bold'
                });
            }
        }

        // Display the result in the element with id="demo"
        this.showTime(overallHours, overallMinutes, overallSeconds);

        // If the count down is finished, do actions required in the end
        if (distance <= 0) {
          this.completeTimer();
        }
    }

    /**
     * Function updates the minutes of the timer expiration time
     * @param {number} minutes 
     */
    addTime(minutes=0, seconds=0){

        this.countDownTime.setMinutes(this.countDownTime.getMinutes() + minutes);
        this.countDownTime.setSeconds(this.countDownTime.getSeconds() + seconds);
        this.updateTimer();
    }

    /**
     * Add passed hours, minutes and seconds to the current time.
     * Calculate the remaining time
     * Return timestamp
     * @param {number} hours 
     * @param {number} minutes 
     * @param {number} seconds 
     */
    setUpTime(hours, minutes, seconds){

        let countDownTime = new Date();

        let overallHours = countDownTime.getHours() + hours;
        let overallMinutes = countDownTime.getMinutes() + minutes;
        let overallSeconds = countDownTime.getSeconds() + seconds;

        return new Date(countDownTime.setHours(overallHours, overallMinutes, overallSeconds));
    }

    /**
     * Time formatter function to convert x into 0x, where x is time
     * Returns string
     * @param {number} time 
     */
    formatTime(time){

        if (time < 10){

            time = '0' + String(time);
        }

        return time;
    }

    /**
     * Display the remaining time in the designanted place in the document
     * @param {number} hours 
     * @param {number} minutes 
     * @param {number} seconds 
     */
    showTime(hours, minutes, seconds){

        //Add zero before minutes if it is between 0 and 9 included
        minutes = this.formatTime(minutes);
        seconds = this.formatTime(seconds);
        
        let timeString = hours + ':' + minutes + ':' + seconds;

        this.$timer.text(timeString);
    }

    /**
     * This function is called when the timer is expired.
     * It redirects user to the chat_ended page and returns a callback;
     */
    completeTimer(){

        clearInterval(this.timerIntervalId);

        this.timerIntervalId = null;

        //Redirect the user
        window.location.replace('./chat_ended.html');

        //Return a callback
        return console.log('video chat has ended')
    }

}

/**
 * This form sends request to the server when a user attemps to add time
 * If user have enough money, it adds time
 * If not, it redirect user to the paying page in new window
 */
class Form {

    selectedTime = null;

    /**
     * Timer object to add time when user has enough money. 
     * @param {object} timer 
     */
    constructor(timer){

        //setup timer related to form
        this.timer = timer;

        //Cache
        this.$payForm = $('#video-chat_pay-form');
        this.$getTimeForm = $('#get-time-form');
        this.$selectTime = $('#video-chat_timer-form_select');

        //Bind context
        this.sendRequest = this.sendRequest.bind(this);
        this.collectFormData = this.collectFormData.bind(this);
        this.addTime = this.addTime.bind(this);
        this.pay = this.pay.bind(this);


        //Add event listeners

        this.$getTimeForm.submit((event) => {

            event.preventDefault();
            
            this.collectFormData();

            this.sendRequest();
        });
    }

    /**
     * Get the time value the user selected.
     * Store the selected time in the class
     */
    collectFormData(){
        this.selectedTime = this.$selectTime.val()
    }

    /**
     * Send request to the server about the time selected by user. 
     * If user has enough money, call addTime function to add time to the timer
     * If user hasn't enough money, redirect to pay.
     * For testing purposes there are two endpoints: 
     * https://639850b6-4d65-4e96-963c-e7712d32470f.mock.pstmn.io/get-more - returns success in status
     * https://639850b6-4d65-4e96-963c-e7712d32470f.mock.pstmn.io/get-more-pay - returns fail in status
     * In the first case timer updates
     * In the second case the new window with payment opens
     */
    sendRequest(){
        
        let json = {};
        //Collect data in json from the form
        json.time = this.selectedTime;

        fetch('https://639850b6-4d65-4e96-963c-e7712d32470f.mock.pstmn.io/get-more', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(json)
          })
          .then(response => {

            if (response.ok){
                return response.json();

            } else {
                throw new Error(this.errorMessage);
            }
          })
          .then(instructions => {
            if (instructions.status === "success"){

                //Add time to the timer
                this.addTime(Number(instructions.minutes));

            } else {
                //Redirect to pay
                this.pay();
            }
          })
          .catch(error => console.log(error));
    }

    /**
     * Call the timer method to update time
     * @param {number} minutes 
     */
    addTime(minutes){

        if (!(this.timer.timerIntervalId)){

            this.timer.addTime(minutes, 2.8);
        } else {
            this.timer.addTime(minutes);
        }
    }

    /**
     * Submit hidden form if user doesn't have enough money
     */
    pay(){
        this.$payForm.submit();
    }
}

let timer = new Timer(0, 15, 0);
let form = new Form(timer);