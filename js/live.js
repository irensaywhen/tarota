/*
* To check what is going on if server answers with not sucessful codes,
* change the endpoints to the following:
* In the setUpRecentMessages: https://f16a5972-239d-411d-853b-903065ba20d3.mock.pstmn.io/messages-error
* In the sendMessages: https://f16a5972-239d-411d-853b-903065ba20d3.mock.pstmn.io/send-error
* In the getNewMessages: https://f16a5972-239d-411d-853b-903065ba20d3.mock.pstmn.io/new-messages-error
* To see how new messages are fetching from the server, uncomment let timerId = setInterval(this.getNewMessages, this.throttle);
* line in the constructor - this line is commented to not to send too much requests to the server
* The first endpoint is set up to not to bloat the chat with fetched messages
******************************************************************************
* To change how often the request to the server is sent, change this.throttle in the constructor
* To change error message, change this.errorMessage in the constructor
*/ 

class Chat {
    constructor() {

        //Caching elements
        this.$liveChat = $('.live_chat_messages');
        this.$liveChatMessageForm = $('.live_chat_message-form');
        this.$liveChatMessageInput = $('.live_chat_message-input');
        this.$liveChatError = $('.live_chat_error');

        //Set up how othen the request about new messages will be send to the server in ms
        this.throttle = 300;
        //Set up error message
        this.errorMessage = 'Something went wrong';

        //Binding the context
        this.setUpRecentMessages = this.setUpRecentMessages.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getNewMessages = this.getNewMessages.bind(this);
        this.showMessages = this.showMessages.bind(this);
        this.showError = this.showError.bind(this);

        //Set up event listener
        this.$liveChatMessageForm.submit(this.sendMessage);

        //Set up periodical requests to the server
        //let timerId = setInterval(this.getNewMessages, this.throttle);

        this.setUpRecentMessages();
    }

    //Make initial request to the server to fetch the last messages
    setUpRecentMessages(){
        fetch('https://f16a5972-239d-411d-853b-903065ba20d3.mock.pstmn.io/messages')
            .then(response => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error(this.errorMessage);
                }
            })
            .then(messages => {
                this.showMessages(messages)
            })
            .catch(error => {
                this.showError(error.message);
            });
    }

    //Send message to the server when button is clicked or enter is pressed
    sendMessage(event){
        event.preventDefault();
        fetch('https://f16a5972-239d-411d-853b-903065ba20d3.mock.pstmn.io/send', {
            method: 'POST',
            body: this.$liveChatMessageInput.val()
        })
            .then(response => {
                if(!(response.ok)){
                    throw new Error(this.errorMessage);
                }
            })
            .catch(error => {
                this.showError(error.message);
            })
            .finally(() => {
                this.$liveChatMessageInput.val('');
            })
    }

    //Retrieve new messages from the server
    getNewMessages(){
        fetch('https://f16a5972-239d-411d-853b-903065ba20d3.mock.pstmn.io/new-messages')
            .then(response => {
                if(response.ok){
                    return response.json()
                } else {
                    throw new Error(this.errorMessage);
                }
            })
            .then(messages => this.showMessages(messages))
            .catch(error => {
                this.showError(error.message);
            });
    }

    //Show retrieved messages in the chat box
    showMessages(messages){

        for (let message of messages){
            
            let nickname = $('<span></span>')
                .addClass('live_chat_message_user-nickname')
                .text(message.nickname);

            if (message['is_moderator']){
                
                nickname.append(' - moderator');
            }
            let messageText = $('<span></span>')
                .addClass('live_chat_message_text')
                .text(': ' + message.message);

            let div = $('<div></div>')
                .addClass('live_chat_message')
                .append(nickname)
                .append(messageText);

            this.$liveChat.append(div);
        }
    }

    //Show occured errors
    showError(errorMessage){
        this.$liveChatError.text(errorMessage);
    }
}

//Initialize chat
let chat = new Chat();
