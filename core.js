var power = true;
var rdNum = undefined; //random number for getting random quote
var quotePool = [ //hard code
    {content: "Creativity is Intelligence having Fun.", author: "Albert Einstein", colorCode: "#FFA07A"},
    {content: "You may delay, but Time will not.", author: "Benjamin Franklin", colorCode: "#ff0040"},
    {content: "When the Power of Love overcomes the Love of Power, the World will know Peace.", 
        author: "Jimi Hendirx", colorCode: "#bf00ff"},
    {content: "Music is the strongest form of Magic", author: "Marilyn Manson", colorCode: "#0080ff"},
    {content: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", colorCode: "#ffbf00"},
    {content: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky", colorCode: "#00ff00"},
    {content: "An unexamined life is not worth living.", author: "Socrates", colorCode: "#cc3333"},
    {content: "Winning isn’t everything, but wanting to win is.", author: "Vince Lombardi", color: "#a185ff"},
    {content: "Every child is an artist.  The problem is how to remain an artist once he grows up.",
        author: "Pablo Picasso", colorCode: "#2844ff"},
    {content: "Either you run the day, or the day runs you.", author: "Jim Rohn", colorCode: "#1a0000"},
    {content: "The best revenge is massive success.", author: "Frank Sinatra", colorCode: "#005360"},
    {content: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt", colorCode: "#00ff99"},
    {content: "When I let go of what I am, I become what I might be.", author: "Lao Tzu", colorCode: "#cccc00"},
    {content: "If you're offered a seat on a rocket ship, don't ask what seat! Just get on.", 
        author: "Sheryl Sandberg", colorCode: "#ffa31a"},
    {content: "Build your own dreams, or someone else will hire you to build theirs.", author: "Farrah Gray", colorCode: "#928d87"},
    {content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", colorCode: "#ff4f1a"},
    {content: "The only way to do great work is to love what you do.", author: "Steve Jobs", colorCode: "#e6e6e6"},
    {content: "It’s not the years in your life that count. It’s the life in your years.", author: "Abraham Lincoln", colorCode: "#333300"}
];

//Turn power on/off
function powerButton(){
    var powerBtn = document.getElementById("btn-power");
    var getQuoteBtn = document.getElementById("btn-getQuote");
    var quoteDispl = document.getElementById("quoteDisplay");
    var authDispl = document.getElementById("quoteAuthor");
    var socialBtn = document.getElementById("social-btn");
    var getQuoteBtn_powerOn = $("#btn-getQuote").attr("style", "opacity");
    var led1_powerOn = $("#led1").attr("style", "animation"); //cache led1's original lighting animation
    var led2_powerOn = $("#led2").attr("style", "animation"); //cache led2's original lighting animation
    var led3_powerOn = $("#led3").attr("style", "background-color"); //cache led3's original lighting
    var offTime = 1200; //set power-off time = 1.2 second
    var onTime = 1800; //set power-on time = 1.8 second
    if(power) power = false; //if power is currently on -> turn off
    else power = true; //else, if is currently on -> turn on

    switch(power){ //style for the Power Button itself
        case true:
            //immediate effect
            powerBtn.style.opacity = "1"; //power on -> bright-color button
            quoteDispl.innerHTML = "..initializing.."; //messages
            authDispl.innerHTML = "Please wait";
            
            //delayed effect
            setTimeout(function() {
                getQuoteBtn.disabled = "";
                socialBtn.disabled = "";
                quoteDispl.style.opacity = "1"; //monitors on
                authDispl.style.opacity = "1";
                quoteDispl.innerHTML = "Welcome to Random Quote Machine!"; //show messages on monitors
                authDispl.innerHTML = "Try any button";
                $("#led1").attr("style", led1_powerOn); //restore led1's original lighting animation
                $("#led2").attr("style", led2_powerOn); //so on
                $("#led3").attr("style", led3_powerOn); //...
                $("#btn-getQuote").attr("style", getQuoteBtn_powerOn); //restore btn-getQuote power-on opacity
            }, onTime);
            break;
            
        case false: //otherwise
            powerBtn.style.opacity = "0.6";
            quoteDispl.innerHTML = "..powering off.."; //messages
            authDispl.innerHTML = "Please wait";
            rdNum = undefined; //reset random number, so user cannot tweet previous quote when the machine was on

            setTimeout(function() {
                getQuoteBtn.disabled = "true";
                socialBtn.disabled = "true"; //disable tweet button
                getQuoteBtn.style.opacity = "0.6";
                quoteDispl.style.opacity = "0.6"; //monitors off
                authDispl.style.opacity = "0.6";
                quoteDispl.innerHTML = "Goodbye"; //show messages on monitors
                authDispl.innerHTML = "See you again!";
                for(i = 0; i < 2; i++){ //turn first 2 leds off
                    document.getElementsByClassName("led")[i].style.animationName = "ledOff";
                }
                $("#led3").css("background-color", "gray"); //turn the 3rd led off
            }, offTime);
            break;
    }
}

function getQuote(){
    rdNum = Math.floor(Math.random() * (quotePool.length));
    var quoteColor = quotePool[rdNum].colorCode.toString();
    $("#led3").css("background-color", quoteColor); //make 3rd led display relative color
    document.getElementById("quoteDisplay").innerHTML = quotePool[rdNum].content; //show quote content
    document.getElementById("quoteAuthor").innerHTML = quotePool[rdNum].author; //shows quote's author
    return rdNum;
}

function tweet(){
    if(rdNum == undefined){
        alert("No quote to tweet!");
        return 0;
    }
    var url = "https://twitter.com/intent/tweet?text=" + "\"" + quotePool[rdNum].content + "\" " +
                "-" + quotePool[rdNum].author + "-" + "&hashtags=quote";
    window.open(url, "_blank");
}